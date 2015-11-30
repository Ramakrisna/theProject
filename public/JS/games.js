function renderGames (gamesJSON) {
    $.getJSON("api/games", function (games) {
        var strHtml = [];
        $.each(games, function (key, value) {
            strHtml.push("<div style='background-image: url(" + value.pic + "); background-size: contain;' onclick='renderDesc(" + key + ")' class='container container-" + key + "'>" +
                "<div class='child child-" + key + "'></div>" +
                "<div class='child child-" + key + "'>" + value.name + "</div>" +
                "<div class='child child-" + key + "'>" + value.rate + "</div>" +
                "</div>");
        });

        $("#gamesFlex").html(strHtml.join(''));

    });
}

$(document).ready(renderGames);


//function renderDesc(key) {
//
//}

//style="background-image: url(
//    <img src='" + value.pic + "'/>