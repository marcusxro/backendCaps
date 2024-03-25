const express = require('express');
const cors = require('cors');
const AccCollection = require('./collections/Accounts') //acc db
const Inventory = require('./collections/Inventory') // inventory db
const Ingredients = require('./collections/Ingredients') // ingredients db
const Reports = require('./collections/Reports') //reports db
const Chat = require('./collections/Chat')
const Equipment = require('./collections/Equipment')
const IngReport = require('./collections/IngReport')// Ingredients reports DB
const EquipReport = require('./collections/EquipReport') // equipment reports DB
const DeletedInv = require('./collections/DeletedInv')
const DeletedEquipment = require('./collections/DeletedData')
const DeletedIng = require('./collections/DeletedIng')

const app = express();
const { ObjectId } = require('mongodb');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('connected');
});


app.post('/GetAcc', async (req, res) => {
  const { Email, Firstname, isBanned, Lastname, Position, Password, Uid } = req.body;
  try {
    const AccountInfo = new AccCollection({
      Email: Email,
      Firstname: Firstname,
      Lastname: Lastname,
      Position: Position,
      Password: Password,
      Uid: Uid,
      isBanned: isBanned
    });

    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.get('/accInfos', (req, res) => {
  AccCollection.find()
    .then((acc) => {
      res.json(acc)
    }).catch((err) => {
      console.log(err)
    })
})

app.put('/ban/:user', async (req, res) => {
  const commId = req.params.user;
  const {isBanned} = req.body; // Access req.body directly

  try {
    const result = await AccCollection.findByIdAndUpdate(commId, {
      $set: {
        isBanned: isBanned,
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//for sending product info
app.post('/postMenu', async (req, res) => {
  const { ProductName, Category, Weight, ExpiryDate, Condition, Quantity, OverQuan, Email, Fullname, Date, Uid } = req.body;
  try {
    const inventoryItems = new Inventory({
      ProductName: ProductName,
      Category: Category,
      Weight: Weight,
      Quantity: Quantity,
      OverQuan: OverQuan,
      ExpiryDate: ExpiryDate,
      Condition: Condition,
      Email: Email,
      Fullname: Fullname,
      Date: Date,
      Uid: Uid
    });

    await inventoryItems.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});




//for fetching the data to front end
app.get('/menuDetails', async (req, res) => {
  Inventory.find()
    .then((details) => {
      res.json(details)
    }).catch((err) => {
      console.log(err)
    })
})

//delete route
app.delete("/item/:id", async (req, res) => {
  const itemId = req.params.id; //delete item from client
  const data = await Inventory;
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); //finds the particular id to be deleted
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid ObjectId format'); //if invalid. this is  required
  } if (result.deletedCount === 1) { //success
    res.send("Document deleted successfully");
  } else {
    res.status(404).send("Document not found");
  }
});


//edit inventory
app.put('/editInventory/:item', async (req, res) => {
  const commId = req.params.item;
  const { ProductName, Weight, Condition, ExpiryDate, Quantity, Date } = req.body; // Access req.body directly

  try {
    const result = await Inventory.findByIdAndUpdate(commId, {
      $set: {
        ProductName: ProductName,
        Weight: Weight,
        ExpiryDate: ExpiryDate,
        Condition: Condition,
        Quantity: Quantity,
        Date: Date // Update Date field
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// edit/update product quantity
app.put('/editProduct/:itemId', async (req, res) => {
  const commId = req.params.itemId;
  const {Fullname, Quantity, OverQuan, EditedUid, Date } = req.body; // Access req.body directly
  try {
    const result = await Inventory.findByIdAndUpdate(commId, {
      $set: {
        Fullname: Fullname,
        OverQuan: OverQuan,
        Quantity: Quantity,
        EditedUid: EditedUid,
        Date: Date // Update Date field
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//Inventory for ingredients
//posting
app.post('/postIng', async (req, res) => {
  const { IngName, Weight, Measure, Category, Brand, ExpiryDate, Quantity, Email, Fullname, Date, Uid } = req.body;
  try {
    const ingredientsItem = new Ingredients({
      IngName: IngName,
      Weight: Weight,
      Measure: Measure,
      Brand: Brand,
      ExpiryDate: ExpiryDate,
      Category: Category,
      Quantity: Quantity,
      Email: Email,
      Fullname: Fullname,
      Date: Date,
      Uid: Uid
    });
    await ingredientsItem.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

//get the data from ingredients db

app.get('/getIng', async (req, res) => {
  Ingredients.find()
  .then((ing) => {
    res.json(ing)
  }).catch((err) => {
    console.log("theres some error", err)
  })
})
//delete data from ingredients db
app.delete("/ingItem/:id", async (req, res) => {
  const itemId = req.params.id; //delete item from client
  const data = await Ingredients;
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); //finds the particular id to be deleted
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid ObjectId format'); //if invalid. this is  required
  } if (result.deletedCount === 1) { //success
    res.send("Document deleted successfully");
  } else {
    res.status(404).send("Document not found");
  }
});
//edit ingredients
app.put('/editIng/:productId', async (req, res) => {
  const commId = req.params.productId;
  const { IngName, Weight, Quantity, Category, Date, Brand, ExpiryDate } = req.body; // Access req.body directly
  try {
    const result = await Ingredients.findByIdAndUpdate(commId, {
      $set: {
        IngName: IngName,
        Weight: Weight,
        Category: Category,
        Brand: Brand,
        ExpiryDate: ExpiryDate,
        Quantity: Quantity,
        Date: Date // Update Date field
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



//reports endpoints

//report create method

app.post('/reportCreate', async (req, res) => {
  const { Incident, RepType, isResolved, RepDetails, Email, Fullname, Date, Uid } = req.body;
  try {
    const reportsCreate = new Reports({
      Incident: Incident,
      RepType: RepType,
      isResolved: isResolved,
      RepDetails: RepDetails,
      Email: Email,
      Fullname: Fullname,
      Date: Date,
      Uid: Uid
    });

    

    await reportsCreate.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});


app.get('/getReports', async (req, res) => {
  Reports.find()
  .then((details) => {
    res.json(details)
  }).catch((err) => {
    console.log("error", err)
  })
})


//report edit
app.put('/reportEdit/:repId', async (req, res) => {
  const commId = req.params.repId;
  const { isResolved, Uid, Date } = req.body; // Access req.body directly

  try {
    const result = await Reports.findByIdAndUpdate(commId, {
      $set: {
        isResolved: isResolved,
        Uid: Uid,
        Date: Date 
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//chat endpoints

//chat send msg

app.post('/message', async (req, res) => {
  const { userName, Message, Date, Uid } = req.body;
  try {
    const sendMessage = new Chat({
      userName: userName,
      Message: Message,
      Date: Date,
      Uid: Uid
    });
    await sendMessage.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});
app.get('/getMessage', async (req, res) => {
  Chat.find()
  .then((response) => {
    res.json(response)
  }).catch((err) => {
    console.log(err)
  })
})
app.delete("/deleteMessage/:id", async (req, res) => {
  const itemId = req.params.id; //delete item from client
  const data = await Chat;
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); 
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid ObjectId format'); 
  } if (result.deletedCount === 1) { 
    res.send("Document deleted successfully");
  } else {
    res.status(404).send("Document not found");
  }
});


//equipmenmt 

app.post('/PostEquipement', async (req, res) => {
  const { EquipmentName, Type, Usage, Condition, Location, Brand, Date, Name, Uid } = req.body;
  try {
    const AccountInfo = new Equipment({
      EquipmentName: EquipmentName,
      Type: Type,
      Usage: Usage,
      Condition: Condition,
      Location: Location,
      Uid: Uid,
      Brand: Brand,
      Date: Date,
      Name: Name,
    });
    await AccountInfo.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.put('/equipment/:eqId', async (req, res) => {
  const commId = req.params.eqId;
  const { EquipmentName, Type, Usage, Condition, Location, Brand, Date, Name } = req.body; // Access req.body directly

  try {
    const result = await Equipment.findByIdAndUpdate(commId, {
      $set: {
        EquipmentName: EquipmentName,
        Type: Type,
        Usage: Usage,
        Condition: Condition,
        Location: Location,
        Brand: Brand,
        Date: Date,
        Name: Name,
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete("/deleteEquipment/:id", async (req, res) => {
  const itemId = req.params.id; //delete item from client
  const data = await Equipment;
  const result = await data.deleteOne({ _id: new ObjectId(itemId) }); 
  if (!itemId.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).send('Invalid ObjectId format'); 
  } if (result.deletedCount === 1) { 
    res.send("Document deleted successfully");
  } else {
    res.status(404).send("Document not found");
  }
});



app.get('/EquipGet', async (req, res) => {
  Equipment.find()
  .then((data) => {
    res.json(data)
  }).catch((err) => {
    console.log(err)
  })
})

//Ingredients Rep


app.post('/IngReport', async (req, res) => {
  const { Incident, RepType, isResolved, RepDetails, Email, Fullname, Date, Uid } = req.body;
  try {
    const reportsCreate = new IngReport({
      Incident: Incident,
      RepType: RepType,
      isResolved: isResolved,
      RepDetails: RepDetails,
      Email: Email,
      Fullname: Fullname,
      Date: Date,
      Uid: Uid
    });
    await reportsCreate.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

//edit
app.put('/IngReport/:repId', async (req, res) => {
  const commId = req.params.repId;
  const { isResolved, Uid, Date } = req.body; // Access req.body directly

  try {
    const result = await IngReport.findByIdAndUpdate(commId, {
      $set: {
        isResolved: isResolved,
        Uid: Uid,
        Date: Date 
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get the json
app.get('/getIngRep', async (req, res) => {
  IngReport.find()
  .then((item) => {
    res.json(item)
  }).catch((err) => {
    console.log(err)
  })
})




//Equipment Rep

app.post('/EquipRep', async (req, res) => {
  const { Incident, RepType, isResolved, RepDetails, Email, Fullname, Date, Uid } = req.body;
  try {
    const reportsCreate = new EquipReport({
      Incident: Incident,
      RepType: RepType,
      isResolved: isResolved,
      RepDetails: RepDetails,
      Email: Email,
      Fullname: Fullname,
      Date: Date,
      Uid: Uid
    });
    await reportsCreate.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

//edit
app.put('/EquipReport/:repId', async (req, res) => {
  const commId = req.params.repId;
  const { isResolved, Uid, Date } = req.body; // Access req.body directly

  try {
    const result = await EquipReport.findByIdAndUpdate(commId, {
      $set: {
        isResolved: isResolved,
        Uid: Uid,
        Date: Date 
      },
    });
    if (!result) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//get the json
app.get('/EquipReport', async (req, res) => {
  EquipReport.find()
  .then((item) => {
    res.json(item)
  }).catch((err) => {
    console.log(err)
  })
})




// for delete INV details
app.post('/DeletedInv', async (req, res) => {
  const { DeletedProductName, DeletedCategory, DeletedWeight,
    DeletedExpiryDate, DeletedCondition, DeletedQuantity,
     DeletedOverQuan, DeletedEmail, DeletedFullname, DeletedDate, DeletedUid, CurrentUid, userNameDel } = req.body;
  try {

    const inventoryItems = new DeletedInv({
      DeletedProductName: DeletedProductName,
      DeletedCategory: DeletedCategory,
      DeletedWeight: DeletedWeight,
      DeletedQuantity: DeletedQuantity,
      DeletedOverQuan: DeletedOverQuan,
      DeletedExpiryDate: DeletedExpiryDate,
      DeletedCondition: DeletedCondition,
      DeletedEmail: DeletedEmail,
      DeletedFullname: DeletedFullname,
      DeletedDate: DeletedDate,
      DeletedUid: DeletedUid,
      CurrentUid: CurrentUid,
      userNameDel: userNameDel
    });

    await inventoryItems.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.get('/GetDel', async (req, res) => {
  DeletedInv.find()
  .then((info) => {
    res.json(info)
  }).catch((err) => {
    console.log(err)
  })
})



// for deleted Equipment infos


app.post('/DeletedEquip', async (req, res) => {
  const { DeletedEquipmentName, DeletedType, DeletedUsage,
    DeletedBrand, DeletedCondition, DeletedLocation,
    DeletedDate, DeletedFullname, CurrentUid, userNameDel } = req.body;
  try {

    const inventoryItems = new DeletedEquipment({
      DeletedEquipmentName: DeletedEquipmentName,
      DeletedType: DeletedType,
      DeletedUsage: DeletedUsage,
      DeletedBrand: DeletedBrand,
      DeletedCondition: DeletedCondition,
      DeletedLocation: DeletedLocation,
      DeletedDate: DeletedDate,
      DeletedFullname: DeletedFullname,
      CurrentUid: CurrentUid,
      userNameDel: userNameDel
    });

    await inventoryItems.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});
app.get('/GetDelEq', async (req, res) => {
  DeletedEquipment.find()
  .then((info) => {
    res.json(info)
  }).catch((err) => {
    console.log(err)
  })
})



//for deleted Eq
app.post('/DeletedIng', async (req, res) => {
  const { DeletedIngName, DeletedWeight, DeletedCategory, DeletedMeasure, DeletedQuantity,
    DeletedEmail, DeletedDate, DeletedFullname, userNameDel } = req.body;
  try {

    const inventoryItems = new DeletedIng({
      DeletedIngName: DeletedIngName,
      DeletedWeight: DeletedWeight,
      DeletedCategory: DeletedCategory,
      DeletedMeasure: DeletedMeasure,
      DeletedQuantity: DeletedQuantity,
      DeletedEmail: DeletedEmail,
      DeletedDate: DeletedDate,
      DeletedFullname: DeletedFullname,
      userNameDel: userNameDel
    });

    await inventoryItems.save();
    res.status(201).json({ message: 'Activity saved successfully' });
  } catch (error) {
    console.error('Error saving activity:', error);
    res.status(500).json({ error: 'Error saving activity' });
  }
});

app.get('/GetDelIng', async (req, res) => {
  DeletedIng.find()
  .then((info) => {
    res.json(info)
  }).catch((err) => {
    console.log(err)
  })
})



app.listen(8080, () => {
  console.log('server started');
});


