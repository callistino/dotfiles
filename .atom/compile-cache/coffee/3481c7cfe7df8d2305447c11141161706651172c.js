(function() {
  var CompassView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('atom').View;

  module.exports = CompassView = (function(_super) {
    __extends(CompassView, _super);

    function CompassView() {
      return CompassView.__super__.constructor.apply(this, arguments);
    }

    CompassView.content = function() {
      return this.div({
        "class": 'compass overlay from-top'
      }, (function(_this) {
        return function() {
          return _this.div("The Compass package is Alive! It's ALIVE!", {
            "class": "message"
          });
        };
      })(this));
    };

    CompassView.prototype.initialize = function(serializeState) {
      return atom.workspaceView.command("compass:toggle", (function(_this) {
        return function() {
          return _this.toggle();
        };
      })(this));
    };

    CompassView.prototype.serialize = function() {};

    CompassView.prototype.destroy = function() {
      return this.detach();
    };

    CompassView.prototype.toggle = function() {
      console.log("CompassView was toggled!");
      if (this.hasParent()) {
        return this.detach();
      } else {
        return atom.workspaceView.append(this);
      }
    };

    return CompassView;

  })(View);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLGlCQUFBO0lBQUE7bVNBQUE7O0FBQUEsRUFBQyxPQUFRLE9BQUEsQ0FBUSxNQUFSLEVBQVIsSUFBRCxDQUFBOztBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FDTTtBQUNKLGtDQUFBLENBQUE7Ozs7S0FBQTs7QUFBQSxJQUFBLFdBQUMsQ0FBQSxPQUFELEdBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLEdBQUQsQ0FBSztBQUFBLFFBQUEsT0FBQSxFQUFPLDBCQUFQO09BQUwsRUFBd0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFDdEMsS0FBQyxDQUFBLEdBQUQsQ0FBSywyQ0FBTCxFQUFrRDtBQUFBLFlBQUEsT0FBQSxFQUFPLFNBQVA7V0FBbEQsRUFEc0M7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF4QyxFQURRO0lBQUEsQ0FBVixDQUFBOztBQUFBLDBCQUlBLFVBQUEsR0FBWSxTQUFDLGNBQUQsR0FBQTthQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZ0JBQTNCLEVBQTZDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE1BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBN0MsRUFEVTtJQUFBLENBSlosQ0FBQTs7QUFBQSwwQkFRQSxTQUFBLEdBQVcsU0FBQSxHQUFBLENBUlgsQ0FBQTs7QUFBQSwwQkFXQSxPQUFBLEdBQVMsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLE1BQUQsQ0FBQSxFQURPO0lBQUEsQ0FYVCxDQUFBOztBQUFBLDBCQWNBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDTixNQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksMEJBQVosQ0FBQSxDQUFBO0FBQ0EsTUFBQSxJQUFHLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBSDtlQUNFLElBQUMsQ0FBQSxNQUFELENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQW5CLENBQTBCLElBQTFCLEVBSEY7T0FGTTtJQUFBLENBZFIsQ0FBQTs7dUJBQUE7O0tBRHdCLEtBSDFCLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/rpelayo/.atom/packages/compass/lib/compass-view.coffee