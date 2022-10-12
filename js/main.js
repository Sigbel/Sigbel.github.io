/**
 * ===================================================================
 * main js
 *
 * -------------------------------------------------------------------
 */

function toggleMobileMenu(menu) {
  menu.classList.toggle('open');
}

(function ($) {
  "use strict";

  function subpages_resize(){
    var subpagesHeight=$('.pt-page-current').height();
    $(".subpages").height(subpagesHeight+50);
  }

  function portfolio_init(){
    var portfolio_grid=$('#portfolio_grid'), portfolio_filter=$('#portfolio_filters');

    if(portfolio_grid){
        portfolio_grid.shuffle({
            speed:450,
            itemSelector:'figure'});

        $('.site-main-menu').on("click","a",function(e){
            portfolio_grid.shuffle('update');});

        portfolio_filter.on("click",".filter",function(e){
            portfolio_grid.shuffle('update');
            e.preventDefault();

            $('#portfolio_filters .filter').parent().removeClass('active');

            $(this).parent().addClass('active');portfolio_grid.shuffle('shuffle',$(this).attr('data-group'));

            setTimeout(function(){subpages_resize();},500);
        });
    }
  }

  $(function(){
    $('#contact-form').validator();

    $('#contact-form').on('submit',function(e){
        if(!e.isDefaultPrevented()){
            var url="contact_form/contact_form.php";
            $.ajax({
                type:"POST",
                url:url,
                data:$(this).serialize(),
                success:function(data){
                    var messageAlert='alert-'+data.type;
                    var messageText=data.message;
                    var alertBox='<div class="alert '+messageAlert+' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>'+messageText+'</div>';

                    if(messageAlert&&messageText){$('#contact-form').find('.messages').html(alertBox);
                        if(messageAlert=="alert-success"){
                            $('#contact-form')[0].reset();
                        }
                    }
                }
            });
            return false;
        }
    });
});

  function mobileMenuHide(){
    var windowWidth=$(window).width();

    if(windowWidth<1024){
        $('#site_header').addClass('mobile-menu-hide');
    }
}

  /*---------------------------------------------------- */
  /* Preloader
	------------------------------------------------------ */
  $(window).on("load", function () {
    // will first fade out the loading animation
    $("#loader").fadeOut("slow", function () {
      // will fade out the whole DIV that covers the website.
      $("#preloader").delay(50).fadeOut("slow");
    });
  }).on('resize',function(){
    mobileMenuHide();
    setTimeout(function(){subpages_resize();},500);

  }).on("scroll", function(){
      if($(window).scrollTop()<20){
          $('.header').removeClass('sticked');
      }
      else{
          $('.header').addClass('sticked');
      }
  }).scrollTop(0);


  // if(document.readyState === "complete") {
  //   console.log("Interactive");
  // }
  // else if(document.readyState === "interactive") {
  //     console.log("Interactive");
  // }
  // else {
  //   console.log("Loading");
  //     };

  $(document).on('ready',function(){
    var $portfolio_container=$(".portfolio_grid");

  $portfolio_container.imagesLoaded(function(){
    console.log("Passei")
    portfolio_init();
  });

  $(' #portfolio_grid > figure ').each(function(){$(this).hoverdir();});

  $('.ajax-page-load-link').magnificPopup({
    type:'ajax',
    removalDelay:300,
    mainClass:'mfp-fade',
    gallery:{enabled:true},});

  $('.form-control').val('').on("focusin",function(){
    $(this).parent('.form-group').addClass('form-group-focus');
    }).on("focusout",function(){if($(this).val().length===0){$(this).parent('.form-group').removeClass('form-group-focus');}});})

  /*---------------------------------------------------- */
  /* FitText Settings
  	------------------------------------------------------ */
  setTimeout(function () {
    $("#intro h1").fitText(1, { minFontSize: "42px", maxFontSize: "84px" });
  }, 100);

  /*---------------------------------------------------- */
  /* FitVids
	------------------------------------------------------ */
  // $(".fluid-video-wrapper").fitVids();

  /*---------------------------------------------------- */
  /* Owl Carousel
	------------------------------------------------------ */
  // $("#owl-slider").owlCarousel({
  //   navigation: false,
  //   pagination: true,
  //   itemsCustom: [
  //     [0, 1],
  //     [700, 2],
  //     [960, 3],
  //   ],
  //   navigationText: false,
  // });

  /*----------------------------------------------------- */
  /* Alert Boxes
  	------------------------------------------------------- */
  $(".alert-box").on("click", ".close", function () {
    $(this).parent().fadeOut(500);
  });

  /*----------------------------------------------------- */
  /* Stat Counter
  	------------------------------------------------------- */
  // let statSection = $("#stats"),
  //   stats = $(".stat-count");

  // statSection.waypoint({
  //   handler: function (direction) {
  //     if (direction === "down") {
  //       stats.each(function () {
  //         let $this = $(this);

  //         $({ Counter: 0 }).animate(
  //           { Counter: $this.text() },
  //           {
  //             duration: 4000,
  //             easing: "swing",
  //             step: function (curValue) {
  //               $this.text(Math.ceil(curValue));
  //             },
  //           }
  //         );
  //       });
  //     }

  //     // trigger once only
  //     this.destroy();
  //   },

  //   offset: "90%",
  // });

  /*---------------------------------------------------- */
  /*	Masonry
	------------------------------------------------------ */
  // let containerProjects = $("#folio-wrapper");

  // containerProjects.imagesLoaded(function () {
  //   containerProjects.masonry({
  //     itemSelector: ".folio-item",
  //     resize: true,
  //   });
  // });

  /*----------------------------------------------------*/
  /*	Modal Popup
	------------------------------------------------------*/
  $(".item-wrap a").magnificPopup({
    type: "inline",
    fixedContentPos: false,
    removalDelay: 300,
    showCloseBtn: false,
    mainClass: "mfp-fade",
  });

  $(document).on("click", ".popup-modal-dismiss", function (e) {
    e.preventDefault();
    $.magnificPopup.close();
  });

  /*-----------------------------------------------------*/
  /* Navigation Menu
   ------------------------------------------------------ */
  let toggleButton = $(".menu-toggle"),
    nav = $(".main-navigation");

  // toggle button
  toggleButton.on("click", function (e) {
    e.preventDefault();
    toggleButton.toggleClass("is-clicked");
    nav.slideToggle();
  });

  // nav items
  nav.find("li a").on("click", function () {
    // update the toggle button
    toggleButton.toggleClass("is-clicked");
    // fadeout the navigation panel
    nav.fadeOut();
  });

  /*---------------------------------------------------- */
  /* Highlight the current section in the navigation bar
  	------------------------------------------------------ */
  // let sections = $("section"),
  //   navigation_links = $("#main-nav-wrap li a");

  // sections.waypoint({
  //   handler: function (direction) {
  //     let active_section;

  //     active_section = $("section#" + this.element.id);

  //     if (direction === "up") active_section = active_section.prev();

  //     let active_link = $(
  //       '#main-nav-wrap a[href="#' + active_section.attr("id") + '"]'
  //     );

  //     navigation_links.parent().removeClass("current");
  //     active_link.parent().addClass("current");
  //   },

  //   offset: "25%",
  // });

  /*---------------------------------------------------- */
  /* Smooth Scrolling
  	------------------------------------------------------ */
  $(".smoothscroll").on("click", function (e) {
    e.preventDefault();

    let target = this.hash,
      $target = $(target);

    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $target.offset().top,
        },
        800,
        "swing",
        function () {
          window.location.hash = target;
        }
      );
  });


  /*---------------------------------------------------- */
  /*  Placeholder Plugin Settings
	------------------------------------------------------ */
  // $("input, textarea, select").placeholder();

  /*----------------------------------------------------- */
  /* Back to top
   ------------------------------------------------------- */
  let pxShow = 300; // height on which the button will show
  let fadeInTime = 400; // how slow/fast you want the button to show
  let fadeOutTime = 400; // how slow/fast you want the button to hide
  let scrollSpeed = 300; // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

  // Show or hide the sticky footer button
  jQuery(window).on("scroll", function () {
    if (!$("#header-search").hasClass("is-visible")) {
      if (jQuery(window).scrollTop() >= pxShow) {
        jQuery("#go-top").fadeIn(fadeInTime);
      } else {
        jQuery("#go-top").fadeOut(fadeOutTime);
      }
    }
  });
})(jQuery);

