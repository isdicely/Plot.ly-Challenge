// Bring in samples.json with d3 and display data

function init() {
  d3.json("data/samples.json").then(function (data) {
    console.log(data);
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.selectAll("#selDataset").node();

    for (var i = 0; i < data.names.length; i++) {
      if (i == 0) {
        var starting_id = data.names[i];
        var x = data.samples.find(sample => sample.id === starting_id).sample_values.slice(0, 10).reverse();
        var y = data.samples.find(sample => sample.id === starting_id).otu_ids.slice(0, 10).reverse().map((id) => `OTU ${id}`);
        var hover_label = data.samples.find(sample => sample.id === starting_id).otu_labels.slice(0,10).reverse();
      }
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = data.names[i];
      dropdownMenu.appendChild(opt);
    }

    data_plot = [
      {
        type: "bar",
        x: x,
        y: y,
        orientation: "h",
        text: hover_label,
        hoverlabel: {bgcolor: 'white'},
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

    Plotly.newPlot("bar", data_plot, layout, configuration);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updatePlotly);
  });
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
    var x = dataset.sample_values.slice(0, 10).reverse();
    var y = dataset.otu_ids.slice(0, 10).reverse().map((id) => `OTU ${id}`);
    var hover_label = dataset.otu_labels.slice(0,10).reverse();
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", hover_label);
  });
}

init();
