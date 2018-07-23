;

$(document).ready(function () {

/*создание формы для отправки комментария*/
    $(document).on('click','.commentCreate', function(){
        idComment = $(this).attr('id');
        console.log(idComment);
        $('.modalTitle').text('Оставьте комментарий');
        $('.modalTitle').next().html('  <div class="uk-margin">\n' +
            '            <textarea class="uk-textarea" rows="5" placeholder="Введите текст"></textarea>\n' +
            '        </div>');
        if($('.sendComment').length){$('.sendComment').remove();}
        $('.modalTitle').next().next().prepend('' +
            '<button class="uk-button uk-button-primary sendComment" send-id-img="'+idComment+'">Primary</button>');
    });


    //albums();
    /*Загрузка альбомов в селект*/
    filter();


    /*Отработка фильтрации в селекте*/
    $('.selectAlbums').on('change', function() {
        idAlbum = $('.selectAlbums option:selected').attr('id');
        albumImages = getAlbumImages(idAlbum);
        console.log(albumImages);
        renderImages(albumImages);
    });

    /*создание формы для вставки  комментария*/



});

var auth = 'Client-ID c3a2cd4cbce4a06';
var token = 'Bearer 5970d84a65c241b12942b9ffeeff2845b1421f86';
function imageCount() {
    $('.loaderImage').show();
    var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822';
    $.ajax({
        url: hashImgURL,
        headers: {
            'Authorization': auth
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
    $('.loaderImage').show();
        var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822/albums';
        $.ajax({
            url: hashImgURL,
            headers: {
                'Authorization': auth
            },
            type: 'GET',
            data: {

            },
            success: function(data) {
                var albumImages;
                $('.loaderImage').hide();
                console.log(data.data)
                var photo;
                var countImage;
                var str = '<div>';
                for (var key in data.data) {
                    if ('user_follow' == key)continue;
                    str += '<div class=\"id-'+data.data[key].id+'\">';
                    str += '<h1>' + key + ': <b>' + data.data[key].title + '</b></h1>';
                    albumImages = getAlbumImages(data.data[key].id);
                    countImage = albumImages.length;
                    str += '<div class="uk-child-width-1-3@s uk-flex-center" uk-grid uk-lightbox="animation: slide">';
                    for (var keyImg in albumImages){
photo = 1+parseInt(keyImg);
                        str +=    '<div >';
                        str +=  '  <a class="uk-inline" ' +
                            'href="'+albumImages[keyImg].link+'" ' +
                            'data-caption="foto '+photo+' из '+countImage+'"' +
                            ' id-img="'+albumImages[keyImg].id+'" >';
                        str +=   '<img src="'+albumImages[keyImg].link+'" alt="">';
                        str +=    '</a>' + '<br><span id="'+albumImages[keyImg].id+'" ' +
                            'class="commentCreate uk-link-muted"   uk-toggle="target: #modal-example">Комментарий</span>';
                        str +=    '</div>';
                    }
                    str +=    '</div>';
                    str += '</div>';

                }
                str += '</div>';
                $(".blockContent").html(str);
                $('.loaderImage').hide();

            }
        });

}



    function getImages() {
        $('.loaderImage').show();
        var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822/images/';
        $.ajax({
            url: hashImgURL,
            headers: {
                'Authorization': token
            },
            type: 'GET',
            data: {

            },
            success: function(data) {
                $('.loaderImage').hide();
                console.log(data.data);
            }
        });

    }

function getAlbumImages(idAlbum) {
    var resImg='';
    var hashImgURL = 'https://api.imgur.com/3/album/'+idAlbum+'/images';
    $.ajax({

        url: hashImgURL,
        async: false,
        headers: {
            'Authorization': auth
        },
        type: 'GET',
        success: function(data) {
            resImg = data.data;
        }
    });

return resImg;
}







/****************************/
function filter() {
    $('.loaderImage').show();
    var hashImgURL = 'https://api.imgur.com/3/account/sorkin19822/albums';
    $.ajax({
        url: hashImgURL,
        headers: {
            'Authorization': auth
        },
        type: 'GET',
        data: {

        },
        success: function(data) {
			$('.loaderImage').hide();
            var str='';
            for (var key in data.data) {
                str += '<option id="'+data.data[key].id+'">'+data.data[key].title+'</option>';
                $('.selectAlbums').html(str);
            }
        }
    });

}




function fetchAlbumImages(idAlbum) {

    return fetch('https://api.imgur.com/3/album/'+idAlbum+'/images',
        {
            method:"GET",
            headers: { Authorization : auth },
            mode: 'cors',
            cache: 'default'
        })
        .then(
            function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                return response.json().then(function(data) {
                    return data.data;
                });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
}



/*Получение и вывод категорий из альбома*/
function renderImages(idAlbum) {
    $('.loaderImage').show();
    var str='';
    var photo;
    albumImages = idAlbum;
    countImage = albumImages.length;
    str += '<div class="uk-child-width-1-3@s uk-flex-center" uk-grid uk-lightbox="animation: slide">';
    for (var keyImg in albumImages){
        photo = 1+parseInt(keyImg);
        str +=    '<div >';
        str +=  '  <a class="uk-inline" ' +
            'href="'+albumImages[keyImg].link+'" ' +
            'data-caption="foto '+photo+' из '+countImage+'"' +
            ' id-img="'+albumImages[keyImg].id+'" >';
        str +=   '<img src="'+albumImages[keyImg].link+'" alt="">';
        str +=    '</a>';
        str +=    '</div>';
    }
    str +=    '</div>';

$(".blockContent").html(str);
$('.loaderImage').hide();
}

/*/////////////////////*/

UIkit.util.on('#modal-example', 'show', function () {

});