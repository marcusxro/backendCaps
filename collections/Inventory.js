const mongoose = require('mongoose');

const atlasUri = 'mongodb+srv://marcussalopaso1:zedmain1525@cluster0.m8fd2iw.mongodb.net/cafe';

mongoose.connect(atlasUri, {

    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,  // For deprecated findOneAndUpdate()
    useUnifiedTopology: true  // Remove this line if using MongoDB Node.js Driver version 4.0.0 and above

  
})
  .then(() => {
    console.log("Connected to MongoDB Atlas (inventory)");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB Atlas:", e);
  });

const mySchema = new mongoose.Schema({
  ProductName: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    required: true,
  },
  Weight: {
    type: String,
    required: true,
  },
  Quantity: {
    type: String,
    required: true,
  },
  ExpiryDate: {
    type: String,
    required: true,
  },
  Condition: {
    type: String,
    required: true,
  },
  OverQuan: {
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
  EditedUid: {
    type: String,
  }
});

const Menu = mongoose.model('menu', mySchema);

module.exports = Menu;
