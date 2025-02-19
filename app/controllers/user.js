const User = require ('../database/models/User')
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')

const UserController = {
    async create(req, res) {
        try{
            const user = await User.create({...req.body})
            return res.status(201).json(user)
        } catch(err){
            res.status(500).json({message : err})
        }
    },

    async login(req, res){
        const { email, password} = req.body
        try{
            const user = User.findOne({
                where : {
                    email: email
                }
            })
            if (!User){
                return res.status(400).json({ message : 'Invalid Data'})
            }
            const isPasswordValid = bcrypt.compareSync(password, user.password)
            if(!isPasswordValid){
                return res.status(400).json({ message: 'Invalid Data'})
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    role: user.role
                },
            'Anthony est en chaleur, calmez le',
                {
                expiresIn: '1h'
                }
        )
              return res.status(200).json({token})  
        } catch(err){
            res.status(500).json({message : err})
        }
    }
}

module.exports = UserController