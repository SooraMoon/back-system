// 导入数据库
const mysql = require('mysql')

// 创建于数据库的连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lyk123',
    database: 'back_system'
})

// 对外暴露连接
module.exports = db
