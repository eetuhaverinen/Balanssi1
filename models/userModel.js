const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['patient', 'nurse'],
    default: 'patient',
   },
  nimi:{
    type: String,
    required: true,
  },
  syntymaAika: {
    type: Date,
    required: true,
  },
  pituus: {
    type: Number,
    required: true,
  },
  paino: {
    type: Number,
    required: true,
  },
  sukupuoli: {
    type: String,
    enum: ['mies', 'nainen', 'muu'],
    required: true,
  },
  leposyke: {
    type: Number,
    required: true,
  },
  maksimisyke: {
    type: Number,
    required: true,
  },
  BHbA1c: {
    type: Number,
  }

});
 

// static signup method
userSchema.statics.signup = async function (email, password, nimi, syntymaAika, pituus, paino, sukupuoli, leposyke, maksimisyke, BHbA1c) {
  // validation
  if (!email || !password || !nimi || !syntymaAika || !pituus || !paino || !sukupuoli || !leposyke || !maksimisyke || !BHbA1c) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email not valid');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error('Email already in use');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash, nimi, syntymaAika, pituus, paino, sukupuoli, leposyke, maksimisyke, BHbA1c});

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
