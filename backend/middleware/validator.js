const { ValidationError } = require('../utils/errors');

// Validate server data
const validateServer = (req, res, next) => {
  const { name, description, status, repository, version } = req.body;

  // Validate required fields
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return next(new ValidationError('Server name is required and must be a non-empty string'));
  }

  // Validate optional fields if provided
  if (description && typeof description !== 'string') {
    return next(new ValidationError('Description must be a string'));
  }

  if (status && typeof status !== 'string') {
    return next(new ValidationError('Status must be a string'));
  }

  if (repository && typeof repository !== 'object') {
    return next(new ValidationError('Repository must be an object'));
  }

  if (version && typeof version !== 'string') {
    return next(new ValidationError('Version must be a string'));
  }

  next();
};

// Validate query parameters for listing servers
const validateListQuery = (req, res, next) => {
  const { page, limit, search, status } = req.query;

  // Validate page
  if (page && (isNaN(page) || parseInt(page) < 1)) {
    return next(new ValidationError('Page must be a positive integer'));
  }

  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1 || parseInt(limit) > 100)) {
    return next(new ValidationError('Limit must be between 1 and 100'));
  }

  // Validate search
  if (search && typeof search !== 'string') {
    return next(new ValidationError('Search must be a string'));
  }

  // Validate status
  if (status && typeof status !== 'string') {
    return next(new ValidationError('Status must be a string'));
  }

  next();
};

module.exports = {
  validateServer,
  validateListQuery,
};
