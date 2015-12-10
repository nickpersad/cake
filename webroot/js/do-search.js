function doSearch(inputId) {
  var query = $('#' + inputId).val();
  var params = urlGetCakeParameters();
  var lcv, query_index, page_index;

  lcv = 0
  query_index = page_index = null;

  for (; lcv < params.length; lcv++) {
    if (params[lcv].indexOf('query:') !== -1) {
      query_index = lcv;
    }
    if (params[lcv].indexOf('page:') !== -1) {
      page_index = lcv;
    }
  }

  if (query !== '') {
    if (query_index !== null) {
      params[query_index] = 'query:' + query;
    }
    else {
      params[lcv] = 'query:' + query;
    }
  }
  else {
    params[query_index] = 'query:';
  }

  if (page_index !== null) {
    params[page_index] = 'page:';
  }

  url = urlGetBaseControllerAction() + params.join('/');
  window.location.href = url;
  return false;
}