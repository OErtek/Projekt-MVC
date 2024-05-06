
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'db.json');

function ensureDBFile() {
    if (!fs.existsSync(dbPath)) {
        console.log('Veritabanı dosyası bulunamadı. Yeni bir tane oluşturuluyor...');
        const initialData = { expenditures: [], lastId: 0 }; 
        fs.writeFileSync(dbPath, JSON.stringify(initialData), 'utf8');
    }
}

function getExpenditures() {
    ensureDBFile();
    const jsonData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(jsonData);
    return data.expenditures || [];
}

function addExpenditure(category, amount, date) {
    const expenditures = getExpenditures();
    const lastId = getLastId(); 
    const newExpenditure = { id: lastId + 1, category, amount, date };
    expenditures.push(newExpenditure);

    saveData(expenditures, lastId + 1); 
}

function getLastId() {
    const jsonData = fs.readFileSync(dbPath, 'utf8');
    const data = JSON.parse(jsonData);
    return data.lastId || 0;
}

function saveData(expenditures, lastId) {
    const jsonData = JSON.stringify({ expenditures, lastId });
    fs.writeFileSync(dbPath, jsonData, 'utf8');
}
function updateExpenditure(id, category, amount, date) {
    const expenditures = getExpenditures();
    const expenditure = expenditures.find(e => e.id === parseInt(id));
    if (!expenditure) {
        throw new Error('Harcama bulunamadı');
    }
    expenditure.category = category;
    expenditure.amount = amount;
    expenditure.date = date;
    saveData(expenditures);
}

module.exports = { getExpenditures, addExpenditure , updateExpenditure};
