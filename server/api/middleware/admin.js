let admin = (req, res, next) => {
    if(req.user.role === 0){
        return res.status(400).json({
            status: "failed",
            message: "You have no access"
        })
    }

    next();
};

module.exports = { admin }