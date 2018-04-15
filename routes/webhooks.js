const Router = require("koa-router");
const router = new Router();
const passport = require("koa-passport");
const Webhook = require("../core/db").model("webhook");

router.get("/:userId", async (ctx, next) => {
	console.log(ctx.request.headers);
	console.log(ctx.request.query);
	console.log(ctx.params);

	ctx.body = ctx.request.query["hub.challenge"];

	return next();
});

router.post("/:userId", async (ctx, next) => {
	/*let webhook = await Webhook.findOne({
		where: {
			userId: ctx.params.userId
		}
	});

	if (!webhook) {
		return ctx.throw(400, "invalidStream");
	}*/

	console.log(ctx.request.headers)
	console.log(ctx.request.body);
	console.log(ctx.params);

	ctx.type = "json";
	ctx.body = ctx.req.user;
	return next();
});

module.exports = router;