const WIDTH = 1000;
const HEIGHT = 1500;
let columns = 4;
let rows = 4;
let stageBox;
let masterDB;
let skipArray = [];
let stageBoxName = "";

document.addEventListener("DOMContentLoaded", () => {
    loadMasterDB();
    columns = parseInt(getQueryParam("col")) || columns;
    rows = parseInt(getQueryParam("row")) || rows;
    stageBox = getQueryParam("sb");
    skipArray = getQueryParam("skip").split(",");
    console.log(skipArray);
});

function loadMasterDB() {
    fetch("https://sheets.googleapis.com/v4/spreadsheets/1W-wSwHFy2MgoXZ8BOD9EijVwtugpwHK8XHt7xLVMyU0/values/Master?key=AIzaSyDklKd0omHIdwOWr07vFppSXvjZDpf0_kE")
        .then(response => response.json())
        .then(data => {
            masterDB = convertSheetJson(data);
            const stageBoxConfig = getStageBoxConfig(stageBox);
            drawBox(stageBoxConfig);
        })
        .catch(error => console.error("Error loading MasterDB:", error));
}

function convertSheetJson(data) {
    const rows = data.values;
    return rows.slice(1).map(row => {
        const entry = {};
        rows[0].forEach((key, index) => {
            entry[key] = row[index];
        });
        return entry;
    });
}

function drawBox(stageBoxConfig) {
    const radius = WIDTH / (columns * 3.25);
    const circleArray = Array.from({ length: columns * rows }, (_, i) => {
        const quotient = Math.floor(i / columns);
        const remainder = i % columns;

        let circle = {
            x: (2 * radius) + remainder * 3 * radius,
            y: (3 * radius * quotient) + (radius * 2),
            r: radius,
            stageInput: i + 1,
            condition: "HIDDEN",
        };

        const config = stageBoxConfig.find(item => item.stageInput == circle.stageInput);
        if (config) {
            Object.assign(circle, config, {
                instrumentShortName: config.instrumentShortName.toUpperCase(),
                stageInputType: config.stageInputType.toLowerCase(),
            });
        }
        return circle;
    });

    console.log(circleArray);

    const svgContainer = d3.select("body").append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

    const circles = svgContainer.selectAll("g")
        .data(circleArray)
        .enter()
        .append("g");

    circles.append("text")
        .attr("x", WIDTH / 2)
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text(stageBoxName.toUpperCase());

    circles.append("rect")
        .attr("x", (d, i) => (i % columns) * 3 * radius + 0.5 * radius)
        .attr("y", (d, i) => (4 * radius * Math.floor(i / columns)) + 0.5 * radius)
        .attr("width", 3 * radius)
        .attr("height", 4 * radius)
        .style("stroke", "black")
        .style("fill", d => (d.condition === "NOK" ? "red" : "none"))
        .style("visibility", (d, i) => d.condition === "HIDDEN" || skipArray.includes((i + 1).toString()) ? "hidden" : "visible");

    circles.append("circle")
        .attr("cx", (d, i) => (2 * radius) + (i % columns) * 3 * radius)
        .attr("cy", (d, i) => (4 * radius * Math.floor(i / columns)) + (radius * 2.5))
        .attr("r", d => d.r)
        .style("stroke", "black")
        .style("fill", d => (d.stageInputType === "input" ? "black" : "none"))
        .style("visibility", (d, i) => d.condition === "HIDDEN" || skipArray.includes((i + 1).toString()) ? "hidden" : "visible");
}

function getStageBoxConfig(sb) {
    return masterDB.filter(item => item.stageBox === sb).map(item => {
        stageBoxName = item.stageLongName;
        return {
            consoleIO: item.consoleIO,
            connectionType: item.connectionType,
            instrumentShortName: item.instrumentShortName,
            stageInput: item.stageInput,
            color: item.surfaceColor,
            condition: item.condition,
            stageInputType: item.stageInputType,
        };
    });
}

function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key) || "";
}
