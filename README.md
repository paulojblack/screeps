# My screepy scripts

Typescript Boilerplate from screepers/screeps-typescript-starter.

## The Plot

The Queen's Desires must be met. Each tick begins by The Queen reflecting upon the state of Her Realm and creating a manifest of Edicts issued to each of her Provinces (a single occupied Room and the surrounding Rooms to be administered by the Official of the occupied Room). The Officials of those Provinces, eager to please, delegate responsibilities to the various Guilds in each Province, such as the Wealth Guild (responsible for sating the Queen's desire for resources), Labor Guild (tasked with providing able bodies to the Realm), the War Guild (charged with defending the Realm and expanding its borders to the horizon), and others.


### Grunt

grunt-screeps doesn't work for pushing to a local/private server, so someone made a module called grunt-screeps-customserver. I glanced at it and it looks like the differences are not significant but both modules named their Grunt task "screeps". If you want to push to both at the same time, just register both Grunt tasks and use the `grunt.task.renameTask` method to split them up.

Maybe I can just fork the module and rename one of the tasks, probably a better solution.
