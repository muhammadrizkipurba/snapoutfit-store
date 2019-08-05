const express = require("express");
const router = express.Router();

const { Color } = require("../models/Color"); 
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

// @action  ADD COLOR
// @access  Private Admin Auth
router.post('/', auth, admin, (req,res) => {
    const color = new Color(req.body)

    color.save((err, doc) => {
        if(err) return res.status(400).json({ success: false });
        return res.status(200).json({
            success: true,
            color: doc
        })
    })
})

// @action  SEE ALL COLOR
// @access  Public
router.get("/", (req, res) => {
    Color.find({}, (err, colors) => {
       if(err) return res.status(400).send(err)
       res.status(200).send(colors)
    })
 })

module.exports = router