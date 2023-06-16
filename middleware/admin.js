function admin(req, res, next){
    console.log(req.user.isAdmin);
    if(!req.user.isAdmin) return res.status(403).send('Access Denied');

    next();
}

module.exports = admin;