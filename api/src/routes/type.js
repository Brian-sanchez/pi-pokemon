const { Router } = require("express");
const { getPkTypes } = require("../controllers/types");
const router = Router();

router.get("/", getPkTypes); // Get type

module.exports = router;