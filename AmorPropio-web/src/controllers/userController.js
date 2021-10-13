const { validationResult, body } = require("express-validator");
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');


const userPath = path.join(__dirname, '../data/testUsers.json')

const controller = {
    login: (req, res) => {
        res.render('login');
    },
    register: (req, res) => {
        res.render('register');
    },
    sendRegister: (req, res) => {
        let errors = validationResult(req);
        console.log(errors)
        if (errors.isEmpty()) {
            // Find last added id
            const allUsers = JSON.parse(fs.readFileSync(userPath, "utf-8"));
            const lastUser = allUsers.slice(-1)
            // Add user to JSON array
            newUser = {
                id: lastUser[0].id + 1,
                name: req.body.name,
                last_name: req.body.lastName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pwd, 10),
                category: "client",
                img: req.file.filename
            }
            allUsers.push(newUser)
            const newAllUsersJSON = JSON.stringify(allUsers, null, 2)
            fs.writeFileSync(userPath, newAllUsersJSON)
            res.redirect('/user/login')
        } else {

            return res.render('register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    sendLogin: (req, res) => {
        let errors = validationResult(req);
        // Leaving only email and password errors
        errors.errors = errors.errors.filter((e) => e.value !== undefined);

        if (errors.isEmpty()) {
            const allUsers = JSON.parse(fs.readFileSync(userPath, "utf-8"));
            const userExist = allUsers.find(u => u.email == req.body.email)
            if (userExist) {
                let pwdCorrect = bcrypt.compareSync(req.body.password, userExist.password)
                if (pwdCorrect) {
                    req.session.userLogged = userExist
                    res.redirect('/')
                } else {
                    // If input password dont match with user password
                    // Creating error for wrong password
                    errors.errors.push({
                        value: req.body.email,
                        msg: "La contraseña es incorrecta",
                        param: "email", // leaving email param to error appear at top
                        location: "body",
                    });
                    return res.render("login", {
                        errors: errors.mapped(),
                        old: req.body,
                    });
                }
            }
        }
        else {
            console.log(errors)
            return res.render('login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    }
}

module.exports = controller;