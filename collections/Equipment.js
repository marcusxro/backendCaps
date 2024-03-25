const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/cafe';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (Equipment)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    EquipmentName: {
        type: String,
        required: true,
    },
    Type: {
        type: String,
        required: true,
    },
    Usage: {
        type: String,
        required: true,
    },
    Condition: {
        type: String,
        required: true,
    },
    Location: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Uid: {
        type: String,
        required: true,
    },
});


const Equipment = mongoose.model('Equipment', mySchema);

module.exports = Equipment;
