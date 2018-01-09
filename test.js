var x = function() {
    console.log('Start x')
    y();
    console.log('Inside x after y')
    return 'End'
}

var y = function() {
    console.log('start y')
    for (let i =0; i < 10; i++) {
        console.log('i')
        if (i === 4) {
            // return
        }
    }
    console.log('end y')
    return

}

x();
