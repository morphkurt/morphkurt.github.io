var=embedCode;
var=pCode;

$( document ).ready(function() {
  embedCode=getName("ec");
  pCode=getName("pc");
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
