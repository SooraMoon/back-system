// 登录注册模块
// 导入express模块
const express = require('express')
// 导入 router 模块
const router = express.Router()
// 导入路由处理模块 router_handle
const loginHandler = require('../router_handle/login')

router.post('/register', loginHandler.register)
router.post('/login', loginHandler.login)

// 对外暴露路由
module.exports = router
