// Bring in samples.json with d3 and display data

function init() {
  // retreive data
  d3.json("data/samples.json").then(function (data) {
    //   diplay data on console
    console.log(data);

    // Retrive the names of the ID to populate the Test Subject ID No.
    for (var i = 0; i < data.names.length; i++) {
      // Select the starting information to load on opening
      if (i == 0) {
        //   1st ID displayed on Test Subjec ID No.
        var starting_id = data.names[i];
        // x, y and hover_labels for bar graph
        var x = data.samples
          .find((sample) => sample.id === starting_id)
          .sample_values.slice(0, 10)
          .reverse();
        var y = data.samples
          .find((sample) => sample.id === starting_id)
          .otu_ids.slice(0, 10)
          .reverse()
          .map((id) => `OTU ${id}`);
        var hover_label = data.samples
          .find((sample) => sample.id === starting_id)
          .otu_labels.slice(0, 10)
          .reverse();
        // Information for bubble chart
        var x_bb = data.samples
          .find((sample) => sample.id === starting_id)
          .otu_ids;
        var y_bb = data.samples
        .find((sample) => sample.id === starting_id)
        .sample_values;
        var marker_size = data.samples
        .find((sample) => sample.id === starting_id)
        .sample_values;
        var marker_color = data.samples
          .find((sample) => sample.id === starting_id)
          .otu_ids;
        var text_value = data.samples
        .find((sample) => sample.id === starting_id)
        .otu_labels;

      }
      // Populate the dropdown menu
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.selectAll("#selDataset").node();
      //   Append the IDs as options into "#selDataset" which is the dropdown meny
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = data.names[i];
      dropdownMenu.appendChild(opt);
    }
    // Set the bar graph
    data_bar = [
      {
        type: "bar",
        x: x,
        y: y,
        orientation: "h",

        text: hover_label,
        hoverlabel: { bgcolor: "white" },
        name: "Bellybutton",
        marker: {
          color: "rgba(190,110,240,1)",
          width: 1,
        },
      },
    ];
    // Set bar graph layout
    var layout_bar = {
      title: `Test Subject ID No: ${starting_id}`,
      xaxis: { title: "Sample Value" },
    };
    // set responsive action for bar graph
    var configuration = { responsive: true };
    // Deploy the bar graph
    Plotly.newPlot("bar", data_bar, layout_bar, configuration);

    // Bubble chart
    var data_bubble = [
        {
            type: "scatter",
            mode: "markers",
            x: x_bb,
            y: y_bb,
            marker: {
                color: marker_color,
                colorscale: [[0,'rgb(19, 11, 24'], [1, 'rgb(190,110,240)']],
                cmin: 0,
                cmax: 50,
                size: marker_size,
                sizemode: 'area',
                colorbar: {
                    thickness: 10,
                    y: 0.5,
                    ypad: 0,
                    title: "OTU Abundance",
                    title_slide: "bottom",
                    outlinewidth: 1,
                    outlinecolor: 'black',
                    thickfont: {
                        family: 'Lato',
                        size: 14,
                        color: 'green'
                    }
                }

            }
        }
    ]

    // Bubble chart layout
    var layout_bubble = {
        title: `Test Subject ID No: ${starting_id}`,
        xaxis: { title: "OTU ID"},
        yaxis: {title: "Sample Value"}
    };
    // Deploy the bubble chart
    Plotly.newPlot("bubble", data_bubble, layout_bubble, configuration)

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", updateBarPlotly);
  });
}

// This function is called when a dropdown menu item is selected to update the bar graph
function updateBarPlotly() {
  // Get data
  d3.json("data/samples.json").then(function (data) {
    // Display data on the console
    console.log(data);
    // Use D3 to select the dropdown menu to retreive the Test Subject ID No.
    // This will be used to display the information for the bar graph
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset_id = dropdownMenu.property("value");
    // Assign a variable after diving into the data to find the selected Test Subject ID No.
    var dataset = data.samples[dataset_id];

    // Retrieve x, y and hover_label for bar graph
    var x = dataset.sample_values.slice(0, 10).reverse();
    var y = dataset.otu_ids
      .slice(0, 10)
      .reverse()
      .map((id) => `OTU ${id}`);
    var hover_label = dataset.otu_labels.slice(0, 10).reverse();
    // Restyle the bar graph for the x, y and hover_label
    // Note the extra brackets around 'x' and 'y'
    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);
    Plotly.restyle("bar", "text", hover_label);
  });
}

// This function is called when a dropdown menu item is selected to update the bubble chart
function updateBubbleChart() {
  // Get data
  d3.json("data/samples.json").then(function (data) {
    // Use D3 to select teh dropdown menu to retrieve the Test Subject ID No.
    // This will be used to display on the information for the bubble chart
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset_id = dropdownMenu.property("value");
    // Assign a variable after diving into the data to find the selected Test Subject ID No.
    var dataset = data.samples[dataset_id];

    // Retrieve x_bb, y_bb, marker size, colors, text values
  });
}

init();
