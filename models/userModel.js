const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  passwordChangedAt: Date,
  photo: {
    type: String,
    default: 'default.jpg',
  },
});

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  // Only run this function if password was modified
  if (!this.isModified('password')) return next();
  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined; // Remove passwordConfirm field after hashing
  next();
});

// Instance method to check if password is correct

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  // Compare the passwords using bcrypt
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to check if password has been changed after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // Check if password was changed after the token was issued
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp; // Token is invalid if it was issued before the password was changed
  }
  // If password was not changed, return false
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
