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