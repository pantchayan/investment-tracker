import { useEffect } from "react";
import * as d3 from "d3";
import db from "../firebase";
const Graph = ({ data }) => {
  useEffect(() => {
    d3.selectAll("svg").remove();
    d3.select(".graph").append("svg");
    d3.select("svg").append("g");
    // console.log("USE EFFECT FOR INITIAL @ GRAPH RAN");
  }, []);

  useEffect(() => {
    const dims = { height: 350, width: 350, radius: 150 };
    const center = { x: dims.width / 2 + 5, y: dims.height / 2 + 5 };

    d3.select(".graph>svg")
      .attr("width", dims.width)
      .attr("height", dims.height)
      .attr("fill", "black");

    let chart = d3
      .select("g")
      .attr("transform", `translate(${center.x}, ${center.y})`);

    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.cost);

    const arcPath = d3
      .arc()
      .outerRadius(dims.radius)
      .innerRadius(dims.radius / 2);

    const colorScale = d3.scaleOrdinal(d3["schemeSet3"]);

    let update = (data) => {
      data = data.map((item) => {
        let obj = { id: item.id, name: item.data.name, cost: item.data.cost };
        return { ...obj };
      });

      // D3 OPTICS PATTERN

      // Update scales that rely on data
      colorScale.domain(data.map((item) => item.name));

      // Join updated data to the elements
      const paths = chart.selectAll("path").data(pie(data));

      paths
        .exit()
        .transition()
        .duration(700)
        .attrTween("d", arcTweenExit)
        .remove();

      paths
        .attr("class", "arc")
        .attr("d", (d) => arcPath(d))
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("fill", (d) => colorScale(d.data.name));

      paths
        .enter()
        .append("path")
        .attr("class", "arc")
        // .attr("d", (d) => arcPath(d)) // transitioning from 0 to end
        .attr("stroke", "#fff")
        .attr("stroke-width", 3)
        .attr("fill", (d) => colorScale(d.data.name))
        .attr("class", (d) => `${d.data.cost}`)
        .transition()
        .duration(700)
        .attrTween("d", (d) => arcTweenEnter(d));

      chart
        .selectAll("path")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("click", handleClickEvent);
    };

    function handleMouseOver() {
      let name = d3.select(this)._groups[0][0].__data__.data.name;
      let cost = d3.select(this)._groups[0][0].__data__.data.cost;
      let id = d3.select(this)._groups[0][0].__data__.data.id;

      let data = [{ name, cost, id }];
      makePopUp(data);
      d3.select(this).style("opacity", "0.5");
    }

    function handleMouseOut() {
      makePopUp([]);
      d3.select(this).style("opacity", "1");
    }

    function handleClickEvent() {
      let id = d3.select(this)._groups[0][0].__data__.data.id;
      db.collection("investments").doc(id).delete();
    }

    let makePopUp = (data) => {
      let details = d3.select(".graph>svg").selectAll(".detail").data(data);
      details.exit().remove();

      details
        .attr("x", (d) => 0)
        .attr("y", (d) => 10)
        .attr("text-anchor", "left")
        .text((d) => d.name + ": ₹" + d.cost)
        .style("alignment-baseline", "middle")
        .style("font-weight", "500")
        .style("font-size", "15")
        .style("fill", "white")
        .attr("class", "detail");

      details
        .enter()
        .append("text")
        .attr("x", (d) => 0)
        .attr("y", (d) => 10)
        .attr("text-anchor", "left")
        .text((d) => d.name + ": ₹" + d.cost)
        .style("alignment-baseline", "middle")
        .style("font-weight", "500")
        .style("font-size", "15")
        .style("fill", "white")
        .attr("class", "detail");
    };

    const arcTweenEnter = (d) => {
      let i = d3.interpolate(d.endAngle, d.startAngle);

      return function (t) {
        // console.table(t , i(t), d.startAngle);
        d.startAngle = i(t);
        return arcPath(d);
      };
    };

    const arcTweenExit = (d) => {
      let i = d3.interpolate(d.startAngle, d.endAngle);

      return function (t) {
        d.startAngle = i(t);
        return arcPath(d);
      };
    };

    update(data);
    // console.log("USE EFFECT FOR DATA @ GRAPH RAN");
  }, [data]);

  return (
    <>
      <div className="graph"></div>
    </>
  );
};

export default Graph;
