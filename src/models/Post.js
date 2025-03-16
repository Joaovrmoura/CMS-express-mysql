const express = require('express')
const connect = require('../database/config')

const Post = {
    async allPosts() {
        const connection = await connect()
        const sql = `
        SELECT 
            p.id AS post_id, 
            p.body AS post_content, 
            p.thumbnail AS post_thumbnail,
            u.username AS author,
            u.avatar AS author_avatar,
            p.title AS post_title, 
            p.date_time AS post_data,
            c.title AS category_title,
            c.id AS category_id  
        FROM 
            posts p
        LEFT JOIN categories c ON p.category_id = c.id 
        LEFT JOIN users u ON p.author_id = u.id`

        const [rows] = await connection.query(sql)

        if (rows.length > 0) {
            return rows
        } else {
            return false
        }
    },

    async post(id){
        const connection = await connect()
        const sql = 'SELECT * FROM posts WHERE id= ?'
        const [row] = await connection.query(sql, [id])
        if(row) return row[0]
        return false
    },
    
    async insertPost(title, body, thmubnail, category_id, author_id, is_featured) {
        const connection = await connect()
        const sql = 'INSERT INTO posts (title, body, thumbnail, category_id, author_id, is_featured) VALUES (?,?,?,?,?,?)'
        const [row] = await connection.query(sql, [title, body, thmubnail, category_id, author_id, is_featured])
        if (row) {
            return [row]
        } else {
            return false
        }
    },

    async editPost(id, title, body, thmubnail, category_id, is_featured){
        const connection = await connect()
        const sql = 'UPDATE posts SET title = ?, body = ?, thumbnail = ?, category_id = ?, is_featured = ? WHERE id = ?'
        const [result] = await connection.query(sql, [title, body, thmubnail, category_id, is_featured, id])
        if(result) return true
        return false
    },

    async deletePost(id){
        const connection = await connect()
        const sql = 'DELETE FROM posts WHERE id = ?'
        const [result] = await connection.query(sql, [id])

        if(result.affectedRows > 0){
            return true
        }else{
            return false
        }
    },
    async thmubnailPost(){
        const connection = await connect()
        const sql = `
         SELECT 
                p.id AS post_id, 
                p.body AS post_content, 
                u.username AS author,
                u.avatar AS author_avatar,
                p.title AS post_title, 
                p.date_time AS post_data,
                c.title AS category_title,
                c.id AS category_id 
            FROM 
                posts p
            LEFT JOIN 
                categories c 
            ON 
                p.category_id = c.id 
            LEFT JOIN 
                users u 
            ON 
                p.author_id = u.id
            WHERE 
                is_featured = 1    
        `
        const [row] = await connection.query(sql)
        if(row){
            return row[0];
        }else{
            return false;
        }
    }, 

    async categoryPosts(category_id){
        const connection = await connect()
        const sql = `
        SELECT 
            p.id AS post_id, 
            p.body AS post_content, 
            p.thumbnail AS post_thumbnail,
            u.username AS author,
            u.avatar AS author_avatar,
            p.title AS post_title, 
            p.date_time AS post_data,
            c.title AS category_title,
            c.id AS category_id 
        FROM
            posts p
        LEFT JOIN
            categories c
        ON
            c.id = p.category_id
        LEFT JOIN
            users u
        ON
            p.author_id =  u.id 
        WHERE 
            p.category_id = ?`

        const [rows] = await connection.query(sql, [category_id])

        if(rows.length > 0){
            return rows
        }else{
            return false
        }
    },
    async singlePost(post_id){
        const connection = await connect()
        const sql = `
        SELECT
            p.id AS post_id, 
            p.body AS post_content, 
            p.thumbnail AS post_thumbnail,
            u.username AS author,
            u.avatar AS author_avatar,
            p.title AS post_title, 
            p.date_time AS post_data,
            c.title AS category_title,
            c.id AS category_id 
        FROM
            posts p
        LEFT JOIN
            categories c
        ON
            c.id = p.category_id
        LEFT JOIN
            users u
        ON
            p.author_id =  u.id 
        WHERE 
            p.id = ?
        `
        const [row] = await connection.query(sql, [post_id])
        if(row){
            return row[0]
        }else{
            return false
        }
    },

    async searchPost(search){
        const connection = await connect()
        const sql = `
            SELECT 
                p.id AS post_id, 
                p.body AS post_content, 
                p.thumbnail AS post_thumbnail,
                u.username AS author,
                u.avatar AS author_avatar,
                p.title AS post_title, 
                p.date_time AS post_data,
                c.title AS category_title,
                c.id AS category_id  
            FROM 
                posts p
            LEFT JOIN categories c ON p.category_id = c.id 
            LEFT JOIN users u ON p.author_id = u.id
            WHERE
               p.title LIKE ? ORDER BY date_time DESC
        `
        const [rows] = await connection.query(sql, [`%${search}%`])

        if (rows.length > 0) {
            return rows
        } else {
            return false
        }
    }
}

module.exports = Post