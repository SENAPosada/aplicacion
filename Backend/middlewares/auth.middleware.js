const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
// const catchAsync = require("./../utils/catchAsync");
// const AppError = require("./../utils/appError");
// const dotenv = require("dotenv");

// dotenv.config();

exports.protectSession = async (req, res, next) => {
  // Get token
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Extract token
    // req.headers.authorization = 'Bearer token'
    token = req.headers.authorization.split(" ")[1]; // -> [Bearer, token]
  }

  // Check if the token was sent or not
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Verify the token's owner
  const user = await Usuarios.findOne({
    where: { id: decoded.id },
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Grant access
  req.sessionUser = user;
  next();
};

exports.protectAdmin = (req, res, next) => {
  const { sessionUser } = req;

  if (sessionUser.role !== "admin") {
    return next(new AppError("You do not have the right access level.", 403));
  }

  next();
};

// exports.authorizeRoles = (...allowedRoles) => {
//   return (req, res, next) => {
//     const userRoles = req.sessionUser.roles;
//     const hasPermission = userRoles.some((role) => allowedRoles.includes(role));
//     if (!hasPermission) {
//       return res
//         .status(403)
//         .json({ message: "No tienes permisos suficientes" });
//     }
//     next();
//   };
// };
