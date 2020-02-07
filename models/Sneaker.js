const mongoose = require("mongoose");
const Schema = mongoose.Schema;

ObjectId = Schema.Types.ObjectId;

const sneakersSchema = new Schema({
    name: 
    { 
        type: String
    },
    ref: String,
    sizes: [Number],
    description: String,
    price: String,
    category: [
        {
       type: String,
       enum: ['men', 'women', 'kids']
        }],
    id_tags: [
        {
       type: Schema.Types.ObjectId,
       ref: "tags"
        },],
    image: {type: String},

});

const sneakersModel = mongoose.model("sneakers", sneakersSchema);

module.exports = sneakersModel;