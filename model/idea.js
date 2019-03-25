//Schema
const mongoose = require('mongoose');
var ideaSchema = new mongoose.Schema({
  title: String,
  content: {
    type: String,
  },
  like: {
    type: Array,
    default: [],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    default: 'Anonymous',
  }
});

const ideaModel = mongoose.model('Idea', ideaSchema);

module.exports = ideaModel;