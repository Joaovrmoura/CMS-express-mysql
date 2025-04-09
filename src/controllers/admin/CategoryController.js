const modelCategories = require('../../models/Category')

const CategoryController = {

    const : redirectResponse = (req, res, type, message) =>{
        req.session.message = { type: type, text: message }
        return res.redirect(req.originalUrl)
    },

    async showCategories(req, res){
        try{
            const message = req.session.message
            delete req.session.message
            const categories = await modelCategories.allCategories()
            res.render('manageCategories', {categories, message})
        }catch(error){
            next(error);
        }
    },

    async editCategory(req, res){
        try{
            const message = req.session.message
            delete req.session.message
            const {category_id} = req.body
            const category = await modelCategories.category(category_id)
    
            res.render('editCategory', {category, message})
        }catch(error){
            next(error);
        }
    },

    async getAddCategory(req, res)  {
        const message = req.session.message
        delete req.session.message
        res.render('addCategory',{message})
    },

    async addCategory(req, res){
        try{
            const {title, description} = req.body

            if(!title || !description){
                return redirectResponse(req, res, 'error', 'Preencha todos os campos')
            }

            const categorie = await modelCategories.addCategory(title, description)

            if(categorie)
                return redirectResponse(req, res, 'success', 'categoria adicionada com sucesso!')
         
            return redirectResponse(req, res, 'error', 'Algo deu errado ao adicionar categoria!')
            

        }catch(error){
            next(error);
        }
    },
  
        
    async postEditCategory(req, res){
        try{
            const {category_id, title, description} = req.body
            const categorieEdit = await modelCategories.editCategory(category_id, title, description)
    
            if(categorieEdit){
                req.session.message = { type: 'success', text: 'categoria Editada com sucesso!' }
                return res.redirect('manageCategories')
            }
            req.session.message = { type: 'error', text: 'Erro ao editar categoria!' }
            return res.redirect('manageCategories')
            
        }catch(error){
            next(error);
        }
      
    },

    async deleteCategory(req, res){
        try{
            const {category_id} = req.body
            const category_delete = await modelCategories.deleteCategory(category_id)
            
            if(category_delete){
                req.session.message = { type: 'success', text: 'categoria deletada com sucesso!' }
                return res.redirect('manageCategories')
            }
            req.session.message = { type: 'error', text: 'Erro ao deletar categoria!' }
            return res.redirect('manageCategories')
            
        }catch(error){
            next(error);
        }
    }
}

module.exports = CategoryController