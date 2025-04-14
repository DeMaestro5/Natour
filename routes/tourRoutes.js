const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkId);

const { getAllTours, createNewTour, getTourById, updateTour, deleteTour } =
  tourController;

router.route('/').get(getAllTours).post(createNewTour);
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour);

module.exports = router;
