const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Hello Programmer",
  });
});

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
