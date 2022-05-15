exports.getDashboardTotals = async con => {
    const result = await con.promise().query('SELECT * FROM objects');
    if (result[0]) {
        return result[0];
    }
    return null;
};