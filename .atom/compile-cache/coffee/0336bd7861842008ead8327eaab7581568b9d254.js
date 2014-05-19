(function() {
  var ComposerView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = ComposerView = (function(_super) {
    __extends(ComposerView, _super);

    function ComposerView() {
      return ComposerView.__super__.constructor.apply(this, arguments);
    }

    ComposerView.content = function() {
      return this.div({
        "class": "composer-container"
      }, (function(_this) {
        return function() {
          _this.button({
            click: 'destroy',
            "class": 'btn btn-error pull-right'
          }, function() {
            _this.span({
              "class": "icon icon-x"
            });
            return _this.span('close');
          });
          return _this.div({
            "class": "composer-contents"
          });
        };
      })(this));
    };

    ComposerView.prototype.initialize = function() {
      return atom.workspaceView.command("composer:destroy", (function(_this) {
        return function() {
          return _this.destroy();
        };
      })(this));
    };

    ComposerView.prototype.destroy = function() {
      if (this.isVisible()) {
        return this.detach();
      }
    };

    return ComposerView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGtCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFTTtBQUVKLG1DQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFlBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLG9CQUFQO09BQUwsRUFBa0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM5QixVQUFBLEtBQUMsQ0FBQSxNQUFELENBQVE7QUFBQSxZQUFBLEtBQUEsRUFBTyxTQUFQO0FBQUEsWUFBa0IsT0FBQSxFQUFPLDBCQUF6QjtXQUFSLEVBQTZELFNBQUEsR0FBQTtBQUN6RCxZQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE9BQUEsRUFBTyxhQUFQO2FBQU4sQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sT0FBTixFQUZ5RDtVQUFBLENBQTdELENBQUEsQ0FBQTtpQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sbUJBQVA7V0FBTCxFQUo4QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWxDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMkJBUUEsVUFBQSxHQUFZLFNBQUEsR0FBQTthQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsRUFEVTtJQUFBLENBUlosQ0FBQTs7QUFBQSwyQkFjQSxPQUFBLEdBQVMsU0FBQSxHQUFBO0FBQ1AsTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQURPO0lBQUEsQ0FkVCxDQUFBOzt3QkFBQTs7S0FGeUIsS0FKM0IsQ0FBQTtBQUFBIgp9
//# sourceURL=/Users/rpelayo/.atom/packages/composer/lib/composer-view.coffee