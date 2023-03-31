module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define("contacts", {
        permanent_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        current_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // userId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false
        // }
    }, {
        timestamps: false
    })
    return Contact;
}