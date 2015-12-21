module.exports = function(grunt) {

    var appConfig = grunt.file.readJSON('package.json');

    // Load grunt tasks automatically
    // see: https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    // see: https://npmjs.org/package/time-grunt
    require('time-grunt')(grunt);

    var pathsConfig = function(appName) {
        this.app = appName || appConfig.name;

        return {
            app: this.app,
            templates: this.app + '/templates',
            css: this.app + '/assets/public/css',
            sass: this.app + '/assets/sass',
            fonts: this.app + '/assets/public/fonts',
            images: this.app + '/assets/public/img',
            js: this.app + '/assets/js',
            jsCompiled: this.app + '/assets/public/js'
        };
    };

    grunt.initConfig({

        paths: pathsConfig(),
        pkg: appConfig,

        // see: https://github.com/gruntjs/grunt-contrib-watch
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= paths.sass %>/**/*.{scss,sass}'],
                tasks: ['sass:dev'],
                options: {
                    atBegin: true
                }
            },
            uglify: {
                files: ['<%= paths.js %>/**/*.js'],
                tasks: ['uglify:dev'],
                options: {
                    atBegin: true
                }
            },
            livereload: {
                files: [
                    '<%= paths.js %>/**/*.js',
                    '<%= paths.sass %>/**/*.{scss,sass}',
                    '<%= paths.app %>/**/*.html'
                ],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        },

        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    sourceMapName: '<%= paths.jsCompiled %>/project.js.map'
                },
                files: {
                    '<%= paths.jsCompiled %>/project.js': ['<%= paths.js %>/project.js']
                }
            }
        },

        // see: https://github.com/sindresorhus/grunt-sass
        sass: {
            dev: {
                options: {
                    outputStyle: 'nested',
                    sourceMap: true,
                    precision: 10
                },
                files: {
                    '<%= paths.css %>/project.css': '<%= paths.sass %>/project.scss'
                }
            },
            dist: {
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 10
                },
                files: {
                    '<%= paths.css %>/project.css': '<%= paths.sass %>/project.scss'
                }
            }
        },

        //see https://github.com/nDmitry/grunt-postcss
        postcss: {
            options: {
                map: true, // inline sourcemaps

                processors: [
                    require('autoprefixer-core')({
                        browsers: [
                            'Android 2.3',
                            'Android >= 4',
                            'Chrome >= 20',
                            'Firefox >= 24',
                            'Explorer >= 10',
                            'iOS >= 6',
                            'Opera >= 12',
                            'Safari >= 6'
                        ]
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: '<%= paths.css %>/*.css'
            }
        }
    });

    grunt.registerTask('serve', [
        // 'bgShell:runDjango',
        'watch'
    ]);

    grunt.registerTask('build', [
        'sass:dist',
        'postcss'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);

};
