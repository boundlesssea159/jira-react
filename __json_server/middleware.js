module.exports = (req, res, next) => {
    if (req.method === 'POST' && req.path === '/login') {
        return req.body.username === 'admin' && req.body.password === 'admin'
            ? res.status(200).json({
                user: {
                    id: "1",
                    name: "admin",
                    token: 'useradmin'
                }
            }) : res.status(401).json({message: "用户名或密码错误"})
    }
    next();
}


