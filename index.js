const express = require('express');
const mongoose = require('mongoose');

const Item = require('./models/Item');

const app = express();
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({extended: true}))

let mongoURL = (process.env.NODE_ENV === 'test') ? "127.0.0.1:27017" : "mongo:27017"
// Connect to MongoDB
mongoose
  .connect(`mongodb://${mongoURL}/aws-james-node`, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


app.get('/', (req, res) => {
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/item/add', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.redirect('/'));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));
