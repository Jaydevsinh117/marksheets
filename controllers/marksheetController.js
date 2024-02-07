const { response } = require('express');
const Marksheet = require('../models/marksheet');

// Show the list of Marksheets
const index = async (req, res, next) => {
    try {
        const response = await Marksheet.find();
        res.status(200).json({
            data: response,
            message: '200 OK: Request successful. Data retrieved.'
        });
    } catch (error) {
        res.status(500).json({
            message: '500 Internal Server Error: An error occurred while processing the request.'
        });
    }
};


// Show single marksheet
const show = (req, res, next) => {
    let rollno = req.params.rollno;
    Marksheet.findOne({ rollno })
        .then(response => {
            if (response) {
                res.status(200).json({
                    response,
                    message: '200 OK: Request successful. Data retrieved.'
                });
            } else {
                res.status(404).json({
                    message: '404 Not Found: The requested resource was not found on the server.'
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: '500 Internal Server Error: An error occurred while processing the request.'
            });
        });
};


// Add new marksheet
const store = (req, res, next) => {
    let marksheet = new Marksheet({
        rollno: req.body.rollno,
        name: req.body.name,
        maths: req.body.maths,
        science: req.body.science,
        english: req.body.english
    });
    marksheet.save()
        .then(response => {
            res.status(201).json({
                message: '201 Created: Marksheet Added Successfully!'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: '500 Internal Server Error: An error occurred while processing the request.'
            });
        });
};

const update = async (req, res) => {
    try {
        let rollno = req.params.id;

        let updatedData = req.body;

        const updatedDocument = await Marksheet.findByIdAndUpdate(
            rollno,
            { $set: updatedData },
            { new: true }
        );

        if (!updatedDocument) {
            return res.status(404).json({ message: '404 Not Found: Marksheet not found.' });
        }

        res.status(200).json({
            message: '200 OK: Marksheet updated successfully!',
            data: updatedDocument
        });
    } catch (error) {
        console.error('Error updating marksheet:', error);
        res.status(500).json({
            message: '500 Internal Server Error: An error occurred while updating the marksheet.',
            error: error.message
        });
    }
};

const destroy = async (req, res) => {
    try {
        let id = req.params.id;
        const deletedDocument = await Marksheet.findOneAndDelete({ _id: id });

        if (!deletedDocument) {
            return res.status(404).json({ message: '404 Not Found: Marksheet not found.' });
        }

        res.status(200).json({
            message: '200 OK: Marksheet deleted successfully!',
            data: deletedDocument
        });
    } catch (error) {
        console.error('Error deleting marksheet:', error);
        res.status(500).json({
            message: '500 Internal Server Error: An error occurred while deleting the marksheet.',
            error: error.message
        });
    }
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
