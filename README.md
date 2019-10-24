# My screepy scripts

## Setup
in progress

1) `npm i -g grunt` necessary?
2) `npm install`
3) Create `credentials.json` and fill in


## Overview
1) `main` instantiates kernal
2) Kernel


## Usage

1) Select your starting room

## Technical notes

### Grunt

grunt-screeps doesn't work for pushing to a local/private server, so someone made a module called grunt-screeps-customserver. I glanced at it and it looks like the differences are not significant but both modules named their Grunt task "screeps". If you want to push to both at the same time, just register both Grunt tasks and use the `grunt.task.renameTask` method to split them up.

Maybe I can just fork the module and rename one of the tasks, probably a better solution.

### pushing to local server
Install [screeps server] and follow directions for CLI but dont start server.
Install [screepsmod-auth] and deal with whatever fucking insanity that library throws at you today
Open the screeps cli with `npx screeps cli`
Use the `setPassword` function described in `screepsmod-auth` docs
Add the appropriate creds in `credentials.json`
