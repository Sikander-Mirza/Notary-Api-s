const Company = require('../models/Company.model.js'); // Update with the correct path to your Company model

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { 
      companyName,
      companyAddressLine1,
      companyAddressLine2,
      companyCity,
      companyState,
      companyZIP,
      preferredNotaryID,
      primaryContact,
      secondaryContact,
      thirdContact,
      fourthContact,
      requireKBA 
    } = req.body;

    // Create a new company document
    const newCompany = new Company({
      companyName,
      companyAddressLine1,
      companyAddressLine2,
      companyCity,
      companyState,
      companyZIP,
      preferredNotaryID,
      primaryContact,
      secondaryContact,
      thirdContact,
      fourthContact,
      requireKBA
    });

    // Save the company to the database
    const savedCompany = await newCompany.save();

    // Return the saved company in the response
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing company
const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updates = req.body;

    // Find the company by ID and update with the new data
    const updatedCompany = await Company.findByIdAndUpdate(
      companyId,
      updates,
      { new: true, runValidators: true } // Options to return the updated document and run validators
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Return the updated company in the response
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an existing company
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find the company by ID and delete it
    const deletedCompany = await Company.findByIdAndDelete(companyId);

    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Return a success message
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany
};
