const { default: mongoose } = require("mongoose");

const {
  db: { dbURL },
} = require("../configs/config");

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    // dev
    if (process.env.NODE_ENV == "dev") {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(dbURL)
      .then((_) => console.log(`Connected Mongodb Success`))
      .catch((err) => console.log(`Error connect!`));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;
