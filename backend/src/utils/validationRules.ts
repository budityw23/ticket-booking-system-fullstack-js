import { body, param, query } from 'express-validator';

export const commonValidationRules = {
  pagination: [
    query('page')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Page must be a positive integer'),
    query('limit')
      .optional()
      .isInt({ min: 1, max: 100 })
      .withMessage('Limit must be between 1 and 100')
  ],

  id: [param('id').isMongoId().withMessage('Invalid ID format')]

  // Add more common validation rules here
};
