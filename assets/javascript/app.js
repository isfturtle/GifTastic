var topics = ["Green Sea Turtle", "Galapagos Tortoise", "Diamondback Terrapin", "Hawksbill Sea Turtle", "Eastern Box Turtle", "Snapping Turtle"];

function renderButtons() {
	$("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
			a.addClass("turtle");
			a.addClass("btn btn-info");
			a.attr("data-name", topics[i]);
			a.text(topics[i]);
			$("#buttons").append(a);
		}
	}

$("#add-turtle").on("click", function() {
    event.preventDefault();
    var newturtle= $("#turtle-input").val();
    topics.push(newturtle);
    renderButtons();
    });

function displayGIFs() {
	console.log("clicked");
	var name = $(this).data("name");
	var queryURL ="https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=dc6zaTOxFJmzC";
	console.log(queryURL);
	$.ajax({url: queryURL, method: "GET"}).done(function(response){
            	console.log(response);
            	$("#gifs").empty();
            	for(var i=0; i<25; i++){
            		var stillURL = response.data[i].images.original_still.url;
            		var animatedURL = response.data[i].images.original.url;
            		var rating = response.data[i].rating;
            		var im = $("<img>");
            		im.addClass("gif");
            		im.attr("data-state", "still");
            		im.attr("data-still", stillURL);
            		im.attr("data-animate", animatedURL);
            		im.attr("src", stillURL);
            		var div = $("<div>");
            		$("#gifs").append(div);
            		div.append(im);
            		div.append("<br> Rating:"+rating);
            		$
            	} 
            });
}

$(document).on("click", ".turtle", displayGIFs);

function changeState() {
      var st=$(this).attr("data-state");
      console.log(st)
      if(st == "still"){
        $(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
      }
      else{
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
      }
    };

$(document).on("click", ".gif", changeState);

renderButtons();