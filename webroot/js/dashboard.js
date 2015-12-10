$(document).ready(function() {
  $('#a-add-dashboard, .cloneDashboard, .viewDashboard, .editDashboard').on('click', function(e) { // .cloneDashboard, .editDashboard, 

    e.preventDefault();
    var el = $(this);
    var href = el.attr('href');
    var modal = $('#dashboardModal');

    $('.modal-body', modal).html('');
    $('.modal-title', '.modal-header').html('');
    $.ajax({
      url: href +' #wrap > .container',
      method: 'GET'
    }).done(function(data) {
      $('.modal-body', modal).html(data);
      var title = $('.modal-body h2').text();   
      $('.navbar, .breadcrumb, h2', '.modal-body').remove();
      $('.modal-title', '.modal-header').text(title);
      $('.modal-body .container').css('max-width', '100%');
      reInitFlatUI();
      
      var datetimeParamToggle = $('.radio-datetime').val();
      var parameterToggle = $('.radio-parameter').val();

      if(parameterToggle === 'tags'){
        $('#dashboard-parameter-tags').attr("checked", "checked");
      } 
      else {
        $("#dashboard-parameter-things").attr("checked", "checked");
      }

      if(datetimeParamToggle === 'relative'){
        $('#radio-datetime-relative').attr("checked", "checked");
      } 
      else {
        $("#radio-datetime-definitive").attr("checked", "checked");
      }
    });
    
    modal.modal('show');
  });
  
  
  $('body').on('click', '#privateSelector button', function(e) {
    $('#dashboardForm').removeClass('hidden');
    $('#privateSelector').addClass('hidden');

    var elem = $(this);
    var type = elem.data('dashboard-type');

    if (type === 'org') {
      $('#DashboardUserId').val(0);
    }
  });
});



