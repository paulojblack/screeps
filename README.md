# My screepy scripts


## Technical notes

### Grunt

grunt-screeps doesn't work for pushing to a local/private server, so someone made a module called grunt-screeps-customserver. I glanced at it and it looks like the differences are not significant but both modules named their Grunt task "screeps". If you want to push to both at the same time, just register both Grunt tasks and use the `grunt.task.renameTask` method to split them up.

Maybe I can just fork the module and rename one of the tasks, probably a better solution.
