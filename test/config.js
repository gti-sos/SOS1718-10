exports.config = {
    seleniumAddress: 'http://localhost:8910', 
    specs: ['T01-loadData.js', 'T02-addBuilder.js'], 
    capabilities: { 
        //Con esto le decimos el navegador que usaremos para ejecutar las pruebas
        'browserName' : 'phantomjs'
    }
}