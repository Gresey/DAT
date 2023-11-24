const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'greseypatidar100@gmail.com',
		pass: '8461977101'
	}
});

let mailDetails = {
	from: 'greseypatidar100@gmail.com',
	to: 'greseypatidar10@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
// Use the same email for LoginCredentials and the function call

