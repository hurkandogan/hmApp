export const numberDivider = (num) => {
    num = num.toString().replace('.', ',');
    num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return num;
};