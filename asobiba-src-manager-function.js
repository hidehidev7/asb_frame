const express = require("express");

/**
 * @return { { asobibaSrcHandler: AsobibaSrcHandler, asobibaSrcRouter: express.Router } }
 */
module.exports = function () {

    let src = "http://192.168.1.101:3002";

    const router = express.Router();

    router.post("/asobibaURL/", (req, res) => {
        console.log(req.body);
        src = req.body.urlString;
        res.json(req.body);
    });

    const srcFunction = function () { return src }

    return { asobibaSrcHandler: new AsobibaSrcHandler(srcFunction), asobibaSrcRouter: router };
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