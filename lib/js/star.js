var star_var = {}

//star_var.svg = d3.select("#portion6_svg")

function create_portion6(){
    star_var.dataset = portion6_data;
    star_var.current_topic = global_topic_name;
    star_var.popular_users = [];
    console.log(global_topic_name);
    star_var.dataset.forEach(function(topic){
       if(topic.topic == global_topic_name) {
           temp1 = topic.popular_users.split('::  ');
           temp1.forEach(function(pu) {
              star_var.popular_users.push(pu.split(',')[0]) 
           });
           console.log(star_var.popular_users);
       } 
    });
//    console.log(star_var.popular_users);
//    star_var.popular_users = ["Rod Moser","Rod Moser","Rod Moser"]
    star_var.scale = d3.scale.linear();
    star_var.scale.domain([9, 27]);
    star_var.scale.rangeRound([18, 10]);
    var text1 = d3.select("#portion6_svg").selectAll(".portion6_text")
        .data(star_var.popular_users)
        .enter()
        .append("text");
//    console.log(text1);
    
    text1.attr("class", "portion6_text")
        .attr("x", function(d, i) {
            if(i==0){
                return 104;
            }else if(i==1) {
                return 302;
            }else {
                return 493;
            }
            
    }).attr("y", function(d, i){
            if(i==0){
                return 77;
            }else if(i==1) {
                return 77;
            }else {
                return 77;
            }
    }).text(function (d) {
            return d;  
    }).attr("font-family", "sans-serif")
        .attr("font-size", function(d, i) {
            len_topic_name = d.length;
            return star_var.scale(len_topic_name);
        
    }).attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold");
    
//    var circles = star_var.svg.selectAll("circle").data([1,2,3]).enter().append("circle");
//    circles.attr("cx", function(d, i) {
//        return (i*50) +25;
//    }).attr("cy", 75).attr("r", function(d) {
//        return 3;
//    });
}

function update_portion_6()
{
    console.log("It got called");
    star_var.current_topic = global_topic_name;
    star_var.popular_users = [];
    star_var.dataset.forEach(function(topic){
       if(topic.topic == global_topic_name) {
           temp1 = topic.popular_users.split('::  ');
           temp1.forEach(function(pu) {
              star_var.popular_users.push(pu.split(',')[0]) 
           });
           console.log(star_var.popular_users);
       } 
    });
    var text1 = d3.select("#portion6_svg").selectAll(".portion6_text")
    text1.data([]).exit()
        .remove();
    
    text1 = d3.select("#portion6_svg").selectAll(".portion6_text")
        .data(star_var.popular_users)
        .enter()
        .append("text");

//    console.log(text1);
    
    text1.attr("class", "portion6_text")
        .attr("x", 306)
        .attr("y", 151)
        .text(function (d) {
            return d;  
    }).attr("font-family", "sans-serif")
        .attr("font-size", function(d, i) {
            len_topic_name = d.length;
            return star_var.scale(len_topic_name);
        
    }).attr("fill", "red")
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold");
    

    text1.transition()
        .duration(500)
        .attr("x", function(d, i) {
                if(i==0){
                    return 104;
                }else if(i==1) {
                    return 302;
                }else {
                    return 493;
                }

        }).attr("y", function(d, i){
                if(i==0){
                    return 77;
                }else if(i==1) {
                    return 77;
                }else {
                    return 77;
                }
        });
    
    if(star_var.popular_users[0] == ""){
        $('#portion6_user_error').css('visibility', 'visible');    
    }
    else{
        $('#portion6_user_error').css('visibility', 'hidden');
    }



}    
    
    



    

    

    