const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; // You can choose any available port
const bodyParser=require('body-parser');
const mongoose = require('mongoose');

var mongoURI = "mongodb://localhost:27017";
app.use(express.static(path.join(__dirname, 'pages')));
// Database instance
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', () => {
    console.log('Connected to MongoDB');
  });

  const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    // Add other fields as needed
  });
  
  const User = mongoose.model('User', userSchema);
app.get('/', (req, res) => {
  // Handle requests to the root URL (e.g., your landing page)
  res.sendFile(path.join(__dirname, 'pages/login.html'));
});
app.get('/login', (req, res) => {
    // Handle requests to the root URL (e.g., your landing page)
    res.sendFile(path.join(__dirname, 'pages/login.html'));
  });

app.get('/graph', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/graph.html'));
});
app.get('/apage', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/apage.html'));
  });
  

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/signup.html'));
});
app.get("/Atable", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/Atable.html'));
  });
  

app.get('/afterlogin', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/Afterlogin.html'));
});

app.get("/attendance", (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/attendance.html'));
});
app.get('/reset', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/reset.html'));
  });
  app.get('/forgotpass', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/forgotpass.html'));
  });
  app.get('/otp', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/otp.html'));
  });
  app.post('/login', (req, res) => {
    const userd=req.body;
    const newUser = new User({
        email: userd.email,
        password: userd.password,
       // email: 'john@example.com',
        //password: '123456',
        // Set other fields
     } );
      newUser.save((err, user) => {
        if (err) {
          console.error('Error saving user:', err);
          return res.status(500).json({ error: 'Error saving user' });
        } 
          console.log('User saved:', user);
          res.status(201).json({ message: 'User saved successfully' });
      });

     /* User.find({}, (err, users) => {
        if (err) {
          console.error('Error fetching users:', err);
         
        } else {
          console.log('Users:', users);
          
        }
      });*/
    // const userData = {
    //     email: req.body.email,
    //   password: req.body.password,
      
    //   // Add other user data here
    // };
  
    // db.collection('users').insertOne(userData, (err, result) => {
    //   if (err) {
    //     console.error('Error saving user data:', err);
    //     return res.status(500).send('Error signing up');
    //   }
  
    //   res.redirect('/afterlogin'); // Redirect to the afterlogin page after successful signup
    //});
  });
  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
