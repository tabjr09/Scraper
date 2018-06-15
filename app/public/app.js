// Grab the articles as a json
$.getJSON("/articles", function(data) {

  const site = 'https://www.muscleandfitness.com';

  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page

    // var articlenode = $('div');
    // var title = $('h2');
    // var link = $('a');

    //var article = $('p');


    var noteForm = 
    "<div class='card my-4'>" +
    "<h5 class='card-header'>Enter a Note:</h5>" +
    "<div class='card-body'>" +
    "<form>" +
    "<div class='form-group'>" +
    "<h9>Note Title</h9>" +
    "<textarea class='form-control' id = 'titleinput-"+ data[i]._id + "'" + "rows='1'></textarea>" +
    "<h7>Note</h7>" +
    "<textarea class='form-control' id = 'bodyinput-"+ data[i]._id  + "'" + "rows='3'></textarea>" +
    "</div>" +
    "<button class='btn btn-primary savenote' notes-id=" + data[i]._id + ">Add Note</button>" +
    "</form>" +
    "</div>" +
    "</div>"

    //article.attr("data-id", data[i]._id); 

    //.html(data[i].title + '<br>' + data[i].link);

    //article.append(noteForm);
    //$('#articles').append(article);

    //articlenode.addClass("post-preview");
    //articlenode.attr("data-id", data[i]._id); 

    //title.text(data[i].title);
    //link.addClass("article-url");
    //link.attr("href", data[i].link);

    //articlenode.append(title);
    //articlenode.append(link);
    
    //console.log(title);
    //$("#articles").append(title);


    //$('#article-list').append(articlenode);

    $("#articles").append("<p data-id='" + data[i]._id + "'>" +
                           data[i].title + "<br>" + 
                           "<a target='_blank'href =" + site + data[i].link  +
                           ">Read More...</a></p>");
    $("#articles").append(noteForm);
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", ".savenote", function() {
  // Grab the id associated with the article from the submit button

  event.preventDefault();
  console.log("save note clicked");
  var thisId = $(this).attr("notes-id");

  console.log(thisId);

  //Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput-"+ thisId).val(),
      // Value taken from note textarea
      body: $("#bodyinput-"+ thisId).val()
    }
    
  })

    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      //$("#titleinput-"+ thisId).empty();
      //$("#bodyinput-"+ thisId).empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput-"+ thisId).val("");
  $("#bodyinput-"+ thisId).val("");
});
