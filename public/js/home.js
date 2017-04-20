

$( document ).ready(function() {
    console.log( "ready!" );



    $('.scrape').on('click', function () {
        console.log('hello')
        $.ajax({
            url: "/scrape",
        }).done(function(data) {
            data.forEach( (element,i)=>{
                        console.log(element)
                // content

                $("#content").append(`

                    <div class = "row"> 
                     <div class="articleChunk col-md-12">
                     <h3><a href="${element.link} ">${element.headline} </a> </h3>
                        <h4>${element.snippet}</h4>
                        <button type="button" class=" save btn btn-large btn-block btn-success">Save</button>
                        </div>
                        </div>
                `)
            })
        });
    })

    $(document).on("click",".save",function() {
        let textToBesaved = $(this).parents('div .articleChunk').find('h3').text();
        let linkToBesaved = $(this).parents('div .articleChunk').find('a').attr('href');
        let snippetTobeSaved = $(this).parents('div .articleChunk').find('h4').text();

        let fullArticle = {
            headline :  textToBesaved,
            link : linkToBesaved,
            snippet : snippetTobeSaved
        }
                // console.log(fullArticle);
        $(this).parents('div .articleChunk').empty();
        $.ajax({
            type: "POST",
            url: '/saveArticle',
            data: fullArticle
        });

    });

});

