// 导入相应的包
const express = require('express')
const bodyParser = require('body-parser')


// 创建 express 实例
const app = express()
// 导入 cors
const cors = require('cors')

// 全局挂载
app.use(cors())
// 当 extended: false 时，值为数组或者字符串，当为 true 时，值为任意类型
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// 引入自定义路由并全局挂载
const loginRouter = require('./router/login')
app.use('/api', loginRouter)

// 监听服务器
app.listen(3007, () => {
        console.log('http://localhost:3007')
    })
