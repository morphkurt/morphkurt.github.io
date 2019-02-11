var embedCode="";
var pCode="";

$( document ).ready(function() {
  embedCode=getName("ec");
  pCode=getName("pc");
  $('#ooyala-player-frame').src="https://player.ooyala.com/static/v4/production/skin-plugin/iframe.html?ec=F3ZnMwZDE6jVxadVViZf0VHP46dI-P8t&pbid=4d619a02ee0644649726510a6dce17f7&pcode=duN2QyOvp793gi9Wd4n94sWFRpTv&autoplay=falseframeborder=";
  $("#option1").click(function(){
    alert('clicked!');
  });
});

function getName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
