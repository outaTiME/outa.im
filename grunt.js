/*global module:false*/
module.exports = function (grunt) {

  grunt.initConfig({
    pkg: '<json:package.json>',
    meta: {
      banner: '/*!\n' +
        '*              __     _\n' +
        '*   _    _/__  /./|,//_`\n' +
        '*  /_//_// /_|///  //_, v.<%= pkg.version %>\n' +
        '*\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> outaTiME, Inc.\n' +
        '*/'
    },
    files: [
      'js/jquery-1.7.2.min.js',
      'js/bootstrap/bootstrap.min.js',
      'js/flexie.min.js',
      'js/outatime.js'
    ],
    lint: {
      files: ['grunt.js', 'app.js', 'js/outatime.js']
    },
    concat: {
      dist: {
        src: ['<config:files>'],
        dest: 'public/js/outatime.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:files>'],
        dest: 'public/js/outatime.min.js'
      }
    },
    recess: {
      dist: {
        src: ['less/outatime.less'],
        dest: 'public/css/outatime.css',
        options: {
          compile: true,
          compress: true
        }
      }
    },
    jade: {
      dev: {
        src: ['jade/index.jade', 'jade/sandbox.jade'],
        dest: 'public',
        options: {
          pretty: true,
          data: {
            debug: true
          }
        }
      },
      dist: {
        src: ['<config:jade.dev.src>'],
        dest: 'public',
        options: {
          data: {
            debug: false
          }
        }
      }
    },
    replace: {
      dist: {
        src: ['build/manifest.appcache', 'build/humans.txt'],
        dest: 'public',
        variables: {
          // version: '<%= pkg.version %>',
          timestamp: '<%= grunt.template.today() %>'
        }
      }
    },
    watch: {
      recess: {
        files: ['<config:recess.dist.src>'],
        tasks: 'recess growl:rebuild'
      },
      jade: {
        files: ['jade/layout.jade', '<config:jade.dev.src>'],
        tasks: 'jade:dev growl:rebuild'
      },
      js: {
        files: ['<config:files>'],
        tasks: 'lint concat growl:rebuild'
      }
    },
    jshint: {
      options: {

        // Settings
        "passfail"      : false,  // Stop on first error.
        "maxerr"        : 100,    // Maximum errors before stopping.
        "indent"        : 2,

        // Predefined globals whom JSHint will ignore.
        "browser"       : true,   // Standard browser globals e.g. `window`, `document`.

        "node"          : true,
        "rhino"         : false,
        "couch"         : false,
        "wsh"           : true,   // Windows Scripting Host.

        "jquery"        : true,
        "prototypejs"   : false,
        "mootools"      : false,
        "dojo"          : false,

        // Development.
        "debug"         : false,  // Allow debugger statements e.g. browser breakpoints.
        "devel"         : true,   // Allow development statements e.g. `console.log();`.

        // EcmaScript 5.
        "es5"           : true,   // Allow EcmaScript 5 syntax.
        "strict"        : false,  // Require `use strict` pragma in every file.
        "globalstrict"  : false,  // Allow global "use strict" (also enables 'strict').

        // The Good Parts.
        "asi"           : false,  // Tolerate Automatic Semicolon Insertion (no semicolons).
        "laxbreak"      : true,   // Tolerate unsafe line breaks e.g. `return [\n] x` without semicolons.
        "bitwise"       : true,   // Prohibit bitwise operators (&, |, ^, etc.).
        "boss"          : false,  // Tolerate assignments inside if, for & while. Usually conditions & loops are for comparison, not assignments.
        "curly"         : true,   // Require {} for every new block or scope.
        "eqeqeq"        : true,   // Require triple equals i.e. `===`.
        "eqnull"        : false,  // Tolerate use of `== null`.
        "evil"          : false,  // Tolerate use of `eval`.
        "expr"          : false,  // Tolerate `ExpressionStatement` as Programs.
        "forin"         : false,  // Tolerate `for in` loops without `hasOwnPrototype`.
        "immed"         : true,   // Require immediate invocations to be wrapped in parens e.g. `( function(){}() );`
        "latedef"       : true,   // Prohibit variable use before definition.
        "loopfunc"      : false,  // Allow functions to be defined within loops.
        "noarg"         : true,   // Prohibit use of `arguments.caller` and `arguments.callee`.
        "regexp"        : true,   // Prohibit `.` and `[^...]` in regular expressions.
        "regexdash"     : false,  // Tolerate unescaped last dash i.e. `[-...]`.
        "scripturl"     : true,   // Tolerate script-targeted URLs.
        "shadow"        : false,  // Allows re-define variables later in code e.g. `var x=1; x=2;`.
        "supernew"      : false,  // Tolerate `new function () { ... };` and `new Object;`.
        "undef"         : true,   // Require all non-global variables be declared before they are used.

        // Persone styling prefrences.
        "newcap"        : true,   // Require capitalization of all constructor functions e.g. `new F()`.
        "noempty"       : true,   // Prohibit use of empty blocks.
        "nonew"         : true,   // Prohibit use of constructors for side-effects.
        "nomen"         : true,   // Prohibit use of initial or trailing underbars in names.
        "onevar"        : false,  // Allow only one `var` statement per function.
        "plusplus"      : false,  // Prohibit use of `++` & `--`.
        "sub"           : false,  // Tolerate all forms of subscript notation besides dot notation e.g. `dict['key']` instead of `dict.key`.
        "trailing"      : true,   // Prohibit trailing whitespaces.
        "white"         : true    // Check against strict whitespace and indentation rules.

      },
      globals: {
        'Modernizr': true
      }
    },
    replacer: {},
    uglify: {},
    growl: {
      dev: {
        message: 'Development build done!',
        title: 'outaTiME',
        image: 'public/apple-touch-icon.png'
      },
      dist: {
        message: 'Distribution build done!',
        title: 'outaTiME',
        image: 'public/apple-touch-icon.png'
      },
      rebuild: {
        message: 'Rebuild done!',
        title: 'outaTiME',
        image: 'public/apple-touch-icon.png'
      }
    }
  });

  grunt.loadNpmTasks('grunt-recess');
  // grunt.loadNpmTasks('grunt-less');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('default', 'recess jade:dev lint concat growl:dev');
  grunt.registerTask('dist', 'recess jade:dist lint min replace growl:dist');

  // Replace inline patterns over the file list to make the world a better place.
  grunt.registerMultiTask('replace', 'Replace inline patterns over the file list specified.', function () {

    var
      path = require('path'),
      files = grunt.file.expandFiles(this.file.src),
      target = this.target,
      config = grunt.config(['replace', this.target]),
      dest = config.dest || '.',
      variables = config.variables,
      prefix = config.prefix,
      locals = {},
      processed = 0;

    if (typeof variables === 'object') {
      grunt.verbose.writeln('Using "' + target + '" replace variables options.');
    } else {
      grunt.verbose.writeln('Using master replacer variables options.');
      variables = grunt.config('replacer.variables') || {};
    }

    grunt.verbose.writeflags(variables, 'variables');

    if (typeof prefix === 'string') {
      grunt.verbose.writeln('Using "' + target + '" replace prefix options.');
    } else {
      grunt.verbose.writeln('Using master replacer prefix options.');
      prefix = grunt.config('replacer.prefix') || '@@';
    }

    grunt.verbose.writeflags(prefix, 'prefix');

    Object.keys(variables).forEach(function (variable) {
      locals[variable] = grunt.template.process(variables[variable]);
    });

    files.forEach(function (filepath, index) {
      var filename = path.basename(filepath), dest_filepath = path.join(dest, filename);
      grunt.file.copy(filepath, dest_filepath, {
        process: function (contents) {
          var updated = false;
          Object.keys(locals).forEach(function (local) {
            var re = new RegExp(prefix + local, "g"), value = locals[local];
            updated = updated || contents.match(re);
            contents = contents.replace(re, value);
          });
          if (updated) {
            grunt.log.writeln('Replace "' + filepath + '" > "' + dest_filepath + '"');
            processed++;
          } else {
            return false;
          }
          return contents;
        }
      });

    });

    if (processed === 0) {
      grunt.log.writeln('No documents updated.');
    }

  });


};
