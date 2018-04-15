'use strict';
const assert = require("assert").strict;
const crypto = require("crypto");
const config = require("config");
const moment = require("moment");

assert(config.has("authTokens.bytes") === true, "missing 'authTokens.bytes' config")
assert(config.has("authTokens.lifetime") === true, "missing 'authTokens.lifetime' config");

module.exports = (sequelize, DataTypes) => {
	const AuthToken = sequelize.define("authToken", {
		userId: {
			type: DataTypes.UUID,
			references: {
				model: "users",
				key: "id"
			},
			onUpdate: "cascade",
			onDelete: "cascade"
		},
		token: {
			type: DataTypes.BLOB,
			allowNull: false,
			primaryKey: true,
			defaultValue: () => crypto.randomBytes(config.get("authTokens.bytes"))
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: () => moment().add(config.get("authTokens.lifetime.amount"), config.get("authTokens.lifetime.unit"))
		}
	}, {
		timestamps: true,
		charset: "utf8",
		collate: "utf8_unicode_ci"
	});

	AuthToken.associate = (models) => {
		AuthToken.User = AuthToken.belongsTo(models.user);
	}

	AuthToken.prototype.toJSON = function() {
		let values = Object.assign({}, this.get());

		values.token = values.token.toString("base64");

		return values;
	}

	return AuthToken;
};
