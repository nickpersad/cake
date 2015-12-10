function getViewport(object) {
  returnObject = typeof returnObject !== 'undefined' ? returnObject : false;
  var viewportWidth;
  var viewportHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != 'undefined') {
    viewportWidth = window.innerWidth,
    viewportHeight = window.innerHeight
  }
  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (typeof document.documentElement != 'undefined' &&
           typeof document.documentElement.clientWidth != 'undefined' &&
           document.documentElement.clientWidth != 0) {
    viewportWidth = document.documentElement.clientWidth,
    viewportHeight = document.documentElement.clientHeight
  }
  // older versions of IE
  else {
    viewportWidth = document.getElementsByTagName('body')[0].clientWidth,
    viewportHeight = document.getElementsByTagName('body')[0].clientHeight
  }

  return (object) ? { 'width' : viewportWidth, 'height' : viewportHeight } : [viewportWidth, viewportHeight];
}
