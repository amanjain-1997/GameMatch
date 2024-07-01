const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ObjectId = require('mongodb').ObjectId;


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:rootrootroot@cluster0.tfyl7gp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db, collection;

// Connect to MongoDB and initialize the collection
client.connect()
    .then(() => {
        db = client.db('test'); // replace 'test' with your database name
        collection = db.collection('myCollection'); // replace 'myCollection' with your collection name
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    });

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/round1i', express.static(path.join(__dirname, 'round1i')));
app.use('/round2i', express.static(path.join(__dirname, 'round2i')));
app.use('/round3i', express.static(path.join(__dirname, 'round3i')));
app.use('/thankyou', express.static(path.join(__dirname, 'thankyou')));
app.use('/round1', express.static(path.join(__dirname, 'round1')));
app.use('/round2', express.static(path.join(__dirname, 'round2')));
app.use('/round3', express.static(path.join(__dirname, 'round3')));


// Endpoint to handle data submissions
app.post('/submit', async (req, res) => {
    console.log("in here")
    const { key, ...data } = req.body;
    const result = await collection.insertOne(
      { _id: new ObjectId() },
      { $set: req.body },
      { upsert: true }
  );
  console.log(result)

    const { value } = req.body;
    console.log(`Data received: ${data}`);
    console.log(`Data received: ${JSON.stringify(req.body)}`);
    res.status(200).json({ message: 'Data received successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
