
var moment = require('moment');

exports.dateOptions = function () {

    var i, n, _i;

    var date_options;

    for (i = 1, n = 31; i <= n; i += 1) {
        _i = i.toString();

        if (_i.length === 1) {
            _i = 0 + _i;
        }

        date_options += '<option';

        if (_i === moment().format('DD')) {
            date_options += ' selected="selected"';
        }

        date_options += '>' + _i + '</option>';
    }

    return date_options;

};

exports.monthOptions = function () {

    var i, n, _i;

    var month_options;

    for (i = 1, n = 12; i <= n; i += 1) {
        _i = i.toString();

        if (_i.length === 1) {
            _i = 0 + _i;
        }

        month_options += '<option';

        if (_i === moment().format('MM')) {
            month_options += ' selected="selected"';
        }

        month_options += '>' + moment(_i).format("MMMM") + '</option>';
    }

    return month_options;

};

exports.yearOptions = function () {

    var year_options;
    var current_year = parseInt(moment().format('YYYY'), 10);

    for (i = current_year, n = current_year + 2; i <= n; i += 1) {
        year_options += '<option';

        if (i === current_year) {
            year_options += ' selected="selected"';
        }

        year_options += '>' + i + '</option>';
    }

    return year_options;

};


exports.dateSortAsc = function (date1, date2) {
    if (date1.date > date2.date){
        return 1;
    } 
    
    if (date1.date < date2.date) {
        return -1;
    }

    return 0;
};


exports.dateSortDesc = function (date1, date2) {
    if (date1.date > date2.date) {
        return -1;
    }

    if (date1.date < date2.date) {
        return 1;
    }

    return 0;
};

