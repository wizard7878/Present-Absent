const autoBind = require('auto-bind');

class Controller{
    constructor(){
        this.name = "Peyman"
        autoBind(this)
    }
}


module.exports = Controller