const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)

      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.error(error)
      res.status(401).json({
        msg:'Not authorized, token failed'
      })
    }
  }

  if (!token) {
    res.status(401).json({
      msg:'Not authorized, no token'
    })
  }
})

const admin = (req, res, next) => {
  if (req.user && req.user.role === 1) {
    next()
  } else {
    res.status(401).json({
      msg:'Not authorized as an store admin'
    })
  }
}




module.exports = {
	protect,
	admin
}