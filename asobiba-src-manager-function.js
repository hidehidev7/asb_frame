/**
 * @return { AsobibaSrcHandler } asobibaSrcHandler
 * @param { import("express").Application } app 
 */
module.exports = function(app) {
    return new AsobibaSrcHandler("http://192.168.1.101:3002");
}

class AsobibaSrcHandler {

    #src;

    /**
     * 
     * @param { string } src 
     */
    constructor(src) {
        this.#src = src;
    }

    get src() {
        return this.#src;
    }
}