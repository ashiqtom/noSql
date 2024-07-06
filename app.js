require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose=require('mongoose')

const errorController = require('./controllers/error');
// const {mongoConnect} = require('./util/database');
const User=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6689192459e990c86ffb6c87')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(process.env.URL)
  .then((result)=>{
    User.findOne().then(user=>{
      if(!user){
        const user=new User({
          name:'max',
          email:'a@g.com',
          cart:{
            items:[]
          }
        });
        user.save();
      }
    })
    app.listen(3000, () => {
      console.log(`Server is running on http://localhost: 3000`);
    })
  })
  .catch((err)=>{
    console.log(err)
  })