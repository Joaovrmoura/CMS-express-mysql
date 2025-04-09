const router = require('express').Router()
const userController = require('../controllers/admin/UserController')
const homeController = require('../controllers/public/HomeController')
const authController = require('../controllers/public/AuthController')
router.get('/index', homeController.index)

router.get('/login', authController.login)
router.get('/register', authController.register)
router.get('/logout', authController.logout)

router.get('/blog', homeController.blog)
router.get('/category-post/:category_id', homeController.allCategoryPost)
router.get('/post/:post_id', homeController.post)
router.post('/search', homeController.search)

router.post('/login', userController.login)
router.post('/register', userController.register)

module.exports = router