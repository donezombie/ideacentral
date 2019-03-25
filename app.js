const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 80;

const connectDB = require('./connectDB');
const ideaModel = require('./model/idea');
const userModel = require('./model/user');

connectDB();

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
}
app.use(cors({...corsOptions, credentials: true }));
app.use(express.static('public'));
app.use(express.json())

// API USER
app.use('/api/user/:id', (req, res) => {
  const { id } = req.params;
  switch (req.method) {
    case 'GET':
      userModel.findById(id)
      .then(result => res.json(result))
      .catch(err => res.json(err));
      break;

    case 'PUT':
      const { body } = req;
      userModel.findByIdAndUpdate(id, { $set: body })
      .then(userModel.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
      )
      break;

    case 'DELETE':
      userModel.findByIdAndDelete(id)
      .then(result => {
        res.json({
          message: `Delete ${id} successfully!`,
          result,
        })
      })
      .catch(err => res.json(err));
      break;

    default:
      return null
  }
})

app.use('/api/user', (req, res) => {
  switch (req.method) {
    case 'GET':
      userModel.find()
      .then(result => res.json(result))
      .catch(err => res.json(err));
      break;

      case 'POST':
      const { body } = req;
      const newUser = new userModel(body);
      newUser.save((err, result) => {
        if (err) res.json(err)
        else res.json(result);
      })
      break;

    default:
      return null
  }
})

// API IDEA
app.use('/api/idea/:id', (req, res) => {
  const { id } = req.params;
  switch (req.method) {
    case 'GET':
      ideaModel.findById(id)
      .then(response => {
        res.json(response);
      })
      .catch(err => res.json(err));
      break;
    
    case 'PUT':
      const { body } = req;
      ideaModel.findByIdAndUpdate(id, { $set: body })
      .then(ideaModel.findById(id)
        .then(result => res.json(result))
        .catch(err => res.json(err))
      )
      break;

    case 'DELETE':
      ideaModel.findByIdAndDelete(id)
      .then(response => {
        res.send({
          message: `Delete ${id} successfully!`,
          response,
        })
      })
      .catch(err => res.json(err));
      break;
      
    default:
      return null;
  }
})

app.use('/api/idea', (req, res) => {
  switch (req.method) {
    case 'GET':
      ideaModel.find()
      .then(result => res.json(result))
      .catch(err => res.json(err));
      break;
    
    case 'POST':
      const { body } = req;
      const newIdea = new ideaModel(body);
      newIdea.save((err, response) => {
        if (err) res.json(err);
        else res.json(response);
      })
      
    default:
      return null;
  }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))