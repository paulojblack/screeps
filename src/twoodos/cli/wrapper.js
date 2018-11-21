module.exports = function(str) {
    let arr = s.trim().split(" ");
    let procName = arr[0];
    let argv = arr.splice(1);
    let proc = require(`twoodos.cli.${procname}`);
    if (proc)
        proc(argv);
}
