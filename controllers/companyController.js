const Company = require('../models/companyModel'); // Adjust the path to your model

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const { name, website, industry, size, location } = req.body;

    const newCompany = await Company.create({
      name,
      website,
      industry,
      size,
      location,
    });

    res.status(201).json(newCompany);
  } catch (error) {
    console.error('Error creating company:', error);
    res.status(500).json({ error: 'Failed to create company' });
  }
};

// Get company by name
exports.getCompanyByName = async (req, res) => {
  try {
    const { name } = req.params;

    const company = await Company.findOne({ where: { name } });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.status(200).json(company);
  } catch (error) {
    console.error('Error fetching company by name:', error);
    res.status(500).json({ error: 'Failed to fetch company' });
  }
};

// Update company by name
exports.updateCompanyByName = async (req, res) => {
  try {
    const { name } = req.params;
    const { website, industry, size, location } = req.body;

    const [updated] = await Company.update(
      { website, industry, size, location },
      { where: { name } }
    );

    if (updated) {
      const updatedCompany = await Company.findOne({ where: { name } });
      res.status(200).json(updatedCompany);
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ error: 'Failed to update company' });
  }
};

// Delete company by id
exports.deleteCompanyById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Company.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Company not found' });
    }
  } catch (error) {
    console.error('Error deleting company:', error);
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
