$(document).ready(function() {
  $('#profile-form').submit(function() {
    $('#status')
      .empty()
      .text('File is uploading...');
    $(this).ajaxSubmit({
      error: function(xhr) {
        status('Error: ' + xhr.status);
      },

      success: function(response) {
        $('#status')
          .empty()
          .text(response);
      }
    });
    //disable the page refresh.
    return false;
  });
});
