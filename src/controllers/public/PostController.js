const modelPost = require('./../../models/Post') 
const modelCategory = require('./../../models/Category')

exports.post = async(req, res) => {
    const {post_id} = req.params;
    const userSession = req.session.userSession
    const post = await modelPost.singlePost(post_id)

    res.render('post', { userSession, post})
}

exports.search = async(req, res) => {
    const categories = await modelCategory.allCategories()
    const {postName} = req.body;
    const postSearch =  await modelPost.searchPost(postName)
    const userSession = req.session.userSession

    res.render('search', { userSession, postSearch, categories})
}