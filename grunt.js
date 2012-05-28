/*global module:false*/
module.exports = function(grunt) {

  'use strict';

  grunt.initConfig({
    meta: {
      version: '0.1.0',
      banner: '/*!\n' +
        '*              __     _\n' +
        '*   _    _/__  /./|,//_`\n' +
        '*  /_//_// /_|///  //_, v.<%= meta.version %>\n' +
        '*\n' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> outaTiME, Inc.\n' +
        '*/'
    },
    files: [
      'js/jquery-1.7.2.min.js',
      'js/bootstrap/bootstrap.js',
      'js/flexie.js',
      'js/outatime.js'
    ],
    lint: {
      files: ['grunt.js', 'js/outatime.js']
    },
    concat: {
      dist: {
        src: ['<config:files>'],
        dest: 'dist/js/outatime.js'
      }
    },
    min: {
      dist: {
        src: ['<banner:meta.banner>', '<config:concat.dist.dest>'],
        dest: 'dist/js/outatime.min.js'
      }
    },
    recess: {
      dist: {
        src: ['less/outatime.less'],
        dest: 'dist/css/outatime.css',
        options: {
          compress: true
        }
      }
    },
    jade: {
      dist: {
        src: ['jade/index.jade', 'jade/sandbox.jade'],
        dest: '.',
        options: {
          data: {
            debug: true
          }
        }
      }
    },
    watch: {
      files: ['<config:files>', '<config:recess.dist.src>', '<config:jade.dist.src>'],
      tasks: 'default'
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true
      },
      globals: {
        '$': true,
        'Modernizr': true
      }
    },
    uglify: {},
    growl: {
      build: {
        message: 'Build done!' /*,
        title: "Notification Title",
        image: __dirname + "/foo.png" */
      }
    }
  });

  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib');
  grunt.loadNpmTasks('grunt-growl');

  grunt.registerTask('default', 'lint recess jade concat min growl:build');
  // grunt.registerTask('prod', 'lint recess jade min growl:build');

};
