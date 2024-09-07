const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController'); // Adjust the path to your controller

// Route to create a new company
router.post('/companies', companyController.createCompany);

// Route to get company by name
router.get('/companies/:name', companyController.getCompanyByName);

// Route to update company by name
router.put('/companies/:name', companyController.updateCompanyByName);

// Route to delete company by id
router.delete('/companies/:id', companyController.deleteCompanyById);

module.exports = router;
