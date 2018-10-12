let mongoose = require('mongoose');
const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
//const server = 'zachi:Rain1234@ds035683.mlab.com:35683'; // REPLACE WITH YOUR DB SERVER
const database = 'mousehero';      // REPLACE WITH YOUR DB NAME


class Database {
  constructor() {
    this.connect()
  }
  connect() {
    mongoose.connect(`mongodb://${server}/${database}`, { useNewUrlParser: true })
      .then(() => {
        console.log('Database connection successful')
      })
      .catch(err => {
        console.error('Database connection error')
      })
  }
}
module.exports = new Database()