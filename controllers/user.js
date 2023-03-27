const db = require("../models");

var User = db.user;

// const addUser = async(req, res) => {
// // const data = await User.create({user_name: "User 2", age: 21});
// const data = User.build({user_name: "User 1", age: 19});
// console.log(data instanceof User);
// console.log(data.user_name);
// // data.set({
// //     user_name: "newUser",
// //     age: 97
// // })
// // await data.update({
// //     user_name: "newUser Update",
// //     age: 56
// // })
// // await data.save();
// await data.destroy();
// console.log("Data saved in the database");
// console.log(data.toJSON());
// res.status(200).json(data.toJSON());
// }

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
    if(postData.lenght>1){
    var data = await User.bulkCreate(postData);
}
else{
    var data = await User.create(postData);
}
    res.status(200).json({data: data});
}

module.exports = {
    // addUser,
    getUsers,
    getUserById,
    createUser
}