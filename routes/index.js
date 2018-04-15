const Router = require("koa-router");
const router = new Router();

router.use("/auth", require("./auth").routes());
router.use("/users", require("./users").routes());

module.exports = router;