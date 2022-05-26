exports.getCategories = async con => {
    const result = await con.promise().query('SELECT * FROM categories');
    if (result[0]) {
        return result[0];
    }
    return null;
};