const express =  require ('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const booksRouter = require ('./routes/books');
const userProfilesRouter = require('./routes/user-profiles');
const authorsRouter = require('./routes/authors');
const usersRouter = require('./routes/users');
const bookRatingRouter = require('./routes/book-ratings');


app.use('/books', booksRouter);
app.use('/book-ratings', bookRatingRouter);
app.use('/userProfiles', userProfilesRouter);
app.use('/authors', authorsRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is runnging on port:  ${port}`);
});