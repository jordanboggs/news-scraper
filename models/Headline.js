const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const HeadlineSchema = new Schema({
  title: {
    type    : String,
    required: true,
    unique  : true
  },
  link: {
    type    : String,
    required: true,
    unique  : true
  },
  description: {
    type: String
  },
  note: {
    type: Schema.Types.ObjectId,
    // default: "No notes",
    ref : "Note"
  }
});

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;
