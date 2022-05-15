const { v4 } = require('uuid');
const { getSqlDate } = require('../functions/getSqlDate');
exports.saveExpense = async (con, data) => {
    let expenseData = JSON.parse(data);

    console.log('expenseData: ', expenseData);
    const id = v4();
    const date = getSqlDate();

    const result = await con.promise().query(
        `INSERT INTO expenses  ` +
        `(id, date, firm, description, documentLink, amount, isPaid, createdAt, updatedAt, categoryId, objectId)` +
        `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `${id}`,
            `${date}`,
            `${expenseData.firm}`,
            `${expenseData.description}`,
            `${expenseData.link}`,
            `${expenseData.amount}`,
            `${expenseData.isPaid}`,
            `${date}`,
            `${date}`,
            `${expenseData.categoryId}`,
            `${expenseData.objectId}`
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};