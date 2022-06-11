exports.getDashboardTotals = async (con, data) => {
    const postedData = JSON.parse(data);
    const result = {
        objects: [],
        unpaidExpenses: [],
    };

    const objectResult = await con.promise().query('SELECT id, name, route, description, address, isHouse, isMenu FROM objects ORDER BY sortPrio ASC');
    const categoryResult = await con.promise().query(`SELECT id, name, description, isHouse FROM categories ORDER BY sortPrio ASC`);
    const expenseResult = await con.promise().query(`SELECT * FROM expenses WHERE year(date) = ${postedData.selectedYear} ORDER BY date DESC;`);

    for (let i = 0; i < objectResult[0].length; i++) {
        const object = objectResult[0][i];
        object.total = 0;
        object.expenses = [];

        for (let j = 0; j < categoryResult[0].length; j++) {
            const category = categoryResult[0][j];
            let catTotal = 0;
            let expenseCount = 0;

            for (let k = 0; k < expenseResult[0].length; k++) {
                let expense = expenseResult[0][k];

                if (expense.objectId === object.id &&
                    expense.categoryId === category.id) {
                    catTotal += expense.amount;
                    expenseCount++;
                    object.total += expense.amount;
                }
            }
            object.expenses.push({
                name: category.name,
                expenseCount: expenseCount,
                isHouse: category.isHouse,
                total: catTotal.toFixed(2),
            });
        }
        object.total.toFixed(2);
        result.objects.push(object);
    }

    for (let i = 0; i < expenseResult[0].length; i++) {
        if (expenseResult[0][i].isPaid === 0) result.unpaidExpenses.push(expenseResult[0][i]);
    }

    return result;
};