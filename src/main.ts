// Globals
import "_console/globals";
import "_prototypes/prototype_Room";

// Configuration, logging and profiling
import { log } from "_lib/logger/log";
import { USE_PROFILER } from "_settings/config";
import { ErrorMapper } from "_utils/ErrorMapper";
import RoyalChild from "Queen";
import profiler from "screeps-profiler";

if (USE_PROFILER) { profiler.enable(); }

// Refreshed every tick
global.log = log;

function main(): void {
  global.Queen = new RoyalChild();

  global.Queen.awaken();
  global.Queen.ponder();
  global.Queen.demand();
  global.Queen.journal();
  global.Queen.sleep();

}
// Main loop
export const loop = ErrorMapper.wrapLoop(() => {
  main();
});
