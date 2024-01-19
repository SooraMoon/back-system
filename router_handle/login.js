// 导入数据库连接
const db = require('../db/index')

exports.register = (req, res) => {
    res.send('注册')
}

exports.login = (req, res) => {
    // req 为前端传过来的信息，即 request，res 为发送给前端的信息，即 response
    const data = req.body
    const account = data.accout
    const password = data.password
    // 1. 如果前端传入的账号密码有空，返回错误信息
    if (!account || !password) {
        return res.send({
            status: 1,
            message: '账号密码不能为空'
        })
    }
    // 2. 如果传入的账号密码在数据库已存在，返回错误信息
    const searchSql = 'select * from user where account = ?'
    db.query(searchSql, account, (err, results) => {
        // 2.1 如果查询到的结果大于 0，说明账号已存在
        if (results.length > 0) {
            return res.send({
                status: 1,
                message: '账号已存在'
            })
        }
        // 3. 对账号密码进行加密 TODO: npm i bcrypt 出现问题，待解决
        // 第一个参数：要加密的数据，第二个参数：加密结果位数
        // password = bcrypt.hashSync(password, 10)
        const insertSql = 'insert into user set ?'
        const create_time = new Date()
        db.query(insertSql, {
            // 别忘了 ES6 的属性简写
            account,
            password,
            // 用户身份
            indentity: '用户',
            // 创建时间
            create_time,
            // 账号未冻结，状态为 0
            status: 0
        }, (err, results) => {
            // 3.1 如果插入失败，返回错误信息
            // affectedRows 为影响的行数
            if (results.affectedRows != 1) {
                return res.send({
                    status: 1,
                    message: '注册失败'
                })
            }
        })
         // 3.2 插入成功
        return res.send({
            status: 1,
            message: '注册成功'
        })
    })
}
