// mockMiddlewares.js
const authenticateUser = (req, res, next) => {
    console.log('Middleware authenticateUser deshabilitado');
    next();
  };
  
  const checkPermission = (resource, action) => {
    return (req, res, next) => {
      console.log(`Middleware checkPermission deshabilitado para ${resource} - ${action}`);
      next();
    };
  };
  
  module.exports = { authenticateUser, checkPermission };
  