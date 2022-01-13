const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i.test(v);
      },
      message: 'Poster is not valid adres',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i.test(v);
      },
      message: 'Trailer is not valid adres',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(w{3}\.)?([\w\W]+\.\w{2,}([\w\W]+)?#?)/i.test(v);
      },
      message: 'Poster is not valid adres',
    },
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
