$('#retrospectiveForm').on('submit', function(event) {
    var radioGroups = [],
        panelErrorClass = 'error',
        errorClass = 'has-error';
 
    $('#participantName').val() === '' ?
        $('.attendee-name').addClass(errorClass) : $('.attendee-name').removeClass(errorClass);
 
    $('input[type="radio"]').each(function() {
        radioGroups[$(this).attr('name')] = true;
    });
 
    var errors = false;
 
    for (var group in radioGroups) {
 
        var $label = $("div").find("[data-question='" + group + "']").closest('tr');

        console.log($("div").find("[data-question='" + group + "']").closest('tr'));

        //console.log($label);
        var $radioGroup = $("input[name='" + group + "']");
 
        if ($radioGroup.filter(':checked').length == 0) {
            $label.addClass(panelErrorClass);
            errors = true;
        }
        else {
            $label.removeClass(panelErrorClass);
            var val = $radioGroup.val();
        }
    }
 
    if(errors){
        event.preventDefault();
    }
 
    return !errors;
});