// Configuration object
const config = {
    width: 1000,
    height: 700,
    columns: 4,
    rows: 4,
    stageBox: '',
    masterDB: [],
    skipArray: [],
    apiKey: 'AIzaSyDklKd0omHIdwOWr07vFppSXvjZDpf0_kE',
    spreadsheetId: '1W-wSwHFy2MgoXZ8BOD9EijVwtugpwHK8XHt7xLVMyU0',
    exportResolutionFactor: 4 // Resolution multiplier for exported images
  };
  
  // Initialize the application when DOM is fully loaded
  document.addEventListener("DOMContentLoaded", initializeApp);
  
  function initializeApp() {
    parseQueryParameters();
    createDownloadButton();
    loadMasterDB();
  }
  
  // Parse URL query parameters
  function parseQueryParameters() {
    const queryParams = new URLSearchParams(window.location.search);
    
    config.columns = parseInt(queryParams.get("col")) || config.columns;
    config.rows = parseInt(queryParams.get("row")) || config.rows;
    config.stageBox = queryParams.get("sb") || '';
    
    const skipParam = queryParams.get("skip");
    config.skipArray = skipParam ? skipParam.split(",") : [];
  }
  
  // Create and add download button to the page
  function createDownloadButton() {
    const downloadButton = document.createElement("button");
    downloadButton.innerText = "Download as PNG";
    downloadButton.style.display = "block";
    downloadButton.style.margin = "10px";
    downloadButton.onclick = downloadSVGAsPNG;
    document.body.appendChild(downloadButton);
  }
  
  // Load master database from Google Sheets
  function loadMasterDB() {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/Master?key=${config.apiKey}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        config.masterDB = convertSheetJsonToObjects(data);
        const stageBoxConfig = getStageBoxConfig(config.stageBox);
        renderStageBoxVisualization(stageBoxConfig);
      })
      .catch(error => console.error("Error loading master DB:", error));
  }
  
  // Convert sheet JSON to array of objects
  function convertSheetJsonToObjects(sheetData) {
    if (!sheetData.values || sheetData.values.length < 2) {
      console.error("Invalid sheet data format");
      return [];
    }
    
    const headers = sheetData.values[0];
    const rows = sheetData.values.slice(1);
    
    return rows.map(row => {
      return headers.reduce((obj, header, index) => {
        obj[header] = row[index] || '';
        return obj;
      }, {});
    });
  }
  
  // Filter master DB for specific stage box
  function getStageBoxConfig(stageBoxId) {
    return config.masterDB
      .filter(item => item.stageBox === stageBoxId)
      .map(item => ({
        consoleIO: item.consoleIO,
        connectionType: item.connectionType,
        instrumentShortName: item.instrumentShortName.toUpperCase(),
        stageInput: item.stageInput,
        color: item.surfaceColor,
        condition: item.condition,
        stageInputType: item.stageInputType.toLowerCase()
      }));
  }
  
  // Generate and render the stage box visualization
  function renderStageBoxVisualization(stageBoxConfig) {
    const circleRadius = config.width / (config.columns * 3.25);
    const stageBoxElements = generateStageBoxElements(stageBoxConfig, circleRadius);
    
    const svg = d3.select("body")
      .append("svg")
      .attr("width", config.width)
      .attr("height", config.height);
    
    const groups = svg.selectAll("g")
      .data(stageBoxElements)
      .enter()
      .append("g");
    
    // Add title
    svg.append("text")
      .attr("x", config.width / 2)
      .attr("y", 25)
      .attr("text-anchor", "middle")
      .style("font-size", "30px")
      .text(config.stageBox.toUpperCase());
    
    // Draw rectangles
    drawRectangles(groups, circleRadius);
    
    // Draw main circles
    drawMainCircles(groups, circleRadius);
    
    // Draw small circles
    drawSmallCircles(groups, circleRadius);
    
    // Add text elements
    addTextElements(groups, circleRadius);
    
    // Add footer text
    svg.append("text")
      .attr("x", config.width / 2)
      .attr("y", config.height - 10)
      .attr("text-anchor", "middle")
      .style("font-size", "14px")
      .style("fill", "black")
      .text("Made with ❤️ by DG");
  }
  
  // Generate data for stage box elements
  function generateStageBoxElements(stageBoxConfig, radius) {
    const elements = [];
    
    for (let i = 1; i <= config.columns * config.rows; i++) {
      const element = {
        x: (2 * radius) + ((i - 1) % config.columns) * 3 * radius,
        y: (3 * radius * Math.floor((i - 1) / config.columns)) + (radius * 2),
        r: radius,
        stageInput: i,
        condition: "HIDDEN"
      };
      
      const matchedConfig = stageBoxConfig.find(cfg => cfg.stageInput == i);
      if (matchedConfig) {
        Object.assign(element, matchedConfig);
      }
      
      elements.push(element);
    }
    
    return elements;
  }
  
  // Draw rectangles for each element
  function drawRectangles(groups, radius) {
    groups.append("rect")
      .attr("x", (d, i) => (i % config.columns) * 3 * radius + 0.5 * radius)
      .attr("y", (d, i) => 4 * radius * Math.floor(i / config.columns) + 0.5 * radius)
      .attr("width", 3 * radius)
      .attr("height", 4 * radius)
      .style("stroke", "black")
      .style("fill", d => d.condition === "NOK" ? "red" : "none")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden");
  }
  
  // Draw main circles for each element
  function drawMainCircles(groups, radius) {
    groups.append("circle")
      .attr("cx", (d, i) => (2 * radius) + (i % config.columns) * 3 * radius)
      .attr("cy", (d, i) => (4 * radius * Math.floor(i / config.columns)) + (radius * 2.5))
      .attr("r", radius)
      .style("stroke", "black")
      .style("fill", d => d.stageInputType === "input" ? "black" : "none")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden");
  }
  
  // Draw small circles for each element
  function drawSmallCircles(groups, radius) {
    // Draw two small circles at the top
    [1.5, 2.5].forEach(offset => {
      groups.append("circle")
        .attr("cx", (d, i) => (offset * radius) + (i % config.columns) * 3 * radius)
        .attr("cy", (d, i) => (4 * radius * Math.floor(i / config.columns)) + (radius * 2.5))
        .attr("r", radius / 10)
        .style("fill", d => d.stageInputType === "input" ? "white" : "black")
        .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden");
    });
    
    // Draw one small circle at the bottom
    groups.append("circle")
      .attr("cx", (d, i) => (2 * radius) + (i % config.columns) * 3 * radius)
      .attr("cy", (d, i) => (4 * radius * Math.floor(i / config.columns)) + (radius * 3))
      .attr("r", radius / 10)
      .style("fill", d => d.stageInputType === "input" ? "white" : "black")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden");
  }
  
  // Add text elements for each element
  function addTextElements(groups, radius) {
    // Add stage input number
    groups.append("text")
      .attr("x", (d, i) => (i % config.columns) * 3 * radius + 0.75 * radius)
      .attr("y", (d, i) => (4 * radius * Math.floor(i / config.columns)) + 1.25 * radius)
      .style("fill", "black")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden")
      .text(d => d.stageInput);
    
    // Add console IO
    groups.append("text")
      .attr("x", (d, i) => (i % config.columns) * 3 * radius + 2.75 * radius)
      .attr("y", (d, i) => (4 * radius * Math.floor(i / config.columns)) + 1.25 * radius)
      .style("fill", "black")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden")
      .text(d => d.consoleIO);
    
    // Add instrument name or fault status
    groups.append("text")
      .attr("x", (d, i) => (i % config.columns) * 3 * radius + 2.75 * radius)
      .attr("y", (d, i) => (4 * radius * Math.floor(i / config.columns)) + 4.25 * radius)
      .style("fill", "black")
      .style("visibility", (d, i) => isElementVisible(d, i) ? "visible" : "hidden")
      .text(d => d.condition === "NOK" ? "FLTY" : d.instrumentShortName);
  }
  
  // Check if an element should be visible
  function isElementVisible(data, index) {
    return data.condition !== "HIDDEN" && !config.skipArray.includes((index + 1).toString());
  }
  
  // Download SVG as PNG with increased resolution
  function downloadSVGAsPNG() {
    const svgElement = document.querySelector("svg");
    if (!svgElement) {
      console.error("SVG element not found.");
      return;
    }
    
    const svgWidth = parseInt(svgElement.getAttribute("width")) || 500;
    const svgHeight = parseInt(svgElement.getAttribute("height")) || 500;
    
    // Create a serialized SVG string
    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgElement);
    
    // Create a canvas element with increased resolution
    const canvas = document.createElement("canvas");
    canvas.width = svgWidth * config.exportResolutionFactor;
    canvas.height = svgHeight * config.exportResolutionFactor;
    const ctx = canvas.getContext("2d");
    
    // Create an image from the SVG
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    
    img.onload = function() {
      // Draw white background
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Scale the context to increase resolution
      ctx.scale(config.exportResolutionFactor, config.exportResolutionFactor);
      
      // Draw the SVG on the canvas
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);
      
      // Create download link
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${config.stageBox}.png`;
      
      // Trigger download
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    };
    
    img.src = url;
  }