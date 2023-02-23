const express = require("express");
const app = express();
const { Restaurant } = require("./models/index");
const { sequelize } = require("./db");
const { response } = require("express");

const port = 3200;


app.get("/restaurants", async (request, response) => {

  const restaurants = await Restaurant.findAll();
  response.json(restaurants);
});


app.get("/restaurants/:id", async (request, response) => {
  const restaurantId = request.params.id;

  const restaurant = await Restaurant.findByPk(restaurantId);
  if (restaurant) {
    response.json(restaurant);
  } else {
    response.status(404).send("Restaurant not found");
  }
});

app.listen(port, () => {
  sequelize.sync();
  console.log("Your server is listening on port " + port);
});

