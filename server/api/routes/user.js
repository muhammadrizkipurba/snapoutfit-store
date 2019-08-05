const express = require("express");
const router = express.Router();
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");
const async = require('async');

const { User } = require("../models/User");
const { Product } = require("../models/Product");
const { auth } = require("../middleware/auth");
const { admin } = require("../middleware/admin");
const { PaypalPayment } = require("../models/Payment");

const { sendEmail } = require("../../email/nodemailer");

// REGISTER
router.post('/register', (req,res) => {
    const user = new User(req.body)

   user.save((err, doc) => {
        if(err) return res.json({success: false, err});
        sendEmail(doc.email, doc.name, doc.lastname, null, "welcome");
        return res.status(200).json({
            success: true
        })
   })
})

// LOGIN
router.post('/login', (req,res) => {
    // find email
    User.findOne({ email: req.body.email }, (err, user) => {
        if(!user) return res.json({loginSuccess: false, message: "Email not found"});

        user.comparePassword(req.body.password, (err, isMatch) => { 
            if(!isMatch) return res.json({loginSuccess: false, message: "Wrong Password"});
        
            user.generateToken( (err, user) => {
                if(err) return res.status(400).json({loginSuccess: false});

                res.cookie('auth_cookie', user.token).status(200).json({
                    loginSuccess: true
                })
            })
        })
    }).catch(err => res.status(409).json({loginSuccess: false}))
})

// GET CURRENT USER PROFILE
router.get('/auth', auth, (req,res) => {
    res.status(200).json({ 
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        cart : req.user.cart,
        history: req.user.history    
    })
})

// LOGOUT
router.get('/logout', auth, (req,res) => {
    User.findOneAndUpdate(
        {_id : req.user._id}, 
        {token: ''}, 
        (err, doc) => {
            if(err) return res.json({ success: false, err});
            return res.status(200).send({ success: true })
    })
})

// UPLOAD FILE CLOUDINARY
router.post('/uploadimage', auth, admin, formidable(), (req,res) => {
    cloudinary.uploader.upload(req.files.image.path, (result) => {
        res.status(200).send({
            public_id: result.public_id,
            url: result.url
        })
    }, {
        // Config file upload
        public_id: `${Date.now()}`,
        resource_type: 'auto'
    })
})

// REMOVE FILE CLOUDINARY 
router.get('/removeimage', auth, admin, (req,res) => {
    let image_id = req.query.public_id

    cloudinary.uploader.destroy(image_id, (error, result) => {
        if(error) return res.json({ success: false });
        res.status(200).send('Delete Success');
    })
})

// ADD TO CART 
router.post('/addToCart', auth, (req, res) => {
    User.findOne({ _id: req.user._id }, (err, doc) => {
        let duplicate = false;
        
        doc.cart.forEach((item) => {
            if (item.id == req.query.productId) {
                duplicate = true;
            }
        })

        // ADD Quantity
        if (duplicate) {
            User.findOneAndUpdate(
                {
                    _id: req.user._id,
                    "cart.id": mongoose.Types.ObjectId(req.query.productId)
                },
                { $inc : {"cart.$.quantity": 1}},
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart);
                }
            )
        } else {
            User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $push: {
                        cart: {
                            id: mongoose.Types.ObjectId(req.query.productId),
                            quantity: 1,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, doc) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json(doc.cart);
                }
            )
        }
    })
})

// REMOVE ITEM FROM CART
router.get('/removeCartItem', auth, (req,res) => {
    User.findByIdAndUpdate(
        {_id: req.user._id},
        {"$pull": 
            {cart: {"id": mongoose.Types.ObjectId(req.query._id)}}
        },
        { new: true },
        (err, doc) => {
            let cart = doc.cart;
            let array = cart.map(item => {
                return mongoose.Types.ObjectId(item.id)
            });

            Product
                .find({ "_id": { $in: array } })
                .populate('brand')
                .populate('color')
                .exec(( err, cartDetail ) => {
                    return res.status(200).json({
                        cartDetail, cart
                    })
                })
        }
    )
})

// SUCCESS PAYMENT
router.post('/paymentsuccess', auth, (req,res) => {
    let history = [];
    let transactionData = {};
    
    // User History Transaction
    req.body.cartDetail.forEach((item) => {
        history.push({
            dateOfPurchase: Date.now(),
            id: item._id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            quantity: item.quantity,
            paymentId: req.body.paymentData.paymentID
        })
    })
    // Payment Dashboard
    transactionData.user = {
        id: req.user._id,
        name: req.user.name,
        lastname: req.user.lastname,
        email: req.user.email
    }
    transactionData.data = req.body.paymentData;
    transactionData.product = history;

    User.findOneAndUpdate(
        { _id: req.user._id },
        { $push: { history: history }, $set: { cart: [] } },
        { new: true },
        (err, user) => {
            if (err) return res.json({ success: false, err });

            const paypalPayment = new PaypalPayment(transactionData)
            paypalPayment.save((err, doc) => {
                if (err) return res.json({ success: false, err });
                let products = [];
                doc.product.forEach(item => {
                    products.push({ id: item.id, quantity: item.quantity })
                })
                // LOOPING
                async.eachSeries(products, (item, callback) => {
                    // UPDATE
                    Product.update(
                        { _id: item.id },
                        {
                            $inc: {
                                "sold": item.quantity
                            }
                        },
                        { new: false },
                        callback
                    )
                }, (err) => {
                    if (err) return res.json({ success: false, err });
                    res.status(200).json({
                        success: true,
                        cart: user.cart,
                        cartDetail: []
                    })
                })
            })
        }
    )
})

router.post('/update_profile', auth, (req,res) => {
    User.findOneAndUpdate(
        { _id: req.user._id },
        {
            $set: req.body
        },
        { new: true },
        (err, doc) => {
            if (err) return res.json({ success: false, err })
            return res.status(200).json({ success: true})
        }
    )
})


module.exports = router;