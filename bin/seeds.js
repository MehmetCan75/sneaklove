const sneakersModel = require("../models/Sneaker")
const tagModel = require("../models/Tag")
const mongoose = require('mongoose');

const shoes = [{
    name: 'Nike Air Max',
    ref: '837494957',
    sizes: [6, 8, 9, 10],
    description: 'Black with bubbles',
    price: '$250',
    category: 'men',
    id_tags: ['5e3c272624ad631a14a83425'],
    image: "https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fliho8ygw5nogbmtcbft/chaussure-air-vapormax-plus-pour-14r9M3.jpg",
},
{
    name: 'Adidas Stan Smith',
    ref: '638374957',
    sizes: [6, 8, 9, 10],
    description: 'White green',
    price: '$100',
    category: 'women',
    id_tags: ['5e3c2eaaf2e3191b4475cb59'],
    image: "https://cdn.sarenza.net/_img/productsv4/0000104446/0000104446_231731_09_504x690.jpg?201901301729&v=20200204124638&interpolation=lanczos-none&fit=inside|500:685"
},
 ]

const tags = [{
        label: "Sporty",
    },
    {
        label: "Casual"
    },
    {
        label: "Dressy"
    },
    {
        label: "Gangsta"
    }
]


mongoose
    .connect('mongodb://localhost/sneakers-lab', {
        useNewUrlParser: true
    })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
        sneakersModel
            .insertMany(shoes)
            .then(dbRes => {
                console.log("shoes Created");
            })
            .catch(err => {
                console.log("There was an error creating the shoes ");
            });

        tagModel
            .insertMany(tags)
            .then(dbRes => {
                console.log("tag Created");
            })
            .catch(err => {
                console.log("There was an error creating the tag ");
            });


    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


module.exports = shoes;