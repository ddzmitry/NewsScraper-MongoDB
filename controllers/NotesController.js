const Note = require ("../modules/Note.js");

module.exports =  {

    updateNote : (data ,cb) => {

        console.log(data)
        Note.findByIdAndUpdate(data._id, { $set: { title: data.title , body:data.body ,date : data.date }}, function (err, data) {
            if (err) return handleError(err);
            console.log('UPDATED67')
            console.log(data)
        });

    },

    saveNote : (data,cb) => {

        console.log(data)

        // _ArticleId
        // Article.insert(data)
        let NewNote = {
            title: data.title,
            body: data.body,
            _ArticleId : data._ArticleId

        };
                console.log(NewNote)

        Note.create(NewNote, function (err,data) {

            if(err){
                console.log(err)

            } else {
                console.log('Good')
                cb(data)
            }
        })

    },
    deleteNote : (idTodelete) => {

        console.log(idTodelete)

        Note.remove({ _id : `${idTodelete}` }, function (err) {

            if(err){
                console.log(err)
            }
        })
    },

    findNotes : (idTofind,cb) => {
        //


        console.log("this is an id")
            console.log(idTofind.id)
        // ObjectId("58ed4181cb520b2064d1087d")

        // Note.find({ _ArticleId :  idTofind.id}

        Note.find({_ArticleId :  idTofind.id}, function(err, docs) {
                    if (!err){
                        console.log(docs);
                        cb(docs)
                        // process.exit();
                    } else {throw err;}


                });

        // Note.findById( idTofind, function (err,data) {
        //
        //     if(err){
        //         throw err
        //     } else {
        //         cb(data)
        //     }
        // })
    }


}

// "_id" : ObjectId("58ed4a7ce18cb70510a96f5c")
