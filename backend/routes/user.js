const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();


router.post("/signup", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {

        const user = new User({
            email: req.body.email,
            name: req.body.name,
            phone: req.body.phone,
            password: hash,


        });

        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
});

router.post("/login", (req, res, next) => {
    let fetchedUser;

    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {

            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }


            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer", { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                name: fetchedUser.name,
                email: fetchedUser.email,
                phone: fetchedUser.phone,


            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });
});

router.post("/getUsers", (req, res, next) => {
    let fetchedUsers;
    let usersArr = [];
    let u;
    // '_id': { '$nin': [req.body.id] }
    User.find({})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            fetchedUsers = user;

            for (let i = 0; i < fetchedUsers.length; i++) {
                u = {
                    "_id": fetchedUsers[i]._id,
                    "name": fetchedUsers[i].name,
                    "phone": fetchedUsers[i].phone,
                    "email": fetchedUsers[i].email
                }

                usersArr.push(u)
            }

            console.log(usersArr)
        })
        .then(result => {




            res.status(200).json({
                users: usersArr


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

router.post("/updateUserEmail", (req, res, next) => {
    User.updateOne({ '_id': req.body.id }, { '$set': { 'email': req.body.email } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

        })
        .then(result => {

            res.status(200).json({


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});

router.post("/updateUserPhone", (req, res, next) => {
    User.updateOne({ '_id': req.body.id }, { '$set': { 'phone': req.body.phone } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

        })
        .then(result => {

            res.status(200).json({


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});


router.post("/updateUserPassword", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hash => {
        User.updateOne({ '_id': req.body.id }, { '$set': { 'password': hash } })
            .then(user => {
                if (!user) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }

            })
            .then(result => {

                res.status(200).json({


                });

            })
            .catch(err => {
                return res.status(401).json({
                    message: "Auth failed"
                });
            });

    })
});
router.post("/updateUserName", (req, res, next) => {
    User.updateOne({ '_id': req.body.id }, { '$set': { 'name': req.body.name } })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

        })
        .then(result => {

            res.status(200).json({


            });

        })
        .catch(err => {
            return res.status(401).json({
                message: "Auth failed"
            });
        });

});



module.exports = router;