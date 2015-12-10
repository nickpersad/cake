var sortColumn = function (column, id) {
  if (!column || column === '') {
    alert("<?php echo __('Invalid column.') ?>");
    return false;
  }

  var params = urlGetCakeParameters();
  var sort = 'name';
  var lcv = 0;

  for (; lcv < params.length; lcv++) {
    if (params[lcv].indexOf('sort:') !== -1) {
      sort = params[lcv].replace(/sort\:/, '');
      break;
    }
  }

  sort = (sort === column) ? ('-' + column) : column;

  params[lcv] = 'sort:' + sort;
  url = urlGetBaseControllerAction(id) + params.join('/');

  window.location.href = url;

  return false;
};
