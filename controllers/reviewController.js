const Review = require('../models/reviewModel'); // Adjust the path to your model

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { user_id, company_id, rating, review } = req.body;

    const newReview = await Review.create({
      user_id,
      company_id,
      rating,
      review,
    });

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get reviews by company_id
exports.getReviewsByCompanyId = async (req, res) => {
  try {
    const { company_id } = req.params;

    const reviews = await Review.findAll({ where: { company_id } });

    if (!reviews.length) {
      return res.status(404).json({ error: 'No reviews found for this company ID' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Update review by company_id (optional, based on requirements)
exports.updateReviewByCompanyId = async (req, res) => {
  try {
    const { company_id } = req.params;
    const { user_id, rating, review } = req.body;

    // Note: Updating reviews by company_id may affect multiple records.
    // Consider using a unique identifier for updates, such as review ID.
    const [updated] = await Review.update(
      { user_id, rating, review },
      { where: { company_id } }
    );

    if (updated) {
      const updatedReviews = await Review.findAll({ where: { company_id } });
      res.status(200).json(updatedReviews);
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete reviews by company_id
exports.deleteReviewsByCompanyId = async (req, res) => {
  try {
    const { company_id } = req.params;

    const deleted = await Review.destroy({ where: { company_id } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Review not found' });
    }
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
