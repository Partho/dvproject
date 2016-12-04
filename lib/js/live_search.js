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
    
    $('#portion1_search').keyup(function(){
//       console.log("called");
        var searchField = $('#portion1_search').val();
//        console.log(searchField);
        var regex = new RegExp("^"+searchField, "i");
        var output = '';
        portion1_data.forEach(function(topic_info){
            if(regex.test(topic_info.topic)){
                output = output + '<tr>' + '<td class="text-left">' + topic_info.topic + '</td>' + '<td class="text-left">' +  topic_info.number_of_questions + '</td>' +'</tr>';
            }    
        });
        $('#portion1_search_results').html(output);
        //code to put on click function that would set the global_topic_id
        $('#portion1_search_results tr').click(function(){
            //console.log(this.firstChild.innerHTML);
            setGlobalTopicName(this.firstChild.innerHTML, 1);
        });
//        console.log(output);
        if(output != ''){
            $('#portion1_topic_error').css('visibility','hidden');
        }
        else{
            $('#portion1_topic_error').css('visibility','visible');
        }
        
    });
}
//console.log("hello")




      