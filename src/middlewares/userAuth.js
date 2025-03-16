exports.authenticated = (req, res, next) => {
    if(!req.session.userSession){
        return res.redirect('/login')
    }
    next()
}

