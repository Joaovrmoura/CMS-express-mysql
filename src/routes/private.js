const router = require('express').Router()
const {authenticated} = require('../middlewares/userAuth')
const postController = require('../controllers/PostController')
const categoryController = require('../controllers/CategoryController')
const UserController = require('../controllers/UserController')

// Middleware para definir currentUrl nas rotas da dashboard
router.use((req, res, next) => {
    res.locals.currentUrl = req.originalUrl.split('/').filter(Boolean).pop();
    next(); 
});

router.use(authenticated)

// operation routes user

// router.get('/users/create', authMiddleware, UserController.showCreateForm);
router.get('/users/create', UserController.showCreateForm)
// router.get('/users', authMiddleware, UserController.manageUsers);
router.get('/users', UserController.manageUsers)
// router.post('/users', authMiddleware, UserController.createUser);
router.post('/users', UserController.createUser)



// router.put('/users/:id', authMiddleware, UserController.updateUser);
// router.delete('/users/:id', authMiddleware, UserController.deleteUser);


//add id param
router.post('/postEditUser', UserController.editUser)
// router.get('/users/:id/edit', authMiddleware, UserController.showEditForm);
router.get('/users/:id/edit', UserController.showEditForm)
router.post('/deleteUser', UserController.deleteUser)

// operation routes post
router.get('/dashboard', postController.allPosts)
router.get('/addPost', postController.getAddPost)
router.post('/post', postController.AddPost)

// add id param
router.post('/posts', postController.postEditPost)
router.post('/editPost', postController.editPost)
router.post('/posts/:id', postController.deletePost)

// categories routes categories
router.get('/manageCategories', categoryController.showCategories)
router.get('/AddCategory', categoryController.getAddCategory)
router.post('/addCategory', categoryController.addCategory)
// add id param
router.post('/editCategory', categoryController.editCategory)
router.post('/deleteCategory', categoryController.deleteCategory)
router.post('/postEditCategory', categoryController.postEditCategory)


module.exports = router