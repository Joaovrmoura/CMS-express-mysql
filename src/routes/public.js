const router = require('express').Router()
const userController = require('../controllers/UserController')
const homeController = require('../controllers/public/HomeController')
const categoryController = require('../controllers/public/CategoryController')
const postController = require('../controllers/public/PostController')

router.get('/index', homeController.index)

router.get('/login', homeController.login)
router.get('/register', homeController.register)
router.get('/logout', homeController.logout)

router.get('/blog', homeController.blog)
router.get('/category-post/:category_id', categoryController.allCategoryPost)
router.get('/post/:post_id', postController.post)
router.post('/search', postController.search)

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router