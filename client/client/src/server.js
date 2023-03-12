const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user-form', (req, res) => {
    // handle form submission here
});

app.listen(port, () => console.log(`Server running on port ${port}`));

mongoose.connect('mongodb://localhost:27017/user-form', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));

  const userSchema = require('./User');
    
  app.post('/user-form', async (req, res) => {
      // validate form data using yup
      const schema = yup.object().shape({
          name: yup.string().required(),
          dob: yup.date().max(new Date(new Date().getFullYear() - 18, 0, 1)).required(),
          email: yup.string().email().required(),
          phone: yup.string().matches(/^\d{10}$/).required()
      });
      try {
          const data = await schema.validate(req.body);
          
          // save data to database
          const user = new userSchema(data);
          await user.save();
          
          // send email to user
          const transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                  user: 'your.email@gmail.com',
                  pass: 'yourpassword'
              }
          });
          const mailOptions = {
              from: 'your.email@gmail.com',
              to: data.email,
              subject: 'Form Submitted',
              html: '<p>Thank you for submitting the form!</p>'
          };
          await transporter.sendMail(mailOptions);
          
          res.json({ message: 'Form submitted successfully!' });
      } catch (err) {
          res.status(400).json({ error: err.message });
      }
  });
