const consentOptions = [{
		key: "newsletter",
		description: "send you newsletters about developments of the platform",
		since: "2018-04-15",
		deprecated: false
	}, {
		key: "monitorStream",
		description: "check and monitor the online status of your stream",
		since: "2018-04-15",
		deprecated: false
	}, {
		key: "monitorChat",
		description: "monitor your stream chat and process all chat messages (ignoring all unrelated messages and " +
			"only storing timestamps, usernames, ranks, subscriber status and input on our commands)",
		since: "2018-04-15",
		deprecated: false
	}, {
		key: "keepHistory",
		description: "keep a history of created sessions, rounds and the users who participated in these rounds",
		since: "2018-04-15",
		deprecated: false
	}, {
		key: "webPromotion",
		description: "show your Twitch username and channel on our website as 'people who use our product'",
		since: "2018-04-15",
		deprecated: false
	}
];

const consentOptionsKV = {};

consentOptions.forEach((consentOption) => {
	let temp = Object.assign({}, consentOption);
	delete temp.key;
	consentOptionsKV[consentOption.key] = temp;
});

module.exports.get = (asArray = false) => {
	if (!asArray) {
		return consentOptionsKV;
	}

	return consentOptions;
};
