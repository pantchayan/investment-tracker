import { useEffect } from "react";
import * as d3 from "d3";

const Legend = ({ data }) => {
  useEffect(() => {
    d3.selectAll(".legend > svg").remove();
    d3.select(".legend").append("svg");
    d3.select(".legend > svg").append("g");

    console.log("USE EFFECT FOR INITIAL @ LEGEND RAN");
  }, []);

  useEffect(() => {
    console.log("USE EFFECT FOR DATA @ LEGEND RAN");

    let legend = d3.select(".legend > svg > g").attr('transform', 'translate(10,10)');
    const pie = d3
      .pie()
      .sort(null)
      .value((d) => d.cost);

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

      const texts = legend.selectAll("text").data(pie(data));
      const circles = legend.selectAll("circle").data(pie(data));

      console.log(texts, circles);
      texts
        .exit()
        // .transition()
        // .delay((d, i) => 180 * i)
        // .style("font-size", "0")
        .remove();

      texts
        .attr("y", (d, i) => i * 25) //  25 is the distance between labels
        .style("fill", (d) => colorScale(d.data.name))
        .attr("text-anchor", "left")
        .text((d) => d.data.name)
        .style("alignment-baseline", "middle")
        .style("text-style", "bold");

      texts
        .enter()
        .append("text")
        .attr("x", 10)
        .attr("y", (d, i) => i * 25) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", (d) => colorScale(d.data.name))
        .attr("text-anchor", "left")
        .text((d) => d.data.name)
        .style("alignment-baseline", "middle")
        .style("font-weight", "500")
        .style("font-size", "0")
        .transition()
        .delay((d, i) => 180 * i)
        .style("font-size", "15");

      circles
        .exit()
        // .transition()
        // .delay((d, i) => 200 * i)
        // .attr("r", 0)
        .remove();

      circles
        .attr("cy", (d, i) => i * 25)
        .style("fill", (d) => colorScale(d.data.name))
        .transition()
        .delay((d, i) => 200 * i)
        .attr("r", 4);

      circles
        .enter()
        .append("circle")
        .attr("cy", (d, i) => i * 25)
        .style("fill", (d) => colorScale(d.data.name))
        .transition()
        .delay((d, i) => 200 * i)
        .attr("r", 4);
    };

    update(data);
  }, [data]);

  return <div className="legend"></div>;
};

export default Legend;
