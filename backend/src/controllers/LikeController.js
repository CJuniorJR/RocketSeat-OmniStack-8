const Dev = require('../models/dev')

module.exports = {
    async store(req, res) {
        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev)
            return res.status(400).json({ error: 'Usuario não encontrado' })

        if(targetDev.likes.includes(loggedDev._id))
            return res.send({ message: 'Match' })

        loggedDev.likes.push(targetDev._id);    
        
        await loggedDev.save();

        return res.send(loggedDev)
    }
}