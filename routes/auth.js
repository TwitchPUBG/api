const Router = require("koa-router");
const router = new Router();
const passport = require("koa-passport");
const AuthToken = require("../core/db").model("authToken");

router.get("/", passport.authenticate("twitch"));

router.get("/me", passport.authenticate("bearer", { session: false }), async (ctx, next) => {
	ctx.type = "json";
	ctx.body = ctx.req.user;
	return next();
});

router.get("/callback", async (ctx, next) => {
	return passport.authenticate("twitch", async (err, user, info, status) => {
		if (err) {
			throw err;
		}

		let authToken = new AuthToken({
			userId: user.id
		});

		await authToken.save();

		ctx.type = "json";
		ctx.body = {
			user,
			authToken
		};

		return next();
	})(ctx, next);
});

module.exports = router;