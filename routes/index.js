const express = require("express");
const router = express.Router();
const sneakersModel = require("../models/Sneaker");
const tagModel = require("../models/Tag");

router.get("/", (req, res) => {
  res.render("");
});

// get all the collections and Tags
router.get('/sneakers/collection', (req, res, next) => {
  Promise.all([
    sneakersModel.find(),
    tagModel.find()
  ])
      .then(dbRes => {
          res.render('products', {
              sneakers: dbRes[0],
              tags: dbRes[1],
          });
          console.log(dbRes[0]);
      })
      .catch(next)
});


router.get('/sneakers/:cat', (req, res, next) => {
  Promise.all([
    // The following line: :cat above makes all after : in the url equal to cat var.
    // req.params.cat accesses that var
    sneakersModel.find({category: req.params.cat}),
    tagModel.find()
  ])
      .then(dbRes => {
          res.render('products', {
              sneakers: dbRes[0],
              tags: dbRes[1],
          });
          console.log(dbRes[0]);
      })
      .catch(next)
});


//get one product
router.get("/one-product/:id", (req, res) => {
  sneakersModel.findById(req.params.id)
  .then(sneakers => {
      res.render('one_product', {
          sneakers: sneakers
      });
  })
  .catch(error => {
      console.log('Error', error);
  })
});


// create shoes

router.get("/prod-add", (req, res) => {
  tagModel.find()
  .then(tags => {
      res.render("products_add", {
          tags: tags
      });
  })
  .catch(error => {
      console.log('Error', error);
  })
});
  

router.post('/prod-add', (req, res, next) => {
  const { name,
    ref,
    sizes,
    description,
    price,
    category,
    id_tags,
    image,
     } = req.body;

sneakersModel
      .create({
        name,
        ref,
        sizes,
        description,
        price,
        category,
        id_tags,
        image,
      })
      .then((sneak) => {
          res.redirect('/sneakers/collection');
      })
      .catch((error) => {
          console.log(error);
          res.send("Oh no, an error ocurred while creating new sneakers !");
      })
});

router.post('/prod-add/createTag', (req, res, next) => {
  const { label } = req.body;

tagModel
      .create({
        label
      })
      .then(() => {
          res.redirect('/prod-add');
      })
      .catch((error) => {
          console.log(error);
          res.send("Oh no, an error ocurred while creating new tags !");
      })
});




//manage products
router.get("/prod-manage", (req, res) => {
  sneakersModel.find()
      .then(sneakers => {
          res.render('products_manage', {
              sneakers: sneakers
          });
      })
      .catch(error => {
          console.log('Error', error);
      })
});



// edit product
router.get("/product-edit/:id", (req, res) => {
  sneakersModel
  .findById(req.params.id)
  .then((sneakers) => {
    res.render("product_edit", {sneakers});
  })
  .catch((error) => {
    console.log(error);
  })
});


router.post('/prod-edit/:id', (req, res, next) => {
  const { name,ref,description,price,category} = req.body;
  sneakersModel
  .findByIdAndUpdate(req.params.id, { $set: {name,ref,description,price,category }}, { new: true })
  .then((sneakers) => {
    res.redirect('/prod-manage');
  })
  .catch((error) => {
    console.log(error);
  })
});
















// delete product
router.get("/prod-manage/:id/delete", (req,res) => {
sneakersModel
.findByIdAndDelete(req.params.id)
.then(dbRes => {
    res.redirect("/prod-manage");
})
.catch(dbErr => {
    res.redirect("/prod-manage");
});
})


module.exports = router;
