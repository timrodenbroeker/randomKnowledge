
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
