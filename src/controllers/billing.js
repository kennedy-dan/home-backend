const Billing = require("../model/billing");

exports.addAddress = (req, res) => {
  //return res.status(200).json({body: req.body})

  Billing.findOne({}).exec((error, bill) => {
    if (error) return res.status(400).json({ error });
    if (bill) {
      const address = req.body.address;
      const phone = req.body.phone;

      Billing.findOneAndUpdate(
        { user: req.user._id },
        {
          $set: {
            address: address,
            phone: phone,
          },
        },
        { upsert: true }
      )
        .then((response) => res.status(201).json({ response, message: "Address added successfully" }))
        .catch((error) => res.status(400).json(console.log(error)));
    } else {
      const billingObj = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        user: req.user._id,
      };

      const bill = new Billing(billingObj);
      bill.save((err, billing) => {
        if (err) res.status(400).json({ err });
        if (billing)
          res
            .status(200)
            .json({ message: "Address added successfully", billing });
      });
    }
  });
};

exports.getAddress = (req, res) => {
  Billing.findOne({ user: req.user._id }).exec((error, address) => {
    if (error) return res.status(400).json({ error });
    if (!address) {
      return res.status(201).json({ msg: "input address" });
    }
    if (address) {
      res.status(200).json({ address });
    }
  });
};
