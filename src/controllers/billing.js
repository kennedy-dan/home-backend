const Billing = require("../model/billing");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})
  const { address } = req.body;
  const { phone } = req.body;


  // if (address) {
  if (address) {
    Billing.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: {
          "address": address,
          "phone": phone,
        },
      },
      { upsert: true }
    )
    .populate()
    .exec((error, address) => {
      if (address) {
        res.status(201).json({ address });
      }
    });
  } else {
    const billingObj = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      user: req.user._id,
    };

    const bill = new Billing(billingObj);
    bill.save((err, billing) => {
      if (err) return res.status(400).json({ err });
      if (billing) return res.status(201).json({ billing });
    });
  }
};

exports.getAddress = (req, res) => {
  Billing.findOne({ user: req.user._id }).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (address) {
      res.status(200).json({ address });
    }
  });
};
