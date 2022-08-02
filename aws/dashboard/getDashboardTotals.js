exports.getDashboardTotals = async (con, data) => {
    const postedData = JSON.parse(data);
    const allObjects = [];
    const result = {
        objects: [],
    };

    const parentObjectResult = await con.promise().query('SELECT * FROM parent_objects ORDER BY sort_number ASC');
    const objectResult = await con.promise().query('SELECT id, name, route, description, address, isHouse, isMenu, parent_object FROM sub_objects ORDER BY sort_number ASC');
    const categoryResult = await con.promise().query(`SELECT id, name, description, isHouse FROM categories ORDER BY sort_number ASC`);
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
        if (!object.parent_object)
            result.objects.push(object);
    }

    for (let i = 0; i < parentObjectResult[0].length; i++) {
        const parentObject = parentObjectResult[0][i];
        parentObject.total = 0;
        parentObject.subObjects = [];

        for (let j = 0; j < objectResult[0].length; j++) {
            const sub_object = objectResult[0][j];
            if (parentObject.id === sub_object.parent_object) {
                parentObject.subObjects.push(sub_object);
                parentObject.total += sub_object.total;
            }
        }
        if (parentObject.subObjects.length > 0)
            result.objects.unshift(parentObject);
    }
    return result;
};