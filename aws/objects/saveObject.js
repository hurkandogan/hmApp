const { v4 } = require('uuid');
const { getSqlDate } = require('../functions/getSqlDate');
exports.saveObject = async (con, data) => {
    let objectData = JSON.parse(data);

    console.log('objectData: ', objectData);
    const id = v4();

    let route = objectData.name.replace(/[^A-Z0-9]/ig, "_");
    route = route.toLowerCase();

    const date = getSqlDate();

    const result = await con.promise().query(
        `INSERT INTO objects  ` +
        `(id, name, route, description, address, isHouse, isMenu, createdAt, updatedAt)` +
        `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `${id}`,
            `${objectData.name}`,
            `${route}`,
            `${objectData.description}`,
            `${objectData.adress}`,
            `${objectData.isHouse}`,
            `${objectData.isMenu}`,
            `${date}`,
            `${date}`
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};