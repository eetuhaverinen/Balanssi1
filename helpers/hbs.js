const moment = require('moment');
const hbs = require('handlebars');

hbs.registerHelper('formatDate', function (date, format) {
  return moment(date).utc().format(format);
});

hbs.registerHelper('truncate', function (str, len) {
  if (str.length > len && str.length > 0) {
    let new_str = str + ' ';
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(' '));
    new_str = new_str.length > 0 ? new_str : str.substr(0, len);
    return new_str + '...';
  }
  return str;
});

hbs.registerHelper('stripTags', function (input) {
  return input.replace(/<(?:.|\n)*?>/gm, '');
});

hbs.registerHelper('editIcon', function (storyUser, loggedUser, storyId, floating = true) {
  if (storyUser._id.toString() == loggedUser._id.toString()) {
    if (floating) {
      return `<a href="/stories/edit/${storyId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`;
    } else {
      return `<a href="/stories/edit/${storyId}"><i class="fas fa-edit"></i></a>`;
    }
  } else {
    return '';
  }
});

hbs.registerHelper('select', function (selected, options) {
  return options
    .fn(this)
    .replace(
      new RegExp(' value="' + selected + '"'),
      '$& selected="selected"'
    )
    .replace(
      new RegExp('>' + selected + '</option>'),
      ' selected="selected"$&'
    );
});

hbs.registerHelper('calculateDuration', function (duration) {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  if (hours > 0) {
    if (minutes > 0) {
      return `${hours} h ${minutes} min`;
    } else {
      return `${hours} h`;
    }
  } else {
    return `${minutes} min`;
  }
});

hbs.registerHelper('json', function (context) {
  return JSON.stringify(context);
});

hbs.registerHelper('isGoodBloodSugar', function (bloodSugarValue) {
  // Määritä logiikka hyvien verensokeriarvojen tunnistamiseksi
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

hbs.registerHelper('radioCheck', function(value, currentValue) {
  if (value === currentValue) {
    return 'checked';
  }
  return

  
});

module.exports = hbs;
