const userModel = require('../../models/user')
const upload = require('../../middlewares/uploads')
const bcrypt = require('bcryptjs')

const UserController = {

    const: errorResponse = (req, res, type, message) => {
        req.session.message = { type: type, text: message }
        return res.redirect(req.originalUrl)
    },

    async login(req, res) {
        try {
            const { email, password } = req.body
            const userLogin = await userModel.login(email, password)

            if (userLogin) {

                const matchPassword = await bcrypt.compare(password, userLogin.password)

                if (matchPassword) {
                    req.session.userSession = userLogin
                    
                    return res.redirect('/index')
                } else {
                    return errorResponse(req, res, 'error', 'Usuário ou senha incorretos!')
                }
            } else {
                return errorResponse(req, res, 'error', 'Usuário não está cadastrado!')
            }
        } catch (error) {
            next(error);
        }
    },


    async createUser(req, res) {
        try {
            upload.single('avatar')(req, res, async (err) => {

                if (err) {
                    req.session.message = { type: 'error', text: 'Não foi possível cadastrar!'}
                    return res.redirect('users/create')
                }

                if (!req.file) {
                    req.session.message = { type: 'error', text: 'Algo deu Errado ao adicionar o arquivo!' }
                    return res.redirect('users/create')
                }

                const { firstname, lastname, username, email, password, isAdmin } = req.body
                console.log(isAdmin)

                if (!firstname || !lastname || !username || !email || !password || !isAdmin) {
                    req.session.message = { type: 'error', text:  'preencha todos os campos!'}
                    return res.redirect('users/create')
                }

                isAdmin == 'admin' ? 1 : 0
                const hashedPassword = await bcrypt.hash(password, 10);
                const avatarName = `/uploads/${req.file.filename}`
                const avatarPath = req.file ? avatarName : null;

                const registerUser = await userModel.createUser(firstname, lastname,
                    username, email, hashedPassword, avatarPath, isAdmin)

                if (registerUser) {
                    req.session.message = { type: 'success', text:  'Usuário cadastrado com sucesso!' }
                    return res.redirect('users/create')
                } else {
                    req.session.message = { type: 'error', text:  'Erro ao Cadastrar Usuário!' }
                    return res.redirect('users/create')
                }
            })

        } catch (error) {
            next(error);
        }
    },

    async register(req, res) {
        try {
            upload.single('avatar')(req, res, async (err) => {

                if (err) {
                    return errorResponse(req, res, 'error',
                        'Não foi possível cadastrar!')
                }

                if (!req.file) {
                    return errorResponse(req, res, 'error',
                        'Algo deu Errado ao adicionar o arquivo!')
                }

                const { firstname, lastname, username, email, password, isAdmin } = req.body

                if (!firstname || !lastname || !username || !email || !password || !isAdmin) {
                    return errorResponse(req, res, 'error', 'preencha todos os campos!')
                }

                isAdmin ? 1 : 0
                const hashedPassword = await bcrypt.hash(password, 10);
                const avatarName = `/uploads/${req.file.filename}`
                const avatarPath = req.file ? avatarName : null;

                const registerUser = await userModel.createUser(firstname, lastname,
                    username, email, hashedPassword, avatarPath, isAdmin)

                if (registerUser) {
                    req.session.userSession = registerUser
                    return res.redirect('/index');
                } else {
                    return errorResponse(req, res, 'error', 'Erro ao Cadastrar Usuário!')
                }
            })

        } catch (error) {
            next(error);
        }
    },

    async editUser(req, res) {
        try {
            upload.single('avatar')(req, res, async (err) => {

                if (err) {
                    req.session.message = { type: 'error', text: 'Erro no uplaod arquivo' }
                    return res.redirect('users')
                }

                if (!req.file) {
                    req.session.message = { type: 'error', text: 'Preencha todos os campos!' }
                    return res.redirect('users')
                }

                const { user_id, firstname, lastname, isAdmin } = req.body
                if (!firstname || !lastname || !isAdmin) {
                    req.session.message = { type: 'error', text: 'Preencha todos os campos!' }
                    return res.redirect('users')
                }

                isAdmin ? 1 : 0
                const avatarName = `/uploads/${req.file.filename}`
                const avatarPath = req.file ? avatarName : null;

                const userEdit = await userModel.editUser(user_id, firstname, lastname, avatarPath, isAdmin)

                if (userEdit) {
                    req.session.message = { type: 'success', text: 'Usuário editado com sucesso!' }
                    return res.redirect('users')
                } else {
                    req.session.message = { type: 'error', text: 'Erro ao Cadastrar Usuário!' }
                    return res.redirect('users')
                }
            })

        } catch (error) {
            next(error);
        }
    },

    async deleteUser(req, res) {
        try {
            const { user_id } = req.body
            const userDelete = userModel.deleteUser(user_id)
            if (userDelete) {
                req.session.message = { type: 'success', text: 'Usuário deletado com sucesso' }
                return res.redirect('users')
            } else {
                req.session.message = { type: 'error', text: 'Usuário já foi deletado ou não existe'}
                return res.redirect('users')
            }
        } catch (error) {
            next(error);
        }
    },

    async showCreateForm (req, res){
        const message = req.session.message
        delete req.session.message
        res.render('addUser', { message })
    },


    async manageUsers(req, res) {
        try {
            const message = req.session.message
            delete req.session.message
            const allUsers = await userModel.allUsers()
            return res.render('manageUser', { allUsers, message })

        } catch (error) {
            next(error);
        }
    },

    async showEditForm(req, res){
        try{
            const { id } = req.params
            const user = await userModel.showUser(id)
    
            const message = req.session.message
            delete req.session.message
            return res.render('editUser', { user, message })
        }catch(error){
            next(error);
        }
    }

}

module.exports = UserController
