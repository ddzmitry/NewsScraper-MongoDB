
const scrape  = require("../scripts/scrape.js");
const Article = require ("../modules/Article.js");


module.exports =  {
//here we will write put CRUD Methods for each article that in DB
        insertAlldata :(cb) =>{
            // here we will call our scrape method, then we take our data from CB
            // and insert in collection of Articles
        scrape((data)=>{

            // console.log(data)

            Article.insertMany(data)
            cb(data)
        })
},
        findAllArticles : (cb) => {
            Article.find({}, (err,data) =>{
                console.log(data)
                cb(data)
            })

    },

        saveThearticle : (data) => {

            console.log(data)
            // Article.insert(data)
            Article.create(data, function (err,data) {

                    if(err){
                        console.log(err)

                    } else {
                        console.log('Good')
                    }
            })

                },
        deleteArticle : (idTodelete) => {

            console.log(idTodelete)

            Article.remove({ _id : `${idTodelete}` }, function (err) {

                    if(err){
                        console.log(err)
                    }
            })
        },

        findNotes : (idTofind) => {

            Article.findOne({ _id: `${idTofind}` })

                .populate("Note")
                .exec(function(err,doc){

                    console.log(doc)

                    res.json(doc)
                })
        }



}

