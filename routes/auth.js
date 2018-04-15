const Router = require("koa-router");
const router = new Router();
const passport = require("koa-passport");

router.get("/", passport.authenticate("twitch"));

router.get("/callback", async (ctx, next) => {
	return passport.authenticate("twitch", async (err, user, info, status) => {
		ctx.body = "test";
		return next();
	})(ctx);
});

module.exports = router;