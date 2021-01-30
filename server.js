const express = require('express');
const app = express();

const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

//middleware
app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        //pool: true,
        host: 'smtp.abv.bg',
        port: 465,
        secure: true,
        auth: {
            user: '**********@abv.bg',
            pass: '**************'
        }
    })

    const mailOptions = {
        from: 'Контактна форма <answerforma@abv.bg>',//req.body.email,
        to: 'answerforma@abv.bg',
        subject: `Съобщение от ${req.body.name} <${req.body.email}> с тема: ${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})