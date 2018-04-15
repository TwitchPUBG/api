const assert = require("assert").strict;
const config = require("config");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const keyPath = path.resolve(config.get("security.keyPath"));

let key;
const algorithm = "aes-256-cbc";

try {
	key = fs.readFileSync(keyPath);
	console.log("[Core/Security] Loaded key file");
} catch (err) {
	console.error("[Core/Security] Problem opening key file");
	process.exit(1);
}

module.exports.encrypt = (decrypted) => {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(algorithm, key, iv);
	return Buffer.concat([iv, cipher.update(decrypted), cipher.final()]);
};

module.exports.decrypt = (encrypted) => {
	const iv = encrypted.slice(0, 16);
	const cipher = encrypted.slice(16);
	const decipher = crypto.createDecipheriv(algorithm, key, iv);
	let decrypted = decipher.update(cipher);
	let final = decipher.final();
	return Buffer.concat([decrypted, final]);
};