 const jwt = require('jsonwebtoken');
 const User = require('../models/User');
 exports.authenticateToken = async (req, res, next) => {
 try {
 const authHeader = req.headers.authorization;
 const token = authHeader && authHeader.split(' ')[^1];
 if (!token) {
 return res.status(401).json({
 success: false,
 message: 'Access token required'
 });
 }
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 const user = await User.findById(decoded.userId);
 if (!user || !user.isActive) {
 return res.status(401).json({
 success: false,
 message: 'Invalid token or user deactivated'
 });
 }
 req.user = user;
 next();
 } catch (error) {
 return res.status(403).json({
 success: false,
 message: 'Invalid or expired token'
 });
 }
 };
 exports.requireAdmin = (req, res, next) => {
 if (!req.user.isAdmin) {
 return res.status(403).json({
 success: false,
 message: 'Admin access required'
 });
 }
 next();
 };
