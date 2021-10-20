const db = require('../../database/models')

const controller = {
    list: (req, res)=>{
        db.Users.findAll()
        .then(users =>{
            let userList = []      
            users.forEach(u =>{
                let user = {
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    detail: '/api/users/' + u.id
                }
                userList.push(user)
            })
            res.json({
                count: userList.length,
                users: userList
            })
        })
    },
    detail: (req, res) =>{
        db.Users.findByPk(req.params.id)
        .then(user =>{
            let uzer  = {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                urlImage : user.image
            }

            res.json({
                user: uzer
            })
        })
    }
}

module.exports = controller