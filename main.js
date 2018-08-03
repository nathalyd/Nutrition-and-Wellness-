// This urls is from airtable from the Authentication section
var airtable_list_url = 'https://api.airtable.com/v0/appMdc6LaWCNw1nRZ/Table%201?api_key=keyG62m6YyXsVP0vi';


} 
// This is where we get the JSON data from Airtable!

$.getJSON( airtable_list_url, function( data ) {
  var items = [];
  $.each( data.records, function( key, val ) {
    console.log(val.fields)
      var name = val.fields ['name'];
      var address =
      var picture =

    items.push(`<h2>${val.fields['Vitamin']}</h2>`);
  });
  $(".list-view").append(items.join(''));
});
var listView = function(id, vitamin, picture, about, source) {
  return `<div class="col-sm-3">
    <div class="card mb-4 box-shadow">
      <a href="index.html?id=${id}"><img class="card-img-top" src="${Picture}"></a>
      <div class="card-body">
        <h4><a href="index.html?id=${id}">${Vitamin}</a></h4>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${rating}</small>
        </div>
      </div>
    </div>
  </div>`;
}

// Get and display the data for all items
var getDataForList = function() {
  // 1. Gets the data from the Airtable API
  $.getJSON(`https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations?api_key=${api_key}&view=Rating`, function( data ) {
    // console.log(data.records);
    var html = [];
    html.push(`<div class="row">`);
    // 2. Iterates over every record and uses the list template
    $.each( data.records, function( index, val ) {
      // console.log(val.fields)
      var id = val.id;
      var fields = val.fields;
      var vitaminSupplement = fields["Vitamin"];
      var pictureUrl = fields["Picture"] ? fields["Picture"][0].url : '';
      var neighborhood = fields["About"];
      var rating = fields["Source"];
      var itemHTML = listView(id, vitamin, picture, about, source);
      html.push(itemHTML);
    });
    html.push(`</div>`);
    // 3. Adds HTML for every item to our page
    $(".list-view").append(html.join(""));
  });
}

// Template that generates HTML for one item in our detail view, given the parameters passed in
var detailView = function(id, vitamin, picture, about, source) {
  return `<div class="col-sm-12">
    <div class="card mb-4 box-shadow">
      <img class="card-img-top" src="${picture}">
      <div class="card-body">
        <h2>${vitamin}</h2>
        <p class="card-text">${about}</p>
        <div class="d-flex justify-content-between align-items-center">
          <small class="text-muted">${source}</small>
          
        </div>
        ${website ? `<a href="${website}">${website}</a>`: ``}
      </div>
    </div>
  </div>`;
}

// Get and display the data for one item based on on the ID
var getDataForId = function(id) {
  $.getJSON( `https://api.airtable.com/v0/appSrgke7E0ElZhMY/Locations/${id}?api_key=${api_key}`, function( record ) {
    // console.log(data);
    var html = [];
    html.push(`<div class="row">`);
      // console.log(val)
      var id = record.id;
      var fields = record.fields;
      var vitamin = fields["Vitamin"];

      var vitamin = fields ["Vitamin"];
      var picture = fields["Picture"] ? fields["Picture"][0].url : '';
      var about = fields["About"];
      var source = fields["Source"];
   
      var itemHTML = detailView(id, vitamin, picture, about, source);
      html.push(itemHTML);
    html.push(`</div>`);
    $(".detail-view").append(html.join(""));
  });
}

// Do we have an ID in the URL?
var id = getParameterByName("id");

// If we have an ID, we should only get the data for one item
// Otherwise, we should display the data for all items
if (id) {
  getDataForId(id);
} else {
  getDataForList();
}
