const { Sequelize, Op } = require("sequelize");
const db = require("../models");
const bcrypt = require('bcrypt');

var User = db.user;

const getUsers= async(req,res) => {
    const data = await User.findAll({});
    res.status(200).json({data: data});
}

const getUserById= async(req,res) => {
    const data = await User.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({data: data});
}

const createUser= async(req,res) => {
    try {
        const {user_name, age, email, contactno, password} = req.body;
        const postData = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)
        // const isNewContact = await User.findOne({contactno: contactno})
        // const isNewUserEmail = await User.findOne({email: email})
        // if(isNewContact){
        //     res.status(400).json("This contact number is already in use!")
        // } else if (isNewUserEmail) {
        //     res.status(400).json("This Email number is already in use!")
        // }
        if(postData.length>1){
        var data = await User.bulkCreate(postData);
        }
        else{
            var data = await User.create({
                user_name,
                age,
                email,
                contactno,
                password: hashPassword
            });
        }
            res.status(200).json({data: data});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.errors[0].message})
    }
}

const deleteUser = async(req, res) => {
    const data = await User.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({data: data})
}

const patchUser = async(req, res) => {
    const updatedData = req.body;
    const data = await User.update(updatedData, {
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({data: data});
}

const createUserColumn = async(req, res) => {
    try {
        const {user_name, email, contactno, password} = req.body;
        const data = await User.create({
            user_name,
            email,
            contactno,
            password
        }, {
            fields: ['user_name', 'email', 'contactno', 'password']
        })
        res.status(200).json({data: data}) 
    } 
    catch (error) {
        console.log(error);
        res.send({"error": error})
    }
}

const selectAllFromColumn = async (req, res) => {
    const data = await User.findAll({
        attributes: ['id', 'email']
    })
    res.status(200).json({data: data})
}

const selectAsAlias = async (req, res) => {
    const data = await User.findAll({
        attributes: [["id", "Serial No"], ["user_name", "User Name"]]
    })
    res.status(200).json({data: data})
}

const Operator = async (req, res) => {
    const data = await User.findAll({
        order: [
            ['id', 'DESC']
        ],
        where: {
            [Op.and]: [{age: 19, user_name: 'User 1'}],
            age: {
                [Op.lt]: 25
            }
        }
    }).catch((err)=>{
        console.log(err)
    })
    res.status(200).json({data: data})
}

const countId = async(req, res) => {
    const data = await User.findAll({
        attributes: {
            exclude: [
                'age', 'createdAt', 'updatedAt'
            ],
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
            ]
        }
        // attributes: ['id', ["user_name", "User Name"], [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']]
    }).catch((err)=>{
        console.log(err)
    })
    res.status(200).json({data: data})
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    patchUser,
    createUserColumn,
    selectAllFromColumn,
    selectAsAlias,
    countId,
    Operator
}