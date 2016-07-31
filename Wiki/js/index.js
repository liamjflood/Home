"use strict";

function addExtract(obj) {

  var identity = "#" + obj.id;

  var extractName = $(identity).text();

  $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&callback=?&titles=" + extractName).done(function (extract) {

    var nice = extract.query.pages[Object.keys(extract.query.pages)].extract;

    $('<p>').attr({ id: "extract", class: "row, col-xs-12 text-left" }).appendTo('#main');

    $("#extract").text(nice);
  });
}

function getSearchTitles() {

  $("p").remove();

  //get data from form
  var x = document.getElementById("search");
  var text = "";
  var i;
  for (i = 0; i < x.length; i++) {
    text += x.elements[i].value;
  }

  //use form data in wiki json query
  $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&continue=&srwhat=text&srprop=timestamp&callback=?&srsearch=" + text).done(function (wiki) {

    var title = "";
    var i = 0;

    while (i < 9) {

      title = wiki.query.search[i].title;

      //make new paras
      $('<p>').attr({ id: "para" + i, class: "row, col-xs-4 text-center", onmouseover: "addExtract(this)" }).appendTo('#main');
      //add data to new paras
      $('#para' + i).html('<a href="https://en.wikipedia.org/wiki/' + title + '">' + title + '</a>');

      i++;
    }
  });
}

function getRandom() {

  $("p").remove();

  $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=random&grnnamespace=0&prop=revisions|images&rvprop=content&callback=?").done(function (wiki) {

    var title = "";

    title = wiki.query.pages[Object.keys(wiki.query.pages)].title;

    window.open("https://en.wikipedia.org/wiki/" + title, "_self");

    document.getElementById('searchInput').value = title;
  });
}

$(document).ready(getSearchTitles());