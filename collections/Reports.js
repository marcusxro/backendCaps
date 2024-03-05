const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/cafe';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (reports)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  Incident: {
    type: String,
    required: true,
  },
  RepType: {
    type: String,
    required: true,
  },
  RepDetails: {
    type: String,
    required: true,
  },
  isResolved: {
    type: Boolean,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Fullname: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
});



const Reports = mongoose.model('reports', mySchema);

module.exports = Reports;
