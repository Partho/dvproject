// Author : Partho Mandal

//Run mongo <dbname> command.js > output.json

//Performs outer join in MongoDB
printjson(
db.answer.aggregate([
{
	$lookup:
    {
			from: "question",
			localField:"questionId",
			foreignField:"questionId",
			as: "answer_topics"
	}
}
]).toArray()
)