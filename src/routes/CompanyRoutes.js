const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController.js'); // Update with the correct path

// Route to create a new company
router.post('/companies', companyController.createCompany);

// Route to update an existing company
router.put('/companies/:id', companyController.updateCompany);

// Route to delete an existing company
router.delete('/companies/:id', companyController.deleteCompany);

module.exports = router;
