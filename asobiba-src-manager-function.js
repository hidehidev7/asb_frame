/**
 * @return { AsobibaSrcHandler } asobibaSrcHandler
 * @param { import("express").Application } app
 */
module.exports = function (app) {

    const srcFunction = function () {
        return "http://192.168.1.101:3002";
    }

    return new AsobibaSrcHandler(srcFunction);
}

class AsobibaSrcHandler {

    #src;
    #srcFunction;

    /**
     * @param { string | function } src
     */
    constructor(src) {
        if (typeof src === "function") {
            this.#srcFunction = () => src();
        } else {
            this.#srcFunction = () => src;
        }
    }

    get src() {
        return this.#srcFunction();
    }
}