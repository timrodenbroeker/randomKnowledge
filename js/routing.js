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