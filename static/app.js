// Bring in samples.json with d3 and display data

d3.json("data/samples.json").then(function (data) {
  console.log(data);
  // Use D3 to select the dropdown menu
  var dropdownMenu = d3.selectAll("#selDataset").node();
  // Assign the dropdown menu item ID to a variable
  var dropdownMenuID = dropdownMenu.id;
  // Assing the dropdown menu option to a variable
  var selectedOption = dropdownMenu.value;

  for (var i = 0; i < data.names.length; i++) {
    var opt = document.createElement("option");
    opt.value = i;
    opt.innerHTML = data.names[i];
    dropdownMenu.appendChild(opt);
  }
});

// // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// function dive_data (data) {

// }
