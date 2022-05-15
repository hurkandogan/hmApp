exports.getSqlDate = () => {
    const year = new Date().getFullYear();
    let month = new Date().getMonth();
    let day = new Date().getDate();
    const time = new Date().toLocaleTimeString('DE-de');

    if (month < 10) month = '0' + month;
    if (day < 10) day = '0' + day;

    return `${year}-${month}-${day} ${time}`;
};