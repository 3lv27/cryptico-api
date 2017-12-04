const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const Ico = new Schema({
    name: String,
    email: String,
    category:{
        type: [String],
        enum: ['Business Services', 'Financial', 'Retail', 'Health', 'Sports', 'Tourism', 'Media', 'Education', 'Real State', 'Entertainment', 'Games']
    }
    country: String,
    links: {
        website: String,
        whitepaper: String,
        social: [] ?
    },
    date: {
        preIco: {
            start: Date,
            end: Date
        },
        ico: {
            start: Date,
            end: Date
        },
    },
    picture: String, 
    platform: String,
    token: {
        name: String,
        type: String,
        unitPrice: Number,

    },
    owner: String,
    team: {
        name: String,
        position: String,
        linkedin: String,
        picture: String
    },
    logo: String,
    video: String,
    rating:[{
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