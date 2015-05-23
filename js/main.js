
//gets repository results from github api when user searches
$(document).ready(function () {
  var bubbleChart;
  $('#git').bind('click', function(event) {
      event.preventDefault();
      bubbleChart = new BubbleChart();
      $('#gitSearch').css({visibility: "visible"});
  		//retrieves search terms from the input box of the form
  		// var searchText = $("#searchText").val();
    });
    //bubbleChart will re-render if window changes size
    $(window).resize(function() {
      bubbleChart.throttledRender();
    });
    $('#searchNumber').change(function(event) {
    	bubbleChart.setNumBubbles($(this).val());
    	bubbleChart.render();
    });
  $('#gitSearch').bind('submit', function(event) {
    var searchText = $("#searchText").val();
    console.log(searchText);
    event.preventDefault();
    if (!bubbleChart.searchedBefore(searchText)) {
        $.ajax({
        url: "https://api.github.com/search/repositories",
        data: {
          //what the user typed in the search box
          q:searchText,
          //sort repositories by number of stars
          sort: "stars",
          order: "desc",
          //number of repositories per query
          per_page: 100
        },
        dataType: "json",
        /*the bubblechart object handles all the data visualization on
        completion of the search */
        success: function(data) {
          bubbleChart.newData(searchText,data);
          bubbleChart.render();
        },
      });
    }
  $('#resetButton').on("click", function() {
  	bubbleChart.clearData();
  	bubbleChart.render();
  });
 });
});