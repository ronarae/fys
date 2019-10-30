// Select all links with hashes
$(document).ready(function() {
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var targetEl;
        var isTop = false;
        var target = $(this.hash);
        if (this.hash.slice(1) == "top") {
          targetEl = 0;
          isTop = true;
        } else {
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          targetEl = target.offset().top;
        }
        // Does a scroll target exist?
        if (target.length || isTop === true) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: targetEl
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
});
