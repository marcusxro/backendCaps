const mongoose = require('mongoose');

const atlasUri = 'connection';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (DeletedEquipment)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    DeletedEquipmentName: {
        type: String,
        required: true,
    },
    DeletedType: {
        type: String,
        required: true,
    },
    DeletedUsage: {
        type: String,
        required: true,
    },
    DeletedCondition: {
        type: String,
        required: true,
    },
    DeletedLocation: {
        type: String,
        required: true,
    },
    DeletedBrand: {
        type: String,
        required: true,
    },
    DeletedDate: {
        type: String,
        required: true,
    },
    DeletedFullname: {
        type: String,
        required: true,
    },
    CurrentUid: {
        type: String,
        required: true,
    },
    userNameDel: {
        type: String,
        required: true,
    },
});

const Menu = mongoose.model('DeletedEquipment', mySchema);

module.exports = Menu;
