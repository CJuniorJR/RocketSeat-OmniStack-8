const axios = require('axios');

const Dev = require('../models/dev');

module.exports = {
    async store(req, res) {
        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if(userExists)
            res.send({userExists})

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data

        const dev = await Dev.create({
            user: username,
            name: name || 'Usuario sem nome',
            avatar,
            bio
         })

        return res.send(dev);
    },
    async index(req, res) {
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {
                    _id: { $ne: user }
                },
                {
                    _id: { $nin: loggedDev.likes } 
                },
                {
                    _id: { $nin: loggedDev.dislikes }
                }
            ]
        });
        
        return res.send(users)

    }
}