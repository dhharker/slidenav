/** Slide Nav
 * @copyright WorldTree Digital Solutions/David Harker 2013.
 * @license MIT
 * @url http://wtds.co.uk
 **/

(jQuery(function ($) {
    
    $(document).ready (function () {
    //window.setTimeout (function () {

        var links = $(".secondary-nav-item a");
        //var links = $("a");
        
        $('body').delegate(links, 'click', function (e) {
            
            $('body').wrapInner ('<div id="slideWrapper"/>');
            var $this = $(e.target),
                //direction = ($this.parent().is('.pull-right')) ? 'left' : 'right',
                gi = function (href) {
                    return $('a[href="'+href+'"]').first().parent().index();
                },
                linkHref = $this.attr ('href'),
                direction = (gi(linkHref) > gi(document.location)) ? 'left' : 'right',
                unDirection = (direction == 'right') ? 'left' : 'right',
                hideMe = $('#slideWrapper').first(),
                showMe = $('<div/>').appendTo('body'),
                delay = 1000,
                body = $('body')
            ;
            
            if (typeof linkHref == 'undefined') {
                console.log ("href undef");
                e.stopPropagation();
                e.preventDefault();
                return false;
            }
            console.log ("hideMe.hide", direction);
            hideMe.hide("slide", { direction: direction }, delay, function () {
                $(this).remove();
                console.log ("showMe.hide", direction);
                showMe
                    .hide("slide", { direction: unDirection }, 10)
                    .load(linkHref + ' #content-wrapper', function (data, status) {
                        if (status != 'success') {
                            document.location = linkHref;
                        }
                        else {

                            history.pushState(null, null, linkHref);

                            var newClasses = data.match(/<body[^>]*?class="([^"]+)"/)[1];

                            body.switchClass (body.attr('class'), newClasses, delay, 'easeInOutQuad', function () {
                                //$('body').attr('class', newClasses);
                            });
                            console.log ("showMe.show", unDirection);
                            showMe.show("slide", { direction: unDirection }, delay, function () {
                                showMe.children().first().unwrap();
                                body.addClass(newClasses);
                                $(document).trigger('ready');
                            });
                        }
                    })
                ;
            });
            
            //.load('ajax/test.html #container
            
            e.stopPropagation();
            e.preventDefault();
            return false;

        });
        
    });
    //}, 1000);
    
}(jQuery)));
