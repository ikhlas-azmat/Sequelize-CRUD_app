module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', {
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "users",
    // timestamps: false
})

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

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