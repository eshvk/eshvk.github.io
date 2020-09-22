			var NORMAL = 0.3;
			var OPAQUE = 1.0;
			var DISTRACTION = 0.075;
			// Read data from json.
			d3.json("/javascripts/bridgetjones/book_1_gist_subsampled.json", function(error, data) {
			    if (error) {
			        console.log(error);
			    } else {
			        var weights = [];
			        for (var day in data) {
			            var datapoint = [];
			            datapoint.push(parseInt(day, 10));
			            datapoint.push(data[day]["weight"]);
			            datapoint.push(data[day]["date"]);
			            datapoint.push(data[day]["summary"]);
			            weights.push(datapoint);
			        }
			        generateBridgetsLife(weights);

			    }
			});
			var jitter = function(epsilon) {
			    return Math.random() * (2 * epsilon) - epsilon;
			};
			// Fades other circles. 
			var eliminateDistractions = function(circles, currCircle) {
			    circles.filter(function(d) {
			            return d[0] != currCircle[0][0].__data__[0];
			        })
			        .transition()
			        .duration(200)
			        .attr("fill-opacity", DISTRACTION);
			    currCircle
			        .transition()
			        .duration(200)
			        .attr("fill-opacity", OPAQUE);
			};
			// Makes them normal.
			var restoreAll = function(circles) {
			    circles
			        .transition()
			        .duration(200)
			        .attr("fill-opacity", NORMAL);
			};
			var generateBridgetsLife = function(dataset) {

			    var mean = d3.mean(dataset, function(dp) {
			        return dp[1];
			    });
			    var linreg = function(x, dataset) {
			        nr_1 = dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[0] * dp[1]);
			        }, 0) * 1.0
			        nr_2 = dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[1]); 
			        }, 0) * dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[0]);
			    	}, 0) * 1.0/dataset.length;
			    	nr_3 = dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[0] * dp[0]);
			        }, 0) * 1.0;
			        nr_4 = Math.pow(dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[0]);
			        }, 0) ,2) * 1.0/dataset.length;
			        m = (nr_1 - nr_2)/(nr_3 - nr_4);
			        c = (dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[1]);}, 0) - (m * dataset.reduce(function(prevVal, dp) {
			            return prevVal + (dp[0]);
			    	}, 0))) * 1.0/dataset.length;
			    	return m * x + c;
			    }
			    var w = 500;
			    var h = 300;
			    var r = 5;
			    var yPadding = 30;
			    var xPadding = 30;
			    var xScale = d3.scale.linear()
			        .domain([-xPadding, d3.max(dataset, function(d) {
			            return d[0]; })])
			        .range([xPadding, w - xPadding]).nice();
			    var yScale = d3.scale.linear()
			        .domain([0.9 * d3.min(dataset, function(d) {
			            return d[1]; }), 1.1 * d3.max(dataset, function(d) {
			            return d[1]; })])
			        .range([h - yPadding, yPadding]).nice();
			    var xAxis = d3.svg.axis()
			        .scale(xScale)
			        .orient("bottom")
			        .ticks(5);
			    var yAxis = d3.svg.axis()
			        .scale(yScale)
			        .orient("left")
			        .ticks(5);
			    var svg = d3.select("#bridgetchart")
			        .append("svg")
			        .attr("width", w)
			        .attr("height", h);
			    svg.append("g")
			        .attr("class", "axis")
			        .attr("transform", "translate(0," + (h - xPadding) + ")")
			        .call(xAxis);
			    svg.append("g")
			        .attr("class", "axis")
			        .attr("transform", "translate(" + 1.25 * yPadding + ",0)")
			        .call(yAxis);
			    svg.append("text")
			        .attr("class", "title")
			        .attr("text-anchor", "middle")
			        .attr("x", w / 2)
			        .attr("y", 15)
			        .text("Bridget Jones: A year of emotions, pounds");
			    svg.append("text")
			        .attr("class", "label")
			        .attr("text-anchor", "middle")
			        .attr("x", w / 2)
			        .attr("y", h - 5)
			        .text("days");
			    svg.append("text")
			        .attr("class", "label")
			        .attr("text-anchor", "middle")
			        .attr("x", -h / 2)
			        .attr("y", -2)
			        .attr("dy", ".75em")
			        .attr("transform", "rotate(-90)")
			        .text("pounds");
			    var circles = svg.selectAll("circle")
			        .data(dataset)
			        .enter()
			        .append("circle").attr("class", "circle");
			    circles
			        .attr("cx", function(d) {
			            return xScale(d[0])})
			        .attr("cy", function(d) {
			            return yScale(d[1])})
			        .attr("r", r)
			        .attr("fill", function(d) {
			            if (d[1] >= mean) {
			                return "red";
			            } else {
			                return "green";
			            }
			        })
			        .attr("fill-opacity", NORMAL)
			        .on("mouseover", function(d) {
			            eliminateDistractions(d3.selectAll("circle"), d3.select(this));
			            var xPosition = parseFloat(d3.event.pageX) + w / 16;
			            var yPosition = parseFloat(d3.event.pageY) - h / 4;
			            d3.select("#caption")
			                .style("left", xPosition + "px")
			                .style("top", yPosition + "px")
			                .select("#value")
			                .text("On " + d[2] + ", Bridget wrote \"" + d[3] + "\"");
			            //Show the caption
			            d3.select("#caption")
			                .classed("hidden", false);
			        })
			        .on("mouseout", function() {
			            restoreAll(d3.selectAll("circle"), d3.select(this));
			            d3.select("#caption")
			                .classed("hidden", true);
			        });
			    var fit = d3.svg.line()
			    .x(function(d) {return xScale(d);})
			    .y(function(d) {return yScale(linreg(d, dataset));})
			    var line_data = dataset.map(function(d) {return d[0] - 2*r;})
			    line_data.push(d3.max(dataset, function(d) { return d[0] + 2*r; }))
			    svg
			    .append("path")
			    .datum(line_data)
			    .attr("class", "line")
			    .attr("d", fit);
			};