



function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}


function mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }



var arrWithoutShortSentences = [];


$(document).ready(function(){
    function pullStuff(keyword, target){
 
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+keyword+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.parse.text["*"];

            function strip(html){
                var tmp = document.createElement("DIV");
                tmp.innerHTML = html;
                return tmp.textContent || tmp.innerText || "";
            }

            var cleanmarkup = strip(markup)
                .replace(/(\r\n|\n|\r)/gm," ")
                .replace(/\s\s+/g, ' ')
                .replace(/([.?!])\s*(?=[A-Z])/g, "$1|")
                .replace(/[{()}]/g, '')
                .replace(/[\u0300-\u036f]/g, "");

            var arr = cleanmarkup.split(".");

            arrWithoutShortSentences = [];

            for(var i = 0; i < arr.length; i++){

                if (arr[i].length > 100){
                    arrWithoutShortSentences.push(arr[i]);
                }

            }

            // console.log(arrWithoutShortSentences, arrWithoutShortSentences.length);

            var randomnt = Math.floor(randomInt(0,arrWithoutShortSentences.length));

            var sentence = arrWithoutShortSentences[randomnt];

        $(target).append(sentence);         
            
        },
        error: function (errorMessage) {

        }
    });
    
    
    }
        pullStuff("Kinshasa","#target"); 

  
});


function getScrollPercent() {
    var h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}

var trigger = 0;


function rotator(rotations){

        var rotation = mapRange(getScrollPercent(), 0,100,0,rotations*360)+90+180;

        var rotation360 = 0;

        for (var i = 0; i < rotations; i++){
            rotation360 = rotations * 360 - (rotation - 270 - (i*360));
        }

        console.log(rotation360);

        var scaling = mapRange(getScrollPercent(), 0,100,1,1);

        trigger = Math.floor(mapRange(rotation, 0,rotations*360,0,(rotations)*2));

        // var style = 'scale(' + scaling + ') rotateY(' + (rotation + 90) + 'deg) rotateX(' + (rotation + 90) + 'deg)';
        var style = 'scale(' + scaling + ') rotateY(' + (rotation + 90) + 'deg)';

        $('#plate').css({
            '-webkit-transform' : style,
            '-moz-transform'    : style,
            '-ms-transform'     : style,
            '-o-transform'      : style,
            'transform'         : style
        });

        $('#plate').html(arrWithoutShortSentences[trigger]);
}




    $(window).scroll(function() {
        rotator(4);
    });

