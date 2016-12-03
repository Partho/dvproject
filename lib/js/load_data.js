var portion1_data= [];
var portion6_data = [];
var complete_data;
//var temp1;

d3.json("./data/complete_data.json", function(data1){
    console.log("Data loaded=====================================");
    //console.log(complete_data);
    complete_data = data1;
    //now creating dataset for Portion-1
    complete_data.forEach(function(topic_info){
        portion1_data.push({"topic" : topic_info.topic, "number_of_questions": topic_info.number_of_questions});
    });

    complete_data.forEach(function(topic_info){
        portion6_data.push({"topic" : topic_info.topic, "number_of_questions": topic_info.number_of_questions, "popular_users": topic_info.popular_users});
    });


    //creating portion 1 orcer here so that user gets the
    create_portion1();
    create_portion2();
    create_portion3_4();
    create_portion6();

    

    //if you want complete data

    //create portion over here



});
