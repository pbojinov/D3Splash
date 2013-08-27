/**
 * Author: Petar
 * Date: 8/23/13
 */
'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                curly: true,
                debug: true,
                unused: true,
                forin: true,
                eqnull: true,
                eqeqeq: true,
                browser: true,
                globals: {
                    devel: true,
                    jquery: true
                }
            },
            all: ['app/js/tools.js', 'dist/js/d3splash-v<%= pkg.version %>.js']
        },
        concat: {
            js: {
                src: ['app/js/jquery.js', 'app/js/bootstrap.min.js', 'app/js/magnific-popup.js', 'app/js/tools.js'],
                dest: 'dist/js/d3splash-v<%= pkg.version %>.js',
                options: {
                    separator: ';'
                }
            },
            css: {
                src: ['app/css/bootstrap.min.css', 'app/css/navbar-fixed-top.css', 'app/css/magnific-popup.css', 'app/css/animate-custom.css'],
                dest: 'dist/css/d3splash-v<%= pkg.version %>.css',
                options: {
                    separator: ' '
                }
            }
        },
        uglify: {
            options: {
                mangle: false,
                preserveComments: false,
                beautify: false,
                compress: false
            },
            my_target: {
                files: {
                    'dist/js/d3splash-v<%= pkg.version %>.min.js': 'dist/js/d3splash-v<%= pkg.version %>.js' //destination:source
                }
            }
        },
        cssmin: {
            css: {
                src: 'dist/css/d3splash-v<%= pkg.version %>.css',
                dest: 'dist/css/d3splash-v<%= pkg.version %>.min.css'
            }
        },
        copy: {
            main: {
                src: ['app/*.html', 'app/favicon.ico'],
                dest: 'dist/',
                flatten: true,
                expand: true,
                filter: 'isFile'
            }
        },
        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [
                    {
                        expand: true,        // Enable dynamic expansion.
                        cwd: 'app/img',     // Src matches are relative to this path.
                        src: '{,*/}*.{png,jpg,jpeg}',     // Actual pattern(s) to match.
                        dest: 'dist/img'  // Destination path prefix.

                    }
                ]
            }
        },
        htmlrefs: {
            dist: {
                src: 'dist/*.html',
                dest: 'dist/',
                /** any other parameter included on the options will be passed for template evaluation */
                options: {
                    buildNumber: 'd3splash-v<%= pkg.version %>'
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    //destination:source
                    'dist/index.html': 'dist/index.html',
                    'dist/privacy.html': 'dist/privacy.html',
                    'dist/releases.html': 'dist/releases.html'
                }
            }
        }
    });

    // Load Modules
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-htmlrefs');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'cssmin', 'copy', 'imagemin', 'htmlrefs', 'htmlmin', 'jshint']);
    grunt.registerTask('img', ['imagemin']);

};
