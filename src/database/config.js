require('dotenv').config()
const mysql = require('mysql2/promise');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

    const connection = await mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });
    
    
    console.log('Conectado ao Mysql!');
    global.connection = connection;
    return global.connection;
}

module.exports = connect