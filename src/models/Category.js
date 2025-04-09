const express = require('express')
const connect = require('../database/config')

const Category = {
    async allCategories(){
        const connection = await connect()
        const sql = 'SELECT * FROM categories'
        const [rows] = await connection.query(sql)
        return rows
    },

    async category(id){
        const connection = await connect()
        const sql = 'SELECT * FROM categories WHERE id = ?'
        const [row] = await connection.query(sql, [id])
        return row[0]
    },

    async addCategory(title, description){
        const connection = await connect()
        const sql = 'INSERT INTO categories (title, description) VALUES (?,?)'
        const row = await connection.query(sql, [title, description])
        return row
    }, 

    async editCategory(id, title, description){
        const connection = await connect()
        const sql = 'UPDATE categories SET title = ?, description = ? WHERE id = ? LIMIT 1'
        const [result] = await connection.query(sql, [title, description, id])
        return result
    },

    async deleteCategory(id){
        const connection = await connect()
        const sql = 'DELETE FROM categories WHERE id = ?'
        const [result] = await connection.query(sql, [id])
        return result
    }
}   

module.exports = Category