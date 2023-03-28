const { Sequelize, Op } = require("sequelize");
const db = require("../models");

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
    const postData = req.body;
    if(postData.length>1){
    var data = await User.bulkCreate(postData);
}
else{
    var data = await User.create(postData);
}
    res.status(200).json({data: data});
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
    const postData = req.body;
    const data = await User.create({
        user_name: postData.user_name,
        age: postData.age
    }, {
        fields: ['user_name', 'age']
    })
    res.status(200).json({data: data})
}

const selectAllFromColumn = async (req, res) => {
    const data = await User.findAll({
        attributes: ['id', 'user_name']
    })
    res.status(200).json({data: data})
}

const selectAsAlias = async (req, res) => {
    const data = await User.findAll({
        attributes: [["id", "Serial No"], ["user_name", "User Name"]]
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
    countId
}