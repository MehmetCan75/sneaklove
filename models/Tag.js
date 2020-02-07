const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
label: {
    type: String
}});

const tagModel = mongoose.model("tags", tagSchema);

module.exports = tagModel;