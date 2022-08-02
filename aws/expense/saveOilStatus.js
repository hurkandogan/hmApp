const { v4 } = require('uuid');
const { getSqlDate } = require('../functions/getSqlDate');
exports.saveOilStatus = async (con, data) => {
    let oilData = JSON.parse(data);

    console.log('oilData: ', oilData);
    const id = v4();
    const date = getSqlDate();

    const result = await con.promise().query(
        `INSERT INTO oil_status  ` +
        `(id, status, type, date, updatedAt, createdAt, pricePerUnit, object, deliveryTotal)` +
        `VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            `${id}`,
            `${oilData.status}`,
            `${oilData.type}`,
            `${oilData.date}`,
            `${date}`,
            `${date}`,
            `${oilData.pricePerUnit}`,
            `${oilData.object}`,
            `${oilData.deliveryTotal}`,
        ]
    );
    if (result[0]) {
        return result[0];
    }
    return null;
};