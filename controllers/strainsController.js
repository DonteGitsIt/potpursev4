const db = require("../mongoModels");


module.exports = {
  findAll: function(req, res) {
    console.log(req.query)
    db.Strain
      .find(req.query)
      .sort({ name: 1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log(req.body)
    db.Strain
      .create(req.body)
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  
  remove: function(req, res) {
    db.Strain
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};