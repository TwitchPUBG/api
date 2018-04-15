const assert = require("assert").strict;
const passport = require("passport");
const config = require("config");
const TwitchStrategy = require("passport-twitch").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const db = require("./db");
const security = require("./security");
const User = db.model("user");
const AuthToken = db.model("authToken");

assert(config.has("twitch.clientId") === true, "missing 'twitch.clientId' config");
assert(config.has("twitch.clientSecret") === true, "missing 'twitch.clientSecret' config");
assert(config.has("twitch.callbackUrl") === true, "missing 'twitch.callbackUrl' config");
assert(config.has("twitch.username") === true, "missing 'twitch.username' config");

passport.use(new TwitchStrategy({
	clientID: config.get("twitch.clientId"),
	clientSecret: config.get("twitch.clientSecret"),
	callbackURL: config.get("twitch.callbackUrl"),
	scope: ""
}, async (accessToken, refreshToken, profile, done) => {
	let user = await User.findOne({
		where: {
			twitchId: profile.id
		}
	});

	if (!user) {
		user = new User({
			twitchId: profile.id
		});
	}

	user.twitchName = profile.displayName;
	user.accessToken = security.encrypt(accessToken);
	user.refreshToken = security.encrypt(refreshToken);

	await user.save();

	return done(null, user);
}));

passport.use(new BearerStrategy(async (token, done) => {
	try {
		let authToken = await AuthToken.findOne({
			where: {
				token: Buffer.from(token, "base64")
			},
			include: [{
				model: User
			}]
		});

		if (!authToken) {
			return done(null, false);
		}

		return done(null, authToken.user);
	} catch (err) {
		return done(err);
	}
}));