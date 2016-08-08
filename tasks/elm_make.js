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
    var done, tasks;
    
    done = this.async();
    
    // Iterate over all specified file groups.
    tasks = this.files.map(function(f) {
      var options = {
        cmd: 'elm-make',
        opts: {
          stdio: 'inherit'
        }
      };
      
      options.args = f.src.filter(validate);
      options.args.push(`--output=${f.dest}`);
      
      return () => grunt.util.spawn(options, next);
    });
    
    tasks.push((err) => done(err));
    
    next();
    
    function next(err) {
      if (err) {
        tasks.pop()(false);
      } else {
        tasks.shift()();
      }
    }
    
    function validate(filepath) {
      // Warn on and remove invalid source files (if nonull was set).
      if (!grunt.file.exists(filepath)) {
        grunt.log.warn(`Source file "${filepath}" not found.`);
        return false;
      } else {
        return true;
      }
    }
  });

};
