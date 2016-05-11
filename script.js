//console.log($("p:contains(Signature:)").text());

var dateAsc = true,
startDate = 0,
endDate   = 99999999900000,
tdate = "",
qsRegex,
$grid = $('#ProgressNotes-2').isotope({
  itemSelector: '.type-post',
    layoutMode: 'masonry',
   getSortData: {
     signature: function (itemElem) {
       $(itemElem).find(" p:contains(Signature:)");
              },
          date: function (itemElem) {
          tdate = Date.parse($(itemElem).find('h2').text());
          return(tdate);
              }            
  }
});



$('#sort-date').click(function(){
  setSortDirection();
  $grid.isotope({ sortBy: 'date' });
});

/*
 *
 * filters items with a date later than below
 *
 */
$('#filter').click(function(){
  $grid.isotope({
  // filter element with numbers greater than 50
  filter: function() {
    // _this_ is the item element. Get text of element's .number
    tdate = Date.parse($(this).find('h2').text());
    // return true to show, false to hide
    return checkDate( tdate);
  }
});
});


$('#filter2').click(function(){
  $grid.isotope({
    // filter element with numbers greater than 50
    filter: function() {
      // _this_ is the item element. Get text of element's .number
      sig = $(this).find(" p:contains(Signature:)");
      //check if the string matches the text
      return qsRegex ? $(sig).text().match( qsRegex ) : true;
    }
  });
});


function checkDate(id) {
  
  if(id >= startDate && id <= endDate ) {
    return true;
  }
  else{
    return false;
  }
}

function setSortDirection(){
  dateAsc = !dateAsc;
  $grid.isotope({
    sortBy: 'date',
    sortAscending: dateAsc
  });  
}

/*Datepicker*/
  $(function() {
    $( "#from" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker( "option", "minDate", selectedDate );
      }
    });
    $( "#to" ).datepicker({
      defaultDate: "+1w",
      changeMonth: true,
      changeYear: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
      }
    });
  });
/*datepicker*/
$( "input[type='text']" ).change(function() {
  getVals();
});
function updateRange(start, end){
    if (isFinite(start)){
      startDate = start;
    } else {
      startDate = 0;
    }

    if (isFinite(end)){
      endDate = end;
    } else {
      endDate = 99999999900000;
    }
}
function getVals(){
    sd = Date.parse($('#from').val());
    ed = Date.parse($('#to').val());
    updateRange(sd,ed);
}

var $quicksearch = $('#quicksearch').keyup( debounce( searchFilter ) );

function searchFilter() {
  qsRegex = new RegExp( $quicksearch.val(), 'gi' );
  $grid.isotope({
    filter: function() {
      //console.log($(this).find("Signature:"));
      return qsRegex ? $(this).text().match( qsRegex ) : true;
    }
  });

}


function debounce( fn, threshold ) {
  var timeout;
  return function debounced() {
    if ( timeout ) {
      clearTimeout( timeout );
    }
    function delayed() {
      fn();
      timeout = null;
    }
    setTimeout( delayed, threshold || 100 );
  };
}
