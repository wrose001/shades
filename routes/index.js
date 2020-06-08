const path = require("path");
const router = require("express").Router();
const passport = require("../passport");
const routeHelper = require('./utils/routeHelper');

const apiRoutes = require("./api/apiRoutes");

// API Routes
router.use(apiRoutes);

/* OAuth Github Routes */
router.get("/login", passport.authenticate('github'));

router.get('/auth', passport.authenticate('github', { session: false, failureRedirect: routeHelper() }), function (req, res) {
  // Succesful authentication! 
  // Store the generated jwt in the client cookie
  res.cookie('jwt', req.user.jwtToken);
  res.redirect(routeHelper());
});
// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;