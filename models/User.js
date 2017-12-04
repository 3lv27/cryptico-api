const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const User = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    location: String,
    bio: String,
    social: {
        linkedin: String,
        twitter: String
    },
    favs: [{
        type: ObjectId,
        ref: 'Ico'
    }],
    picture: String 

}, {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });

const User = mongoose.model('User', UserSchema);

module.exports = User;