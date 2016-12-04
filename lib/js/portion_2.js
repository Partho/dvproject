var global_portion2 = {};
// var global_portion2.filtered_data = []; 
// var global_portion2.p2_min_value, global_portion2.p2_max_value, global_portion2.scale_data;
// var global_portion2.chi_name, global_portion2.portion2_data; 


function create_portion2() {


	global_portion2.portion2_data = complete_data;

	
	global_portion2.chi_name = "chi_lsi"

	//console.log(global_portion2.chi_name);

	//var index = Math.round(Math.random() * global_portion2.portion2_data.length),
	w = 595, 
	h = 530;

	
	//SaVaGe.ToggleSwitch({container: "#big", width: 50, height: 10});


	//console.log(index);

	// For axis label
	var rl = d3.scale.linear().domain([0, 100]).range([0, w / 2 - 60]);

	// For circle changes
	var rs = d3.scale.log().domain([1, 100]).range([0, w / 2 - 60]);
	var rr = d3.scale.linear().domain([Math.sqrt(4 / Math.PI), Math.sqrt(15 / Math.PI), Math.sqrt(50 / Math.PI) , Math.sqrt(100 / Math.PI)]).range([11, 8, 5, 2]);
	
	var c = d3.scale.log().domain([1, 20, 100]).range(["#F9786C", "#41415F", "#193244"]);

	// data.forEach(function(d, i) {
	// 	d.index = d["index"];
	// });

	



	function key_func(d) {return d.index;}



	 // global_portion2.p2_min_value = global_portion2.filtered_data[1]['chi'];
	 // global_portion2.p2_max_value = global_portion2.filtered_data[19]['chi'];
	 // var global_portion2.scale_data = d3.scale.linear().domain([global_portion2.p2_min_value, global_portion2.p2_max_value]).rangeRound([5, 100]);


	var axes = [
		{ 'label': 'very similar', 'value': 20 },
		{ 'label': 'similar', 'value': 40 },
		{ 'label': 'different', 'value': 60 },
		{ 'label': 'very different', 'value': 80 },
		{ 'label': 'extremely different', 'value': 100} 
	];

	var rfunc = function(d, i) { return rr(i == 0 ? 1 : Math.sqrt(global_portion2.scale_data(d['chi']) / Math.PI)); };
	
	var layout = "radial";
	var size = "sim";

	var svg_portion2 = d3.select("#viz").append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr('class','svg_portion2_main')


	var g = svg_portion2.append('g')
		.attr('transform', "translate(290, 290)")
		.attr('class','svg_portion2')

	

	var arc = d3.svg.arc()
		.outerRadius(function(d) { return rl(d.value); })
		.startAngle(0)
		.endAngle(2 * Math.PI)


	var ga = g.append("g")
		.attr("id", "axisgroup")
		.style("opacity", 50)


	d3.selectAll("#axisgroup")
			.transition()
			.duration(1300)
			.style("opacity", 1)


	ga.selectAll(".axispath")
	  	.data(axes)
	  	  .enter().append("path")
	  	.attr("id", function(d, i) { return "axispath" + i; })
	  	.attr("class", "axispath")
	  	.attr("d", arc)
	  	.style("stroke", "#91B6D4")
	  	.style("fill", "none")
	  	.style("opacity", 0.6)

	ga.selectAll(".axislabel")
		.data(axes)
		  .enter().append("text")
		.attr("class", "axislabel")
		.attr("dy", -5)
		.attr("dx", 0)
		.style("fill", "#91B6D4")
		.style("font-size", "12px")
		.style("text-anchor", "middle")
	  .append("textPath")
	  	.attr("xlink:href", function(d, i) { return "#axispath" + i; })
	  	.attr("startOffset", "40%")
		.text(function(d, i) { return d.label; }) 

		// d3.selection.prototype.moveToFront = function() { 
		//     return this.each(function() { 
		//         this.parentNode.appendChild(this); 
		//     }); 
		// }; 




		var create_circle = function(){

			var curr_topic = global_topic_name;
			var selectedPlayer = svg_portion2.append("text")
			.attr("id", "selectedplayer")
			.attr("x", 54)
			.attr("y", 30)
			.text(curr_topic)
			.style("fill", "#000")
			.style("text-anchor", "start")
			.style("font-family", "Arimo")
			.style("font-size", "24px");

			global_portion2.filtered_data = [];

			global_portion2.portion2_data.forEach(function (d, i) { 

				if(d["topic"]=== curr_topic){
					console.log("Not on click:"+d["topic"]);
					console.log("Not on click:"+curr_topic);
					console.log("Not on click:"+"---");
					console.log(d);

					var io = d;

					//console.log(d[global_portion2.chi_name]);
					
					d[global_portion2.chi_name].forEach(function(d_inner, index_inner) {
					global_portion2.filtered_data.push({
												'topic':global_portion2.portion2_data[d_inner[0]]["topic"],
												'index':global_portion2.portion2_data[d_inner[0]]["index"],
												 'chi' : io[global_portion2.chi_name][index_inner][1] 
											});

					});
				}
			});

		   // console.log(global_portion2.chi_name);
		   	create_portion5_pon(global_topic_name,global_portion2.filtered_data)
			// global_portion2.filtered_data.forEach(function(d, i) {
			//    //console.log(d);
		 //    });



		  global_portion2.p2_min_value = global_portion2.filtered_data[1]['chi'];
		  global_portion2.p2_max_value = global_portion2.filtered_data[19]['chi'];
		  global_portion2.scale_data = d3.scale.linear().domain([global_portion2.p2_min_value, global_portion2.p2_max_value]).rangeRound([5, 100]);

		  var circle = g.selectAll('.city')
		  				.data(global_portion2.filtered_data, key_func)
					    .enter().append('circle')
					    .attr('class', 'city')
					  	.attr('r', rfunc)
					  	.attr("cy", 0)
						.attr("cx", 0)
					  	.style('fill', function(d, i) { return d["topic"] == curr_topic ? "#F9786C" : c(i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
					  	.style('stroke', 'white')
					  	.style('stroke-opacity', 0.3)
					  	.style("opacity", 0.9)



		        .on("click", function(d, ind) {

		    		if(d["topic"] != curr_topic){
			        	global_portion2.filtered_data = [] 

						global_portion2.portion2_data.forEach(function (data_outer, index_outer) { 
							//if(d["topic"]=== curr_topic){
							if(data_outer["topic"]=== d["topic"]){

								console.log("On click: "+d["topic"]);
								console.log("On click: "+curr_topic);
								console.log("On click: ---");
								console.log(d);


								var io = data_outer;

								data_outer[global_portion2.chi_name].forEach(function(d_inner, index_inner) {
									global_portion2.filtered_data.push({
										'topic':global_portion2.portion2_data[d_inner[0]]["topic"],
										'index':global_portion2.portion2_data[d_inner[0]]["index"],
										'chi' : io[global_portion2.chi_name][index_inner][1] 
									});

								});
							}
						});

						global_portion2.filtered_data.forEach(function(d, i) {
							d.index = d["index"];
						});

				        setGlobalTopicName(d["topic"],2);
				        update();
						//create_portion5_pon(global_topic_name,global_portion2.filtered_data)

		        	}

		        	
		    })

			.on("mouseover", function(d, i) {

				var labelbackground = d3.select(this.parentNode)
					.append('text')
					.attr('class', 'label')
					.style('text-anchor', 'middle')
					.text(function() { return d.topic; })
					.style('font-family', "'Arimo', sans-serif")
					.style('font-size', '16px')
					.style('font-weight', 'bold')
					.style('stroke', 'rgb(240,249,255)')
					.style('stroke-width', 3.5)
					.style('stroke-opacity', 0.6)
					.style('filter', 'url:(#dropshadow)')
					.attr('dy', function() { return -1 * rr(i == 0 ? 1 : Math.sqrt( global_portion2.scale_data(d['chi']) / Math.PI)) - 5; })
					.style('fill', 'none')

				var labelforeground = d3.select(this.parentNode)
					.append('text')
					.attr('class', 'label')
					.style('text-anchor', 'middle')
					.text(function() { return d.topic; })
					.style('font-family', "'Arimo', sans-serif")
					.style('font-size', '16px')
					.style('font-weight', 'bold')
					.attr('dy', function() { return -1 * rr(i == 0 ? 1 : Math.sqrt( global_portion2.scale_data(d['chi']) / Math.PI)) - 5; })
					.style('fill', '#000')

			
				labelbackground
					.attr('x', function() { return d["topic"] == curr_topic ? 0 : Math.cos(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
					.attr('y', function() { return d["topic"] == curr_topic ? 0 : Math.sin(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })

				labelforeground
					.attr('x', function() { return d["topic"] == curr_topic ? 0 : Math.cos(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
					.attr('y', function() { return d["topic"] == curr_topic ? 0 : Math.sin(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
			
			
			})
			.on("mouseout", function(d, i) {
				d3.selectAll('.label')
					.remove()

			});

			circle
			.transition()
			.duration(500)
			.attr("cx", function(d, i) { return rs(i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
			      .attr("transform", function(d, i) { return "rotate(" + d.index/ global_portion2.portion2_data.length * 360 + " 0 0)"; })
	    }
    
    
   		create_circle();

		function update() {

			var iter = d3.selectAll('.city')[0].length-1;
	        d3.selectAll('.city')        	  
	          .transition()
	          .duration(500)
	          .attr("cx", 0)
	          .attr("cy", 0)
	          .remove()
	          .each("end", function(d, i){
	          	if (iter == i){
	        		d3.select('.city').remove();
	        		d3.select('#selectedplayer').remove();
	        		d3.selectAll(".label").remove();
	        		create_circle();
	          	}
	      });

	    }


	var lsi_text = d3.select("#defaultOn").append("text")
	.attr("id", "lsi_text")
	.attr("x", 10)
	.attr("y", 0)
	.text("LSI   ")
	.style("fill", "#000")
	.style("text-anchor", "start")
	.style("font-family", "Arimo")
	.style("font-size", "16px")

	SaVaGe.ToggleSwitch({container: "#defaultOn", value:true, width: 50, height: 15, duration: 100, value:false,
                          colors: {backLeft:'#fbb', foreLeft:'white', backRight:'#bbf', foreRight:'white'},
                          onChange: function(toggler) { 
                          	if(toggler.getValue()===false){
                          		global_portion2.chi_name = "chi_lsi";
                          		update();
								//create_portion5_pon(global_topic_name,global_portion2.filtered_data)
                          	}
                          	else if(toggler.getValue()===true){
                          		global_portion2.chi_name = "chi";
                          		update();
								//create_portion5_pon(global_topic_name,global_portion2.filtered_data)
                          	}
                          }
                        });

	var jaccard_text = d3.select("#defaultOn").append("text")
	.attr("id", "jaccard_text")
	.attr("x", 50)
	.attr("y", 10)
	.text("   Jaccard")
	.style("fill", "#000")
	.style("text-anchor", "start")
	.style("font-family", "Arimo")
	.style("font-size", "16px")
};

function update_portion_2(){
    create_portion5_pon(global_topic_name,global_portion2.filtered_data)
	//console.log(global_topic_name);
	var 	w = 580, h = 530;

	var rl = d3.scale.linear().domain([0, 100]).range([0, w / 2 - 60]);

	// For circle changes
	var rs = d3.scale.log().domain([1, 100]).range([0, w / 2 - 60]);
	var rr = d3.scale.linear().domain([Math.sqrt(4 / Math.PI), Math.sqrt(15 / Math.PI), Math.sqrt(50 / Math.PI) , Math.sqrt(100 / Math.PI)]).range([11, 8, 5, 2]);
	
	var c = d3.scale.log().domain([1, 20, 100]).range(["#F9786C", "#41415F", "#193244"]);


	var rfunc = function(d, i) { return rr(i == 0 ? 1 : Math.sqrt(global_portion2.scale_data(d['chi']) / Math.PI)); };

	var current_topic = global_topic_name;
	var iter = d3.selectAll('.city')[0].length-1;
    d3.selectAll('.city')        	  
      .transition()
      .duration(500)
      .attr("cx", 0)
      .attr("cy", 0)
      .remove()
      .each("end", function(d, i){
      	if (iter == i){
	    		d3.select('.city').remove();
	    		d3.select('#selectedplayer').remove();
	    		d3.selectAll(".label").remove();
	    		var new_svg = d3.select('.svg_portion2');

	    		var selectedPlayer = d3.select('.svg_portion2_main').append("text")
				.attr("id", "selectedplayer")
				.attr("x", 54)
				.attr("y", 30)
				.text(current_topic)
				.style("fill", "#000")
				.style("text-anchor", "start")
				.style("font-family", "Arimo")
				.style("font-size", "24px");

				global_portion2.filtered_data = [];

				global_portion2.portion2_data.forEach(function (d) { 
					if(d["topic"]=== current_topic){
						console.log("Inside update2 function:"+current_topic)
						var io = d;
						d[global_portion2.chi_name].forEach(function(d_inner, index_inner) {
							global_portion2.filtered_data.push({
													'topic':global_portion2.portion2_data[d_inner[0]]["topic"],
													'index':global_portion2.portion2_data[d_inner[0]]["index"],
													 'chi' : io[global_portion2.chi_name][index_inner][1] 
												});

						});
					}
				});


		 //    console.log(global_portion2.chi_name);
			// global_portion2.filtered_data.forEach(function(d, i) {
			//    console.log(d);
		 //    });

			 function key_func(d) {return d.index;}

			  global_portion2.p2_min_value = global_portion2.filtered_data[1]['chi'];
			  global_portion2.p2_max_value = global_portion2.filtered_data[19]['chi'];
			  global_portion2.scale_data = d3.scale.linear().domain([global_portion2.p2_min_value, global_portion2.p2_max_value]).rangeRound([5, 100]);
    	  
	    	  var circle = new_svg.selectAll('.city')
	  				.data(global_portion2.filtered_data, key_func)
				    .enter().append('circle')
				    .attr('class', 'city')
				  	.attr('r', rfunc)
				  	.attr("cy", 0)
					.attr("cx", 0)
				  	.style('fill', function(d, i) { return d["topic"] == current_topic ? "#F9786C" : c(i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
				  	.style('stroke', 'white')
				  	.style('stroke-opacity', 0.3)
				  	.style("opacity", 0.9)
			 .on("click", function(d, ind) {

			    	if (d["topic"] != current_topic){
			        	global_portion2.filtered_data = [] 

						global_portion2.portion2_data.forEach(function (data_outer, index_outer) { 
							if(data_outer["topic"]=== d["topic"]){
								var io = data_outer;
								data_outer[global_portion2.chi_name].forEach(function(d_inner, index_inner) {
									global_portion2.filtered_data.push({
										'topic':global_portion2.portion2_data[d_inner[0]]["topic"],
										'index':global_portion2.portion2_data[d_inner[0]]["index"],
										'chi' : io[global_portion2.chi_name][index_inner][1] 
									});

								});
							}
						});

						global_portion2.filtered_data.forEach(function(d, i) {
							d.index = d["index"];
						});

				        
				        
				        setGlobalTopicName(d["topic"],2);

				        update_portion_2();
							//create_portion5_pon(global_topic_name,global_portion2.filtered_data)

			    	}
	        })
		    .on("mouseover", function(d, i) {

				var labelbackground = d3.select(this.parentNode)
					.append('text')
					.attr('class', 'label')
					.style('text-anchor', 'middle')
					.text(function() { return d.topic; })
					.style('font-family', "'Arimo', sans-serif")
					.style('font-size', '16px')
					.style('font-weight', 'bold')
					.style('stroke', 'rgb(240,249,255)')
					.style('stroke-width', 3.5)
					.style('stroke-opacity', 0.6)
					.style('filter', 'url:(#dropshadow)')
					.attr('dy', function() { return -1 * rr(i == 0 ? 1 : Math.sqrt( global_portion2.scale_data(d['chi']) / Math.PI)) - 5; })
					.style('fill', 'none')

				var labelforeground = d3.select(this.parentNode)
					.append('text')
					.attr('class', 'label')
					.style('text-anchor', 'middle')
					.text(function() { return d.topic; })
					.style('font-family', "'Arimo', sans-serif")
					.style('font-size', '16px')
					.style('font-weight', 'bold')
					.attr('dy', function() { return -1 * rr(i == 0 ? 1 : Math.sqrt( global_portion2.scale_data(d['chi']) / Math.PI)) - 5; })
					.style('fill', '#000')

			
				labelbackground
					.attr('x', function() { return d["topic"] == current_topic ? 0 : Math.cos(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
					.attr('y', function() { return d["topic"] == current_topic ? 0 : Math.sin(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })

				labelforeground
					.attr('x', function() { return d["topic"] == current_topic ? 0 : Math.cos(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
					.attr('y', function() { return d["topic"] == current_topic ? 0 : Math.sin(d.index/global_portion2.portion2_data.length * 2 * Math.PI) * rs( i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
			})
			.on("mouseout", function(d, i) {
				d3.selectAll('.label').remove()

			});

			circle
			.transition()
			.duration(500)
			.attr("cx", function(d, i) { return rs(i == 0 ? 1 : global_portion2.scale_data(d['chi']) ); })
			      .attr("transform", function(d, i) { return "rotate(" + d.index/ global_portion2.portion2_data.length * 360 + " 0 0)"; })
		}
        
        
	});

} 