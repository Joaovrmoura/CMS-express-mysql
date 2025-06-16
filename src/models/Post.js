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
        LEFT JOIN users u ON p.author_id = u.id LIMIT 3`

        const [rows] = await connection.query(sql)
        return rows
    },

    async post(id){
        const connection = await connect()
        const sql = `
        SELECT * FROM 
            posts
        WHERE 
            id= ?`
        const [row] = await connection.query(sql, [id])
        return row[0]
    },
    
    async insertPost(title, body, thmubnail, category_id, author_id, is_featured) {
        const connection = await connect()
        const sql = `
        INSERT INTO 
            posts (
                title,
                body, thumbnail, 
                category_id, 
                author_id, 
                is_featured
            ) 
        VALUES 
            (?,?,?,?,?,?)`
        const [row] = await connection.query(sql, [title, body, thmubnail, category_id, author_id, is_featured])
        return [row]
    },

    async editPost(id, title, body, thmubnail, category_id, is_featured){
        const connection = await connect()
        const sql = `
        UPDATE 
            posts 
        SET 
            title = ?, 
            body = ?, 
            thumbnail = ?, 
            category_id = ?, 
            is_featured = ? 
            WHERE id = ?`
        const [result] = await connection.query(sql, [title, body, thmubnail, category_id, is_featured, id])
        return result
    },

    async deletePost(id){
        const connection = await connect()
        const sql = 'DELETE FROM posts WHERE id = ?'
        const [result] = await connection.query(sql, [id])
        return result
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
        return row[0];
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
        return rows

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
        return row[0]
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
        return rows
    }
}

module.exports = Post