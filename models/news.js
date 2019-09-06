var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var newsSchema = new Schema({
  title: { type: String, required: [true, 'Nie dodano tytułu']},
  author: String,
  description: { type: String, required: [true, 'Nie dodano treści']},
  comments: [{ body: String, date: Date }],
  created: { type: Date, default: Date.now },
  
});

module.exports = mongoose.model('News', newsSchema);