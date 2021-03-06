const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const IcoSchema = new Schema({
  data: {
    name: String,
    email: String,
    country: String,
    logo: String,
    video: String,
    category: {
      type: [String],
      enum: ['Business Services', 'Financial', 'Retail', 'Health', 'Sports', 'Tourism', 'Media', 'Education', 'Real State', 'Entertainment', 'Games']
    }
  },
  links: {
    website: String,
    whitepaper: String,
    social: [{
      linkedin: String,
      facebook: String,
      twitter: String,
      instagram: String,
      telegram: String,
      medium: String
    }]
  },
  date: {
    preIco: {
      start: Date,
      end: Date
    },
    ico: {
      start: Date,
      end: Date
    }
  },
  token: {
    name: String,
    platform: String,
    type: String,
    unitPrice: Number
  },
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  team: {
    name: String,
    position: String,
    linkedin: String,
    picture: String
  },
  rating: [{
    type: ObjectId,
    ref: 'User'
  },
  {
    type: Number,
    min: 1,
    max: 5
  }]
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

const Ico = mongoose.model('Ico', IcoSchema);

module.exports = Ico;
