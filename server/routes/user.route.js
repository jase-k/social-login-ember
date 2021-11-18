const UserController = require("../controllers/user.controller");
const { authenticate } = require('../config/jwt.config');


module.exports = app => {
  //Routes to get authenticated (needed for all other routes)
  app.post("/api/login/", UserController.loginUser)
  app.get("/api/logout", UserController.logout)
  
  //Crud Routes:
  app.get("/api/users/:id", authenticate, UserController.findUser);
  app.put("/api/users/:id", authenticate, UserController.updateUser);
  app.post("/api/users", UserController.createNewUser);
  app.delete("/api/users/:id", authenticate, UserController.deleteUser);
};