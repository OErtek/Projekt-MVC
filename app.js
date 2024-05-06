
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


const expenditureController = require('./controllers/expenditureController');
const db = require('./models');


app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true })); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/expenditureList.html');
});
 
app.get('/add', (req, res) => {
    res.sendFile(__dirname + '/views/addExpenditureForm.html');
});

app.post('/add-expenditure', (req, res) => {
    const { category, amount, date } = req.body;
    expenditureController.addExpenditure(category, amount, date);
});
app.get('/expenditure-list', (req, res) => {
    const expenditures = expenditureController.getExpenditureList();
    res.json(expenditures);
});
app.get('/edit', (req, res) => {
    res.sendFile(__dirname + '/views/editExpenditureForm.html');
});
app.post('/update-expenditure', (req, res) => {
    const { id, category, amount, date } = req.body;
    db.updateExpenditure(id, category, amount, date);
    res.redirect('/');
});
app.get("/expenditure-report", (req, res) => {
    const expenditures = db.getExpenditures();
    res.json(expenditures);
});
app.get("/reports"
, (req, res) => {
    res.sendFile(__dirname + '/views/expenditureReport.html');
});
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
