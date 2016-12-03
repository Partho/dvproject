var create_portion1 = function(){
    output = '';
    portion1_data.forEach(function(topic_info){
        output = output + '<tr>' + '<td class="text-left">' + topic_info.topic + '</td>' + '<td class="text-left">' + topic_info.number_of_questions + '</td>' +'</tr>';
    });
    $('#portion1_search_results').html(output);
    //code to put on click function that would set the global_topic_id
    $('#portion1_search_results tr').click(function(){
        //console.log(this.firstChild.innerHTML);
        setGlobalTopicName(this.firstChild.innerHTML, 1);
    });
}
//console.log("hello")




      