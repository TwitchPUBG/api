const Router = require("koa-router");
const router = new Router();

router.use("/auth", require("./auth").routes());

module.exports = router;