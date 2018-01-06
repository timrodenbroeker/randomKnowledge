function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}


function mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

    function getScrollPercent() {
        var h = document.documentElement, 
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
    }



$(document).ready(function(){
	function pullStuff(keyword, target){
 
    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+keyword+"&callback=?",
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

            var arr = cleanmarkup.split("|");

            var arrWithoutShortSentences = [];

            for(var i = 0; i < arr.length; i++){

                if (arr[i].length > 10){
                    arrWithoutShortSentences.push(arr[i]);
                }

            }

            console.log(arrWithoutShortSentences, arrWithoutShortSentences.length);

            var randomnt = Math.floor(randomInt(0,arrWithoutShortSentences.length));

            var sentence = arrWithoutShortSentences[randomnt];

        $(target).append(sentence);			
            
        },
        error: function (errorMessage) {

        }
    });
    
    
    }
		pullStuff("earth","#target"); 
  
});





$(window).scroll(function() {
        var rotation = mapRange(getScrollPercent(), 0,100,0,720);
        var scaling = mapRange(getScrollPercent(), 0,100,1,1);

            $('#plate').css({
                '-webkit-transform' : 'scale(' + scaling + ') rotateY(' + rotation + 'deg)',
                '-moz-transform'    : 'scale(' + scaling + ') rotateY(' + rotation + 'deg)',
                '-ms-transform'     : 'scale(' + scaling + ') rotateY(' + rotation + 'deg)',
                '-o-transform'      : 'scale(' + scaling + ') rotateY(' + rotation + 'deg)',
                'transform'         : 'scale(' + scaling + ') rotateY(' + rotation + 'deg)'
            });
        

        
    });
