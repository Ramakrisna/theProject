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
                gameCount[value.game] = {start: 1, win: 0, lose: 0};
            } else {
                switch (value.action) {
                    case 'start':
                        gameCount[value.game].start++;
                        break;
                    case 'win':
                        gameCount[value.game].win++;
                        break;
                    case 'lose':
                        gameCount[value.game].lose++;
                        break;
                }
            }
        });
        console.log(gameCount);
        var games = Object.keys(gameCount);
        console.log(games);
        var strHtml = '';
        $.each(games, function (index, game) {
            strHtml += '<tr><td>'+ game +'</td>' +
                    '<td>'+ gameCount[game].start +'</td>' +
                    '<td>'+ gameCount[game].win +'</td>' +
                    '<td>'+ gameCount[game].lose +'</td></tr>'
        });
        console.log(strHtml);
        $('.tableStats').html(strHtml);
    });
}