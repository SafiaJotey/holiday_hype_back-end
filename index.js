const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xldcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xldcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const servicesCollection = client.db('DreamTravel').collection('services');
  const bookingsCollection = client.db('DreamTravel').collection('bookings');

  // adding new services

  app.post('/addServices', async (req, res) => {
    const service = req.body;
    // console.log(service);
    const result = await servicesCollection.insertOne(service);
    res.send(result);
  });

  //all Services
  app.get('/allServices', async (req, res) => {
    const result = await servicesCollection.find({}).toArray();
    res.send(result);
  });

  //each service load
  app.get('/singleProduct/:ServiceId', async (req, res) => {
    const result = await servicesCollection
      .find({ _id: ObjectId(req.params.ServiceId) })
      .toArray();
    res.send(result[0]);
  });

  //order
  app.post('/confirmOrder', async (req, res) => {
    const result = await bookingsCollection.insertOne(req.body);
    res.send(result);
  });

  //get myOrder

  app.get('/myOrder/:email', async (req, res) => {
    const result = await bookingsCollection
      .find({ Email: req.params.email })
      .toArray();
    res.send(result);
    console.log(result);
  });

  //delete order

  app.delete('/delteOrder/:id', async (req, res) => {
    const result = await bookingsCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.send(result);
  });

  // all order
  app.get('/allOrders', async (req, res) => {
    const result = await bookingsCollection.find({}).toArray();
    res.send(result);
  });

  // update statuses

  app.put('/updateStatus/:id', (req, res) => {
    const id = req.params.id;
    const updatedStatus = req.body.status;
    const filter = { _id: ObjectId(id) };
    console.log(updatedStatus);
    bookingsCollection
      .updateOne(filter, {
        $set: { status: updatedStatus },
      })
      .then((result) => {
        res.send(result);
      });
  });
});

app.get('/', (req, res) => {
  res.send('Running the Holiday Hype');
});

app.listen(port, () => {
  console.log('Running Server on port', port);
});
