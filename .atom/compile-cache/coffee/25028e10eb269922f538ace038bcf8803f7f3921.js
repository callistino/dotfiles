
/*
Nicholas Clawson -2014

Popup list view to select tasks to run.
Extends Atoms SelectListView but adds the functionality
of being able to add custom tasks to the list
 */

(function() {
  var $$, SelectListView, TaskListView, _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('atom'), SelectListView = _ref.SelectListView, $$ = _ref.$$;

  module.exports = TaskListView = (function(_super) {
    __extends(TaskListView, _super);

    function TaskListView() {
      return TaskListView.__super__.constructor.apply(this, arguments);
    }

    TaskListView.prototype.callback = function() {};

    TaskListView.prototype.items = [];

    TaskListView.prototype.initialize = function(callback, state) {
      var _this;
      if (state == null) {
        state = {};
      }
      TaskListView.__super__.initialize.apply(this, arguments);
      this.callback = callback;
      this.setItems(Array.isArray(state.items) ? state.items : []);
      this.addClass('overlay from-top');
      this.setMaxItems(5);
      _this = this;
      return this.filterEditorView.on('keydown', function(evt) {
        var selected, text;
        if (evt.which === 13) {
          selected = _this.getSelectedItem();
          text = _this.filterEditorView.getEditor().getBuffer().getText();
          return _this.confirmed(selected ? selected : text);
        }
      });
    };

    TaskListView.prototype.addItem = function(item) {
      return this.items = [item].concat(this.items.filter(function(value) {
        return item !== value;
      }));
    };

    TaskListView.prototype.addItems = function(items) {
      var item, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = items.length; _i < _len; _i++) {
        item = items[_i];
        _results.push(this.addItem(item));
      }
      return _results;
    };

    TaskListView.prototype.confirmed = function(item) {
      this.addItem(item);
      this.cancel();
      return this.callback(item);
    };

    TaskListView.prototype.attach = function() {
      this.populateList();
      atom.workspaceView.append(this);
      return this.focusFilterEditor();
    };

    TaskListView.prototype.serialize = function() {
      return {
        items: this.items.slice(0, 4)
      };
    };

    TaskListView.prototype.viewForItem = function(task) {
      return $$(function() {
        return this.li(task);
      });
    };

    TaskListView.prototype.getEmptyMessage = function() {
      return "Press Enter to run the task.";
    };

    return TaskListView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7Ozs7O0dBQUE7QUFBQTtBQUFBO0FBQUEsTUFBQSxzQ0FBQTtJQUFBO21TQUFBOztBQUFBLEVBUUEsT0FBdUIsT0FBQSxDQUFRLE1BQVIsQ0FBdkIsRUFBQyxzQkFBQSxjQUFELEVBQWlCLFVBQUEsRUFSakIsQ0FBQTs7QUFBQSxFQVVBLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0FBRW5CLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSwyQkFBQSxRQUFBLEdBQVUsU0FBQSxHQUFBLENBQVYsQ0FBQTs7QUFBQSwyQkFDQSxLQUFBLEdBQU8sRUFEUCxDQUFBOztBQUFBLDJCQUtBLFVBQUEsR0FBVyxTQUFDLFFBQUQsRUFBVyxLQUFYLEdBQUE7QUFDUCxVQUFBLEtBQUE7O1FBRGtCLFFBQVE7T0FDMUI7QUFBQSxNQUFBLDhDQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsTUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZLFFBRlosQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLFFBQUQsQ0FBYSxLQUFLLENBQUMsT0FBTixDQUFjLEtBQUssQ0FBQyxLQUFwQixDQUFILEdBQWtDLEtBQUssQ0FBQyxLQUF4QyxHQUFtRCxFQUE3RCxDQUhBLENBQUE7QUFBQSxNQUtBLElBQUMsQ0FBQSxRQUFELENBQVUsa0JBQVYsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFDLENBQUEsV0FBRCxDQUFhLENBQWIsQ0FOQSxDQUFBO0FBQUEsTUFRQSxLQUFBLEdBQVEsSUFSUixDQUFBO2FBU0EsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQXRCLENBQXlCLFNBQXpCLEVBQW9DLFNBQUMsR0FBRCxHQUFBO0FBQ2hDLFlBQUEsY0FBQTtBQUFBLFFBQUEsSUFBRyxHQUFHLENBQUMsS0FBSixLQUFhLEVBQWhCO0FBQ0ksVUFBQSxRQUFBLEdBQVcsS0FBSyxDQUFDLGVBQU4sQ0FBQSxDQUFYLENBQUE7QUFBQSxVQUNBLElBQUEsR0FBTyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsU0FBdkIsQ0FBQSxDQUFrQyxDQUFDLFNBQW5DLENBQUEsQ0FBOEMsQ0FBQyxPQUEvQyxDQUFBLENBRFAsQ0FBQTtpQkFHQSxLQUFLLENBQUMsU0FBTixDQUFtQixRQUFILEdBQWlCLFFBQWpCLEdBQStCLElBQS9DLEVBSko7U0FEZ0M7TUFBQSxDQUFwQyxFQVZPO0lBQUEsQ0FMWCxDQUFBOztBQUFBLDJCQXdCQSxPQUFBLEdBQVEsU0FBQyxJQUFELEdBQUE7YUFDSixJQUFDLENBQUEsS0FBRCxHQUFTLENBQUMsSUFBRCxDQUFNLENBQUMsTUFBUCxDQUFjLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBUCxDQUFjLFNBQUMsS0FBRCxHQUFBO2VBQ2pDLElBQUEsS0FBUSxNQUR5QjtNQUFBLENBQWQsQ0FBZCxFQURMO0lBQUEsQ0F4QlIsQ0FBQTs7QUFBQSwyQkE2QkEsUUFBQSxHQUFTLFNBQUMsS0FBRCxHQUFBO0FBQ0wsVUFBQSx3QkFBQTtBQUFBO1dBQUEsNENBQUE7eUJBQUE7QUFBQSxzQkFBQSxJQUFDLENBQUEsT0FBRCxDQUFTLElBQVQsRUFBQSxDQUFBO0FBQUE7c0JBREs7SUFBQSxDQTdCVCxDQUFBOztBQUFBLDJCQWlDQSxTQUFBLEdBQVUsU0FBQyxJQUFELEdBQUE7QUFDTixNQUFBLElBQUMsQ0FBQSxPQUFELENBQVMsSUFBVCxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFELENBQUEsQ0FEQSxDQUFBO2FBRUEsSUFBQyxDQUFBLFFBQUQsQ0FBVSxJQUFWLEVBSE07SUFBQSxDQWpDVixDQUFBOztBQUFBLDJCQXdDQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ0osTUFBQSxJQUFDLENBQUEsWUFBRCxDQUFBLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFuQixDQUEwQixJQUExQixDQURBLENBQUE7YUFFQSxJQUFDLENBQUEsaUJBQUQsQ0FBQSxFQUhJO0lBQUEsQ0F4Q1IsQ0FBQTs7QUFBQSwyQkE4Q0EsU0FBQSxHQUFXLFNBQUEsR0FBQTtBQUNQLGFBQU87QUFBQSxRQUFBLEtBQUEsRUFBTyxJQUFDLENBQUEsS0FBSyxDQUFDLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQVA7T0FBUCxDQURPO0lBQUEsQ0E5Q1gsQ0FBQTs7QUFBQSwyQkFrREEsV0FBQSxHQUFZLFNBQUMsSUFBRCxHQUFBO2FBQ1IsRUFBQSxDQUFHLFNBQUEsR0FBQTtlQUNDLElBQUMsQ0FBQSxFQUFELENBQUksSUFBSixFQUREO01BQUEsQ0FBSCxFQURRO0lBQUEsQ0FsRFosQ0FBQTs7QUFBQSwyQkF1REEsZUFBQSxHQUFpQixTQUFBLEdBQUE7YUFDYiwrQkFEYTtJQUFBLENBdkRqQixDQUFBOzt3QkFBQTs7S0FGd0MsZUFWNUMsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/rpelayo/.atom/packages/grunt-runner/lib/task-list-view.coffee