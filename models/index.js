const {Sequelize, DataTypes} = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.USERDB, process.env.PASSWORD, {
    host: process.env.HOSTNAME,
    logging: false,
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize,DataTypes);
db.contact = require("./contact")(sequelize,DataTypes);
db.userContacts = require("./user_contacts")(sequelize, DataTypes, db.user, db.contact);

// db.user.hasOne(db.contact);
// db.contact.belongsTo(db.user);

// db.user.hasMany(db.contact);
// db.contact.belongsTo(db.user);

// db.user.belongsToMany(db.contact, { through: 'user_contacts'})
// db.contact.belongsToMany(db.user, { through: 'user_contacts'})


db.user.belongsToMany(db.contact, { through: db.userContacts })
db.contact.belongsToMany(db.user, { through: db.userContacts })

db.sequelize.sync({force: false});

module.exports = db;