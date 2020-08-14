const express = require('express');
const router = express.Router();
//schema import
const { Hero } = require('../schema/hero');
//import logic
const search = require('../logic/heroSearch');

router.post('/', async (req, res) => {
    let { code } = req.body;
    let heroArr = [];
    code = code.substring(2);
    let length = code.length;
    try {
        const heroes = await Hero.find();
        for (let val of heroes) {
            if (val.name.length === length) {
                var response = search(code, val.name, i = 0)
                if (response) {
                    heroArr.push(val.name);
                }
            }
        }
        if (!heroes) {
            res.status(404).send("No heroes found")
        } else if (heroArr.length > 0) {
            res.status(200).send({ found: true, name: heroArr })
        } else {
            res.status(200).send({ found: false, name: "Invalid Code" })
        }
    }
    catch (err) {
        console.log(err)
    }
})

module.exports = router;