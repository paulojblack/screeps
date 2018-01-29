module.exports = function(grunt) {

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
                email: creds.liveemail,
                password: creds.livepw,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },
        staging: {

            options: {
                hostname: creds.julianserver,
                port: creds.port,
                'use-https': false,
                username: creds.julianuser,
                password: creds.julianpw,
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
                    rename: function (dest, src) {
                        // Change the path name utilize dots for folders
                        return dest + src.replace(/\//g,'.');
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
            'dist': ['dist']
        }

    });
    // grunt.registerTask('default', ['clean','copy', 'prod', /*'screeps:production', 'screeps:staging'*/]);
}
