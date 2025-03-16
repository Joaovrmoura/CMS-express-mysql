const modelPosts = require('./../../models/Post')
const modelCategory = require('./../../models/Category')

exports.index = async (req, res) => {
    const userSession = req.session.userSession
    const posts = await modelPosts.allPosts()
    const categories = await modelCategory.allCategories()
    const thumbnailPost = await modelPosts.thmubnailPost()
    
    res.render('index', { userSession , posts, categories, thumbnailPost})
}

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

exports.blog = async (req, res) => {
    const userSession = req.session.userSession
    const posts = await modelPosts.allPosts()
    const categories = await modelCategory.allCategories()

    res.render('blog', { userSession, posts, categories})
}

exports.post = (req, res) => {
    const userSession = req.session.userSession
    res.render('post', { userSession })
}

exports.categoryPost = (req, res) => {
    const userSession = req.session.userSession
    res.render('category-post', { userSession })
}