var embedCode="";
var pCode="";

$( document ).ready(function() {
  embedCode=getName("ec");
  pCode=getName("pc");
  $('#ooyala-player-dev').html("<p><iframe id=\"ooyala-player-frame\" width=\"550\" height=\"310\" src=\"https://player.ooyala.com/static/v4/production/skin-plugin/iframe.html?ec="+embedCode+"&pbid=4d619a02ee0644649726510a6dce17f7&pcode="+pCode+"&autoplay=falseframeborder=\" allowfullscreen="" 0=""></iframe></p>");
  
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
