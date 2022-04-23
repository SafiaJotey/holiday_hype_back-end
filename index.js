const express = require('express');
const cors = require('cors');
require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(cors());
app.use(express.json());
const stripe = require('stripe')(process.env.STRIPE_SECRET);

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xldcc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const servicesCollection = client.db('DreamTravel').collection('services');
  const bookingsCollection = client.db('DreamTravel').collection('bookings');
  const blogCollection = client.db('DreamTravel').collection('blogs');

  // adding new services
  app.post('/addServices', async (req, res) => {
    const service = req.body;

    const result = await servicesCollection.insertOne(service);
    res.send(result);
  });
  // show all Services
  app.get('/allServices', async (req, res) => {
    const result = await servicesCollection.find({}).toArray();
    res.send(result);
  });

  //loading single product
  app.get('/singleProduct/:serviceId', async (req, res) => {
    console.log('hitted');
    const result = await servicesCollection
      .find({ _id: ObjectId(req.params.serviceId) })
      .toArray();
    console.log(result);
    res.send(result[0]);
  });
  // confirm order
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
  app.delete('/deleteOrder/:id', async (req, res) => {
    const result = await bookingsCollection.deleteOne({
      _id: ObjectId(req.params.id),
    });
    res.send(result);
  });
  //payment
  app.get('/payment/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await bookingsCollection.findOne(query);
    res.json(result);
  });
  //update order
  app.put('/myOrder/:id', async (req, res) => {
    const id = req.params.id;
    const payment = req.body;
    const filter = { _id: ObjectId(id) };
    const updateDocs = {
      $set: {
        payment: payment,
      },
    };
    const result = await bookingsCollection.updateOne(filter, updateDocs);
    res.json(result);
  });
  //add a new blog
  app.post('/addBlog', async (req, res) => {
    const newBlog = req.body;
    console.log(newBlog);
    const result = await blogCollection.insertOne(newBlog);
    res.send(result);
  });
  //show all Blogs
  app.get('/blogs', async (req, res) => {
    const result = await blogCollection.find({}).toArray();
    res.send(result);
  });
  //show each blog details
  app.get('/details/:blogId', async (req, res) => {
    console.log('hitted');
    const result = await blogCollection
      .find({ _id: ObjectId(req.params.blogId) })
      .toArray();
    console.log(result);
    res.send(result[0]);
  });
  //get myBlog
  app.get('/myBlog/:email', async (req, res) => {
    const result = await blogCollection
      .find({ email: req.params.email })
      .toArray();
    res.send(result);
    console.log(result);
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

  app.post('/create-payment-intent', async (req, res) => {
    const paymentInfo = req.body;
    const amount = paymentInfo.price * 100;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
});

app.get('/', (req, res) => {
  res.send('Running HolidayHype');
});

app.listen(port, () => {
  console.log('Running Server on port', port);
});
