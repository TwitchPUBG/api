'use strict';

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define("user", {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		twitchId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		twitchName: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		accessToken: {
			type: DataTypes.BLOB,
			allowNull: false
		},
		refreshToken: {
			type: DataTypes.BLOB,
			allowNull: false
		},
		botActive: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	}, {
			timestamps: true,
			charset: "utf8",
			collate: "utf8_unicode_ci"
		});

	User.associate = (models) => {
		
	}

	return User;
};
