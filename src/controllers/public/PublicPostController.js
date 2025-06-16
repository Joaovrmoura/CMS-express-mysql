const modelPosts = require('../../models/Post');
const modelCategory = require('../../models/Category');

class PublicPostController {
  async index(req, res) {
    try {
      const userSession = req.session.userSession;
      const posts = await modelPosts.allPosts();
      const categories = await modelCategory.allCategories();
      const thumbnailPost = await modelPosts.thmubnailPost();

      res.render('index', { userSession, posts, categories, thumbnailPost });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }

  async post(req, res) {
    try {
      const { post_id } = req.params;
      const userSession = req.session.userSession;
      const post = await modelPosts.singlePost(post_id);

      res.render('post', { userSession, post });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }

  async categoryPost(req, res) {
    try {
      const userSession = req.session.userSession;
      res.render('category-post', { userSession });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }

  async allCategoryPost(req, res) {
    try {
      const { category_id } = req.params;
      const categoryPosts = await modelPosts.categoryPosts(category_id);
      const categories = await modelCategory.allCategories();
      const userSession = req.session.userSession;

      res.render('category-post', { userSession, categoryPosts, categories });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }

  async search(req, res) {
    try {
      const categories = await modelCategory.allCategories();
      const { postName } = req.body;
      const postSearch = await modelPosts.searchPost(postName);
      const userSession = req.session.userSession;

      res.render('search', { userSession, postSearch, categories });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }

  async blog(req, res) {
    try {
      const userSession = req.session.userSession;
      const posts = await modelPosts.allPosts();
      const categories = await modelCategory.allCategories();

      res.render('blog', { userSession, posts, categories });
    } catch (error) {
      console.error(error);
      res.status(500).render('error', { message: error.message });
    }
  }
}

module.exports = new PublicPostController();
