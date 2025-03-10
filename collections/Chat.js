const mongoose = require('mongoose');

const atlasUri = 'connection';

mongoose.connect(atlasUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (chat)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
});


const Ingredients = mongoose.model('Chat', mySchema);

module.exports = Ingredients;
