const electron = require('electron');
electron.desktopCapturer.getSources({types: ['screen']}).then(async function (sources) {
    let using = null;
    for (let source of sources) {
        console.log(source);
        using = source;
    }

    
});