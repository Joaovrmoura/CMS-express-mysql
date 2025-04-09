const modelPost = require('../../models/Post')
const modelCategories = require('../../models/Category')
const upload = require('../../middlewares/uploads')
const modelUser = require('../../models/user')

const PostController = {

    const: errorResponse = (req, res, type, message) => {
        req.session.message = { type: type, text: message }
        return res.redirect(req.originalUrl)
    },


    //all posts from dashboard
    async allPosts(req, res){
        try{
            const posts = await modelPost.allPosts()
            const message = req.session.message
            delete req.session.message
            
            req.session.posts = posts
            return res.render('dashboard', { posts, message})
        }catch(error){
            next(error);
        }
     
    },

    async getAddPost(req, res){
        try{
            const categories = await modelCategories.allCategories()
            const message = req.session.message
            delete req.session.message
            
            const userSession = req.session.userSession
            res.render('addPost', { categories, userSession, message })
        }catch(error){
            next(error);
        }
      
    },
    
    async editPost(req, res){
        try{
            const {post_id} = req.body
            const categories = await modelCategories.allCategories()
            const message = req.session.message
            
            const post = await modelPost.post(post_id)
            const userSession = req.session.userSession
            
            delete req.session.message
            res.render('editPost', { categories, userSession, post, message })
        }catch(error){
            next(error);
        }
      
    },

    async postEditPost(req, res){
        try {
            upload.single('thumbnail')(req, res, async (err) => {
                if (err) {
                    req.session.message = { type: 'error', text: 'Não foi possível editar Post' }
                    return res.redirect('/admin/dashboard')
                }

                if (!req.file) {
                    req.session.message = { type: 'error', text: 'Algo deu Errado ao editar o arquivo!' }
                    return res.redirect('/admin/dashboard')
                }

                const {post_id, title, body, category_id, is_featured } = req.body
                console.log('not saniteze', is_featured);
                
                if (!title || !body || !category_id || !is_featured) {
                   
                    req.session.message = { type: 'error', text: 'Preencha todos os campos' }
                    return res.redirect('/admin/dashboard')
                }

                const thumbnailName = `/uploads/${req.file.filename}`
                const thumbnailPath = req.file ? thumbnailName : null;

                const editPost = await modelPost.editPost(post_id, title, body, thumbnailPath, category_id, is_featured)

                if (editPost) {
                    req.session.message = { type: 'success', text:  'Post adicionado com sucesso!' }
                    return res.redirect('/admin/dashboard')
                } else {
                    req.session.message = { type: 'error', text:  'Algo deu errado ao adicionar o Post' }
                    return res.redirect('/admin/dashboard')
                }
            })

            return false

        } catch (error) {
            next(error);
        }
    },

    // adiciona a lógicr posts de adicionar posts, o formulário já esta funcionando
    AddPost(req, res) {

        try {
            upload.single('thumbnail')(req, res, async (err) => {

                const { title, body, category_id, author_id, is_featured } = req.body
                console.log(title, body, category_id, author_id, is_featured );

                if (!title || !body || !category_id || !author_id || !is_featured) {
                    console.log(title, body, category_id, author_id, is_featured );
                    req.session.message = { type: 'error', text: `preencha todos os campos!`, title, body, category_id, author_id, is_featured }
                    return res.redirect('dashboard')
                }

                if (err) {
                    console.log(title, body, category_id, author_id, is_featured );
    
                    req.session.message = { type: 'error', text: 'Não foi possível adicionar Post'}
                    return res.redirect('dashboard')
                }

                if (!req.file) {
                    console.log(title, body, category_id, author_id, is_featured );
                    req.session.message = { type: 'error', text:'Algo deu Errado ao adicionar o arquivo!'}
                    return res.redirect('dashboard')
                } 

                const thumbnailName = `/uploads/${req.file.filename}`
                const thumbnailPath = req.file ? thumbnailName : null;


                const addPost = await modelPost.insertPost(title, body, thumbnailPath, category_id, author_id, is_featured)

                if (addPost){
                    req.session.message = { type: 'success', text: 'Post adicionado com sucesso!' }
                    return res.redirect('dashboard')
                } else {
                    req.session.message = { type: 'error', text:  'Algo deu errado ao adicionar o Post' }
                    return res.redirect('dashboard')
                }
            })
            return false

        } catch (error) {
            next(error);
        }
    },

    async deletePost(req, res) {
        try {
            const {id} = req.params
            const postDelet = await modelPost.deletePost(id)

            if (postDelet) {
                req.session.message = { type: 'success', text: 'Post deletado com sucesso!' }
                return res.redirect('/admin/dashboard')
            } else {
                req.session.message = { type: 'error', text: 'Erro ao deletar post' }
                return res.redirect('/admin/dashboard')
            }

        } catch (error) {
            next(error);
        }
    },


}

module.exports = PostController