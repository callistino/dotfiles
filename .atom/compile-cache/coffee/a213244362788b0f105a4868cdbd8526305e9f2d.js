(function() {
  var ComposerView, fs, path, spawn;

  fs = require('fs');

  path = require('path');

  spawn = require('child_process').spawn;

  ComposerView = require('./composer-view');

  module.exports = {
    configDefaults: {
      composerExecutablePath: '/usr/local/bin/composer'
    },
    activate: function() {
      atom.workspaceView.command("composer:about", (function(_this) {
        return function() {
          return _this.about();
        };
      })(this));
      atom.workspaceView.command("composer:archive", (function(_this) {
        return function() {
          return _this.archive();
        };
      })(this));
      atom.workspaceView.command("composer:dumpautoload", (function(_this) {
        return function() {
          return _this.dumpautoload();
        };
      })(this));
      atom.workspaceView.command("composer:runscript", (function(_this) {
        return function() {
          return _this.runscript();
        };
      })(this));
      atom.workspaceView.command("composer:validate", (function(_this) {
        return function() {
          return _this.validate();
        };
      })(this));
      atom.workspaceView.command("composer:install", (function(_this) {
        return function() {
          return _this.install();
        };
      })(this));
      atom.workspaceView.command("composer:update", (function(_this) {
        return function() {
          return _this.update();
        };
      })(this));
      return atom.workspaceView.command("composer:init", (function(_this) {
        return function() {
          return _this.init();
        };
      })(this));
    },
    about: function() {
      var command;
      command = 'about';
      return this.runner(command);
    },
    archive: function() {
      var command;
      command = 'archive';
      return this.runner(command);
    },
    dumpautoload: function() {
      var command;
      command = 'dumpautoload';
      return this.runner(command);
    },
    runscript: function() {
      var command;
      command = 'run-script';
      return this.runner(command);
    },
    install: function() {
      var command;
      command = 'install';
      return this.runner(command);
    },
    update: function() {
      var command;
      command = 'update';
      return this.runner(command);
    },
    validate: function() {
      var command;
      command = 'validate';
      return this.runner(command);
    },
    init: function() {
      var command;
      command = 'init';
      return this.runner(command);
    },
    runner: function(command, options) {
      var composer, composerPanel, composerView, projectPath, tail;
      composerPanel = atom.workspaceView.find(".composer-container");
      composerView = new ComposerView;
      atom.workspaceView.find(".composer-contents").html("");
      if (!composerPanel.is(":visible")) {
        atom.workspaceView.prependToBottom(composerView);
      }
      projectPath = atom.project.getPath();
      composer = atom.config.get("composer.composerExecutablePath");
      tail = spawn(composer, [command + ' -d ' + projectPath]);
      tail.stdout.on("data", (function(_this) {
        return function(data) {
          data = _this.replacenl(data);
          return _this.writeToPanel(data);
        };
      })(this));
      tail.stderr.on("data", function(data) {
        return console.log("stderr: " + data);
      });
      return tail.on("close", (function(_this) {
        return function(code) {
          _this.writeToPanel("<br>Complete<br>");
          return console.log("child process exited with code " + code);
        };
      })(this));
    },
    writeToPanel: function(data) {
      return atom.workspaceView.find(".composer-contents").append("" + data).scrollToBottom();
    },
    replacenl: function(replaceThis) {
      var breakTag, data;
      breakTag = "<br>";
      data = (replaceThis + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1" + breakTag + "$2");
      return data;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLDZCQUFBOztBQUFBLEVBQUEsRUFBQSxHQUFLLE9BQUEsQ0FBUSxJQUFSLENBQUwsQ0FBQTs7QUFBQSxFQUNBLElBQUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQURQLENBQUE7O0FBQUEsRUFFQyxRQUFTLE9BQUEsQ0FBUSxlQUFSLEVBQVQsS0FGRCxDQUFBOztBQUFBLEVBSUEsWUFBQSxHQUFlLE9BQUEsQ0FBUSxpQkFBUixDQUpmLENBQUE7O0FBQUEsRUFNQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsSUFBQSxjQUFBLEVBQ0k7QUFBQSxNQUFBLHNCQUFBLEVBQXdCLHlCQUF4QjtLQURKO0FBQUEsSUFHQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ04sTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGdCQUEzQixFQUE2QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxLQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTdDLENBQUEsQ0FBQTtBQUFBLE1BQ0EsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixrQkFBM0IsRUFBK0MsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsT0FBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUEvQyxDQURBLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsdUJBQTNCLEVBQW9ELENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLFlBQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBcEQsQ0FGQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLG9CQUEzQixFQUFpRCxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxTQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQWpELENBSEEsQ0FBQTtBQUFBLE1BSUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFuQixDQUEyQixtQkFBM0IsRUFBZ0QsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsUUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUFoRCxDQUpBLENBQUE7QUFBQSxNQUtBLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsa0JBQTNCLEVBQStDLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQUcsS0FBQyxDQUFBLE9BQUQsQ0FBQSxFQUFIO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBL0MsQ0FMQSxDQUFBO0FBQUEsTUFNQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQW5CLENBQTJCLGlCQUEzQixFQUE4QyxDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQSxHQUFBO2lCQUFHLEtBQUMsQ0FBQSxNQUFELENBQUEsRUFBSDtRQUFBLEVBQUE7TUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTlDLENBTkEsQ0FBQTthQU9BLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBbkIsQ0FBMkIsZUFBM0IsRUFBNEMsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtpQkFBRyxLQUFDLENBQUEsSUFBRCxDQUFBLEVBQUg7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUE1QyxFQVJNO0lBQUEsQ0FIVjtBQUFBLElBYUEsS0FBQSxFQUFPLFNBQUEsR0FBQTtBQUNILFVBQUEsT0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLE9BQVYsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUZHO0lBQUEsQ0FiUDtBQUFBLElBaUJBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDTCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxTQUFWLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFGSztJQUFBLENBakJUO0FBQUEsSUFxQkEsWUFBQSxFQUFjLFNBQUEsR0FBQTtBQUNWLFVBQUEsT0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLGNBQVYsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUZVO0lBQUEsQ0FyQmQ7QUFBQSxJQXlCQSxTQUFBLEVBQVcsU0FBQSxHQUFBO0FBQ1AsVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsWUFBVixDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBRk87SUFBQSxDQXpCWDtBQUFBLElBNkJBLE9BQUEsRUFBUyxTQUFBLEdBQUE7QUFDTCxVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxTQUFWLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFGSztJQUFBLENBN0JUO0FBQUEsSUFpQ0EsTUFBQSxFQUFRLFNBQUEsR0FBQTtBQUNKLFVBQUEsT0FBQTtBQUFBLE1BQUEsT0FBQSxHQUFVLFFBQVYsQ0FBQTthQUNBLElBQUMsQ0FBQSxNQUFELENBQVEsT0FBUixFQUZJO0lBQUEsQ0FqQ1I7QUFBQSxJQXFDQSxRQUFBLEVBQVUsU0FBQSxHQUFBO0FBQ04sVUFBQSxPQUFBO0FBQUEsTUFBQSxPQUFBLEdBQVUsVUFBVixDQUFBO2FBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBUSxPQUFSLEVBRk07SUFBQSxDQXJDVjtBQUFBLElBeUNBLElBQUEsRUFBTSxTQUFBLEdBQUE7QUFDRixVQUFBLE9BQUE7QUFBQSxNQUFBLE9BQUEsR0FBVSxNQUFWLENBQUE7YUFDQSxJQUFDLENBQUEsTUFBRCxDQUFRLE9BQVIsRUFGRTtJQUFBLENBekNOO0FBQUEsSUE2Q0EsTUFBQSxFQUFRLFNBQUMsT0FBRCxFQUFVLE9BQVYsR0FBQTtBQUNKLFVBQUEsd0RBQUE7QUFBQSxNQUFBLGFBQUEsR0FBZ0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFuQixDQUF3QixxQkFBeEIsQ0FBaEIsQ0FBQTtBQUFBLE1BQ0EsWUFBQSxHQUFlLEdBQUEsQ0FBQSxZQURmLENBQUE7QUFBQSxNQUVBLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0Isb0JBQXhCLENBQTZDLENBQUMsSUFBOUMsQ0FBbUQsRUFBbkQsQ0FGQSxDQUFBO0FBR0EsTUFBQSxJQUFBLENBQUEsYUFBb0UsQ0FBQyxFQUFkLENBQWlCLFVBQWpCLENBQXZEO0FBQUEsUUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQW5CLENBQW1DLFlBQW5DLENBQUEsQ0FBQTtPQUhBO0FBQUEsTUFLQSxXQUFBLEdBQWMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFiLENBQUEsQ0FMZCxDQUFBO0FBQUEsTUFNQSxRQUFBLEdBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLGlDQUFoQixDQU5YLENBQUE7QUFBQSxNQU9BLElBQUEsR0FBTyxLQUFBLENBQU0sUUFBTixFQUFnQixDQUFDLE9BQUEsR0FBVSxNQUFWLEdBQW1CLFdBQXBCLENBQWhCLENBUFAsQ0FBQTtBQUFBLE1BU0EsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFaLENBQWUsTUFBZixFQUF1QixDQUFBLFNBQUEsS0FBQSxHQUFBO2VBQUEsU0FBQyxJQUFELEdBQUE7QUFDbkIsVUFBQSxJQUFBLEdBQU8sS0FBQyxDQUFBLFNBQUQsQ0FBVyxJQUFYLENBQVAsQ0FBQTtpQkFDQSxLQUFDLENBQUEsWUFBRCxDQUFjLElBQWQsRUFGbUI7UUFBQSxFQUFBO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUF2QixDQVRBLENBQUE7QUFBQSxNQWFBLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBWixDQUFlLE1BQWYsRUFBdUIsU0FBQyxJQUFELEdBQUE7ZUFDbkIsT0FBTyxDQUFDLEdBQVIsQ0FBWSxVQUFBLEdBQWEsSUFBekIsRUFEbUI7TUFBQSxDQUF2QixDQWJBLENBQUE7YUFnQkEsSUFBSSxDQUFDLEVBQUwsQ0FBUSxPQUFSLEVBQWlCLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFDLElBQUQsR0FBQTtBQUNiLFVBQUEsS0FBQyxDQUFBLFlBQUQsQ0FBYyxrQkFBZCxDQUFBLENBQUE7aUJBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxpQ0FBQSxHQUFvQyxJQUFoRCxFQUZhO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBakIsRUFqQkk7SUFBQSxDQTdDUjtBQUFBLElBa0VBLFlBQUEsRUFBYyxTQUFDLElBQUQsR0FBQTthQUNWLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBbkIsQ0FBd0Isb0JBQXhCLENBQTZDLENBQUMsTUFBOUMsQ0FBcUQsRUFBQSxHQUFFLElBQXZELENBQStELENBQUMsY0FBaEUsQ0FBQSxFQURVO0lBQUEsQ0FsRWQ7QUFBQSxJQXFFQSxTQUFBLEVBQVcsU0FBQyxXQUFELEdBQUE7QUFDUCxVQUFBLGNBQUE7QUFBQSxNQUFBLFFBQUEsR0FBVyxNQUFYLENBQUE7QUFBQSxNQUNBLElBQUEsR0FBTyxDQUFDLFdBQUEsR0FBYyxFQUFmLENBQWtCLENBQUMsT0FBbkIsQ0FBMkIsK0JBQTNCLEVBQTRELElBQUEsR0FBTyxRQUFQLEdBQWtCLElBQTlFLENBRFAsQ0FBQTtBQUVBLGFBQU8sSUFBUCxDQUhPO0lBQUEsQ0FyRVg7R0FQSixDQUFBO0FBQUEiCn0=
//# sourceURL=/Users/rpelayo/.atom/packages/composer/lib/composer.coffee