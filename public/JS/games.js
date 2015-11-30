function renderGames (gamesJSON) {
    $.getJSON("api/games", function(games) {
        var strHtml = [];
        $.each(games, function(key,value){
            strHtml.push("<div class='container container-" + key + "'>" +
                "<div class='child child-" + key + "'><img src='" + value.pic + "'/></div>" +
                "<div class='child child-" + key + "'>" + value.name + "</div>" +
                "<div class='child child-" + key + "'>" + value.rate + "</div>" +
                "</div>" );
        });

        $("<div/>", {
            "class": "gamesFlex",
            html: strHtml.join( "" )
        })
            .appendTo( ".gamesData" );
    })
}

$(document).ready(renderGames);