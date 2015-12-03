//Admin Page
//This page is accessible only to admins, it should show admin
//information:
//     List of contacts to read and the option to delete
// Some Statistics about each game (i.e. - how many times it
//was played)
// Use the getStats function described below:
//     getStats(gameId, callback) this function uses AJAX to GET
//all the stats from the url: /api/stat and then filter by
//gameId, and calls the callback with the data.

$(document).ready(getStats());

function getStats () {
    $.getJSON('api/stats', function(data) {
        var gameCount = {};
        //console.log(data);
        $.each(data, function(index, value) {
            if (gameCount[value.game] === undefined) {
                gameCount[value.game] = 1;
            } else if (value.action === "start"){
                gameCount[value.game]++;
            }
        });
        var games = Object.keys(gameCount);
        console.log(games);
        var strHtml = '';
        $.each(games, function (index, game) {
            strHtml += '<tr><td>'+ game +'</td>' +
                    '<td>'+ gameCount[game] +'</td></tr>';
        });
        console.log(strHtml);
        $('.tableStats').html(strHtml);
    });
}