const mongoose = require("mongoose");
const app = require("./app");

const DB_HOST =
  "mongodb+srv://helen:55judo33@cluster0.afdkbgo.mongodb.net/db_contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
