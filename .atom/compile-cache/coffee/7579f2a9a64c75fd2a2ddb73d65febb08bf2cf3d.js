
/*
Nicholas Clawson -2014

Entry point for the package, creates the toolbar and starts
listening for any commands or changes
 */

(function() {
  window.View = require('./grunt-runner-view.coffee');

  module.exports = {
    configDefaults: {
      gruntPaths: []
    },
    originalPath: '',
    activate: function(state) {
      if (state == null) {
        state = {};
      }
      this.originalPath = process.env.PATH;
      atom.config.observe('grunt-runner.gruntPaths', this.updateSettings.bind(this));
      this.view = new View(state);
      atom.workspaceView.command('grunt-runner:stop', this.view.stopProcess.bind(this.view));
      atom.workspaceView.command('grunt-runner:toggle-log', this.view.toggleLog.bind(this.view));
      atom.workspaceView.command('grunt-runner:toggle-panel', this.view.togglePanel.bind(this.view));
      return atom.workspaceView.command('grunt-runner:run', this.view.toggleTaskList.bind(this.view));
    },
    updateSettings: function() {
      var gruntPaths;
      gruntPaths = atom.config.get('grunt-runner').gruntPaths;
      gruntPaths = Array.isArray(gruntPaths) ? gruntPaths : [];
      return process.env.PATH = this.originalPath + (gruntPaths.length > 0 ? ':' : '') + gruntPaths.join(':');
    },
    serialize: function() {
      return this.view.serialize();
    },
    deactivate: function() {
      return this.view.stopProcess();
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQTs7Ozs7R0FBQTtBQUFBO0FBQUE7QUFBQSxFQU9BLE1BQU0sQ0FBQyxJQUFQLEdBQWMsT0FBQSxDQUFRLDRCQUFSLENBUGQsQ0FBQTs7QUFBQSxFQVNBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxJQUFBLGNBQUEsRUFDSTtBQUFBLE1BQUEsVUFBQSxFQUFZLEVBQVo7S0FESjtBQUFBLElBR0EsWUFBQSxFQUFjLEVBSGQ7QUFBQSxJQU1BLFFBQUEsRUFBUyxTQUFDLEtBQUQsR0FBQTs7UUFBQyxRQUFRO09BQ2Q7QUFBQSxNQUFBLElBQUMsQ0FBQSxZQUFELEdBQWdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBNUIsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFaLENBQW9CLHlCQUFwQixFQUErQyxJQUFDLENBQUEsY0FBYyxDQUFDLElBQWhCLENBQXFCLElBQXJCLENBQS9DLENBREEsQ0FBQTtBQUFBLE1BR0EsSUFBQyxDQUFBLElBQUQsR0FBWSxJQUFBLElBQUEsQ0FBSyxLQUFMLENBSFosQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixtQkFBM0IsRUFBZ0QsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBbEIsQ0FBdUIsSUFBQyxDQUFBLElBQXhCLENBQWhELENBSkEsQ0FBQTtBQUFBLE1BS0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQix5QkFBM0IsRUFBc0QsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBaEIsQ0FBcUIsSUFBQyxDQUFBLElBQXRCLENBQXRELENBTEEsQ0FBQTtBQUFBLE1BTUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQiwyQkFBM0IsRUFBd0QsSUFBQyxDQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBbEIsQ0FBdUIsSUFBQyxDQUFBLElBQXhCLENBQXhELENBTkEsQ0FBQTthQU9BLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLElBQUMsQ0FBQSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQXJCLENBQTBCLElBQUMsQ0FBQSxJQUEzQixDQUEvQyxFQVJLO0lBQUEsQ0FOVDtBQUFBLElBa0JBLGNBQUEsRUFBZ0IsU0FBQSxHQUFBO0FBQ1osVUFBQSxVQUFBO0FBQUEsTUFBQSxVQUFBLEdBQWEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGNBQWhCLENBQStCLENBQUMsVUFBN0MsQ0FBQTtBQUFBLE1BQ0EsVUFBQSxHQUFnQixLQUFLLENBQUMsT0FBTixDQUFjLFVBQWQsQ0FBSCxHQUFpQyxVQUFqQyxHQUFpRCxFQUQ5RCxDQUFBO2FBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFaLEdBQW1CLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBQUksVUFBVSxDQUFDLE1BQVgsR0FBb0IsQ0FBdkIsR0FBOEIsR0FBOUIsR0FBdUMsRUFBeEMsQ0FBaEIsR0FBOEQsVUFBVSxDQUFDLElBQVgsQ0FBZ0IsR0FBaEIsRUFIckU7SUFBQSxDQWxCaEI7QUFBQSxJQXdCQSxTQUFBLEVBQVcsU0FBQSxHQUFBO2FBQ1AsSUFBQyxDQUFBLElBQUksQ0FBQyxTQUFOLENBQUEsRUFETztJQUFBLENBeEJYO0FBQUEsSUE0QkEsVUFBQSxFQUFZLFNBQUEsR0FBQTthQUNSLElBQUMsQ0FBQSxJQUFJLENBQUMsV0FBTixDQUFBLEVBRFE7SUFBQSxDQTVCWjtHQVZKLENBQUE7QUFBQSIKfQ==
//# sourceURL=/Users/rpelayo/.atom/packages/grunt-runner/lib/grunt-runner.coffee