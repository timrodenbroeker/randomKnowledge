var markupArray = [];

var trigger = 0;

var a;

var allLinks; 
var body = document.body,
    html = document.documentElement;

var height = Math.max( body.scrollHeight, body.offsetHeight, 
                       html.clientHeight, html.scrollHeight, html.offsetHeight );


var string = window.location.href,
    substring = "#";

if (string.indexOf(substring) == -1){
    window.location.href += "#kinshasa"
} else {
    console.log('hash');
}

var term = window.location.href.split('#').pop();

var s = string.split(substring).shift();



$('a').on("click", function (e) {
	e.preventDefault();
	alert('foo');
	



	var newLocation = s + "#" + $(this).attr('title');

	window.location.href = newLocation;
});

function getScrollPercent() {
    var h = document.documentElement, 
    b = document.body,
    st = 'scrollTop',
    sh = 'scrollHeight';
    return (h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100;
}




function randomInt(min, max) {
    return Math.random() * (max - min) + min;
}


function mapRange(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }

 function pullStuff(keyword){
 
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page="+keyword+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
 
            var markup = data.parse.text["*"];

            // Removing redundant HTML 
            // -•–•–•–•–•–•-•–•–•–•–•–•-•–•–•–•–•–•

            // Delete Comments
            markup = markup.replace(/<!--[\s\S]*?-->/g, '');
            // markup = markup.replace(/<pre>(.*?)</pre>/g, '');


            // Much better: creating a dummy-div and using jquery
            // https://stackoverflow.com/questions/10585029/parse-a-html-string-with-js

            var el = $( '<div></div>' );
            el.html(markup);

            el.find('table').remove();

            el.find('ul').remove();

            el.find('ol').remove();

            el.find('img').remove();

            el.find('span').remove();   

            el.find('small').remove();

            el.find('sup').remove();


            // now i still have many html-tags inside my paragraphs like <small> etc.
            // I dont want to delete these elements, i just want to remove the tags

            // The following method converts all HTML into raw text
            // $(myContent).text()

            // But i want to keep my links, so i have to find another way




            // first i create an array with all paragraphs. 
            var onlyParagraphs = el.html().match(/\<p\b[\s\S]+?\<\/p\>/g);

            // then i concat them to a string, to ensure that i have only the html between the p-tags
            a = onlyParagraphs.toString()


            // Later: Further reading
            allLinks = a.match(/\<a\b[\s\S]+?\<\/a\>/g);

        
            $('.back').append(allLinks);



            a = a.split('.');
      
        },
        error: function (errorMessage) {

        }
    });
    
    
    }


function rotator(rotations){

    var scrollY = window.scrollY;

    var scrollYPercent = mapRange(scrollY,0,height,0,100);

        // var scaling = mapRange(getScrollPercent(), 0,100,1,1);

        // var rotation = mapRange(scrollY, 0,height,0,rotations*360)+90+180;

        var rotation = mapRange(getScrollPercent(),0,100,0,rotations*360) + 270;

        


        trigger = Math.floor(mapRange(rotation, 0,rotations*360,0,(rotations)*2));

        if (trigger % 2 == 0){
            scaling = "-1,-1";
        } else {
            scaling = "1,1";    
        }

        

        // var style = 'scale(' + scaling + ') rotateY(' + (rotation + 90) + 'deg) rotateX(' + (rotation + 90) + 'deg)';
        // var stylePlate = 'rotateY(' + (rotation + 90) + 'deg)' + 'rotateX(' + (rotation + 90) + 'deg)';

        var stylePlate = 'rotateY(' + (rotation + 90) + 'deg)' + 'rotateX(' + (rotation + 90) + 'deg)';

        var styleTarget = 'scale(' + scaling + ')';


        $('#target').html(a[trigger]);

           $('#plate').css({
            '-webkit-transform' : stylePlate,
            '-moz-transform'    : stylePlate,
            '-ms-transform'     : stylePlate,
            '-o-transform'      : stylePlate,
            'transform'         : stylePlate
        });

        $('#target').css({
            '-webkit-transform' : styleTarget,
            '-moz-transform'    : styleTarget,
            '-ms-transform'     : styleTarget,
            '-o-transform'      : styleTarget,
            'transform'         : styleTarget
        });


        if (trigger % 2 == 0){
            $('.back').addClass('red');
        } else {
            $('.back').removeClass('red');
        }
}

pullStuff("kinshasa"); 

var scollpos = 0;

$(document).ready(function(){

	$(window).scroll(function() {
	    rotator(a.length/2);
	});

});
// setInterval(function(){ 
// 	$( window ).scrollTop( scollpos );
// 	scollpos+=170;
// }, 30);
