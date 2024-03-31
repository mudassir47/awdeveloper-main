(function(){window.onload=function(){window.setTimeout(fadeout,500);}
function fadeout(){document.querySelector('.preloader').style.opacity='0';document.querySelector('.preloader').style.display='none';}
window.onscroll=function(){var header_navbar=document.querySelector(".navbar-area");var sticky=header_navbar.offsetTop;var logo=document.querySelector('.navbar-brand img')
if(window.pageYOffset>sticky){header_navbar.classList.add("sticky");logo.src='img/aw_name_blue_logo.png';}else{header_navbar.classList.remove("sticky");logo.src='img/aw_name_white_logo.png';}
var backToTo=document.querySelector(".scroll-top");if(document.body.scrollTop>50||document.documentElement.scrollTop>50){backToTo.style.display="flex";}else{backToTo.style.display="none";}};new WOW().init();let navbarToggler=document.querySelector(".mobile-menu-btn");navbarToggler.addEventListener('click',function(){navbarToggler.classList.toggle("active");});})();
