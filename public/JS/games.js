function renderGames (gamesJSON) {
    $.getJSON("api/games", function (games) {
        var strHtml = [];
        $.each(games, function (key, value) {
            strHtml.push("<div style='background-image: url(" + value.pic + "); background-size: contain;' onclick='renderDesc(id)' id="+ value.id +" class='container container-" + key + "'>" +
                "<div class='child child-" + key + "'>Rating     " +"★".repeat(value.rate) + "☆".repeat(5-value.rate) + "</div>" +
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
                        '<div class="desc-pic"><img src="' + game.pic +'"/></div></br>' +
                        '<div class="desc-info">' + game.desc + '</div>' +
                        '<div class="desc-rating">User Rating:' +"★".repeat(game.rate) + "☆".repeat(5-game.rate) + '</div>' +
                        '<div class="desc-raters">Raters: ' + game.raters + '</div>'+
                        'Your Rating: <div id="' + game.id + '" onclick="userRating(id)" class="rating" data-rate-value=3></div>'
        );

        var options = {};
        if (localStorage.getItem('userRate'+id) === null) {
            options = {
                initial_value: 1,
                max_value: 5,
                step_size: 1,
                readonly: false,
                change_once: true,
            }

            $(".rating").rate(options);
            $(".rating").rate();

        }else {
            $(".rating").html("★".repeat(localStorage.getItem('userRate'+id)) + "☆".repeat(5-localStorage.getItem('userRate'+id)))
         }

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

function userRating (id) {


    var userRating = $(".rating").rate("getValue");
    $.getJSON("api/games/" +id, function(game){
        if (localStorage.getItem('userRate'+id) !== null)return;
        var newRaters = (parseInt(game.raters)+1);
        var newRate = ((game.rate*game.raters+userRating)/newRaters);
        game.rate = newRate;
        game.raters = newRaters;

        localStorage.setItem('userRate'+id, userRating);
        console.log(('userRate'+id));

        $.ajax({
            type: "PUT",
            url: 'api/games/'+id,
            data: game,
            success: function () {
                console.log('Added!');
            }
        });
    });

    //var newContact = {name: obj[0].value, mail: obj[1].value, msg: obj[2].value, timeSent: Date.now()};
    //$.ajax({
    //    type: "PUT",
    //    url: 'api/contact/'+id,
    //    data: id,
    //    success: function () {
    //        console.log('Added!');
    //    }
    //});
}