const { Sequelize, Op, QueryTypes } = require("sequelize");
const db = require("../models");
const bcrypt = require('bcrypt');

var User = db.user;
var Contact = db.contact;

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
        const {user_name, gender, age, email, contactno, password} = req.body;
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
                gender,
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
        console.log(req.body);
        const {user_name, gender, email, contactno, password} = req.body;
        const data = await User.create({
            user_name,
            gender,
            email,
            contactno,
            password
        }, {
            fields: ['user_name', 'gender', 'email', 'contactno', 'password']
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

const rawQueries = async (req, res) => {
    const users = await db.sequelize.query("SElECT * FROM users", {type: QueryTypes.SELECT})
    res.json({users})
}

const createOneToOneUser = async(req, res) => {
    const {user_name, permanent_address, current_address} = req.body
    const data = await User.create({user_name: user_name}, {fields: ["user_name"]});
    if(data && data.id){
        await Contact.create({permanent_address: permanent_address, current_address: current_address, UserId: data.id})
    }
    res.json({data:data})
}

const fetchOneToOneUser = async(req, res) => {
    // const data = await User.findAll({
    //     attributes: ['user_name'],
    //     include: [{
    //         model: Contact,
    //         attributes: ['permanent_address', 'current_address']
    //     }],
    //     where: {id: 1}
    // });
    const data = await Contact.findAll({
        attributes: ['permanent_address', 'current_address'],
        include: [{
            model: User,
            attributes: ['user_name']
        }],
        where: {id: 1}
    });
    res.json({data: data})
}

const createOneToManyUser = async(req,res) =>{
    const {user_name, permanent_address, current_address, UserId} = req.body;
    const data = await User.create({
        user_name: user_name
    }, {
        fields: ['user_name']
    });
    if(data.id){
        await Contact.create({
            permanent_address: permanent_address, 
            current_address: current_address, 
            UserId: UserId
        })
    }
    res.json({data: data})
}

const fetchOneToManyUser = async(req, res) => {
    // const data = await User.findAll({
    //     attributes: ['user_name'],
    //     include: {
    //         model: Contact,
    //         attributes: ["permanent_address", 'current_address']
    //     },
    //     where: { id: 2}
    // })
    const data = await Contact.findAll({
        attributes: ["permanent_address", 'current_address'],
        include: {
            model: User,
            attributes: ['user_name']
        },
        // where: { id: 2}
    })
    res.json({data: data})
}

// const createManyToManyUserthrough = async ( req, res) => {
//     const {user_name, permanent_address, current_address} = req.body;
//     const data = await User.create({user_name: user_name}, 
//         {fields: ['user_name']}
//         )
//         if (data) {
//             await Contact.create({permanent_address: permanent_address, current_address: current_address})
//         }
//         res.json(data)
// }

// const findManyToManyUserthrough = async (req, res) => {
//     const data = await Contact.findAll({
//         attributes: ['permanent_address', 'current_address'],
//         include: {
//             model: User,
//             attributes: ['user_name']
//         }
//     })
//     res.json({data: data})
// }

const createManyToManyUser = async ( req, res) => {
    const {user_name, permanent_address, current_address} = req.body;
    const data = await User.create({user_name: user_name}, 
        {fields: ['user_name']}
        )
        if (data) {
            await Contact.create({permanent_address: permanent_address, current_address: current_address})
        }
        res.json({data:data})
}

const findManyToManyUser = async (req, res) => {
    // const data = await User.findAll({
    //     attributes: ['user_name'],
    //     include: {
    //         model: Contact,
    //         attributes: ['permanent_address', 'current_address'],
    //     }
    // })
    const data = await Contact.findAll({
        attributes: ['permanent_address', 'current_address'],
        include: {
            model: User,
            attributes: ['user_name'],
        }
    })
    res.json({data: data})
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
    Operator,
    rawQueries,
    createOneToOneUser,
    fetchOneToOneUser,
    createOneToManyUser,
    fetchOneToManyUser,
    findManyToManyUser,
    createManyToManyUser
}