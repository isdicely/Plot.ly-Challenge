// Bring in samples.json with d3 and display data

function init() {
  // retreive data
  d3.json("data/samples.json").then(function (data) {
    //   diplay data on console
    console.log(data);

    // Retrive the names of the ID to populate the Test Subject ID No. dropdown menu
    for (var i = 0; i < data.names.length; i++) {
      // Select the starting information to load on opening
      if (i == 0) {
        //   1st ID displayed on Test Subjec ID No.
        var starting_ID = data.names[i];
      }
      // Use D3 to select the dropdown menu
      var dropdownMenu = d3.selectAll("#selDataset").node();
      //   Append the IDs as options into "#selDataset" which is the dropdown meny
      var opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = data.names[i];
      dropdownMenu.appendChild(opt);
    }
    //   Demographic information at first start
    // Use D3 to select the Demographic Info - Panel body

    var demographicInfo = document.getElementById("sample-metadata");
    var ul = document.createElement("ul");

    ul.setAttribute("id", "theList");

    const metadata_entry = data.metadata.find(
      (entry) => entry.id == starting_ID
    );
    const individual_info = Object.entries(metadata_entry);

    for (var j = 0; j < individual_info.length; j++) {
      var p = document.createElement("p");
      const [key, value] = individual_info[j];
      p.innerHTML = `${key}: ${value}`;
      demographicInfo.appendChild(p);
    }
    

    // Information for bar graph
    var x = data.samples
      .find((sample) => sample.id === starting_ID)
      .sample_values.slice(0, 10)
      .reverse();
    var y = data.samples
      .find((sample) => sample.id === starting_ID)
      .otu_ids.slice(0, 10)
      .reverse()
      .map((id) => `OTU ${id}`);
    var hover_label = data.samples
      .find((sample) => sample.id === starting_ID)
      .otu_labels.slice(0, 10)
      .reverse();

    // Information for bubble chart
    var selected_ID = data.names[i];
    var x_bb = data.samples.find((sample) => sample.id === starting_ID).otu_ids;
    var y_bb = data.samples.find((sample) => sample.id === starting_ID)
      .sample_values;
    var marker_size = data.samples.find((sample) => sample.id === starting_ID)
      .sample_values;
    var marker_color = data.samples.find((sample) => sample.id === starting_ID)
      .otu_ids;
    var text_value = data.samples.find((sample) => sample.id === starting_ID)
      .otu_labels;

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
          color: "rgba(190,0,240,1)",
          width: 1,
        },
      },
    ];
    // Set bar graph layout
    var layout_bar = {
      title: `Test Subject : Top 10 OTU Profile`,
      xaxis: { title: "Sample Value" },
    };
    // set responsive action for bar graph
    var configuration = { responsive: true };
    // Deploy the bar graph
    Plotly.newPlot("bar", data_bar, layout_bar, configuration);

    // Bubble chart data
    var data_bubble = [
      {
        type: "scatter",
        mode: "markers",
        x: x_bb,
        y: y_bb,
        text: text_value,
        hoverlabel: { bgcolor: "white" },
        marker: {
          color: marker_color,
          colorscale: "Rainbow",

          size: marker_size.map((x) => x * 10),
          sizemode: "area",
        },
      },
    ];
    // Bubble chart layout
    var layout_bubble = {
      title: "Test Subject : OTU Profile",
      xaxis: { title: "OTU ID" },
      yaxis: { title: "Sample Value" },
    };
    // Deploy the bubble chart
    Plotly.newPlot("bubble", data_bubble, layout_bubble, configuration);

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", update_all);
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
    Plotly.restyle("bar", "text", [hover_label]);
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

    // Retrieve bubble chart information
    var x_bb = dataset.otu_ids;
    var y_bb = dataset.sample_values;
    var marker_size = dataset.sample_values;
    var marker_color = dataset.otu_ids;
    var text_value = dataset.otu_labels;
    // Restyle the bubble chat
    Plotly.restyle("bubble", "x", [x_bb]);
    Plotly.restyle("bubble", "y", [y_bb]);
    Plotly.restyle("bubble", "size", [marker_size]);
    PLotly.restyle("bubble", "color", [marker_color]);
    Plotly.restyle("bubble", "text", [text_value]);
  });
}

// Function to add individual's demographic information
function updateDemographic_info() {
  // Get data
  d3.json("data/samples.json").then(function (data) {
    // Use D3 to select teh dropdown menu to retrieve the Test Subject ID No.
    // This will be used to display on the information for the bubble chart
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var id = dropdownMenu.property("value");
    // Assign a variable after diving into the data to find the selected Test Subject ID No.
    var dataset = data.metadata[id];
  });
}

// Function to run functions
function update_all() {
  updateBarPlotly();
  updateBubbleChart();
}
init();
