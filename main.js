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

			var cleanmarkup = strip(markup).replace(/(\r\n|\n|\r)/gm," ").replace(/\s\s+/g, ' ');

            var blurb = $(target).append(cleanmarkup);			
            
        },
        error: function (errorMessage) {

        }
    });
    
    
    }
		pullStuff("techno","#target"); 
  
});


