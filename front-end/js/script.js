const urlApiBase = "https://api-bot-bruno-movies.herokuapp.com/bot/"

function loadMovie(){
    let url = urlApiBase + "media?url=https://megaseriehd.com/series/revenge/"
    
    $.ajax({
        type: "get",
        url: url,
        crossDomain: true,
        success: function (response) {
            console.log(response)
        }
    });
}

function addiframe(url){
    window.location.href = url
}

loadMovie()