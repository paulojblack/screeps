module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps-customserver');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    const creds = grunt.file.readJSON('credentials.json');

    grunt.initConfig({
        screeps: {
            options: {
                hostname: creds.hostname,
                port: creds.port,
                'use-https': false,
                username: creds.user,
                password: creds.password,
                branch: 'default',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
            }
        },

        copy: {
            screeps: {
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
                tasks: ['clean', 'copy', 'screeps']
            },
        },

        clean: {
            'dist': ['dist']
        }

    });
    grunt.registerTask('default', ['clean','copy','screeps']);
}
