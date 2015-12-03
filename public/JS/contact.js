function sendForm(obj) {
    //console.log(obj)
    //console.log(obj[1].value)
    var newContact = {name: obj[0].value, mail: obj[1].value, msg: obj[2].value, timeSent: Date.now()};
    $.ajax({
        type: "POST",
        url: 'api/contact',
        data: newContact,
        success: function () {
            console.log('Added!');
        }
    });
    $('#userName').val('');
    $('#userEmail').val('');
    $('#messageContent').val('');
}