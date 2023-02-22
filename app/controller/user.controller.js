const User = require("../models/User");

class UserController {
  singup(req, res, next) {
    const formData = req.body;
    const new_user = new User(formData);
    new_user
      .save()
      .then(() => {
        res.send("dang ky tai khoan moi thanh cong");
      })
      .catch(next);
  }
}

module.exports = new UserController();
