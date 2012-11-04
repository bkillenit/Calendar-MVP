$(document).ready(function() {
    $('#mergebox').change(function() {
        if (this.checked) {
            $('#mergebox').parent().parent().attr('disabled', false).css({
                background: '#f5f5f5'
            });
        } else {
            $('#mergebox').parent().parent().attr('disabled', true).css({
                background: 'white'
            });
        }
    });
});