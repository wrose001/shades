const router = require('express').Router();
var db = require("../../models")

router.route('/createReview').post((req, res) => {
  db.review.create({
    stars: req.body.rating,
    reviewUser: req.body.name,
    reviewHeadline: req.body.headline,
    reviewBody: req.body.reviewbody,
    itemID: req.body.itemID
  }).then(data => {
    res.json(data);
  });
});

router.route('/getReview/:itemID').get((req, res) => {
  db.review.find({
    itemID: req.params.itemID
  }).then(data => {
    res.json(data);
  });
});

module.exports = router;