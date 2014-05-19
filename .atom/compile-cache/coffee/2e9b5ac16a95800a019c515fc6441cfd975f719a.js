
/*
Nicholas Clawson -2014

To be launched by an Atom Task, uses packages own grunt
installation to parse a projects Gruntfile
 */

(function() {
  var grunt;

  grunt = require('grunt');

  module.exports = function(path) {
    var e, error;
    try {
      require(path)(grunt);
    } catch (_error) {
      e = _error;
      error = e.code;
    }
    return {
      error: error,
      tasks: Object.keys(grunt.task._tasks)
    };
  };

}).call(this);
