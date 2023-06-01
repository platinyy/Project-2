const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/recipe/:id/reviews', reviewsCtrl.create);


//delete reviews 
router.delete('/reviews/:id', reviewsCtrl.delete);
module.exports = router;