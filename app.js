const express = require("express"); // je récupére la blibliotheque express
const cors = require("cors"); // je veux autoriser des applications à comminuqer entre elles
const dotenv = require("dotenv"); // cette blibliothèque va me permettre d'ajouter des variables d'environnement au process en cours
dotenv.config();
const userRoutes = require('./app/routes/user')
const app = express(); // je crée une application express

//j'ai envie que tu apprennes le json et surtout, à lire des objets imbriqués.
app.use(express.urlencoded({
  extended: true
}))
app.use(express.json({
  limit: '10mb'
}))

const sequelizeClient = require("./app/database/connect")

app.set("port", process.env.PORT); // on va chercher la valeur cachée dans le .env
app.set("host", process.env.HOST);

async function dbConnect() {
  try {
      await sequelizeClient.authenticate()
      console.log('✅ Connexion réussie')
  } catch(err) {
      console.log('❌ Connexion refusée')
  }
}

dbConnect()

app.use('/api/v1/user', userRoutes)

module.exports = app