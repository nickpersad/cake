var addTagToUrl = function(tag) {
  if (!tag || tag === '') {
    alert("<?php echo __('Invalid tag.') ?>");
    return false;
  }

  var params = urlGetCakeParameters();
  var tags = '';
  var lcv = 0;

  for (; lcv < params.length; lcv++) {
    if (params[lcv].indexOf('tags:') !== -1) {
      tags = params[lcv].replace(/tags\:/, '');
      break;
    }
  }

  tags = urlAppendToCsv(tag, tags);
  params[lcv] = 'tags:' + tags;
  params = resetPage(params);
  url = urlGetBaseControllerAction() + params.join('/');
  window.location.href = url;
  return false;
};

var rmTagFromUrl = function(tag) {
  if (!tag || tag === '') {
    alert("<?php echo __('Invalid tag.') ?>");
    return false;
  }

  var params = urlGetCakeParameters();
  var tags = '';
  var lcv = 0;

  for (; lcv < params.length; lcv++) {
    if (params[lcv].indexOf('tags:') !== -1) {
      tags = params[lcv].replace(/tags\:/, '');
      break;
    }
  };

  tags = urlRemoveFromCsv(tag, tags);
  params[lcv] = (tags) ? 'tags:' + tags : '';
  params = resetPage(params);
  params = removeEmptyFromArray(params);
  url = urlGetBaseControllerAction() + params.join('/');
  window.location.href = url;
  return false;
};

var resetPage = function(array) {
  for (lcv = 0; lcv < array.length; lcv++) {
    if (array[lcv].indexOf('page:') !== -1) {
      array.splice(lcv, 1);
      return array;
    }
  }
  return array;
};

var removeEmptyFromArray = function(array) {
  for (lcv = 0; lcv < array.length; lcv++) {
    if (array[lcv] === '') {
      array.splice(lcv, 1);
      return array;
    }
  }
  return array;
};
