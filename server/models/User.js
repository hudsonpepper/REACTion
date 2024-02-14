const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  priorRuns: {
    type: [
      {
        datePlayed: {
          type: Date,
          default: Date.now,
          get: (timestamp) => dateFormat(timestamp),
        },
        runtime: {
          type: Number,
          default: 0,
        },
        difficultyModifier: {
          type: Number,
          default: 1,
        },
        targetNumber: {
          type: Number,
          default: 0,
        },
        score: {
          type: Number,
          default: 0,
        },
      }
    ],
    default: [],
  },
  statistics: {
    highScore: {
      type: Number,
      default: 0
    },
    runNumber: {
      type: Number,
      default: 0
    },
    avgScore: {
      type: Number,
      default: 0
    }
  }
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
