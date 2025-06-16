const router = require('express').Router()
const userController = require('../controllers/admin/UserController')
const PublicPostController = require('../controllers/public/PublicPostController')
const authController = require('../controllers/public/AuthController')

router.get('/index', PublicPostController.index)

router.get('/login', authController.login)
router.get('/register', authController.register)
router.get('/logout', authController.logout)

router.get('/blog', PublicPostController.blog)
router.get('/category-post/:category_id', PublicPostController.allCategoryPost)
router.get('/post/:post_id', PublicPostController.post)
router.post('/search', PublicPostController.search)

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router