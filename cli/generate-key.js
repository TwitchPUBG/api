require("dotenv").config();
const config = require("config");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const keyPath = path.resolve(config.get("security.keyPath"));

console.log(`attempting to check for key at ${keyPath}`);

try {
	fs.statSync(keyPath);
	console.error(`file already exists, not overwriting`);
} catch (err) {
	if (err.code !== "ENOENT") {
		console.error(`an error occurred trying to open the file`, err);
		return;
	}
}

console.log(`generating ${config.get("security.keyBytes")} byte key`);
const keyBytes = crypto.randomBytes(config.get("security.keyBytes"));

try {
	fs.writeFileSync(keyPath, keyBytes);
} catch (err) {
	console.error(`an error occurred trying to save the file`, err);
	return;
}

console.log(`saved new key to ${keyPath}`);