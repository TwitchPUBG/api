'use strict';
const assert = require("assert").strict;
const crypto = require("crypto");
const config = require("config");
const moment = require("moment");

assert(config.has("twitch.webhooks.lifetime") === true, "missing 'twitch.webhooks.lifetime' config");

module.exports = (sequelize, DataTypes) => {
	const Webhook = sequelize.define("webhook", {
		userId: {
			type: DataTypes.UUID,
			references: {
				model: "users",
				key: "id"
			},
			onUpdate: "cascade",
			onDelete: "cascade"
		},
		secret: {
			type: DataTypes.BLOB,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			allowNull: true
		},
		lastActivity: {
			type: DataTypes.DATE,
			allowNull: true
		},
		expiresAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: () => moment().add(
				config.get("twitch.webhooks.lifetime.amount"),
				config.get("twitch.webhooks.lifetime.unit")
			)
		}
	}, {
		timestamps: false,
		charset: "utf8",
		collate: "utf8_unicode_ci"
	});

	Webhook.associate = (models) => {
		Webhook.User = Webhook.belongsTo(models.user);
	}

	return Webhook;
};
