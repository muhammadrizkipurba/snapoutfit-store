const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Import Model
const { Site } = require("../models/Site")
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");

// GET SITE INFO
router.get('/site_info', (req,res) => {
    Site.find({}, (err,site) => {
        if (err) return res.status(400).send(err);
        res.status(200).send(site[0].siteInfo)
    })
})


// UPDATE SITE INFO
router.post('/site_info', auth, admin, (req, res) => {

    Site.findOneAndUpdate(
        { name: "site_info" },
        { $set: { siteInfo: req.body } },
        { new: true },
        (err, doc) => {
            if (err) return res.status(400).json({success: false, err});
            return res.status(200).json({
                success: true,
                siteInfo: doc.siteInfo
            })
        }
    );
})

module.exports = router;