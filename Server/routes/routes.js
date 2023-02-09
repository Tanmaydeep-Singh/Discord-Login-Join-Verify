const express = require("express");
const router = express.Router();
const {getLoginInfo, getDetails, joinChannel, getUserGuilds} = require('../controllers/contollers');  



router.route("/login").get(getLoginInfo);
router.route("/callback").get(getDetails);
router.route('/joinChannel').get(joinChannel);
router.route('/getUserGuilds').get(getUserGuilds);



module.exports = router;




