// Used by View/Elements/download_csv_link.ctp
function exportTableToCSV($table, filename) {

  var $headers = $table.find('thead').find('tr:has(th)'),
      $rows = $table.find('tbody').find('tr:has(td)'),

      // Temporary delimiter characters unlikely to be typed by keyboard
      // This is to avoid accidentally splitting the actual contents
      tmpColDelim = String.fromCharCode(11), // vertical tab character
      tmpRowDelim = String.fromCharCode(0), // null character

      // actual delimiter characters for CSV format
      colDelim = '","',
      rowDelim = '"\r\n"',

      // Grab text from table into CSV formatted string
      csv_h = $headers.map(function (i, row) {
          var $row = $(row),
              $cols = $row.find('th');

          return $cols.map(function (j, col) {
              var $col = $(col),
                  text = $col.text().trim();

              return text.replace('"', '""'); // escape double quotes

          }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
          .split(tmpRowDelim).join(rowDelim)
          .split(tmpColDelim).join(colDelim),
      csv_r = $rows.map(function (i, row) {
          var $row = $(row),
              $cols = $row.find('td');

          return $cols.map(function (j, col) {
              var $col = $(col),
                  text = $col.text().trim().replace(/\n/gi, ", ").replace(/\s{2,}/gi, ' ');

              return text.replace('"', '""'); // escape double quotes

          }).get().join(tmpColDelim);

      }).get().join(tmpRowDelim)
          .split(tmpRowDelim).join(rowDelim)
          .split(tmpColDelim).join(colDelim),
      csv = '"' + csv_h + rowDelim + csv_r + '"';

      // Data URI,
      var csvBlob = new Blob([csv]);
      var csvData = 'data:application/csv;charset=utf-8,' + filename;

  if (navigator.appName !== 'Microsoft Internet Explorer') {
    $(this)
    .attr({
        "download": filename,
        "data-downloadurl": csvData + ':' + window.URL.createObjectURL(csvBlob),
        "href": window.URL.createObjectURL(csvBlob),
        "target": '_blank'
    });
  }
  else if (typeof(window.navigator.msSaveBlob) === "function") {
    // IE 10+ compatible
    window.navigator.msSaveBlob(csvBlob, filename);
  }
}

// This must be a hyperlink
$(".exportTableCsv").on('click', function (event) {
  var container_id = $(this).parent('div').parent('div').parent('div').attr('id'), file_title;
  file_title = ($('title').text().length) ? $('title').text() : 'export';
  // CSV
  exportTableToCSV.apply(this, [$('#'+ container_id +' table'), file_title+'.csv']);
  // IF CSV, don't do event.preventDefault() or return false
  // We actually need this to be a typical hyperlink
});
$(window).on('load', function () {
  if (navigator.appName !== 'Microsoft Internet Explorer') {
    if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0 || window.mobilecheck()) {
      $('.exportTableCsv').parent('div').parent('div').hide();
    }
  }
});
