const express = require('express');
const router = express.Router();
const marksheetController = require('../controllers/marksheetController');


router.get('/', marksheetController.index);


router.get('/:id', marksheetController.show);


router.post('/', marksheetController.store);


router.put('/:id', marksheetController.update);


router.delete('/:id', marksheetController.destroy);

module.exports = router;
