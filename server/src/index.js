const express = require("express");
const cors = require("cors");
const history = require("connect-history-api-fallback");
const path = require("path");
require("dotenv").config();
const staticFile = express.static(path.join(__dirname, "..", "dist"));
const app = express();

app.use((req, res, next) => {
  console.log(
    [
      new Date().toLocaleString(),
      req.headers["x-forwarded-for"] || req.socket.remoteAddress,
      req.method,
      req.statusCode,
      req.url,
    ].join(" ")
  );

  if (!req.headers["da-header"]) {
    console.log(
      `${req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress} não possui o header de validação.`
    );
    return res.status(404).send();
  }
  next();
});
app.use(cors());
app.use(staticFile);
app.use(
  history({
    verbose: true,
    disableDotRule: true,
  })
);
app.use("/", staticFile);

app.listen(process.env.PORT, () => {
  console.log(`Serviço rodando na porta ${process.env.PORT}`);
});
