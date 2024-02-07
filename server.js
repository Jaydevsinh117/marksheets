const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
//const EmployeeRoute  = require('./routes/employee')
const MarksheetRoute = require('./routes/marksheet'); // Add this line

const app = express();


// Connection URI for MongoDB Compass (replace 'your-database-name' with your actual database name)
// const dbURI = 'mongodb://localhost:27017/marksheet';

const dbURI = 'mongodb+srv://noteblog:test123@nodeblog.a6obeom.mongodb.net/marksheet?retryWrites=true&w=majority';


// Connect to MongoDB with additional options
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(4000);
  })
  .catch((err) => console.error(err));

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
});

db.once('open', () => {
  console.log('Database Connection Established!');
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 3007;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//app.use('/api/employee', EmployeeRoute)
app.use('/api/marksheet', MarksheetRoute); // Add this line






























