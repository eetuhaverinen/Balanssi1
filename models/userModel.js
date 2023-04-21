const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message: 'Password not strong enough',
    },
  },
  role: {
    type: String,
    enum: ['patient', 'nurse'],
    default: 'patient',
  },
  nimi: {
    type: String,
    required: true,
  },
  syntymaAika: {
    type: Date,
    required: true,
  },
  pituus: {
    type: Number,
    required: function () {
      return this.role === 'patient';
    },
  },
  paino: {
    type: Number,
    required: function () {
      return this.role === 'patient';
    },
  },
  sukupuoli: {
    type: String,
    enum: ['mies', 'nainen', 'muu'],
    required: function () {
      return this.role === 'patient';
    },
  },
  leposyke: {
    type: Number,
    required: function () {
      return this.role === 'patient';
    },
  },
  maksimisyke: {
    type: Number,
    required: function () {
      return this.role === 'patient';
    },
  },
  BHbA1c: {
    type: Number,
  },
});

// static signup method
userSchema.statics.signup = async function (
  email,
  password,
  role,
  nimi,
  syntymaAika,
  pituus,
  paino,
  sukupuoli,
  leposyke,
  maksimisyke,
  BHbA1c
) {
  // validation
  if (!email || !password || !role || !nimi) {
    throw Error('All fields must be filled');
  }

  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }

  if (role === 'patient' && (!syntymaAika || !pituus || !paino || !sukupuoli || !leposyke || !maksimisyke)) {
    throw Error('All patient fields must be filled');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    role,
    nimi,
    syntymaAika,
    pituus,
    paino,
    sukupuoli,
    leposyke,
    maksimisyke,
    BHbA1c,
  });

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
