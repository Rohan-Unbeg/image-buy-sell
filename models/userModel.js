import { DataTypes } from "sequelize";
import { createDB } from "../config/db.js";

const User = createDB.define("user", {
    id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isSellor: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
});

export { User };
