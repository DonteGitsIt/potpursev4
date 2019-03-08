const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const strainSchema = new Schema({
  userName: {type: String, required: true},
  name: { type: String, required: true },
  race: { type: String},
  description: {type: String},
});

const Strain = mongoose.model("Strain", strainSchema);

module.exports = Strain;