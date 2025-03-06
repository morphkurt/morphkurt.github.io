const config = {
    width: 1000,
    height: 1500,
    columns: 4,
    rows: 4,
    stageBox: '',
    masterDB: [],
    skipArray: []
};

document.addEventListener("DOMContentLoaded", () => {
    loadMasterDB();
    config.columns = parseInt(getQuery("col")) || config.columns;
    config.rows = parseInt(getQuery("row")) || config.rows;
    config.stageBox = getQuery("sb");
    config.skipArray = getQuery("skip").split(",") || [];
});

function loadMasterDB() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1W-wSwHFy2MgoXZ8BOD9EijVwtugpwHK8XHt7xLVMyU0/values/Master?key=AIzaSyDklKd0omHIdwOWr07vFppSXvjZDpf0_kE")
        .then(response => response.json())
        .then(data => {
            config.masterDB = convertSheetJson(data);
            const stageBoxConfig = getStageBoxConfig(config.stageBox);
            drawBox(stageBoxConfig);
        })
        .catch(error => console.error("Error loading master DB:", error));
}

function convertSheetJson(output) {
    return output.values.slice(1).map(row => {
        return output.values[0].reduce((acc, key, index) => {
            acc[key] = row[index];
            return acc;
        }, {});
    });
}

function drawBox(stageBoxConfig) {
    const r = config.width / (config.columns * 3.25);
    const circleArray = [];

    for (let i = 1; i <= config.columns * config.rows; i++) {
        let circle = {
            x: (2 * r) + ((i - 1) % config.columns) * 3 * r,
            y: (3 * r * Math.floor((i - 1) / config.columns)) + (r * 2),
            r,
            stageInput: i,
            condition: "HIDDEN"
        };

        const matchedConfig = stageBoxConfig.find(cfg => cfg.stageInput == i);
        if (matchedConfig) Object.assign(circle, matchedConfig);

        circleArray.push(circle);
    }

    const svg = d3.select("body").append("svg")
        .attr("width", config.width)
        .attr("height", config.height);

    const circles = svg.selectAll("g")
        .data(circleArray)
        .enter()
        .append("g");

    circles.append("text")
        .attr("x", config.width / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text(config.stageBox.toUpperCase());

    circles.append("rect")
        .attr("x", (d, i) => (i % config.columns) * 3 * r + 0.5 * r)
        .attr("y", (d, i) => 4 * r * Math.floor(i / config.columns) + 0.5 * r)
        .attr("width", 3 * r)
        .attr("height", 4 * r)
        .style("stroke", "black")
        .style("fill", d => d.condition === "NOK" ? "red" : "none")
        .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible");

    circles.append("circle")
        .attr("cx", (d, i) => (2 * r) + (i % config.columns) * 3 * r)
        .attr("cy", (d, i) => (4 * r * Math.floor(i / config.columns)) + (r * 2.5))
        .attr("r", r)
        .style("stroke", "black")
        .style("fill", d => d.stageInputType === "input" ? "black" : "none")
        .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible");

    [1.5, 2.5].forEach(offset => {
        circles.append("circle")
            .attr("cx", (d, i) => (offset * r) + (i % config.columns) * 3 * r)
            .attr("cy", (d, i) => (4 * r * Math.floor(i / config.columns)) + (r * 2.5))
            .attr("r", r / 10)
            .style("fill", d => d.stageInputType === "input" ? "white" : "black")
            .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible");
    });

    [2].forEach(offset => {
        circles.append("circle")
            .attr("cx", (d, i) => (offset * r) + (i % config.columns) * 3 * r)
            .attr("cy", (d, i) => (4 * r * Math.floor(i / config.columns)) + (r * 3))
            .attr("r", r / 10)
            .style("fill", d => d.stageInputType === "input" ? "white" : "black")
            .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible");
    });

    circles.append("text")
        .attr("x", (d, i) => (i % config.columns) * 3 * r + 0.75 * r)
        .attr("y", (d, i) => (4 * r * Math.floor(i / config.columns)) + 1.25 * r)
        .style("fill", "black")
        .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible")
        .text(d => d.stageInput);

    circles.append("text")
        .attr("x", (d, i) => (i % config.columns) * 3 * r + 2.75 * r)
        .attr("y", (d, i) => (4 * r * Math.floor(i / config.columns)) + 1.25 * r)
        .style("fill", "black")
        .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible")
        .text(d => d.consoleIO);

    circles.append("text")
        .attr("x", (d, i) => (i % config.columns) * 3 * r + 2.75 * r)
        .attr("y", (d, i) => (4 * r * Math.floor(i / config.columns)) + 4.25 * r)
        .style("fill", "black")
        .style("visibility", (d, i) => d.condition === "HIDDEN" || config.skipArray.includes((i + 1).toString()) ? "hidden" : "visible")
        .text(d => d.condition==="NOK" ? "FLTY" : d.instrumentShortName);
}

function getStageBoxConfig(sb) {
    return config.masterDB.filter(item => item.stageBox === sb).map(item => ({
        consoleIO: item.consoleIO,
        connectionType: item.connectionType,
        instrumentShortName: item.instrumentShortName.toUpperCase(),
        stageInput: item.stageInput,
        color: item.surfaceColor,
        condition: item.condition,
        stageInputType: item.stageInputType.toLowerCase()
    }));
}

function getQuery(key) {
    const queryString = new URLSearchParams(window.location.search);
    return queryString.get(key) || "";
}
