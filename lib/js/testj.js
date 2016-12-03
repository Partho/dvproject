var dat={}
// global_topic_id="aca"

//load json file
// d3.json("finalTopics.json", function(error, data) {
function create_portion3_4(){


  var parseDate = d3.time.format("%Y-%m-%d").parse;

  dat.dataset=complete_data;
  dat.current_topic=global_topic_name;
  dat.questions=[];

  dat.dataset.forEach(function(topic){
    if(topic.topic == global_topic_name) {
      dat.questions = topic.Questions;
    }
  });

  data=dat.questions;
  // console.log(parseDate1("2013-11-05T19:33:33.47"));
  // console.log(parseDate2("2011-11-14T00:00:00"));

  // console.log(data[0])

  data.forEach(function(d, i) {
    dateGet=d.questionPostDate;
    d.date = parseDate(dateGet.substring(0, dateGet.indexOf("T")));
    if(d.date==null)
    d.date=parseDate("2011-11-14");
    d.question = d.questionId;
    d.value=parseInt(d.noOfAnswers);
    d.title=d.questionTitle.substring(0,40);
    if(d.questionTitle.length > 40){
      d.title+="..."
    }

    // console.log(data[0])
    // console.log(d);
    // console.log(d.date.getDate());
  });

  var ndx=crossfilter(data)
  var allDim = ndx.dimension(function(d) {return d;});
  var dateDim = ndx.dimension(function(d) { return d.date; });
  var popularity = ndx.dimension(function(d) { return d.value; });

  function getTops(source_group) {
    return {
      all: function () {
        return source_group.top(10);
      }
    };
  }

  var minDate = dateDim.bottom(1)[0]["date"];
  var maxDate = dateDim.top(1)[0]["date"];

  // popularity.filter([new Date('January 1, 2012').getTime(), new Date('December 31, 2012').getTime()])
  // popularity.filterFunction(function(d) { return (new Date('January 1, 2012').getTime()) <= d.date && d.date <= (new Date('December 31, 2012').getTime()) });

  var resultSet=dateDim.top(Number.POSITIVE_INFINITY);

  var dateGroup=dateDim.group();
  // console.log(dateGroup.reduceCount().all());
  // console.log(minDate);
  // console.log(maxDate);
  // console.log(resultSet);

  resultSet.sort(function(a,b) {return ((a.value) > (b.value)) ? -1 : (((b.value)> (a.value)) ? 1 : 0);} );

  // console.log(resultSet);

  // d3.select("#viz_3_4").append("svg")
  // .style("color", "black")
  // .style("background-color", "white");









  data=resultSet.slice(0,5)
  if(data.length==0){
    data = [{value:0, title:"No Questions in this timeframe", questionURL:""}]; //@sameertodo: change this according to new data
  }

  div = d3.select("#viz_3_4").append("div").attr("class", "toolTip");

  var axisMargin = 20,
  margin = 40,
  valueMargin = 4,
  fullWidth = parseInt(d3.select("#viz_3_4").style('width'), 10),
  fullHeight = parseInt(d3.select("#viz_3_4").style('height'), 10),
  width=fullWidth*0.66,
  height=fullHeight*0.66,
  barHeight = (height-axisMargin-margin*2)* 0.8/data.length,
  barPadding = (height-axisMargin-margin*2)*0.2/data.length,
  data, bar, svg, scale, xAxis, labelWidth = 0;

  max = d3.max(data, function(d) { return d.value; });


  svg = d3.select("#viz_3_4")
  .append("svg")
  .attr("id","portion_3_4")
  .attr("width", fullWidth)
  .attr("height", fullWidth);


  bar = svg.selectAll("g")
  .data(data)
  .enter()
  .append("g");


  bar.attr("class", "bar")
  .attr("cx",0)
  .attr("transform", function(d, i) {
    return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
  });

  box = svg.selectAll("svg")
  .data(data)
  .enter()
  .append("g");

  box.attr("class", "box")
  .attr("cx",0)
  .attr("transform", function(d, i) {
    return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
  });


  svg.append("text")
  .text("Questions")
  .attr("id", "QuesText")
  .attr("x", (-height/2))
  .attr("y",width/35 )
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "24px")
  .attr("font-weight", "bold")
  .attr("fill", "black");


  scale = d3.scale.linear()
  .domain([0, max])
  .range([0, width - margin - labelWidth]);

  xAxis = d3.svg.axis()
  .scale(scale)
  .tickSize(-height + 2*margin + axisMargin)
  .orient("bottom");

  bar.append("rect")
  .attr("class","aa")
  .attr("transform", "translate("+labelWidth+", 0)")
  .attr("height", barHeight)
  .attr("fill", "steelblue")
  .attr("fill-opacity", .85)
  .attr("width", function(d){
    return scale(d.value);
  });

  box.append("rect")
  .attr("class","aaa")
  .attr("transform", "translate("+width+", 0)")
  .attr("height", barHeight)
  .attr("fill", "aliceblue")
  .attr("fill-opacity", .85)
  .attr("width", fullWidth-width);


  function wrap(text, width) {
    text.each(function() {
      // console.log(width)
      var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.1, // ems
      y = text.attr("y"),
      x=text.attr("x")
      dy = parseFloat(text.attr("dy")),
      tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(" "));
        if (tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
        }
      }
    });
  }


  k=fullWidth-width



  box.append("text")
  .attr("class", "value")
  .attr("y", barHeight / 2)
  .style("font-size", "10px")
  .attr("dx", ".35em") //margin right
  .attr("dy", ".35em") //vertical align middle
  .attr("text-anchor", "start")
  .text(function(d){
    return (d.title);
  })
  .attr("x", width+margin/2)
  .call(wrap, (k-(2*margin)))
  .attr("fill","black");






  bar.append("text")
  .attr("class", "value")
  .attr("y", barHeight / 2)
  .attr("dx", -valueMargin + labelWidth) //margin right
  .attr("dy", ".35em") //vertical align middle
  .attr("text-anchor", "end")
  .attr("fill", "white")
  .text(function(d){
    return (d.value);
  })
  .attr("x", function(d){
    var width = this.getBBox().width;
    return Math.max(width + valueMargin, scale(d.value));
  });

  bar.on("mousemove", function(d){
    div.style("left", d3.event.pageX+10+"px");
    div.style("top", d3.event.pageY-25+"px");
    div.style("display", "inline-block");
    div.html((d.title));
  });
  bar.on("mouseout", function(d){
    div.style("display", "none");
  });


  box.on("mousemove", function(d){
    if(d.questionURL.localeCompare("")!=0){
      div.style("left", d3.event.pageX+10+"px");
      div.style("top", d3.event.pageY-25+"px");
      div.style("display", "inline-block");
      d3.select(this).style("cursor", "pointer");
      div.html(("Click to open URL"));
    }
  });
  box.on("mouseout", function(d){
    div.style("display", "none");
    d3.select(this).style("cursor", "default");
  });


  box.on("click",function(d) {
    if(d.questionURL.localeCompare("")!=0){
      var win = window.open(d.questionURL, '_blank');
      win.focus();
    }

    // update_portion_3_4("nausea");
  });



  svg.insert("g",":first-child")
  .attr("class", "axisHorizontal")
  .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
  .call(xAxis);







  // data1=resultSet
  // data1.sort(function(a,b) {return ((a.date) > (b.date)) ? 1 : (((b.date)> (a.date)) ? -1 : 0);} );
  // console.log(data1);
  // console.log(fullHeight);
  data1=dateGroup.all();

  var tmargin = { top: fullHeight/50, right: fullWidth/96, bottom: fullHeight/5, left: fullWidth/24 },
  tmargin2 = { top: fullHeight/12.5, right: fullWidth/50, bottom: fullHeight/25, left: fullWidth/24 },
  twidth = fullWidth - tmargin.left - tmargin.right,
  // theight = 500 - tmargin.top - tmargin.bottom,
  theight2 = fullHeight - height - tmargin2.bottom;

  // console.log(theight2);


  var x = d3.time.scale().range([0, twidth]),
  x2 = d3.time.scale().range([0, twidth]),
  y = d3.scale.linear().range([0, 0]),
  y2 = d3.scale.linear().range([theight2, tmargin2.top]);

  var txAxis = d3.svg.axis().scale(x).orient("bottom"),
  txAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
  tyAxis = d3.svg.axis().scale(y).orient("left");

  var brush = d3.svg.brush()
  .x(x2)
  .on("brush", brushed);


  // console.log(theight);
  // console.log(theight2);
  var area = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return x(d.key); })
  // .y0(theight)
  // .y1(function (d) { return y(d.value); });

  var area2 = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return x2(d.key); })
  .y0(theight2)
  .y1(function (d) { return y2(d.value); });



  // make some buttons to drive our zoom
  // d3.select("#viz_3_4").append("div")
  //   .attr("id","btnDiv")
  //   .style('font-size','75%')
  //   .style("width","250px")
  //   .style("position","absolute")
  //   .style("left","5%")
  //   .style("top","200px")
  //
  // d3.select("#btnDiv")[0][0].innerHTML = [
  //   '<h3>Buttons To Drive Our Zoom</h3>',
  //   '<p>push a button and watch the brush react</p>',
  //   '<ul>',
  //   '<li>note: deliberately slowed down so each step can be seen and demonstrate how to inject transition</li>',
  //   '<li>also, play with the brush after drawn to see how it acts as if we drew with our mouse</li>',
  //   '</ul>'
  // ].join('\n')
  //
  //
  // var btns = d3.select("#btnDiv").selectAll("button").data([2001, 2002, 2003, 2004])
  //
  // btns = btns.enter().append("button").style("display","inline-block")
  //
  // // fill the buttons with the year from the data assigned to them
  // btns.each(function (d) {
  //   this.innerText = d;
  // })
  //
  // btns.on("click", drawBrush);

  // function drawBrush() {
  //   // our year will this.innerText
  //   console.log(this.innerText)
  //
  //   // define our brush extent to be begin and end of the year
  //   brush.extent([new Date(this.innerText + '-01-01'), new Date(this.innerText + '-12-31')])
  //
  //   // now draw the brush to match our extent
  //   // use transition to slow it down so we can see what is happening
  //   // remove transition so just d3.select(".brush") to just draw
  //   brush(d3.select(".brush").transition());
  //
  //   // now fire the brushstart, brushmove, and brushend events
  //   // remove transition so just d3.select(".brush") to just draw
  //   brush.event(d3.select(".brush").transition().delay(1000))
  // }


  //   var svg = d3.select("#viz_3_4").append("svg")
  //       .attr("width", twidth + tmargin.left + tmargin.right)
  //       .attr("height", theight + tmargin.top + tmargin.bottom);
  //
  svg.append("defs").append("clipPath")
  .attr("id", "clip")
  .append("rect")
  .attr("width", twidth)
  .attr("height", theight2);

  var focus = svg.append("g")
  .attr("class", "focus")
  .attr("transform", "translate(" + tmargin.left + "," + tmargin.top + ")");

  var context = svg.append("g")
  .attr("class", "context")
  .attr("transform", "translate(" + tmargin2.left + "," + height + ")");

  max = d3.max(data1, function(d) { return d.value; });
  x.domain(d3.extent(data1.map(function (d) { return d.key; })));
  y.domain([0, max]);
  x2.domain(x.domain());
  y2.domain(y.domain());

  focus.append("path")
  .datum(data1)
  .attr("class", "area")
  .attr("d", area);

  focus.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(txAxis);
  //
  //     // focus.append("g")
  //     //     .attr("class", "y axis")
  //     //     .call(tyAxis);
  //
  context.append("path")
  .datum(data1)
  .attr("class", "area")
  .attr("d", area2);

  context.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + theight2 + ")")
  .call(txAxis2);

  context.append("g")
  .attr("class", "x brush")
  .call(brush)
  .selectAll("rect")
  .attr("y", -6)
  .attr("height", theight2 + 7);

  function brushed() {
    x.domain(brush.empty() ? x2.domain() : brush.extent());
    // console.log(brush.extent());
    if(brush.empty())
    dateDim.filterAll()
    else
    dateDim.filter([brush.extent()[0], brush.extent()[1]]);

    var resultSet=dateDim.top(Number.POSITIVE_INFINITY);

    //call Update Function for barchart update
    resultSet.sort(function(a,b) {return ((a.value) > (b.value)) ? -1 : (((b.value)> (a.value)) ? 1 : 0);} );
    data2=resultSet.slice(0,5)
    if(data2.length==0){
      data2 = [{value:0, title:"No Questions in this timeframe", questionURL:""}]; //@sameertodo: change this according to new data
    }
    // console.log(data2);
    change(data2);
    focus.select(".area").attr("d", area);
    focus.select(".x.axis").call(txAxis);
  }

  function type(d) {
    d.key = d.key;
    d.value = d.value;
    return d;
  }

}




function change(data) {


  svg = d3.selectAll("svg#portion_3_4")

  iter = svg.selectAll("g.bar")[0].length - 1;
  // console.log(iter);
  // console.log(data);
  svg.selectAll("g.bar")
  .data([])
  .exit()
  .transition()
  .duration(500)
  .select("rect")
  .attr("width", 0)
  .remove()
  .each("end", function(d, i) {
    // console.log(i);
    if(i==iter){
      svg.selectAll("g.bar")
      .remove();

      svg.selectAll("g.axisHorizontal")
      .remove();

      svg.selectAll("g.box").remove();

      d3.selectAll("text#QuesText").remove();

      var axisMargin = 20,
      margin = 40,
      valueMargin = 4,
      fullWidth = parseInt(d3.select("#viz_3_4").style('width'), 10),
      fullHeight = parseInt(d3.select("#viz_3_4").style('height'), 10),
      width=fullWidth*0.66,
      height=fullHeight*0.66,
      barHeight = (height-axisMargin-margin*2)* 0.8/data.length,
      barPadding = (height-axisMargin-margin*2)*0.2/data.length,
      bar, scale, xAxis, labelWidth = 0;

      max = d3.max(data, function(d) { return d.value; });

      svg = d3.select("#viz_3_4")
      .select("svg#portion_3_4");
      // console.log(data);



      bar = svg.selectAll("g.bar")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "bar");

      bar.attr("cx",0)
      .attr("transform", function(d, i) {
        return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

      box = svg.selectAll("g.box")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "box");

      box.attr("cx",0)
      .attr("transform", function(d, i) {
        return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
      });

      svg.append("text")
      .text("Questions")
      .attr("id","QuesText")
      .attr("x", (-height/2))
      .attr("y",width/35 )
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "24px")
      .attr("font-weight", "bold")
      .attr("fill", "black");

      scale = d3.scale.linear()
      .domain([0, max])
      .range([0, width - margin - labelWidth]);

      xAxis = d3.svg.axis()
      .scale(scale)
      .tickSize(-height + 2*margin + axisMargin)
      .orient("bottom");

      bar.append("rect")
      .attr("class","aa")
      .attr("transform", "translate("+labelWidth+", 0)")
      .attr("height", barHeight)
      .attr("fill", "steelblue")
      .attr("fill-opacity", .85)
      .attr("width", 0);


      box.append("rect")
      .attr("class","aaa")
      .attr("transform", "translate("+width+", 0)")
      .attr("height", barHeight)
      .attr("fill", "aliceblue")
      .attr("fill-opacity", .85)
      .attr("width", fullWidth-width);


      function wrap(text, width) {
        text.each(function() {
          // console.log(width)
          var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // ems
          y = text.attr("y"),
          x=text.attr("x")
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
          while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
              line.pop();
              tspan.text(line.join(" "));
              line = [word];
              tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }

      k=fullWidth-width


      box.append("text")
      .attr("class", "value")
      .attr("y", barHeight / 2)
      .style("font-size", "10px")
      .attr("dx", ".35em") //margin right
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "start")
      .text(function(d){
        return (d.title);
      })
      .attr("x", width+margin/2)
      .call(wrap, (k-(2*margin)))
      .attr("fill","black");




      bar.append("text")
      .attr("class", "value")
      .attr("y", barHeight / 2)
      .attr("dx", -valueMargin + labelWidth) //margin right
      .attr("dy", ".35em") //vertical align middle
      .attr("text-anchor", "end")
      .attr("fill", "white")
      .text(function(d){
        return (d.value);
      })
      .attr("x", function(d){
        var width = this.getBBox().width;
        return Math.max(width + valueMargin, scale(d.value));
      });

      bar.on("mousemove", function(d){
        div.style("left", d3.event.pageX+10+"px");
        div.style("top", d3.event.pageY-25+"px");
        div.style("display", "inline-block");
        div.html((d.title));
      });
      bar.on("mouseout", function(d){
        div.style("display", "none");
      });


      box.on("mousemove", function(d){
        if(d.questionURL.localeCompare("")!=0){
          div.style("left", d3.event.pageX+10+"px");
          div.style("top", d3.event.pageY-25+"px");
          div.style("display", "inline-block");
          d3.select(this).style("cursor", "pointer");
          div.html(("Click to open URL"));
        }
      });
      box.on("mouseout", function(d){
        div.style("display", "none");
        d3.select(this).style("cursor", "default");
      });


      box.on("click",function(d) {
        if(d.questionURL.localeCompare("")!=0){
          var win = window.open(d.questionURL, '_blank');
          win.focus();
        }

        // update_portion_3_4("nausea");
      });

      svg.insert("g",":first-child")
      .attr("class", "axisHorizontal")
      .attr("transform", "translate(" + (margin + labelWidth) + ","+ (height - axisMargin - margin)+")")
      .call(xAxis);

      bar.select("rect")
      .transition()
      .duration(500)
      .attr("width", function(d){
        return scale(d.value);
      });
    }
  });
}

function update_portion_3_4(){
  // console.log(s);
  dat.current_topic = global_topic_name;
  dat.questions = [];

  dat.dataset.forEach(function(topic){
    if(topic.topic == global_topic_name) {
      dat.questions = topic.Questions;
    }
  });

  data=dat.questions;
  var parseDate = d3.time.format("%Y-%m-%d").parse;

  data.forEach(function(d, i) {
    dateGet=d.questionPostDate;
    d.date = parseDate(dateGet.substring(0, dateGet.indexOf("T")));
    if(d.date==null)
    d.date=parseDate("2011-11-14");
    d.question = d.questionId;
    d.value=parseInt(d.noOfAnswers);
    d.title=d.questionTitle.substring(0,40);
    if(d.questionTitle.length > 40){
      d.title+="..."
    }
});
    var ndx=crossfilter(data)
    var allDim = ndx.dimension(function(d) {return d;});
    var dateDimUnGroup = ndx.dimension(function(d) { return d.date; });
    var dateDim = ndx.dimension(function(d) { return d.date; });
    var popularity = ndx.dimension(function(d) { return d.value; });

    function getTops(source_group) {
      return {
        all: function () {
          return source_group.top(10);
        }
      };
    }

    var minDate = dateDim.bottom(1)[0]["date"];
    var maxDate = dateDim.top(1)[0]["date"];
    var resultSet=dateDim.top(Number.POSITIVE_INFINITY);
    var dateGroup=dateDim.group();

    // console.log(dateGroup.all())

    resultSet.sort(function(a,b) {return ((a.value) > (b.value)) ? -1 : (((b.value)> (a.value)) ? 1 : 0);} );
    data=resultSet.slice(0,5)
    if(data.length==0){
      data = [{value:0, title:"No Questions in this timeframe", questionURL:""}]; //@sameertodo: change this according to new data
    }

    // console.log(data);
    change(data);

    data1=resultSet
    data1.sort(function(a,b) {return ((a.date) > (b.date)) ? 1 : (((b.date)> (a.date)) ? -1 : 0);} );

  changeTimeLine(data1);
}


function changeTimeLine(data1){



  var ndx=crossfilter(data1)
  var allDim = ndx.dimension(function(d) {return d;});
  var dateDim = ndx.dimension(function(d) { return d.date; });
  var popularity = ndx.dimension(function(d) { return d.value; });
  var dateGroup=dateDim.group();

  data1=dateGroup.all();

  svg=d3.selectAll("svg#portion_3_4");
  var fullWidth = parseInt(d3.select("#viz_3_4").style('width'), 10),
  fullHeight = parseInt(d3.select("#viz_3_4").style('height'), 10),
  width=fullWidth*0.66,
  height=fullHeight*0.66;

  var tmargin = { top: fullHeight/50, right: fullWidth/96, bottom: fullHeight/5, left: fullWidth/24 },
  tmargin2 = { top: fullHeight/12.5, right: fullWidth/50, bottom: fullHeight/25, left: fullWidth/24 },
  twidth = fullWidth - tmargin.left - tmargin.right,
  // theight = 500 - tmargin.top - tmargin.bottom,
  theight2 = fullHeight - height - tmargin2.bottom;

  var x = d3.time.scale().range([0, twidth]),
  x2 = d3.time.scale().range([0, twidth]),
  y = d3.scale.linear().range([0, 0]),
  y2 = d3.scale.linear().range([theight2, tmargin2.top]);

  var txAxis = d3.svg.axis().scale(x).orient("bottom"),
  txAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
  tyAxis = d3.svg.axis().scale(y).orient("left");


  var area2 = d3.svg.area()
  .interpolate("monotone")
  .x(function (d) { return x(d.key); })
  .y0(theight2)
  .y1(theight2);

      // console.log(theight);
      // console.log(theight2);
      svg.selectAll("g.context")
      .transition()
      .duration(500)
      .select(".area")
      .attr("d", area2)
      .remove()
      .each("end", function(d, i) {



          svg.selectAll(".context")
          .remove();

          svg.selectAll(".focus")
          .remove();

      var area = d3.svg.area()
      .interpolate("monotone")
      .x(function (d) { return x(d.key); })
      // .y0(theight)
      // .y1(function (d) { return y(d.value); });

      svg.append("defs").append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", twidth)
      .attr("height", theight2);

      var focus = svg.append("g")
      .attr("class", "focus")
      .attr("transform", "translate(" + tmargin.left + "," + tmargin.top + ")");

      var context = svg.append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + tmargin2.left + "," + height + ")");

      max = d3.max(data1, function(d) { return d.value; });
      x.domain(d3.extent(data1.map(function (d) { return d.key; })));
      y.domain([0, max]);
      x2.domain(x.domain());
      y2.domain(y.domain());

      focus.append("path")
      .datum(data1)
      .attr("class", "area")
      .attr("d", area);

      focus.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(txAxis);
      //
      //     // focus.append("g")
      //     //     .attr("class", "y axis")
      //     //     .call(tyAxis);
      //
      context.append("path")
      .datum(data1)
      .attr("class", "area")
      .attr("d", area2);


      var area2 = d3.svg.area()
      .interpolate("monotone")
      .x(function (d) { return x2(d.key); })
      .y0(theight2)
      .y1(function (d) { return y2(d.value); });

      context.append("path")
      .datum(data1)
      .attr("class", "area")
      .transition()
      .duration(500)
      .attr("d", area2);

      context.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + theight2 + ")")
      .call(txAxis2);

      var brush = d3.svg.brush()
      .x(x2)
      .on("brush", brushed);

      context.append("g")
      .attr("class", "x brush")
      .call(brush)
      .selectAll("rect")
      .attr("y", -6)
      .attr("height", theight2 +7);



      function brushed() {
        x.domain(brush.empty() ? x2.domain() : brush.extent());
        // console.log(brush.extent());
        if(brush.empty())
        dateDim.filterAll()
        else
        dateDim.filter([brush.extent()[0], brush.extent()[1]]);

        var resultSet=dateDim.top(Number.POSITIVE_INFINITY);
        // console.log(resultSet.length);

        //call Update Function for barchart update
        resultSet.sort(function(a,b) {return ((a.value) > (b.value)) ? -1 : (((b.value)> (a.value)) ? 1 : 0);} );
        data2=resultSet.slice(0,5)
        if(data2.length==0){
          data2 = [{value:0, title:"No Questions in this timeframe", questionURL:""}]; //@sameertodo: change this according to new data
        }
        change(data2);
        focus.select(".area").attr("d", area);
        focus.select(".x.axis").call(txAxis);
      }

      function type(d) {
        d.key = d.key;
        d.value = d.value;
        return d;
      }

});
}




//
//
//
//
//
//     dat.dataset.forEach(function(topic){
//        if(topic. == global_topic_name) {
//            temp1 = topic.popular_users.split('::  ');
//            temp1.forEach(function(pu) {
//               star_var.popular_users.push(pu.split(',')[0])
//            });
//            console.log(star_var.popular_users);
//        }
//     });
//     var text1 = d3.select("#portion6_svg").selectAll(".portion6_text")
//     text1.data([]).exit()
//         .remove();
//
//     text1 = d3.select("#portion6_svg").selectAll(".portion6_text")
//         .data(star_var.popular_users)
//         .enter()
//         .append("text");
//
// //    console.log(text1);
//
//     text1.attr("class", "portion6_text")
//         .attr("x", 306)
//         .attr("y", 151)
//         .text(function (d) {
//             return d;
//     }).attr("font-family", "sans-serif")
//         .attr("font-size", function(d, i) {
//             len_topic_name = d.length;
//             return star_var.scale(len_topic_name);
//
//     }).attr("fill", "red")
//         .attr("text-anchor", "middle")
//         .attr("font-weight", "bold");
//
//
//     text1.transition()
//         .duration(500)
//         .attr("x", function(d, i) {
//                 if(i==0){
//                     return 104;
//                 }else if(i==1) {
//                     return 302;
//                 }else {
//                     return 493;
//                 }
//
//         }).attr("y", function(d, i){
//                 if(i==0){
//                     return 77;
//                 }else if(i==1) {
//                     return 77;
//                 }else {
//                     return 77;
//                 }
//         });
//
//     if(star_var.popular_users[0] == ""){
//         $('#portion6_user_error').css('visibility', 'visible');
//     }
//     else{
//         $('#portion6_user_error').css('visibility', 'hidden');
//     }
//
//
// }
