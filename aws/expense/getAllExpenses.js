exports.getAllExpenses = async (con, data) => {

    //const postedData = JSON.parse(data);

    const result = await con.promise().query('SELECT * FROM expenses');
    if (result[0]) {
        return result[0];
    }
    return null;
};