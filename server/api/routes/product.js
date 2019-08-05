const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");


// @action  GET Products and POST Filter Request
// @access  Public
// @route   /product/shop
router.post('/shop', (req,res) => {

    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    for(let key in req.body.filters){
        if(req.body.filters[key].length > 0) {
            if(key === 'price') {
                findArgs[key] = {
                    // GREATER THAN
                    $gte: req.body.filters[key][0], 
                    // LOWER THAN
                    $lte: req.body.filters[key][1] 
                }
            } else {
                findArgs[key] = req.body.filters[key]
            }
        }
    }

    findArgs['publish'] = true;

    Product.find(findArgs)
      .populate("brand")
      .populate("color")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, articles) => {
        if (err) return res.status(400).send(err);

        res.status(200).json({
          size: articles.length,
          articles
        });
      });

    
})

// @action  ADD Product
// @access  Private Admin Auth
router.post("/", auth, admin, (req, res) => {
    const product = new Product(req.body);
  
    product.save((err, doc) => {
      if (err) return res.json({ success: false, err });
      res.status(200).json({
        success: true,
        product: doc
      });
    });
  });

// @action  GET Product by ID
// @access  Public
// @route   {{url}}/product/product_id?id=8ASDNW123,as123aSADAD&type=array
router.get('/product_id', (req, res) => {
    let type = req.query.type;
    let items = req.query.id; 

    if(type === "array"){
        let array_id = req.query.id.split(',');
        items = [];
        items = array_id.map(item => {
            return mongoose.Types.ObjectId(item)
        });
    };

    Product
        .find({ '_id': {$in:items}})
        .populate('brand')  
        .populate('color')
        .exec((err, docs) => {
            res.status(200).send(docs)
        });
});

// @action  SORT Product by DATE ( New Arrival / order = descending ) & SOLD ( Best Selling )
// @access  Public
// @route-by-date   {{url}}/product/sort_product?sortBy=createdAt&order=desc&limit=5
// @route-by-sold   {{url}}/product/sort_product?sortBy=sold&order=desc&limit=5
router.get('/sort_product', (req,res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let limit = req.query.limit ? parseInt(req.query.limit) : 10;

    Product.find()
        .populate("brand")
        .populate("color")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, docs) => {
            if (err) return res.status(400).send(err);
            res.send(docs);
        });
})


module.exports = router;