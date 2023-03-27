module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("contacts", {
        permanent_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        current_address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
    
    })
    return Contact;
    }

// const {DataTypes} = require("sequelize");
// const sequelize = require("./index");

// const Contact = sequelize.define("contacts", {
//     permanent_address: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     current_address: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {

// })

// module.exports = Contact;