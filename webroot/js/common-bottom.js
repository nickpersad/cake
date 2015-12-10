function isTouchDevice(){
  return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}

$('input, textarea').placeholder();

$('.datetime').datetimepicker({
  format: 'Y-m-d H:i:s'
});

function pushToHistory(elem) {
  var urlParameters = acquireUrlParameters(location.href);
  if (urlParameters !== '') {
    urlParameters = '?' + urlParameters;
  }
  var dataToggleTabHashes = [];
  $('a[data-toggle="tab"]').each(function(i, e) {
    dataToggleTabHashes.push(e.hash.substring(1));
  });
  var clearPathname = clearHashFromPathname(dataToggleTabHashes);
  window.history.pushState('', '', clearPathname + '/' + $(elem).context.hash.substring(1) + urlParameters);
}

function clearHashFromPathname(hashes) {
  var pathname = window.location.pathname;

  for (var a=0;a<hashes.length;a++) {
    if (pathname.substring(pathname.lastIndexOf('/')+1) === hashes[a]) {
      pathname = pathname.substring(0,pathname.lastIndexOf('/'));
    }
  }

  return pathname;
}

function acquireUrlParameters(url) {
  var parameters = '';
  var delimiterPosition = url.indexOf('?');
  if (delimiterPosition >= 0) {
    parameters = url.substring(delimiterPosition + 1);
  }
  return parameters;
}

function reInitRadioCheck() {
  if ($('[data-toggle="checkbox"]').length) {
    $('[data-toggle="checkbox"]').radiocheck();
  }
}
reInitRadioCheck();

function reInitSelect() {
  if ($('[data-toggle="select"][style!="display: none;"]').length) {
    $('[data-toggle="select"][style!="display: none;"]').select2({containerCssClass: 'btn-primary', dropdownCssClass: 'dropdown-menu-inverse', escapeMarkup: function (m) { return m; }});
  }
}

// Flat-UI Custom Selects
if ($('[data-toggle="select"]').length) {
  setSelect();
}

function setSelect() {
  $('[data-toggle="select"][style!="display: none;"]').each(function() {
    var el = $(this);
    var parent = el.closest('.show-search');
    el.select2({containerCssClass: 'btn-primary select-block', dropdownCssClass: 'dropdown-menu-inverse'+ ( parent.length ? ' show-search' : '' ), escapeMarkup: function (m) { return m; }});
  });
}

function reSetSelect() {
  setSelect();
}

// Flat-UI Tagsinput override hack
function upstyleTagsinput() {
  if ($('[data-role="tagsinput"]').length && $('[data-role="tagsinput"]').tagsinput()) {
    $('.bootstrap-tagsinput input').each(function () {
      $(this).before('<div class="tagsinput-add"><div></div></div>');
    });
    $('.tag-link-add').on('click', function (e) {
      e.preventDefault();
      $(this).parent().siblings('.bootstrap-tagsinput').children('input').val($(this).text()).blur();
    });
  }
}
// Flat-UI Select2-multi override hack
function upstyleSelectMultiple() {
  if ($('[data-toggle="select"][multiple="multiple"]')) {
    $('.select2-container-multi ul').each(function () {
      $(this).before('<div class="select-multi-list"><div></div></div>');
      $('.select-multi-list').on('click', function () {
        $(this).siblings('ul.select2-choices').children('li').children('input').trigger('focus');
      });
    });
  }
}

// Flat-UI Tooltips
if (!isTouchDevice()) {
  $('a[data-toggle="tooltip"]').tooltip();
  $('.a-tooltip').tooltip();
}

$('#a-timezonemodal').click(function (){
  if ($('#div-timezone-modal-body').html() === '') {
    $.ajax("/app/ajax_timezones")
      .done(function (data){
        $('#div-timezone-modal-body').html(data);
        // Flat-UI Custom Selects
        if ($('[data-toggle="select"]').length) {
          $('[name="data[timezone]"]').select2({containerCssClass: 'btn-primary select-block', dropdownCssClass: 'dropdown-menu-inverse show-search'});
        }
      });
  }
});
// Org Switch button and menu
$('#button-org-switch').on('click', function(e) {
  var org_switch = $('#div-org-switch');
  if ( org_switch.is(':visible') ) {
    org_switch.hide();
  } else {
    org_switch.show();
  }
});
$('body').on('click', function(e) {
  var target = $(e.target);
  var org_switch = $('#div-org-switch');
  if ( !target.is('#button-org-switch') && !target.is('#div-org-switch, #div-org-switch *') ) {
    if ( org_switch.is(':visible') ) {
      org_switch.hide();
    }
  }
});
if ($('#orgSwitchSelector').length) $('#orgSwitchSelector').select2({containerCssClass: 'btn-primary select-block', dropdownCssClass: 'dropdown-menu-inverse border'});
$('#orgSwitchSelector').on('change', function () {
  if ($(this).val()) {
    var orgKey = $(this).val()[0];
    if ($('#a-option-org-switch-' + orgKey)) {
      $('#a-option-org-switch-' + orgKey)[0].click();
    }
  }
});

function reInitFlatUI() {
  reSetSelect();
  reInitRadioCheck();
  upstyleTagsinput();
  upstyleSelectMultiple();
}

upstyleTagsinput();
upstyleSelectMultiple();

//Removes links when printing
(function() {
    var beforePrint = function() {
        $('[id^=a-]').css('display','none');
    };
    var afterPrint = function() {
        $('[id^=a-]').css('display','');
    };

    if (window.matchMedia) {
        var mediaQueryList = window.matchMedia('print');
        mediaQueryList.addListener(function(mql) {
            if (mql.matches) {
                beforePrint();
            } else {
                afterPrint();
            }
        });
    }

    window.onbeforeprint = beforePrint;
    window.onafterprint = afterPrint;
  }());