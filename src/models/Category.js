const express = require('express')
const connect = require('../database/config')

const Category = {
    async allCategories(){
        try{
            const connection = await connect()
            const sql = 'SELECT * FROM categories'
            const [rows] = await connection.query(sql)
    
            if(rows){
                return rows
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    },

    async category(id){
        try{
            const connection = await connect()
            const sql = 'SELECT * FROM categories WHERE id = ?'
            const [row] = await connection.query(sql, [id])
    
            if(row){
                return row[0]
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    },

    async addCategory(title, description){
        try{
            const connection = await connect()
            const sql = 'INSERT INTO categories (title, description) VALUES (?,?)'
            const row = await connection.query(sql, [title, description])
            if(row){
                return row
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    }, 

    async editCategory(id, title, description){
        try{
            const connection = await connect()
            const sql = 'UPDATE categories SET title = ?, description = ? WHERE id = ? LIMIT 1'
            const [result] = await connection.query(sql, [title, description, id])
    
            if(result){
                return true
            }else{
                return false
            }
        }catch(error){
            console.log(error)
            return false
        }
    },

    async deleteCategory(id){
        try {
            const connection = await connect()
            const sql = 'DELETE FROM categories WHERE id = ?'
            const [result] = await connection.query(sql, [id])

            if (result.affectedRows > 0) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
}   

module.exports = Category