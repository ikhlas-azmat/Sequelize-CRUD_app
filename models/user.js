module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //     const rawValue = this.getDataValue('user_name');
        //     if(this.gender === "Male"){
        //     return rawValue ? 'Mr. ' +rawValue.toUpperCase() : null;
        // } else if (this.gender === "Female") {
        //     return rawValue ? 'Miss. ' +rawValue.toUpperCase() : null;
        // }
    },
    // gender: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    // email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     unique: true,
    //     validate: {
    //         isEmail: {
    //             args: true,
    //             msg: "Invalid Email Format"
    //         },
    //     }
    // },
    // contactno:{
    //     type: DataTypes.BIGINT,
    //     allowNull: false,
    //     unique: true,
    //     validate:{
    //         is: /^[3]{1}[0-9]{9}$/
    //         // is: /^[0]{1}[3]{1}[0-9]{9}$/
    //     }
    // },
    // password: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate:{
    //         min: 8,
    //         max: 23
    //     }
    // }
}, {
    tableName: "users",
    // timestamps: false
})
return User;
}

// const {DataTypes} = require("sequelize");
// const sequelize = require("./index");

// const User = sequelize.define('User', {
//     user_name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     age: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     }
// }, {
//     tableName: "users",
//     // timestamps: false
// })

// // `sequelize.define` also returns the model
// console.log(User === sequelize.models.User); // true

// module.exports = User;