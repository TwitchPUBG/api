require("dotenv").config();
const assert = require("assert").strict;
const config = require("config");
const Koa = require("koa");
const app = new Koa();

require("./core/passport");
require("./core/db");

// Request time
app.use(async (ctx, next) => {
	const start = Date.now();
	await next();
	const ms = Date.now() - start;
	ctx.set("X-Response-Time", `${ms}ms`);
});

app.use(require("koa-bodyparser")());

const passport = require("koa-passport");
app.use(passport.initialize());

app.use(require("./routes").routes());

assert(config.has("web.port") === true, "missing 'web.port' config");
app.listen(config.get("web.port"));