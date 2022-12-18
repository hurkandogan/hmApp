const moment = require('moment');
exports.getAllExpenses = async (con, data) => {
  //const postedData = JSON.parse(data);

  const result = await con.promise().query('SELECT * FROM expenses');
  let expenses = [];
  if (result[0]) {
    for (let i = 0; i < result[0].length; i++) {
      let expense = result[0][i];
      expense.date = moment(expense.date).format('YYYY-MM-DD');
      expenses.push(expense);
    }
    return expenses;
  }
  return null;
};
