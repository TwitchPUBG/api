'use strict';

module.exports = (sequelize, DataTypes) => {
	const Consent = sequelize.define("consent", {
		userId: {
			type: DataTypes.UUID,
			references: {
				model: "users",
				key: "id"
			},
			onUpdate: "cascade",
			onDelete: "cascade",
			primaryKey: true
		},
		key: {
			type: DataTypes.STRING,
			primaryKey: true
		},
		given: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			allowNull: false
		}
	}, {
		tableName: "consent",
		timestamps: false,
		charset: "utf8",
		collate: "utf8_unicode_ci"
	});

	Consent.associate = (models) => {
		Consent.User = Consent.belongsTo(models.user);
	}

	return Consent;
};
