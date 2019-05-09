const urlApiBase = "https://api-bot-bruno-movies.herokuapp.com/bot/"

function loadMovie(url){
    $.ajax({
        type: "GET",
        crossDomain: true,
        url: urlApiBase + "media?url=" + url,
        success: function (response) {
            console.log(response)
        }
    });
}

function addiframe(url){
    window.location.href = url
}

loadMovie("https://megaseriehd.com/series/revenge/");