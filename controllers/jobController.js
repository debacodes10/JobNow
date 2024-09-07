const Job = require('../models/jobModel'); // Adjust the path to your model

// Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, company_name, company_website, location, employment_type, salary_range, experience_level, posted_by } = req.body;

    const newJob = await Job.create({
      title,
      description,
      company_name,
      company_website,
      location,
      employment_type,
      salary_range,
      experience_level,
      posted_by,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
};

// Get jobs by company_name
exports.getJobsByCompanyName = async (req, res) => {
  try {
    const { company_name } = req.params;

    const jobs = await Job.findAll({ where: { company_name } });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found for this company name' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by company name:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching all jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Get jobs by employment_type
exports.getJobsByEmploymentType = async (req, res) => {
  try {
    const { employment_type } = req.params;

    const jobs = await Job.findAll({ where: { employment_type } });

    if (!jobs.length) {
      return res.status(404).json({ error: 'No jobs found for this employment type' });
    }

    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs by employment type:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

// Update job by id
exports.updateJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, company_name, company_website, location, employment_type, salary_range, experience_level, posted_by } = req.body;

    const [updated] = await Job.update(
      { title, description, company_name, company_website, location, employment_type, salary_range, experience_level, posted_by },
      { where: { id } }
    );

    if (updated) {
      const updatedJob = await Job.findOne({ where: { id } });
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Failed to update job' });
  }
};

// Delete job by id
exports.deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Job.destroy({ where: { id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Job not found' });
    }
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ error: 'Failed to delete job' });
  }
};
