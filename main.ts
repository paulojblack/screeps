import Kernel from "os/Kernel"
import { ErrorMapper } from "utils/ErrorMapper";
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

if (!Memory.twoodos) {
    Memory.twoodos = {};
}

export const loop = ErrorMapper.wrapLoop(() => {
    console.log(`Current game tick is ${Game.time}`);

    const kernel = new Kernel();

    if (!Memory.twoodos) {
        Memory.twoodos = {};
    }

    kernel.init();
    kernel.run();
    console.log('kernel end', JSON.stringify(Memory.twoodos.scheduler))
    // Automatically delete memory of missing creeps
    // for (const name in Memory.creeps) {
    //     if (!(name in Game.creeps)) {
    //         delete Memory.creeps[name];
    //     }
    // }
});
