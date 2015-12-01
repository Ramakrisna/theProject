function renderGames (gamesJSON) {
    $.getJSON("api/games", function (games) {
        var strHtml = [];
        $.each(games, function (key, value) {
            strHtml.push("<div style='background-image: url(" + value.pic + "); background-size: contain;' onclick='renderDesc(id)' id="+ value.id +" class='container container-" + key + "'>" +
                "<div class='child child-" + key + "'>" + value.rate + "</div>" +
                "<div class='child child-" + key + "'>" + value.name + "</div>" +
                "<div class='child child-" + key + " description'>" + value.desc + "</div>" +
                "</div>");
        });

        $("#gamesFlex").html(strHtml.join(''));

    });
}

$(document).ready(renderGames);


function renderDesc(id) {
    var elDesc = $( '.descriptionPop' );
    $.getJSON("api/games/"+id, function(game){
        //console.log(game)
        $(elDesc).html( '<div class="desc-title">' + game.name + '</div>' +
                        '<div class="desc-pic"><img src="' + game.pic +'"/></div>' +
                        '<div class="desc-info">' + game.desc + '</div>' +
                        '<div class="desc-rating">User Rating:' +"☆".repeat(game.rate) + '</div>' +
                        '<div class="desc-raters">Raters: ' + game.raters + '</div>'+
                        'Your Rating: <div class="rating" data-rate-value=3></div>'
        );

        $(".rating").rate();

        //or for example
        var options = {
            max_value: 6,
            step_size: 1,
            readonly: false,
        }
        $(".rating").rate(options);


    });

    elDesc.addClass('showDesc');
    document.querySelector('.cinemaOff').classList.add('cinemaOn');

}
function removeDesc(key) {
    document.querySelector('.descriptionPop').classList.remove('showDesc');
    document.querySelector('.cinemaOff').classList.remove('cinemaOn');
}



//style="background-image: url(
//    <img src='" + value.pic + "'/>