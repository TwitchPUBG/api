const assert = require("assert").strict;
const config = require("config");
const redis = require("redis");
const promisify = require("util").promisify;

assert(config.has("redis.host") === true, "missing 'redis.host' config");
assert(config.has("redis.port") === true, "missing 'redis.port' config");
assert(config.has("redis.password") === true, "missing 'redis.password' config");

const client = redis.createClient(config.get("redis"));

module.exports = {
	client,
	get: promisify(client.get).bind(client),
	set: promisify(client.set).bind(client)
};