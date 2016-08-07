/*
 * grunt-elm-make
 * https://github.com/benthepoet/grunt-elm-make
 *
 * Copyright (c) 2016 Ben Hanna
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('elm_make', 'A plugin for compiling Elm files.', function() {
    var done = this.async();
    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var options = {
        cmd: 'elm-make',
        opts: {
          stdio: 'inherit'
        }
      };
      // Concat specified files.
      options.args = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      
      options.args.push(`--output=${f.dest}`);
      
      grunt.util.spawn(options, function (err) {
        done(!err);
      });
    });
  });

};
