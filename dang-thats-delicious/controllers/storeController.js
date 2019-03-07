const mongoose = require('mongoose');

const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  res.render('index', { title: 'Home' });
};

// === CREATE ===
// GET
exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};
// POST
exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully Create ${store.name}. Care to leave a review?`);
  res.redirect(`/store/${store.slug}`);
};

// === EDIT ===
// GET
exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  // TODO: Confirm user owns the store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

// POST
exports.updateStore = async (req, res) => {
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the newly updated store data
    runValidators: true,
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`);
  res.redirect(`/stores/${store._id}/edit`);
};

// === READ ===
// GET - One
exports.getStore = async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (store === null) {
    res.flash('error', 'It appers this store doesn\'t exist. Let\'s make one!');
    res.redirect('/add');
  }
  res.render('store', { title: `${store.name}`, store });
};

// GET - List
exports.getStores = async (req, res) => {
  // Get list of all stores
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};
