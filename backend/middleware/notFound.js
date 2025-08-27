const notFound = (req, res, next) => {
  const error = new Error(`❌ Not Found - ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    availableRoutes: {
      auth: '/api/auth',
      users: '/api/users',
      farmers: '/api/farmers',
      investors: '/api/investors',
      contracts: '/api/contracts',
      admin: '/api/admin',
      upload: '/api/upload',
      docs: '/api-docs',
      health: '/health'
    }
  });
};

module.exports = notFound;
