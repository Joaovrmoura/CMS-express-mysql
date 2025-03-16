const mysql = require('mysql2/promise');

async function connect(){
    if(global.connection && global.connection.state !== 'disconnected')
    return global.connection;

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'',
        database:'blog'
    });
    
    
    console.log('Conectado ao Mysql!');
    global.connection = connection;
    return global.connection;
}

module.exports = connect