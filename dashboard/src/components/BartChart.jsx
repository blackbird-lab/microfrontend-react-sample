import React from "react";
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom,
  format
} from "d3";

const POPULATION_CSV_URL = "/data.csv";

// Sequence of steps followed for drawing the bar chart
// 1. fetching the data from CSV file
// 2. rendering the rectangles for the data
// 3. Scaling the axis and providing domain & range
// 4. Margin Convention for displaying the axes
// 5. Adding axes
// 6. Customizing Axes
//    a) Formatting numbers
//    b) Removing unnecessary lines
//    c) Adding a visualization Title
//    d) Adding Axis Labels
//    e) Adding tick grid lines

export class BarChart extends React.Component {
  componentDidMount() {
    this.drawBarChart();
  }
  drawBarChart = () => {
    this.fetchPopulationData();
  };
  fetchPopulationData = () => {
    csv(POPULATION_CSV_URL) // This file is present in public folder
      .then(data => {
        data.forEach(d => {
          d.population = +d.population * 1000;
        });
        this.renderBarChart(data); // After fetching the data from CSV rendering the bar chart
      })
      .catch(error => {
        console.log("some error has occured", error);
        return null;
      });
  };
  renderBarChart = data => {
    const svg = select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    const margin = { top: 50, right: 40, bottom: 70, left: 120 }; // After adding the margin , need to recalculate width and height since they are affected
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // value accessor methods for reuse so that we can use these functions for different datasets with less number of modifications
    const xValue = d => d.population;
    const yValue = d => d.country;

    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]); // This is for the width of the rectangle so the max width will be SVG width

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1); // since this is for y-axis max value of range is height

    const g = svg
      .append("g") // This is to translate the whole bar chart group to get the spacing inorder to add axes
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxisTickFormat = number => format(".3s")(number).replace("G", "B"); // This is for formatting the numbers in the xAxis, .3s suggest 3 significant digits

    const xAxis = axisBottom(xScale)
      .tickFormat(xAxisTickFormat) // Formatting the numbers, replacing G to B to represent Billion
      .tickSize(-innerHeight + 10); // this is to add vertical grid lines across x-axis, -ve value moves updwards , +ve value moves downwards

    const yAxis = axisLeft(yScale);

    g.append("g")
      .call(yAxis)
      .selectAll(".domain, .tick line")
      .remove(); // To add Y-Axis to the bar chart

    const xAxisG = g
      .append("g")
      .call(xAxis) // To add X-Axis to the bar chart
      .attr("transform", `translate(0, ${innerHeight})`); // This is to translate Y-axis otherwise it appears at the top and not visible

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text") // This is to add X Axis Label
      .attr("class", "x-axis-label")
      .attr("x", innerWidth / 2)
      .attr("y", 60)
      .attr("fill", "black")
      .text("Population");

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", d => yScale(yValue(d))) // y poisiton changes from top to bottom so that you can see the bar with respect to the corresponding ordinal
      .attr("width", d => xScale(xValue(d))) // linear scale is calculated for the value in domain with respect to the range normal math calculation
      .attr("height", d => {
        // Bandwidth will be calculated as total (svg width / number of ordinals) in the domain of yScale
        // this height will be same for all the bars since they are categorical
        return yScale.bandwidth();
      });

    g.append("text") // This is to add Title to the visualization
      .attr("x", innerWidth / 4)
      .attr("y", -10)
      .text("Top 10 Most Populous Countries");
  };

  render() {
    return <svg width="960" height="500" />;
  }
}
