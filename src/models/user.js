const express = require('express');
const connect = require('../database/config');
const bcrypt = require('bcrypt');


const User = {
    async allUsers(){
        try {
            const connection = await connect();
            const sql = 'SELECT * FROM users';
            const [rows] = await connection.query(sql);

            if (rows.length === 0) return false;
            return rows;
            
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    async showUser(id){
        try {
            const connection = await connect();
            const sql = 'SELECT * FROM users WHERE id = ?';
            const [rows] = await connection.query(sql, [id]);

            if (rows.length === 0) return false;
                return rows[0];
            
        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    async editUser(id, firstname, lastname, avatar, isAdmin){
        try{
            const connection = await connect()
            const sql = `UPDATE users SET firstname = ?, lastname = ?, avatar = ?, is_admin = ? WHERE id= ?`
            const [result] = await connection.query(sql, [firstname, lastname, avatar, isAdmin, id])

            if(result) return true;
            return false;
            
        }catch(error){
            console.log(error)
            return false
        }
    },

    async login(email, password) {
        try {
            const connection = await connect();
            const sql = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await connection.query(sql, [email]);

            if (rows.length === 0) return false;
            return rows[0];

        } catch (error) {
            console.error('Erro no login:', error);
            throw error;
        }
    },

    async comparePassword(passwordInput, dbPassword) {
        return await bcrypt.compare(passwordInput, dbPassword)
    },


    async createUser(firstname, lastname, username, email, password, avatar, isAdmin) {

        const conn = await connect()
        try {
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

        } catch (error) {
            console.log(error);
            throw error
        }
    },

    async deleteUser(id){

        try{
            const connection = await connect()
            const sql = 'DELETE FROM users WHERE id = ?'
            const [result] = await connection.query(sql, [id])
    
            if(result.affectedRows > 0) return true;
            return false;
            
        }catch(error){
            console.log(error)
            return false
        }
      
    }
}
module.exports = User
