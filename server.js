const app = require("./app")

app.listen(app.get("port"), () => {
    console.log(`🚀 Server running at ${process.env.HOST} : ${process.env.PORT}`);
  });
  