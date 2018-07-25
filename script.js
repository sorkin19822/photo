;

$(document).ready(function () {

/*создание формы для отправки комментария*/
    $(document).on('click','.commentCreate', function(){
        idComment = $(this).attr('id');


        str = "<ul class=\"uk-comment-list\">\n";



       commentsPost = getCommentsSelectID(idComment);
       if (commentsPost.length>=0){
           for(key in commentsPost){
               console.log(commentsPost[key]);
               var jsDate = new Date(commentsPost[key].datetime*1000);

               str+="    <li>\n" +
                   "        <article class=\"uk-comment uk-visible-toggle\">\n" +
                   "            <header class=\"uk-comment-header uk-position-relative\">\n" +
                   "                <div class=\"uk-grid-medium uk-flex-middle\" uk-grid>\n" +
                   "                    <div class=\"uk-width-auto\">\n" +
                   "                        <img class=\"uk-comment-avatar\" src=\"avatar.png\" width=\"80\" height=\"80\" alt=\"\">\n" +
                   "                    </div>\n" +
                   "                    <div class=\"uk-width-expand\">\n" +
                   "                        <h4 class=\"uk-comment-title uk-margin-remove\"><a class=\"uk-link-reset\" href=\"#\">"+commentsPost[key].author+"</a></h4>\n" +
                   "                        <p class=\"uk-comment-meta uk-margin-remove-top\"><a class=\"uk-link-reset\" href=\"#\">"+jsDate.toLocaleString()+"</a></p>\n" +
                   "                    </div>\n" +
                   "                </div>\n" +
                   "                <div class=\"uk-position-top-right uk-position-small uk-hidden-hover\"><a class=\"uk-link-muted\" href=\"#\">Reply</a></div>\n" +
                   "            </header>\n" +
                   "            <div class=\"uk-comment-body\">\n" +
                   "                "+commentsPost[key].comment+"\n" +
                   "            </div>\n" +
                   "        </article>\n" +
                   "    </li>"
           }
       }
        str+="</ul>";


        $('.modalTitle').text('Оставьте комментарий');
        $('.modalTitle').next().html(str + '  <div class="uk-margin">\n' +
            '            <textarea class="uk-textarea" rows="5" placeholder="Введите текст - ФОРМА ПОКА НЕ РАБОТАЕТ"></textarea>\n' +
            '</div>');
        if($('.sendComment').length){$('.sendComment').remove();}
        $('.modalTitle').next().next().prepend('' +
            '<button class="uk-button uk-button-primary sendComment" send-id-img="'+idComment+'">Primary</button>');
    });


    //albums();
    /*Загрузка альбомов в селект*/
    filter();
     comments = getComments();


    /*Отработка фильтрации в селекте*/
    $('.selectAlbums').on('change', function() {
        idAlbum = $('.selectAlbums option:selected').attr('id');
        albumImages = getAlbumImages(idAlbum);
        $(".blockContent").html(renderImages(albumImages,idAlbum));
    });

    /*создание формы для вставки  комментария*/



});
var comments;
var auth = 'Client-ID c3a2cd4cbce4a06';
var token = 'Bearer 5970d84a65c241b12942b9ffeeff2845b1421f86';
var user = 'sorkin19822';
function imageAccount() {
	$('.modalTitle').text('О пользователе');
    if($('.sendComment').length){$('.sendComment').remove();}
    $('.loaderImage').show();
    var hashImgURL = 'https://api.imgur.com/3/account/'+user;
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


/*Выборка по альбомам с рендером заголовков и картинок*/
function albums() {
    $('.loaderImage').show();
        var hashImgURL = 'https://api.imgur.com/3/account/'+user+'/albums';
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
                var photo;
                var countImage;
                var str = '<div>';
                for (var key in data.data) {
                    if ('user_follow' == key)continue;
                    str += '<div class=\"id-'+data.data[key].id+'\">';
                    str += '<h1>' + key + ': <b>' + data.data[key].title + '</b></h1>';
                    albumImages = getAlbumImages(data.data[key].id);
                    str+=renderImages(albumImages,data.data[key].id);

                    str +=    '</div>';
                    str += '</div>';

                }
                str += '</div>';
                $(".blockContent").html(str);
                $('.loaderImage').hide();

            }
        });

}




/*Загрузка изображений конкретного альбома*/
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







/*Создание пунктов с альбомами для селекта*/
function filter() {
    $('.loaderImage').show();
    var hashImgURL = 'https://api.imgur.com/3/account/'+user+'/albums';
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



/*не смог результат получить в переменную*/
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
function renderImages(idAlbum, id) {
    $('.loaderImage').show();
    var comment = [];
    var str='';
    var photo;
    comment = getCommentsSelectID(id);

    albumImages = idAlbum;
    countImage = albumImages.length;
    str +='<span id="'+id+'" ' +
    'class="commentCreate uk-link-muted"   uk-toggle="target: #modal-example">Комментарии ' +
        '<span class="uk-badge">'+comment.length+'</span></span>';
    str += '<div class="uk-child-width-1-3@s uk-flex-center" uk-grid uk-lightbox="animation: slide">';
    for (var keyImg in albumImages){
        photo = 1+parseInt(keyImg);
        str +=    '<div >';
        str +=  '  <a class="uk-inline" ' +
            'href="'+albumImages[keyImg].link+'" ' +
            'data-caption="foto '+photo+' из '+countImage+'"' +
            ' id-img="'+albumImages[keyImg].id+'" >';
        str +=   '<img src="'+albumImages[keyImg].link+'" alt="">';
        str +=    '</a>'
        str +=    '</div>';
    }
    str +=    '</div>';
    $('.loaderImage').hide();
    return str;
}

/*Получение всех комментариев*/
function getComments() {
    $('.loaderImage').show();
    var comment;
    var hashImgURL = 'https://api.imgur.com/3/account/'+user+'/comments/newest/0';
    $.ajax({
        url: hashImgURL,
        async: false,
        headers: {
            'Authorization': token
        },
        type: 'GET',
        data: {

        },
        success: function(data) {
            $('.loaderImage').hide();
           comment = data.data;

        }
    });
    return comment;

}

function getCommentsSelectID(commentsID){
    var comments = getComments();
    var comment = [];
    for (key in comments){
        if(commentsID == comments[key].image_id){
            comment.push(comments[key]);
        }
    }
    return comment;
}


/*/////////////////////*/

UIkit.util.on('#modal-example', 'show', function () {

});