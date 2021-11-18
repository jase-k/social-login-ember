const client = require('../config/PostGresConnection.config');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.loginUser = (req, res) => {
    console.log("BODY", req.body)
    let { username, password } = req.body

    let query = `SELECT * FROM users WHERE username = '${username}'`

    console.log("RUNNING QUERY: ", query )
    client.query(query, (err, results) => {
        if(err){
            console.log(err)
            res.json({errors: [err]})
            throw err
        }

        if(results.rowCount === 0){
            res.status(400).json({errors: ["Username Not Found!"]})
        }
        else{
            let attributes = results.rows[0]
            bcrypt.compare(password, attributes.password)
            .then(isValid => {
                if(isValid){
                    const userToken = jwt.sign({
                        id: attributes.id
                        }, process.env.SECRET_KEY)
                    res
                    .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true})
                    .json({
                        message: "success", 
                        status: 200, 
                        data: {
                                id: attributes.id, 
                                type: "user", 
                                attributes: attributes
                            },
                        token: 'secret_token'
                        })
                } else {
                    res.status(400).json({errors: ["Password does not match!"]})
                }
            }).catch(isValid => res.status(400).json({errors: ["Password does not match!"]}))
        }
    })

}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200)
}

module.exports.createNewUser = (req, res) => {
    console.log("BODY:", req.body)
    let userObject = req.body.data.attributes
    let { username, password, email } = req.body.data.attributes
    if(username === undefined || password === undefined || email === undefined){
        res.status(400).json({errors: ["body must contain username, password, email"]})
    }
    console.log(userObject)
    bcrypt.hash(password, 12)
    .then(hash => {
        userObject.password = hash
        let columns =[]
        let values =[]
        for(const key in userObject){
            columns.push(key)
            values.push(`'${userObject[key]}'`)
        }
        let query = `INSERT INTO users (${columns.join(', ')}, created_at, updated_at) VALUES (${values.join(', ')}, NOW(), NOW()) RETURNING id`
        console.log("RUNNING QUERY: ", query )
        client.query(query, (err, results) => {
            if(err){
                console.log(err)
                res.json({errors: [err]})
                throw err
            }
            let { id } = results.rows[0]

            //creates cookie for user validation
            const userToken = jwt.sign({
                id: id
                }, process.env.SECRET_KEY)
            res
            .cookie("usertoken", userToken, process.env.SECRET_KEY, { httpOnly: true})
            .json({message: "success!", status: 200, data: {id: id, type: "user"}})
        });
    });
};

module.exports.updateUser = (req, res) => {
    let { username, email, password } = req.body
    let { id } = req.params

    if(id === undefined || username === undefined || email === undefined || password === undefined){
        res.status(400).json({errors: ["Body must contain User Object(id, username, email, password)"]})
    }
    
    let query = `UPDATE users SET username = '${username}', email = '${email}', updated_at=NOW() WHERE id = ${id}`

    console.log("RUNNING QUERY: ", query )
    client.query(query, (err, results) => {
        if(err){
            console.log(err)
            res.json({errors: [err]})
            throw err
        }

        if(results.rowCount === 0){
            res.status(400).json({errors: ["Record Not Found!"]})
        }
        else{
            res.json({message: "success!", status: 200, data: {id: id, type: "user"}})
        } 
    });

};

module.exports.deleteUser = (req, res) => {
    let { id } = req.params
    if(id === undefined){
        res.status(400).json({errors: ["parameters must contain id"]})
    }
    
    let query = `DELETE FROM users WHERE id = ${id}`

    console.log("RUNNING QUERY: ", query )
    client.query(query, (err, results) => {
        if(err){
            console.log(err)
            res.json({errors: [err]})
            throw err
        }
        // let { id } = results.rows[0]
        if(results.rowCount === 0){
            res.status(400).json({errors: ["Record Not Found!"]})
        }
        else{
            res.json({message: "success!", status: 200, data: {id: id, type: "user"}})
        }
    });
    
};

module.exports.findUser = (req, res) => {
    let { id } = req.params
    let { cookies } = req
    let { headers } = req
    console.log('headers: ', headers)
    console.log('cookie: ', cookies)
    if(id === undefined){
        res.status(400).json({errors: ["parameters must contain id"]})
    }
    
    let query = `SELECT * FROM users WHERE id = ${id}`

    console.log("RUNNING QUERY: ", query )
    client.query(query, (err, results) => {
        if(err){
            console.log(err)
            res.json({errors: [err]})
            throw err
        }
        // let { id } = results.rows[0]
        if(results.rowCount === 0){
            res.status(400).json({errors: ["Record Not Found!"]})
        }
        else{
            console.log({
                message: "success", 
                status: 200, 
                data: {
                        id: id, 
                        type: "user", 
                        attributes: results.rows[0]
                    }
                })
            res.json({
                message: "success", 
                status: 200, 
                data: {
                        id: id, 
                        type: "user", 
                        attributes: results.rows[0]
                    }
                })
        }
    });
    
};