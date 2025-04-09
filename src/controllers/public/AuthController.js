exports.login = (req, res) => {
    const message = req.session.message
    delete req.session.message

    res.render('login', { message })
}

exports.register = (req, res) => {
    const message = req.session.message
    delete req.session.message

    res.render('cadastro', { message })
}

exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ erro: 'Impossível fazer Logout!' })
        }
        res.redirect('/login')
    })
}