module.exports = function (grunt) {
  // jshint indent:false
  "use strict";
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var pkg = grunt.file.readJSON('package.json');

  grunt.initConfig({
    pkg: pkg,

    // JS linter config
    jshint: {
      options: pkg.jshintConfig,
      all: [
        '!Gruntfile.js',
        'app/assets/scripts/**/*.js',
        'test/spec/**/*.js',
        '!app/assets/scripts/lib/**/*'
      ]
    },

    // Less config
    less: {

      dev: {
        expand: true,
        cwd: 'app/assets/stylesheets/',
        src: 'style.less',
        ext: '.css',
        dest: 'app/assets/stylesheets/'
      },
      release: {
        expand: true,
        cwd: 'app/assets/stylesheets/',
        src: 'style.less',
        ext: '.css',
        dest: 'app/assets/stylesheets/',
        options: {
          compress: true
        }

      }
    },

    // watch config
    watch: {
      less: {
        files: ['app/assets/stylesheets/*.less'],
        tasks: ['less:dev']
      }
    },

    // server config
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      },
      test: {
        options: {
          port: 9002,
          script: 'server.js',
          // jshint camelcase:false
          node_env: 'test'
        }
      },
      prod: {
        options: {
          script: 'server.js',
          // jshint camelcase:false
          node_env: 'production'
        }
      }
    },

    // mocha (test) config
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:9002/test'],
          bail: false,
          reporter: 'Spec',
          log: true
        }
      }
    },

    // clean config
    clean: {
      build: [
        'dist',
      ]
    },

    // copy config
    copy: {
      build: {
        files: [
          {
          expand: true,
          dot: true,
          cwd: 'app',
          src: [
            '**/*.{png,gif,jpg,jpeg,svg,ico}',
            '**/*.css',
            '**/*.txt',
            '**/*.js',
            '**/*.ejs',
            '**/*.{woff2,woff,ttf,otf}'
          ],
          dest: 'dist/app'
        },
        {
          src: ['server.js',
            'newrelic.js',
            'package.json',
            'lib/**'],
            dest: 'dist/'
        }
        ]
      },
      less: {
        files: [
          {
          expand: true,
          cwd: 'app/assets/stylesheets',
          src: [
            '**/*.css'
          ],
          dest: 'dist/app/assets/stylesheets'
        }
        ]
      }
    },

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        sourceMapIncludeSources : true,
        sourceMap : true
      }
    },
    useminPrepare: {
      html: 'dist/app/index.html',
      css: 'dist/app/assets/stylesheets/*.css',
      images: 'dist/app/assets/images/*.{jpg,jpeg,gif,png}',
      options: {
        flow: {
          html: {
            steps: {'js': ['uglifyjs']},
            post: {}
          }
        },
        root: 'app',
        dest: 'dist/app'
      }
    },
    usemin: {
      html: ['dist/app/*.ejs'],
      css: ['dist/app/assets/stylesheets/*.css'],
      js: ['dist/app/assets/scripts/*.js'],
        options: {
          assetsDirs: ['dist/app', 'dist/app/assets/scripts'],
          patterns: {
            js: [
              [/['"(](\/assets\/images\/[^')"]+)/gm, 'Replacing images in js'],
              [/(main\.map)/gm, 'Replacing map files in js']
            ]
          }
        }
    },
    filerev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 20
      },
      assets: {
        files: [
          {
          src: [
            'dist/app/components/**/*.{jpg,jpeg,gif,png,js,css}',
            'dist/app/assets/scripts/*.js',
            'dist/app/assets/scripts/*.map',
            'dist/app/assets/stylesheets/*.css'
          ]
        }
        ]
      }
    }
  });

  grunt.registerTask('build', 'Build app for release', [
    'clean',
    'less:release',
    'copy:build',
    'copy:less'
  ]);

  grunt.registerTask('release', 'Creates a zip with an app build', [
    'build',
    'useminPrepare',
    'uglify',
    'filerev:assets',
    'usemin'
  ]);

  grunt.registerTask('test', 'Launch tests in shell with PhantomJS', [
    'jshint',
    'clean',
    'less:dev',
    'express:test',
    'mocha'
  ]);

  grunt.registerTask('server', 'Launch local server', function (target) {
    if (target === 'test') {
      grunt.task.run([
        //'jshint',
        'clean:server',
        'less:dev',
        'express:test:keepalive'
      ]);
    }
    else {
      grunt.task.run([
        //'jshint',
        'less:dev',
        'express:dev',
        'watch'
      ]);
    }
  });

  grunt.registerTask('log', 'Outputs FF OS device\'s log', ['ffoslog']);
  grunt.registerTask('reset', 'Resets B2G', ['ffosreset']);
  grunt.registerTask('push', 'Installs the app in the device', function () {
    grunt.task.run([
      'release',
      'ffospush:app'
    ]);
  });

  grunt.registerTask('default', 'Default task', [
    'jshint'
  ]);
};

