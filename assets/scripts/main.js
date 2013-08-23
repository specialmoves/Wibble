'use strict';

$('.js-new-item').on('click', function (event) {
    event.preventDefault();

    var parentTableBody = $(this).closest('table').find('tbody');
    var newItemRowHTML = parentTableBody.find('tr:first-child').clone();

    newItemRowHTML.find('textarea').val('');

    var type = parentTableBody.data('action-type');

    newItemRowHTML.find('.item').attr('name', 'actions.' + type + '.create.item');
    newItemRowHTML.find('.key-points').attr('name', 'actions.' + type + '.create.keyPoints');
    newItemRowHTML.find('.actions').attr('name', 'actions.' + type + '.create.actions');

    parentTableBody.append(newItemRowHTML);
});

$('.retrospective-question-description').popover();

$('textarea').flexText();