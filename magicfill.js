(function(){

alert('magicfill js camed');
chrome.extension.sendRequest({variable: "image"}, function(response) {
alert('response');
});

})();
