const connect = require('../database/config');

const User = {
    async allUsers(){
        const connection = await connect();
        const sql = 'SELECT * FROM users';
        const [rows] = await connection.query(sql);
        return rows;

    },

    async showUser(id){
        const connection = await connect();
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await connection.query(sql, [id]);
        return rows[0];

    },

    async editUser(id, firstname, lastname, avatar, isAdmin){
        const connection = await connect();
        const sql = `UPDATE users SET firstname = ?, lastname = ?, avatar = ?, is_admin = ? WHERE id= ?`;
        const [result] = await connection.query(sql, [firstname, lastname, avatar, isAdmin, id]);
        return result

    },

    async login(email, password) {
        const connection = await connect();
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await connection.query(sql, [email]);

        return rows[0];

    },


    async createUser(firstname, lastname, username, email, password, avatar, isAdmin) {

        const conn = await connect()
        const sql1 = 'SELECT * FROM users WHERE email = ?'
        const [userExists] = await conn.query(sql1, [email])

        if (userExists.length > 0) {
            return false
        }
        const sql2 = 'INSERT INTO users (firstname, lastname, username, email, password, avatar, is_admin) VALUES (?,?,?,?,?,?,?)'
        const [insertUser] = await conn.query(sql2, [firstname, lastname, username, email, password, avatar, isAdmin])

        if (insertUser) {
            const sql3 = 'SELECT * FROM users WHERE email= ?'
            const [newUser] = await conn.query(sql3, [email])
            return newUser[0]
        } else {
            return null;
        }

    },

    async deleteUser(id){
        const connection = await connect()
        const sql = 'DELETE FROM users WHERE id = ?'
        const [result] = await connection.query(sql, [id])
        return  result
      
    }
}
module.exports = User
