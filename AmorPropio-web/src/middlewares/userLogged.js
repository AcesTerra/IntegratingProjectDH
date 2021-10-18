function userLogged(req, res, next) {
    // If user exists create session with credentials in browser
    res.locals.user = req.session.userLogged || undefined;
    

    next();
}

module.exports = userLogged;