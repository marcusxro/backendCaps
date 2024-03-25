const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/cafe';

mongoose.connect(atlasUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to MongoDB Atlas (DeletedIng)");
    })
    .catch((e) => {
        console.error("Error connecting to MongoDB Atlas:", e);
    });

const mySchema = new mongoose.Schema({
    DeletedIngName: {
        type: String,
        required: true,
    },
    DeletedWeight: {
        type: String,
        required: true,
    },
    DeletedCategory: {
        type: String,
        required: true,
    },
    DeletedMeasure: {
        type: String,
        required: true,
    },
    DeletedQuantity: {
        type: String,
        required: true,
    },
    DeletedEmail: {
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
    userNameDel: {
        type: String,
        required: true,
    },
});

const Menu = mongoose.model('DeletedIng', mySchema);

module.exports = Menu;
