const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/cafe';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (Ingredients)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  IngName: {
    type: String,
    required: true,
  },
  Weight: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Measure: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
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

const Ingredients = mongoose.model('ingredients', mySchema);

module.exports = Ingredients;
