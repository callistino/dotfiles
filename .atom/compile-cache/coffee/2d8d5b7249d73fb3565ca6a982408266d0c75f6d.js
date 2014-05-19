(function() {
  var PHPUnitView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = PHPUnitView = (function(_super) {
    __extends(PHPUnitView, _super);

    function PHPUnitView() {
      return PHPUnitView.__super__.constructor.apply(this, arguments);
    }

    PHPUnitView.content = function() {
      return this.div({
        "class": "phpunit-container"
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
            "class": "phpunit-contents"
          });
        };
      })(this));
    };

    PHPUnitView.prototype.destroy = function() {
      if (this.isVisible()) {
        return this.detach();
      }
    };

    return PHPUnitView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FFTTtBQUVKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLG1CQUFQO09BQUwsRUFBaUMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUM3QixVQUFBLEtBQUMsQ0FBQSxNQUFELENBQVE7QUFBQSxZQUFBLEtBQUEsRUFBTyxTQUFQO0FBQUEsWUFBa0IsT0FBQSxFQUFPLDBCQUF6QjtXQUFSLEVBQTZELFNBQUEsR0FBQTtBQUN6RCxZQUFBLEtBQUMsQ0FBQSxJQUFELENBQU07QUFBQSxjQUFBLE9BQUEsRUFBTyxhQUFQO2FBQU4sQ0FBQSxDQUFBO21CQUNBLEtBQUMsQ0FBQSxJQUFELENBQU0sT0FBTixFQUZ5RDtVQUFBLENBQTdELENBQUEsQ0FBQTtpQkFHQSxLQUFDLENBQUEsR0FBRCxDQUFLO0FBQUEsWUFBQSxPQUFBLEVBQU8sa0JBQVA7V0FBTCxFQUo2QjtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpDLEVBRFE7SUFBQSxDQUFWLENBQUE7O0FBQUEsMEJBVUEsT0FBQSxHQUFTLFNBQUEsR0FBQTtBQUNQLE1BQUEsSUFBRyxJQUFDLENBQUEsU0FBRCxDQUFBLENBQUg7ZUFDRSxJQUFDLENBQUEsTUFBRCxDQUFBLEVBREY7T0FETztJQUFBLENBVlQsQ0FBQTs7dUJBQUE7O0tBRndCLEtBSjFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/rpelayo/.atom/packages/phpunit/lib/test-status-view.coffee