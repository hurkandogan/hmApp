const moment = require('moment');
const { getSqlDate } = require('../functions/getSqlDate');
exports.editExpense = async (con, data) => {
    let expenseData = JSON.parse(data);

    console.log('expenseData: ', expenseData);
    const date = getSqlDate();

    const result = await con.promise().query(
        `UPDATE expenses  SET ` +
        `date=?, firm=?, description=?, documentLink=?, amount=?, isPaid=?, updatedAt=?, categoryId=?, objectId=? WHERE id = ?`,
        [
            `${expenseData.date}`,
            `${expenseData.firm}`,
            `${expenseData.description}`,
            `${expenseData.documentLink}`,
            `${expenseData.amount}`,
            `${expenseData.isPaid}`,
            `${date}`,
            `${expenseData.categoryId}`,
            `${expenseData.objectId}`,
            `${expenseData.id}`,
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};