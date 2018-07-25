;

$(document).ready(function () {

/*/!*Подписка на событие получения профиля "О пользователе"*!/
 UIkit.util.on('#modal-example', 'beforeshow', function () {
        imageCount();
    });*/
});

function imageCount() {
    $('.loaderImage').show();
    var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822';
    $.ajax({
        url: hashImgURL,
        headers: {
            'Authorization': 'Client-ID c3a2cd4cbce4a06'
        },
        type: 'GET',
        data: {},
        success: function (data) {
            $('.loaderImage').hide();
            var str = '<ul class="uk-list">';
            for (var key in data.data) {
                if ('user_follow' == key)continue;
                str += '<li>' + key + ': <b>' + data.data[key] + '</b></li>'
            }
            str += '</ul>';
            $(".modalBody").html(str);
        }
    });
}



function albums() {

        var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822/albums';
        $.ajax({
            url: hashImgURL,
            headers: {
                'Authorization': 'Client-ID c3a2cd4cbce4a06'
            },
            type: 'GET',
            data: {

            },
            success: function(data) { console.log(data.data); }
        });

}

