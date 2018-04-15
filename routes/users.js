const Router = require("koa-router");
const router = new Router();
const passport = require("koa-passport");

router.use(passport.authenticate("bearer", { session: false }));

router.get("/:userId", async (ctx, next) => {
	if (ctx.params.userId !== ctx.req.user.id) {
		return ctx.throw(403, "forbidden");
	}

	ctx.type = "json";
	ctx.body = ctx.req.user;
	return next();
});

router.get("/:userId/consent", async (ctx, next) => {
	if (ctx.params.userId !== ctx.req.user.id) {
		return ctx.throw(403, "forbidden");
	}

	let consent = {};

	(await ctx.req.user.getConsents()).forEach((option) => {
		consent[option.key] = option.given;
	});

	ctx.type = "json";
	ctx.body = consent;
	return next();
});

module.exports = router;