magicinputsfiller.onFirefoxLoad = function(event) {
  document.getElementById("contentAreaContextMenu")
          .addEventListener("popupshowing", function (e){ magicinputsfiller.showFirefoxContextMenu(e); }, false);
};

magicinputsfiller.showFirefoxContextMenu = function(event) {
  // show or hide the menuitem based on what the context menu is on
  document.getElementById("context-magicinputsfiller").hidden = gContextMenu.onImage;
};

window.addEventListener("load", function () { magicinputsfiller.onFirefoxLoad(); }, false);
