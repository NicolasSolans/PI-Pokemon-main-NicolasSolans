const { Router } = require("express");
const typeRouter = Router();
const { getTypes } = require("../handlers/typeHandler");

typeRouter.get("/", getTypes);

module.exports = typeRouter;
