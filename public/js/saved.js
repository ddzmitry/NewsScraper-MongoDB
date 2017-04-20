$( document ).ready(function() {

        // generate Time Stamp!
    let TimeStamp = function () {

        let time = new Date()

        let stringTime = ""
        stringTime += (time.getMonth() + 1) + "/";
        stringTime += time.getDate() + "/";
        stringTime += time.getFullYear()+ "/";
        stringTime += time.getSeconds();
        return stringTime

    }


    $.ajax({
        url: "/findSaved",
    }).done(function(data) {
        

            // find saved Articles!
        data.forEach( (element,i)=>{
            console.log(element)
            // content

            $("#content").append(`

                    <div class="row">
                     <div class="articleChunk col-md-12">
                     <h3><a href="${element.link} ">${element.headline} </a> </h3>
                        <h4>${element.snippet}</h4>
                        <button data = "${element._id}"  type="button" class=" addNote btn btn-large btn-block btn-info">Add Note</button>
                         <button  data = "${element._id}"  type="button" class=" deleteArticle btn btn-large btn-block btn-danger">Delete Article</button>
                            <div class ="applyForm"></div>
                        </div>
                        </div>
                                                          
                `)
        })
        return false;
    });
    //<button data = "${element._id}" class="addNote">Add Note</button> <button data = "${element._id}" class="deleteArticle">Delete Article</button>
    $(document).on("click",".deleteArticle",function() {

    // Delete article from Article collections!
                let id = $(this).attr('data')
                console.log(id)
        $.ajax({
            type: "DELETE",
            url: `/saved/${id}`,
            data: {_id : id.trim()}
        });

            // and we hide it for UI purpose!
                $(this).parent('.articleChunk').css( 'display', 'none')
    })

    $(document).on("click", ".addNote", function(event) {


        $("#notes").empty();
        $("#addform").empty();

        var thisId = $(this).attr("data");

                //find all our notes based of Article ID and display each with two buttons
        // each note has an id generated from Notes collections for each note!
        $.ajax({
            type: "POST",
            url: '/findNote',
            data: {_ArticleId : thisId.trim()}
        }).done(function (data) {

            if(data){
                console.log(data)
                data.forEach(function (element) {

                    $("#notes").prepend(`<div data= "${element._id}" class="parentsNote"><h4 data= "${element._id}" ><b>${element.title}</b></h4><p data= "${element._id}" > <i>${element.body}</i></p><button class="deleteNote" data= ${element._id}>X</button> <button class="updateNote" data= ${element._id}> Update</button></div>`)
                })

            } else {

                console.log('no data')
            }
        });



        // Empty the notes from the note section

        // Save the id from the p tag

        console.log(thisId)

        $("#addform").append(
            `<pre class="form-group">
            <input type="Text" class="form-control" id="titleNode"  placeholder="Title" name = "noteHeader">
            <textarea rows="4" cols="25" id="bodyNote"  name = "noteInfo"> </textarea>
            <button data= ${thisId} class="submitNote"> Submit Note </button>       
                </pre>`
        );


        event.preventDefault();
        return;

    });


    $(document).on("click", ".submitNote", function(event) {



        var thisId = $(this).attr("data");

        // console.log($('#titleNode').val())
        // console.log($('#bodyNote').val())

        //Generate note Object!
                console.log(thisId)
            let NoteData = {
                _ArticleId: thisId.trim(),
                _id : thisId,
                title : $('#titleNode').val().trim(),
                body: $('#bodyNote').val().trim(),
                date: TimeStamp()

            }

                //add note to the server
        $.ajax({
            type: "POST",
            url: '/addNote',
            data: NoteData
        }).done(function (data) {





            console.log(data)
         // wen we add new note we specify it with its own unique ID
            $("#notes").prepend(`<div data= "${data._id}" class="parentsNote"><h4 data= "${data._id}" ><b>${NoteData.title}</b></h4><p data= "${data._id}"><i>${NoteData.body}</i></p><button class="deleteNote" data= ${thisId}>X</button> <button class="updateNote" data= ${thisId}> Update</button></div>`)
            $('#addform').empty();
        });


        event.preventDefault(event);
        return;


    })

    $(document).on("click", ".deleteNote", function(event) {

                // console.log($(this).attr("data"))
        let noteId = $(this).attr("data")
            // console.log()
        $(this).parents('.parentsNote').css('display' , 'none')

            // Grab an ID for note and send it over Server to be Deleted!

        $.ajax({
            type: "DELETE",
            url: '/addNote',
            data: {_id: noteId}
        });


        event.preventDefault(event);
        return;


    })

    $(document).on("click", ".updateNote", function(event) {
        // when we press update note it generates the same form bit for this unique Note
        let noteId = $(this).attr("data")
        // console.log(noteId)


        let headerText = $(this).parent('.parentsNote').find('p').text();
        let messageText = $(this).parent('.parentsNote').find('h4').text()
        $("#addform").empty()

        $("#addform").append(
            `<pre class="form-group">
            <input type="Text" class="form-control" id="titleNode"  placeholder="Title" name = "noteHeader" value="${messageText}">
            <textarea rows="4" cols="25" id="bodyNote"  name = "noteInfo" > ${headerText} </textarea>
            <button data= ${noteId} class="updatThiseNote"> Update Note </button>
                </pre>`
        );

        event.preventDefault(event);
        return;

    });

    $(document).on("click", ".updatThiseNote", function(event) {

        console.log($(this).attr('data'))

            //get an ID of Note
        let NoteIdtoBeUpdated = $(this).attr('data')

            //generate new data and send it to the database
        let NoteData = {
            _id : NoteIdtoBeUpdated,
            title : $('#titleNode').val().trim(),
            body: $('#bodyNote').val().trim(),
            date: TimeStamp()
        }


        let headerToUpdate =  $("div").find(`[data='${NoteIdtoBeUpdated}']`).find('b');
        let BodyToUpdate =  $("div").find(`[data='${NoteIdtoBeUpdated}']`).find('i');
        //update for more UI purpiose
        headerToUpdate.text(NoteData.title);
        BodyToUpdate.text(NoteData.body);
        //hide

        $("#addform").empty();

        //to checnge data in DB use Patch method!
        $.ajax({
            type: "PATCH",
            url: '/addNote',
            data: NoteData
        });

        event.preventDefault(event);
        return;

    })

});