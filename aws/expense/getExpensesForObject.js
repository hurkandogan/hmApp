const moment = require('moment');
exports.getExpensesForObject = async (con, data) => {
    const postedData = JSON.parse(data);
    const result = {
        object: {},
        objectTotal: 0,
        expenseCount: 0,
        expenseList: []
    };
    const objectResult = await con.promise().query(`SELECT * FROM sub_objects WHERE route = '${postedData.route}'`);
    const categoryResult = await con.promise().query(`SELECT * FROM categories ORDER BY sort_number ASC`);
    const expenseResult = await con.promise()
        .query(`SELECT e.id, e.date, e.firm, e.description, e.documentLink, e.amount, e.isPaid, e.createdAt, e.updatedAt, e.categoryId, e.objectId, o.name as objectName, o.route as objectRoute, o.isHouse as objectIsHouse FROM hm.expenses as e JOIN hm.sub_objects as o ` +
            `ON o.id = e.objectId WHERE year(e.date) = ${postedData.selectedYear} AND o.route = '${postedData.route}'` +
            `ORDER BY e.date DESC;`);

    result.expenseCount = expenseResult[0].length;
    result.object = objectResult[0][0];

    if (categoryResult[0].length > 0) {
        for (let i = 0; i < categoryResult[0].length; i++) {
            categoryResult[0][i].expenses = [];
            categoryResult[0][i].categoryTotal = 0;
            for (let j = 0; j < expenseResult[0].length; j++) {
                if (expenseResult[0][j].categoryId === categoryResult[0][i].id) {
                    // This is a fix because date() function in sql query is not working properly
                    expenseResult[0][j].date = moment(expenseResult[0][j].date).format('YYYY-MM-DD');
                    result.objectTotal += expenseResult[0][j].amount;
                    categoryResult[0][i].categoryTotal += expenseResult[0][j].amount;
                    categoryResult[0][i].expenses.push(expenseResult[0][j]);
                }
            }
            if (categoryResult[0][i].categoryTotal > 0)
                categoryResult[0][i].categoryTotal = categoryResult[0][i].categoryTotal.toFixed(2);
            if (categoryResult[0][i].expenses.length > 0)
                result.expenseList.push(categoryResult[0][i]);
        }
    }

    const oilResult = await con.promise().query(`SELECT * FROM oil_status WHERE object = '${result.object.id}' AND status > 0 ORDER BY date DESC LIMIT 1`);
    if (oilResult[0].length > 0) {
        oilResult[0][0].date = moment(oilResult[0][0].date).format('YYYY-MM-DD');
        result.oilStatus = oilResult[0][0];
    } else {
        result.oilStatus = { id: null, status: 0 }
    }

    if (result) {
        result.objectTotal = result.objectTotal.toFixed(2);
        return result
    } else return null;
};