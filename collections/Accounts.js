const mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');

const atlasUri = 'connection', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (acc)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
  },
  Firstname: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Position: {
    type: String,
    required: true,
  },
  isBanned: {
    type: Boolean,
  },
  Password: {
    type: String,
    required: true,
  },
  Uid: {
    type: String,
    required: true,
  },
});

const ACCcollection = mongoose.model('account', mySchema);

module.exports = ACCcollection;
