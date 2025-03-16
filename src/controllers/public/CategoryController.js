const modelPosts = require('./../../models/Post')
const modelCategory = require('./../../models/Category')

exports.allCategoryPost = async (req, res) => {
    const { category_id } = req.params;
    const categoryPosts = await modelPosts.categoryPosts(category_id)
    const categories = await modelCategory.allCategories()
    const userSession = req.session.userSession

    res.render('category-post', {userSession, categoryPosts, categories})
}