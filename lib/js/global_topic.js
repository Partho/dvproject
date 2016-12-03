//Global variable for the entire document to be put over here
var global_topic_name="abdminal hernia";

function setGlobalTopicName(topic_name, portion_id)
{
    global_topic_name = topic_name;
    console.log("Portion-"+ portion_id + " sets global_topic_name as: " + global_topic_name);
    if(portion_id==1){
        //Put all the portions you want to update over here upon topic selection
        update_portion_2();
        update_portion_3_4();
        update_portion_6();
    }
    if(portion_id==2){
        update_portion_3_4();
        update_portion_6(); 
    }
}
