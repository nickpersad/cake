$('body').on('click', '.table-configuration .customize-columns', function(e) {
  e.preventDefault();
  var modalTitle = $('#anythingModal #anythingModalLabel');
  var modalBody = $('#anythingModal #div-anything-modal-body');

  modalTitle.text('Customize Columns');
  var columns = $.parseJSON($('#table-custom-columns').attr('value'));

  $.get('/'+ $(this).data('controller') +'/'+ $(this).data('action') +'?'+ new Date().getTime(), function(data) {
    var column_stub = $(data).find('.column_stub');
    var columns_set = $.parseJSON($(data).find('#columns-set').attr('value'));
    modalBody.html(data);
    modalBody.find('.column_stub').remove();
    var appendColumn = function (c,columns,column_stub,checked) {
      var column = column_stub.clone();
      column.removeClass('column_stub');
      $(column.children('td')[1]).text( columns[c].replace(/\.(.)/, function(str) { return str.toUpperCase().replace(/\./, '') }).replace(/([A-Z])/g, ' $1').replace(/^./, function(str) { return str.toUpperCase(); }) );
      var a_id = $(column.children('td')[2]).find('input[type="hidden"]').attr('id');
      var a_name = $(column.children('td')[2]).find('input[type="hidden"]').attr('name');

      column.find('input[type="hidden"]')
          .attr('name', a_name +'['+ columns[c] +']')
          .attr('id', a_id.replace('_', columns[c].charAt(0).toUpperCase()+columns[c].substr(1) +'_'));
      column.find('input[type="checkbox"]')
          .attr('name', a_name +'['+ columns[c] +']')
          .attr('id', a_id.replace('_', columns[c].charAt(0).toUpperCase()+columns[c].substr(1)))
          .prop('checked', checked);
      modalBody.find('tbody').append(column);
    };
    for (var c in columns_set) {
      appendColumn(c,columns_set,column_stub,true);
      if (columns.indexOf(columns_set[c]) != -1) {
        columns.splice(columns.indexOf(columns_set[c]),1);
      }
    }
    for (var c in columns) {
      appendColumn(c,columns,column_stub,false);
    }
    modalBody.find('[data-toggle="checkbox"]').radiocheck();
  });
});

$('body').on('click', '.up_arrow.action', function(e){
  e.preventDefault();
  var current = $(this).parent('td').parent('tr');
  var p_sibling = current.prev();
  if (p_sibling.length) {
    p_sibling.before(current);
  }
});

$('body').on('click', '.down_arrow.action', function(e){
  e.preventDefault();
  var current = $(this).parent('td').parent('tr');
  var n_sibling = current.next();
  if (n_sibling.length) {
    n_sibling.after(current);
  }
});

$('body').on('change', '#custom-columns input[type="checkbox"]', function() {
  var element = $(this);
  var current = element.closest('tr');
  var p_sibling = element.closest('tr').prev();
  var n_sibling = element.closest('tr').next();

  if (element.prop('checked')) {
    while (p_sibling.length && !p_sibling.find('input[type="checkbox"]').prop('checked')) {
      p_sibling.before(current);
      p_sibling = current.prev();
    }
  } else {
    while (n_sibling.length && n_sibling.find('input[type="checkbox"]').prop('checked')) {
      n_sibling.after(current);
      n_sibling = current.next();
    }
  }
});
