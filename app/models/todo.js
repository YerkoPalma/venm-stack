// load mongoose since we need it to define a model
var mongoose = require('mongoose');

export default mongoose.model('Todo', {
  text : String,
  done : Boolean
});