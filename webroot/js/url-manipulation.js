// returns an array of the url parameters, not including Cake controller and action elements
var urlGetCakeParameters = function() {
  all_bits = window.location.pathname.split('/');

  pieces = [];
  for (i = 0; i < all_bits.length; i++) {
    if (all_bits[i] !== '') {
      if (all_bits[i].indexOf(':') !== -1) {
        pieces[pieces.length] = all_bits[i];
      }
    }
  }

  return pieces;
};


// return the base portion of the url including the protocol, host
// for ex: http://dwportal.devicewise.com/
var urlGetBase = function() {
  url = window.location.protocol + '//' + window.location.host + '/';
  return url;
};


// return the base portion of the url including the protocol, host, [admin,] controller, and action
// example: http://dwportal.devicewise.com/things/browse/
var urlGetBaseControllerAction = function(id) {
  var url = window.location.protocol + '//' + window.location.host + '/';

  var all_bits = window.location.pathname.split('/');

  var pieces = [];
  for (i = 0; i < all_bits.length; i++) {
    if (all_bits[i] !== '') {
      pieces[pieces.length] = all_bits[i];
    }
  }

  // the action was not included, it's the default action: index
  var action_offset = (pieces[0] === 'admin') ? 2 : 1;
  if (pieces.length === action_offset) {
    pieces[pieces.length] = 'index';
  }

  for (i = 0; i < (action_offset + 1) && i < pieces.length; i++) {
    url = url + pieces[i] + '/';
  }

  if (id && id.length !== 0) {
    url = url + id + '/';
  }

  return url;
};


// parse a csv string to an array ignoring empty elements [used in conjunction with urlGetCakeParameters]
// example: ",param1,param2,,param3," becomes... ["param1","param2","param3"]
var urlParseCsvToArray = function(csv, delim) {
  if (!csv) {
    return false;
  }
  delim = (!delim) ? ',' : delim;
  all_bits = csv.split(delim);
  bits = [];
  for (i = 0; i < all_bits.length; i++) {
    if (all_bits[i] !== '') {
      bits[bits.length] = all_bits[i];
    }
  }
  return bits;
};


// append a value to a csv string
var urlAppendToCsv = function(value, csv, delim) {
  if (!value) {
    return false;
  }
  if (!csv) {
    return value;
  }
  delim = (!delim) ? ',' : delim;
  bits = urlParseCsvToArray(csv, delim);
  bits[bits.length] = value;
  csv = bits.join(delim);
  return csv;
};


// remove a value from a csv string
var urlRemoveFromCsv = function(value, csv, delim) {
  if (!value) {
    return false;
  }
  if (!csv) {
    return false;
  }
  delim = (!delim) ? ',' : delim;
  bits = urlArrayDecodeURI(urlParseCsvToArray(csv, delim));
  index = bits.indexOf(value);
  if (index >= 0) {
    bits.splice(index, 1);
  }
  csv = bits.join(delim);
  return csv;
};


// perform decodeURI on the values in an array
var urlArrayDecodeURI = function(array) {
  for (i = 0; i < array.length; i++) {
    array[i] = decodeURI(array[i].replace(/\+/g, ' '));
  }
  return array;
};
