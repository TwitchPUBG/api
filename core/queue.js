const kue = require("kue");
const redisClient = require("./redis").client;

const queue = kue.createQueue({
	prefix: "tpb",
	redis: {
		createClientFactory: () => redisClient
	}
});