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
            all: ['app/js/recipe.js', 'app/js/recipe.clean.js'] //'Apps/LifeAlly/js/update-<%= pkg.version %>.min.js'
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
            css:{
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
    grunt.loadNpmTasks('grunt-htmlrefs');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Default task(s).
    grunt.registerTask('dev', ['jshint', 'concat', 'uglify', 'cssmin', 'copy', 'htmlrefs', 'htmlmin']);

    // Default task.
    //grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'cssmin', 'copy', 'usemin']);
};
