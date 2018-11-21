module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-screeps');
    grunt.task.renameTask('screeps', 'prod');
    grunt.loadNpmTasks('grunt-screeps-customserver');
    grunt.task.renameTask('screeps', 'staging');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    const creds = grunt.file.readJSON('credentials.json');

    grunt.initConfig({
        prod: {
            options: {
                email: creds.email,
                password: creds.password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        staging: {

            options: {
                hostname: creds.hostname,
                port: creds.port,
                'use-https': false,
                username: creds.localusername,
                password: creds.localpassword,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        copy: {
            prod: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename(dest, src) {
                        // Change the path name utilize dots for folders
                        return dest + src.replace(/\//g, '.');
                    }
                }]
            },
            staging: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: '**',
                    dest: 'dist/',
                    filter: 'isFile',
                    rename(dest, src) {
                        // Change the path name utilize dots for folders
                        return dest + src.replace(/\//g, '.');
                    }
                }]
            },
        },

        watch: {
            scripts: {
                files: ['src/**/*.js'],
                tasks: ['clean', 'copy', 'prod', 'staging']
            },
        },

        clean: {
            dist: ['dist']
        }

    });
    grunt.registerTask('default', ['clean', 'copy', 'prod', 'staging'/* 'screeps:production', 'screeps:staging'*/]);
};
