const assert = require("assert").strict;
const passport = require("passport");
const config = require("config");
const TwitchStrategy = require("passport-twitch").Strategy;
const db = require("./db");
const security = require("./security");
const User = db.model("user");

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