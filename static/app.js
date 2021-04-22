// Bring in samples.json with d3 and display data

function init() {
  d3.json("data/samples.json").then(function (data) {
    console.log(data);
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();
    
    for (var i = 0; i < data.names.length; i++) {
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = data.names[i];
      dropdownMenu.appendChild(opt);
    }
  });
  data = [
    {
      type: "bar",
      x: [1, 2, 3, 4, 5],
      y: ["a", "b", "c", "d", "e"],
      orientation: "h",
      name: "Bellybutton",
      marker: {
        color: "rgba(190,110,240,1)",
        width: 1,
      },
    },
  ];
  var layout = {
    title: "Bellybutton stuff",
  };
  var configuration = { responsive: true };

  Plotly.newPlot("bar", data, layout, configuration);

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selDataset").on("change", updatePlotly);
}

// This function is called when a dropdown menu item is selected
function updatePlotly() {
  // get data
  d3.json("data/samples.json").then(function (data) {
    console.log(data);
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset_id = dropdownMenu.property("value");
    var dataset = data.samples[dataset_id];

    // Initialize x and y arrays
    var x = dataset.sample_values.slice(0,10).reverse();
    var y = dataset.otu_ids.slice(0,10).reverse().map(id => `OTU ${id}`);

    
    
    
    
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
  });
}

init();

// work in progress