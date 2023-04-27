const hbs = require('hbs');

hbs.registerHelper('isGoodBloodSugar', (value) => {
    // Määritä logiikka hyvien verensokeriarvojen tunnistamiseksi
    return value >= 4 && value <= 7;
});

hbs.registerHelper('isGoodFeeling', (value) => {
    // Määritä logiikka hyvien tuntemusten tunnistamiseksi
    return value === 'good' || value === 'great';
});

hbs.registerHelper('isGoodCarbs', (value) => {
    // Määritä logiikka hyvien hiilihydraattien tunnistamiseksi
    return value >= 1 && value <= 10;
});

hbs.registerHelper('isGoodSport', (value) => {
    // Määritä logiikka hyvien liikuntamäärien tunnistamiseksi
    return value >= 30 && value <= 120;
});
