
const db = require('../models');

function addExpenditure(category, amount, date) {
    db.addExpenditure(category, amount, date);
    
}

function getExpenditureList() {
    return db.getExpenditures();
}


module.exports = { addExpenditure, getExpenditureList };
