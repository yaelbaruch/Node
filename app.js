const express = require('express');
const app = express();
require('dotenv').config();
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
require('./db/confing');

const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('index');
});

app.use('/books', bookRoutes);
app.use('/auth', authRoutes);

app.use((req, res) => {
  res.status(404).send('<h1>404 - עמוד לא נמצא</h1><a href="/">חזרה לדף הבית</a>');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (err.status === 400) {
    return res.status(400).send("bad request 400" );
  }

  else if(err.status===404) {
         res.status(404).send("not found 404");
}
else
  res.status(500).send("error");
});



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});