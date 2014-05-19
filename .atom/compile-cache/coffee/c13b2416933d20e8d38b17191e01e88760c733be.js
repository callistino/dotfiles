(function() {
  var $, $$, AutocompleteView, Editor, Perf, Point, Q, Range, SelectListView, SimpleSelectListView, fuzzaldrin, minimatch, path, _, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  _ = require('underscore-plus');

  path = require('path');

  minimatch = require('minimatch');

  SimpleSelectListView = require('./simple-select-list-view');

  _ref = require('atom'), Editor = _ref.Editor, $ = _ref.$, $$ = _ref.$$, Range = _ref.Range, Point = _ref.Point, SelectListView = _ref.SelectListView;

  fuzzaldrin = require('fuzzaldrin');

  Perf = require('./perf');

  Q = require('q');

  module.exports = AutocompleteView = (function(_super) {
    __extends(AutocompleteView, _super);

    function AutocompleteView() {
      this.onChanged = __bind(this.onChanged, this);
      this.onSaved = __bind(this.onSaved, this);
      this.cursorMoved = __bind(this.cursorMoved, this);
      this.contentsModified = __bind(this.contentsModified, this);
      this.cancel = __bind(this.cancel, this);
      return AutocompleteView.__super__.constructor.apply(this, arguments);
    }

    AutocompleteView.prototype.currentBuffer = null;

    AutocompleteView.prototype.wordList = null;

    AutocompleteView.prototype.wordRegex = /\b\w*[a-zA-Z_]\w*\b/g;

    AutocompleteView.prototype.originalCursorPosition = null;

    AutocompleteView.prototype.aboveCursor = false;

    AutocompleteView.prototype.debug = false;

    AutocompleteView.prototype.lastConfirmedWord = null;

    AutocompleteView.prototype.initialize = function(editorView) {
      this.editorView = editorView;
      AutocompleteView.__super__.initialize.apply(this, arguments);
      this.addClass('autocomplete popover-list');
      this.editor = this.editorView.editor;
      if (this.currentFileBlacklisted()) {
        return;
      }
      this.handleEvents();
      return this.setCurrentBuffer(this.editor.getBuffer());
    };


    /*
     * Checks whether the current file is blacklisted
     */

    AutocompleteView.prototype.currentFileBlacklisted = function() {
      var blacklist, blacklistGlob, fileName, _i, _len;
      blacklist = atom.config.get("autocomplete-plus.fileBlacklist").split(",").map(function(s) {
        return s.trim();
      });
      fileName = path.basename(this.editor.getBuffer().getPath());
      for (_i = 0, _len = blacklist.length; _i < _len; _i++) {
        blacklistGlob = blacklist[_i];
        if (minimatch(fileName, blacklistGlob)) {
          return true;
        }
      }
      return false;
    };


    /*
     * Creates a view for the given item
     */

    AutocompleteView.prototype.viewForItem = function(_arg) {
      var word;
      word = _arg.word;
      return $$(function() {
        return this.li((function(_this) {
          return function() {
            return _this.span(word);
          };
        })(this));
      });
    };


    /*
     * Handles editor events
     */

    AutocompleteView.prototype.handleEvents = function() {
      this.list.on('mousewheel', function(event) {
        return event.stopPropagation();
      });
      if (!atom.config.get('autocomplete-plus.liveCompletion')) {
        this.editor.on('contents-modified', this.contentsModified);
      }
      this.editor.on('title-changed-subscription-removed', this.cancel);
      return this.editor.on('cursor-moved', this.cursorMoved);
    };


    /*
     * Return false so that the events don't bubble up to the editor
     */

    AutocompleteView.prototype.selectNextItemView = function() {
      AutocompleteView.__super__.selectNextItemView.apply(this, arguments);
      return false;
    };


    /*
     * Return false so that the events don't bubble up to the editor
     */

    AutocompleteView.prototype.selectPreviousItemView = function() {
      AutocompleteView.__super__.selectPreviousItemView.apply(this, arguments);
      return false;
    };


    /*
     * Don't really know what that does...
     */

    AutocompleteView.prototype.getCompletionsForCursorScope = function() {
      var completions, cursorScope;
      cursorScope = this.editor.scopesForBufferPosition(this.editor.getCursorBufferPosition());
      completions = atom.syntax.propertiesForScope(cursorScope, 'editor.completions');
      completions = completions.map(function(properties) {
        return _.valueForKeyPath(properties, 'editor.completions');
      });
      return _.uniq(_.flatten(completions));
    };


    /*
     * Generates the word list from the editor buffer(s)
     */

    AutocompleteView.prototype.buildWordList = function() {
      var buffer, buffers, matches, objectKeyBlacklist, p, word, wordHash, wordList, words, _i, _j, _k, _len, _len1, _len2;
      wordHash = {};
      if (atom.config.get('autocomplete-plus.includeCompletionsFromAllBuffers')) {
        buffers = atom.project.getBuffers();
      } else {
        buffers = [this.currentBuffer];
      }
      matches = [];
      p = new Perf("Building word list", {
        debug: this.debug
      });
      p.start();
      for (_i = 0, _len = buffers.length; _i < _len; _i++) {
        buffer = buffers[_i];
        matches.push(buffer.getText().match(this.wordRegex));
      }
      matches.push(this.getCompletionsForCursorScope());
      words = _.flatten(matches);
      for (_j = 0, _len1 = words.length; _j < _len1; _j++) {
        word = words[_j];
        if (wordHash[word] == null) {
          wordHash[word] = true;
        }
      }
      wordList = Object.keys(wordHash);
      objectKeyBlacklist = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'];
      for (_k = 0, _len2 = objectKeyBlacklist.length; _k < _len2; _k++) {
        word = objectKeyBlacklist[_k];
        if (__indexOf.call(words, word) >= 0) {
          wordList.push(word);
        }
      }
      this.wordList = wordList;
      return p.stop();
    };


    /*
     * Handles confirmation (the user pressed enter)
     */

    AutocompleteView.prototype.confirmed = function(match) {
      var position;
      this.editor.getSelection().clear();
      this.cancel();
      if (!match) {
        return;
      }
      this.lastConfirmedWord = match.word;
      this.replaceTextWithMatch(match);
      position = this.editor.getCursorBufferPosition();
      return this.editor.setCursorBufferPosition([position.row, position.column]);
    };


    /*
     * Activates
     */

    AutocompleteView.prototype.setActive = function() {
      AutocompleteView.__super__.setActive.apply(this, arguments);
      return this.active = true;
    };


    /*
     * Clears the list, sets back the cursor, focuses the editor and
     * detaches the list DOM element
     */

    AutocompleteView.prototype.cancel = function() {
      this.active = false;
      this.list.empty();
      this.editorView.focus();
      return this.detach();
    };

    AutocompleteView.prototype.contentsModified = function() {
      var prefix, selection, suggestions;
      if (this.active) {
        this.detach();
        this.list.empty();
        this.editorView.focus();
      }
      selection = this.editor.getSelection();
      prefix = this.prefixOfSelection(selection);
      if (prefix === this.lastConfirmedWord) {
        return;
      }
      if (!prefix.length) {
        return;
      }
      suggestions = this.findMatchesForWord(prefix);
      if (!suggestions.length) {
        return;
      }
      this.setItems(suggestions);
      this.editorView.appendToLinesView(this);
      this.setPosition();
      return this.setActive();
    };

    AutocompleteView.prototype.cursorMoved = function(data) {
      if (!data.textChanged && this.active) {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.onSaved = function() {
      this.buildWordList();
      return this.cancel();
    };

    AutocompleteView.prototype.onChanged = function(e) {
      var _ref1;
      if ((_ref1 = e.newText) === "\n" || _ref1 === " ") {
        this.addLastWordToList(e.newText === "\n");
      }
      if (e.newText.length === 1) {
        return this.contentsModified();
      } else {
        return this.cancel();
      }
    };

    AutocompleteView.prototype.findMatchesForWord = function(prefix) {
      var p, results, word, words;
      p = new Perf("Finding matches for '" + prefix + "'", {
        debug: this.debug
      });
      p.start();
      words = fuzzaldrin.filter(this.wordList, prefix);
      results = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = words.length; _i < _len; _i++) {
          word = words[_i];
          if (word !== prefix) {
            _results.push({
              prefix: prefix,
              word: word
            });
          }
        }
        return _results;
      })();
      p.stop();
      return results;
    };

    AutocompleteView.prototype.setPosition = function() {
      var height, left, potentialBottom, potentialTop, top, _ref1;
      _ref1 = this.editorView.pixelPositionForScreenPosition(this.editor.getCursorScreenPosition()), left = _ref1.left, top = _ref1.top;
      height = this.outerHeight();
      potentialTop = top + this.editorView.lineHeight;
      potentialBottom = potentialTop - this.editorView.scrollTop() + height;
      if (this.aboveCursor || potentialBottom > this.editorView.outerHeight()) {
        this.aboveCursor = true;
        return this.css({
          left: left,
          top: top - height,
          bottom: 'inherit'
        });
      } else {
        return this.css({
          left: left,
          top: potentialTop,
          bottom: 'inherit'
        });
      }
    };


    /*
     * Replaces the current prefix with the given match
     */

    AutocompleteView.prototype.replaceTextWithMatch = function(match) {
      var buffer, cursorPosition, infixLength, selection, startPosition;
      selection = this.editor.getSelection();
      startPosition = selection.getBufferRange().start;
      buffer = this.editor.getBuffer();
      selection.deleteSelectedText();
      cursorPosition = this.editor.getCursorBufferPosition();
      buffer["delete"](Range.fromPointWithDelta(cursorPosition, 0, -match.prefix.length));
      this.editor.insertText(match.word);
      infixLength = match.word.length - match.prefix.length;
      return this.editor.setSelectedBufferRange([startPosition, [startPosition.row, startPosition.column + infixLength]]);
    };


    /*
     * Finds and returns the content before the current cursor position
     */

    AutocompleteView.prototype.prefixOfSelection = function(selection) {
      var lineRange, prefix, selectionRange;
      selectionRange = selection.getBufferRange();
      lineRange = [[selectionRange.start.row, 0], [selectionRange.end.row, this.editor.lineLengthForBufferRow(selectionRange.end.row)]];
      prefix = "";
      this.currentBuffer.scanInRange(this.wordRegex, lineRange, function(_arg) {
        var match, prefixOffset, range, stop;
        match = _arg.match, range = _arg.range, stop = _arg.stop;
        if (range.start.isGreaterThan(selectionRange.end)) {
          stop();
        }
        if (range.intersectsWith(selectionRange)) {
          prefixOffset = selectionRange.start.column - range.start.column;
          if (range.start.isLessThan(selectionRange.start)) {
            return prefix = match[0].slice(0, prefixOffset);
          }
        }
      });
      return prefix;
    };


    /*
     * Finds the last typed word. If newLine is set to true, it looks
     * for the last word in the previous line.
     */

    AutocompleteView.prototype.lastTypedWord = function(newLine) {
      var lastWord, lineRange, maxColumn, row, selectionRange;
      selectionRange = this.editor.getSelection().getBufferRange();
      row = selectionRange.start.row;
      if (newLine) {
        row--;
      }
      if (newLine) {
        maxColumn = this.editor.lineLengthForBufferRow(row);
      } else {
        maxColumn = selectionRange.start.column;
      }
      lineRange = [[row, 0], [row, maxColumn]];
      lastWord = null;
      this.currentBuffer.scanInRange(this.wordRegex, lineRange, function(_arg) {
        var match, range, stop;
        match = _arg.match, range = _arg.range, stop = _arg.stop;
        return lastWord = match[0];
      });
      return lastWord;
    };


    /*
     * As soon as the list is in the DOM tree, it calculates the
     * maximum width of all list items and resizes the list so that
     * all items fit
     *
     * @todo: Fix this. Doesn't work well yet.
     */

    AutocompleteView.prototype.afterAttach = function(onDom) {
      var widestCompletion;
      if (onDom) {
        widestCompletion = parseInt(this.css('min-width')) || 0;
        this.list.find('span').each(function() {
          return widestCompletion = Math.max(widestCompletion, $(this).outerWidth());
        });
        this.list.width(widestCompletion + 15);
        return this.width(this.list.outerWidth());
      }
    };


    /*
     * Updates the list's position when populating results
     */

    AutocompleteView.prototype.populateList = function() {
      var p;
      p = new Perf("Populating list", {
        debug: this.debug
      });
      p.start();
      AutocompleteView.__super__.populateList.apply(this, arguments);
      p.stop();
      return this.setPosition();
    };


    /*
     * Sets the current buffer
     */

    AutocompleteView.prototype.setCurrentBuffer = function(currentBuffer) {
      this.currentBuffer = currentBuffer;
      this.buildWordList();
      this.currentBuffer.on("saved", this.onSaved);
      if (atom.config.get('autocomplete-plus.liveCompletion')) {
        return this.currentBuffer.on("changed", this.onChanged);
      }
    };


    /*
     * Adds the last typed word to the wordList
     */

    AutocompleteView.prototype.addLastWordToList = function(newLine) {
      var lastWord;
      lastWord = this.lastTypedWord(newLine);
      if (!lastWord) {
        return;
      }
      if (this.wordList.indexOf(lastWord) < 0) {
        return this.wordList.push(lastWord);
      }
    };


    /*
     * Defines which key we would like to use for filtering
     */

    AutocompleteView.prototype.getFilterKey = function() {
      return 'word';
    };

    AutocompleteView.prototype.getModel = function() {
      return null;
    };

    AutocompleteView.prototype.dispose = function() {
      var _ref1, _ref2;
      this.editor.off("contents-modified", this.contentsModified);
      if ((_ref1 = this.currentBuffer) != null) {
        _ref1.off("changed", this.onChanged);
      }
      if ((_ref2 = this.currentBuffer) != null) {
        _ref2.off("saved", this.onSaved);
      }
      this.editor.off("contents-modified", this.contentsModified);
      this.editor.off("title-changed-subscription-removed", this.cancel);
      return this.editor.off("cursor-moved", this.cursorMoved);
    };

    return AutocompleteView;

  })(SimpleSelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtJQUFBO0lBQUE7Ozt5SkFBQTs7QUFBQSxFQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsaUJBQVIsQ0FBSixDQUFBOztBQUFBLEVBQ0EsSUFBQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRFAsQ0FBQTs7QUFBQSxFQUVBLFNBQUEsR0FBWSxPQUFBLENBQVEsV0FBUixDQUZaLENBQUE7O0FBQUEsRUFHQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsMkJBQVIsQ0FIdkIsQ0FBQTs7QUFBQSxFQUlBLE9BQWlELE9BQUEsQ0FBUSxNQUFSLENBQWpELEVBQUMsY0FBQSxNQUFELEVBQVMsU0FBQSxDQUFULEVBQVksVUFBQSxFQUFaLEVBQWdCLGFBQUEsS0FBaEIsRUFBdUIsYUFBQSxLQUF2QixFQUE4QixzQkFBQSxjQUo5QixDQUFBOztBQUFBLEVBS0EsVUFBQSxHQUFhLE9BQUEsQ0FBUSxZQUFSLENBTGIsQ0FBQTs7QUFBQSxFQU1BLElBQUEsR0FBTyxPQUFBLENBQVEsUUFBUixDQU5QLENBQUE7O0FBQUEsRUFPQSxDQUFBLEdBQUksT0FBQSxDQUFRLEdBQVIsQ0FQSixDQUFBOztBQUFBLEVBU0EsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLHVDQUFBLENBQUE7Ozs7Ozs7OztLQUFBOztBQUFBLCtCQUFBLGFBQUEsR0FBZSxJQUFmLENBQUE7O0FBQUEsK0JBQ0EsUUFBQSxHQUFVLElBRFYsQ0FBQTs7QUFBQSwrQkFFQSxTQUFBLEdBQVcsc0JBRlgsQ0FBQTs7QUFBQSwrQkFHQSxzQkFBQSxHQUF3QixJQUh4QixDQUFBOztBQUFBLCtCQUlBLFdBQUEsR0FBYSxLQUpiLENBQUE7O0FBQUEsK0JBS0EsS0FBQSxHQUFPLEtBTFAsQ0FBQTs7QUFBQSwrQkFNQSxpQkFBQSxHQUFtQixJQU5uQixDQUFB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
//# sourceURL=/Users/rpelayo/.atom/packages/autocomplete-plus/lib/autocomplete-view.coffee