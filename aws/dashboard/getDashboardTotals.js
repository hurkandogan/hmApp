exports.getDashboardTotals = async (con, data) => {
    const postedData = JSON.parse(data);
    const result = {
        objects: [],
        unpaidExpenses: [],
    };

    const objectResult = await con.promise().query('SELECT id, name, route, description, address, isHouse, isMenu FROM objects');
    const categoryResult = await con.promise().query(`SELECT id, name, description, isHouse FROM categories ORDER BY sortPrio ASC`);
    const expenseResult = await con.promise().query(`SELECT amount, isPaid, categoryId, objectId FROM expenses ` +
        `WHERE year(date) = ${postedData.selectedYear} ORDER BY date DESC;`);


    if (objectResult[0].length > 0) {

        result.objectTotal = objectResult[0].length;

        for (let i = 0; i < objectResult[0].length; i++) {

            let object = objectResult[0][i];
            object.expenses = [];
            object.total = 0;

            for (let j = 0; j < categoryResult[0].length; j++) {
                let category = categoryResult[0][j];
                category.categoryTotal = 0;

                for (let k = 0; k < expenseResult[0].length; k++) {
                    const expense = expenseResult[0][k];

                    if (expense.objectId === object.id &&
                        expense.categoryId === category.id) {
                        if (!expense.objectId.isPaid) result.unpaidExpenses.push(expense);

                        object.total += expense.amount;
                        category.categoryTotal += expense.amount;
                    }
                }
                if (category.categoryTotal > 0)
                    category.categoryTotal = category.categoryTotal.toFixed(2);
                object.expenses.push(category);
            }
            if (object.total > 0)
                object.total = object.total.toFixed(2);
            result.objects.push(object);
        }
        console.log('Dashboard Result: ', result);
        return result;
    }
    return null;
};