
/*
Nicholas Clawson -2014

The bottom toolbar. In charge handling user input and implementing
various commands. Creates a SelectListView and launches a task to
discover the projects grunt commands. Logs errors and output.
Also launches an Atom BufferedProcess to run grunt when needed.
 */

(function() {
  var BufferedProcess, ListView, ResultsView, Task, View, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), View = _ref.View, BufferedProcess = _ref.BufferedProcess, Task = _ref.Task;

  ListView = require('./task-list-view');

  module.exports = ResultsView = (function(_super) {
    __extends(ResultsView, _super);

    function ResultsView() {
      return ResultsView.__super__.constructor.apply(this, arguments);
    }

    ResultsView.prototype.path = null;

    ResultsView.prototype.process = null;

    ResultsView.prototype.taskList = null;

    ResultsView.content = function() {
      return this.div({
        "class": 'grunt-runner-results tool-panel panel-bottom native-key-bindings'
      }, (function(_this) {
        return function() {
          _this.div({
            outlet: 'status',
            "class": 'grunt-panel-heading'
          }, function() {
            return _this.div({
              "class": 'btn-group'
            }, function() {
              _this.button({
                outlet: 'startbtn',
                click: 'toggleTaskList',
                "class": 'btn'
              }, 'Start Grunt');
              _this.button({
                outlet: 'stopbtn',
                click: 'stopProcess',
                "class": 'btn'
              }, 'Stop Grunt');
              _this.button({
                outlet: 'logbtn',
                click: 'toggleLog',
                "class": 'btn'
              }, 'Toggle Log');
              return _this.button({
                outlet: 'panelbtn',
                click: 'togglePanel',
                "class": 'btn'
              }, 'Hide');
            });
          });
          return _this.div({
            outlet: 'panel',
            "class": 'panel-body padded closed'
          }, function() {
            return _this.ul({
              outlet: 'errors',
              "class": 'list-group'
            });
          });
        };
      })(this));
    };

    ResultsView.prototype.initialize = function(state) {
      var view;
      if (state == null) {
        state = {};
      }
      this.path = atom.project.getPath();
      this.taskList = new ListView(this.startProcess.bind(this), state.taskList);
      view = this;
      return Task.once(require.resolve('./parse-config-task'), atom.project.getPath() + '/gruntfile', function(_arg) {
        var error, tasks;
        error = _arg.error, tasks = _arg.tasks;
        view.startbtn.setTooltip("", {
          command: 'grunt-runner:run'
        });
        view.stopbtn.setTooltip("", {
          command: 'grunt-runner:stop'
        });
        view.logbtn.setTooltip("", {
          command: 'grunt-runner:toggle-log'
        });
        view.panelbtn.setTooltip("", {
          command: 'grunt-runner:toggle-panel'
        });
        if (error) {
          console.warn("grunt-runner: " + error);
          view.addLine("Error loading gruntfile: " + error, "error");
          return view.toggleLog();
        } else {
          view.togglePanel();
          return view.taskList.addItems(tasks);
        }
      });
    };

    ResultsView.prototype.startProcess = function(task) {
      this.stopProcess();
      this.emptyPanel();
      if (this.panel.hasClass('closed')) {
        this.toggleLog();
      }
      this.status.attr('data-status', 'loading');
      this.addLine("Running : grunt " + task, 'subtle');
      return this.gruntTask(task, this.path);
    };

    ResultsView.prototype.stopProcess = function() {
      var _ref1, _ref2;
      if (this.process && !((_ref1 = this.process) != null ? _ref1.killed : void 0)) {
        this.addLine('Grunt task was ended', 'warning');
      }
      if ((_ref2 = this.process) != null) {
        _ref2.kill();
      }
      this.process = null;
      return this.status.attr('data-status', null);
    };

    ResultsView.prototype.togglePanel = function() {
      if (!this.isOnDom()) {
        return atom.workspaceView.prependToBottom(this);
      }
      if (this.isOnDom()) {
        return this.detach();
      }
    };

    ResultsView.prototype.toggleLog = function() {
      return this.panel.toggleClass('closed');
    };

    ResultsView.prototype.toggleTaskList = function() {
      if (!this.taskList.isOnDom()) {
        return this.taskList.attach();
      }
      return this.taskList.cancel();
    };

    ResultsView.prototype.addLine = function(text, type) {
      var errorList, panel, stuckToBottom, _ref1;
      if (type == null) {
        type = "plain";
      }
      _ref1 = [this.panel, this.errors], panel = _ref1[0], errorList = _ref1[1];
      text = text.trim().replace(/[\r\n]+/g, '<br />');
      stuckToBottom = errorList.height() - panel.height() - panel.scrollTop() === 0;
      errorList.append("<li class='text-" + type + "'>" + text + "</li>");
      if (stuckToBottom) {
        return panel.scrollTop(errorList.height());
      }
    };

    ResultsView.prototype.emptyPanel = function() {
      return this.errors.empty();
    };

    ResultsView.prototype.serialize = function() {
      return {
        taskList: this.taskList.serialize()
      };
    };

    ResultsView.prototype.gruntTask = function(task, path) {
      var e, exit, stdout;
      stdout = function(out) {
        return this.addLine(out.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, ''));
      };
      exit = function(code) {
        if (code !== 0) {
          atom.beep();
        }
        this.addLine("Grunt exited: code " + code + ".", code === 0 ? 'success' : 'error');
        return this.status.attr('data-status', code === 0 ? 'ready' : 'error');
      };
      try {
        return this.process = new BufferedProcess({
          command: 'grunt',
          args: [task],
          options: {
            cwd: path
          },
          stdout: stdout.bind(this),
          exit: exit.bind(this)
        });
      } catch (_error) {
        e = _error;
        return this.addLine("Could not find grunt command. Make sure to set the path in the configuration settings.", "error");
      }
    };

    return ResultsView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7Ozs7OztHQUFBO0FBQUE7QUFBQTtBQUFBLE1BQUEsd0RBQUE7SUFBQTttU0FBQTs7QUFBQSxFQVNBLE9BQWdDLE9BQUEsQ0FBUSxNQUFSLENBQWhDLEVBQUMsWUFBQSxJQUFELEVBQU8sdUJBQUEsZUFBUCxFQUF3QixZQUFBLElBVHhCLENBQUE7O0FBQUEsRUFVQSxRQUFBLEdBQVcsT0FBQSxDQUFRLGtCQUFSLENBVlgsQ0FBQTs7QUFBQSxFQVlBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBRW5CLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwwQkFBQSxJQUFBLEdBQU0sSUFBTixDQUFBOztBQUFBLDBCQUNBLE9BQUEsR0FBUyxJQURULENBQUE7O0FBQUEsMEJBRUEsUUFBQSxHQUFVLElBRlYsQ0FBQTs7QUFBQSxJQUtBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ04sSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLGtFQUFQO09BQUwsRUFBZ0YsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM1RSxVQUFBLEtBQUMsQ0FBQSxHQUFELENBQUs7QUFBQSxZQUFBLE1BQUEsRUFBTyxRQUFQO0FBQUEsWUFBaUIsT0FBQSxFQUFPLHFCQUF4QjtXQUFMLEVBQW9ELFNBQUEsR0FBQTttQkFDaEQsS0FBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLGNBQUEsT0FBQSxFQUFPLFdBQVA7YUFBTCxFQUF5QixTQUFBLEdBQUE7QUFDckIsY0FBQSxLQUFDLENBQUEsTUFBRCxDQUFRO0FBQUEsZ0JBQUEsTUFBQSxFQUFPLFVBQVA7QUFBQSxnQkFBbUIsS0FBQSxFQUFNLGdCQUF6QjtBQUFBLGdCQUEyQyxPQUFBLEVBQU0sS0FBakQ7ZUFBUixFQUFnRSxh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
//# sourceURL=/Users/rpelayo/.atom/packages/grunt-runner/lib/grunt-runner-view.coffee