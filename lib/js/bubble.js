



function create_portion5_pon(topicName, filter) {
    portion5_data = complete_data;
    CategoryDiseases = []
    CategorySymptoms = []
    CategoryMedications = []
    CategoryOthers = []
    for (var i = 0; i < filter.length; i++) {
        for (var j = 0; j < portion5_data.length; j++) {
            if (filter[i].index == portion5_data[j].index) {
                if (portion5_data[j].category != null) {

                    for (var k = 0; k < portion5_data[j].category.length; k++) {
                        // alert(portion5_data[j].category[k])
                        if (portion5_data[j].category[k] == "diseases") {
                            var innerVal = {
                                'text': filter[i].topic,
                                'count': Number((filter[i].chi).toFixed(2))
                            }
                            if (innerVal.length != 0)
                                CategoryDiseases.push(innerVal)
                        }
                        if (portion5_data[j].category[k] == "Symptoms") {
                            var innerVal = {
                                'text': filter[i].topic,
                                'count': Number((filter[i].chi).toFixed(2))
                            }
                            if (innerVal.length != 0)
                                CategorySymptoms.push(innerVal)
                        }
                        if (portion5_data[j].category[k] == "medications") {
                            var innerVal = {
                                'text': filter[i].topic,
                                'count': Number((filter[i].chi).toFixed(2))
                            }
                            if (innerVal.length != 0)
                                CategoryMedications.push(innerVal)

                        }
                        if (portion5_data[j].category[k] == "others") {
                            var innerVal = {
                                'text': filter[i].topic,
                                'count': Number((filter[i].chi).toFixed(2))
                            }
                            if (innerVal.length != 0)
                                CategoryOthers.push(innerVal)

                        }
                    }


                }
            }
        }
    }


    //console.log(JSON.stringify(CategoryDiseases))
    //console.log(JSON.stringify(CategorySymptoms))
    //console.log(JSON.stringify(CategoryMedications))
    //console.log(JSON.stringify(CategoryOthers))



  chartExecute(CategorySymptoms)
  //  $('.drawChart').on('click', function (e) {
    

    function chartExecute(inputJson){
        d3.select(".bubbleChart").select("svg").remove();
     var samel = inputJson.sort(function(a, b) { return a.count < b.count ? 1 : -1; })
                .slice(0, 10);
      //alert(JSON.stringify(samel))

   

    var bubbleChart = new d3.svg.BubbleChart({
    supportResponsive: true,
    //container: => use @default
    size: 600,
    //viewBoxSize: => use @default
    innerRadius: 600 / 3.5,
    //outerRadius: => use @default
    radiusMin: 50,
    //radiusMax: use @default
    //intersectDelta: use @default
    //intersectInc: use @default
    





    //circleColor: use @default
    data: {
      items: samel,
      eval: function (item) {return item.count;},
      classed: function (item) {return item.text.split(" ").join("");}
    },
    plugins: [
      {
        name: "lines",
        options: {
          format: [
            {// Line #0
              textField: "count",
              classed: {count: true},
              style: {
                "font-size": "28px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                fill: "white"
              },
              attr: {
                dy: "0px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            },
            {// Line #1
              textField: "text",
              classed: {text: true},
              style: {
                "font-size": "12px",
                "font-family": "Source Sans Pro, sans-serif",
                "text-anchor": "middle",
                "fill": "black",
                "font-weight": "bold"
              },
              attr: {
                dy: "20px",
                x: function (d) {return d.cx;},
                y: function (d) {return d.cy;}
              }
            }
          ],
          centralFormat: [
            {// Line #0
              style: {"font-size": "50px"},
              attr: {}
            },
            {// Line #1
              style: {"font-size": "30px"},
              attr: {dy: "40px"}
            }
          ]
        }
      }]
  });
    }
   // })
   $('.drawChart').on('click', function (e) {
        if($(this).attr('id')=="DiseaseClick"){
        chartExecute(CategoryDiseases)
        }
        if($(this).attr('id')=="SymptomsClick"){
      
        chartExecute(CategorySymptoms)
        }
        if($(this).attr('id')=="MedicineClick"){
        chartExecute(CategoryMedications)
        }
        if($(this).attr('id')=="OthersClick"){
        chartExecute(CategoryOthers)
        }
})
}

function update_pon_portion5(topicName, filter) {
    portion5_data = complete_data;
    CategoryDiseases = []
    CategorySymptoms = []
    CategoryMedications = []
    CategoryOthers = []
    for (var i = 0; i < filter.length; i++) {
        for (var j = 0; j < portion5_data.length; j++) {
            if (filter[i].index == portion5_data[j].index) {
                if (portion5_data[j].category != null) {

                    for (var k = 0; k < portion5_data[j].category.length; k++) {
                        // alert(portion5_data[j].category[k])
                        if (portion5_data[j].category[k] == "diseases") {
                            var innerVal = {
                                'topicIndex': filter[i].index,
                                'topicName': filter[i].topic,
                                'value': filter[i].chi
                            }
                            if (innerVal.length != 0)
                                CategoryDiseases.push(innerVal)
                        }
                        if (portion5_data[j].category[k] == "Symptoms") {
                            var innerVal = {
                                'topicIndex': filter[i].index,
                                'topicName': filter[i].topic,
                                'value': filter[i].chi
                            }
                            if (innerVal.length != 0)
                                CategorySymptoms.push(innerVal)
                        }
                        if (portion5_data[j].category[k] == "medications") {
                            var innerVal = {
                                'topicIndex': filter[i].index,
                                'topicName': filter[i].topic,
                                'value': filter[i].chi
                            }
                            if (innerVal.length != 0)
                                CategoryMedications.push(innerVal)

                        }
                        if (portion5_data[j].category[k] == "others") {
                            var innerVal = {
                                'topicIndex': filter[i].index,
                                'topicName': filter[i].topic,
                                'value': filter[i].chi
                            }
                            if (innerVal.length != 0)
                                CategoryOthers.push(innerVal)

                        }
                    }


                }
            }
        }
    }
   // console.log(JSON.stringify(CategoryDiseases))
    //console.log(JSON.stringify(CategorySymptoms))
    //console.log(JSON.stringify(CategoryMedications))
    //console.log(JSON.stringify(CategoryOthers))
       $('.drawChart').on('click', function (e) {
        if($(this).attr('id')=="DiseaseClick"){
        chartExecute(CategoryDiseases)
        }
        if($(this).attr('id')=="SymptomsClick"){
      
        chartExecute(CategorySymptoms)
        }
        if($(this).attr('id')=="MedicineClick"){
        chartExecute(CategoryMedications)
        }
        if($(this).attr('id')=="OthersClick"){
        chartExecute(CategoryOthers)
        }
})

}