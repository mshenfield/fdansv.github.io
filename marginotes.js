function marginotes(els, options) {
  var options = options || {}
  var marginTooltips = document.getElementsByClassName('margintooltip')
  var marginTooltip
  if (marginTooltips.length === 0) {
    marginTooltip = document.createElement('div')
    marginTooltip.className = 'margintooltip'
    marginTooltip.style.display = 'none'
    document.body.appendChild(marginTooltip)
  } else {
    marginTooltip = marginTooltips[0]
  }

  var field = options.field || "desc"
  var fader = new Fader()
  Array.prototype.forEach.call(els, function(el) {
    if (el.tagName === 'SPAN') {
      el.style["border-bottom"] = "1px dashed #337ab7"
      el.style["cursor"] = "help"
    }
    el.onmouseenter = function () {
      var description = el.getAttribute(field)
      var parent = el.parentElement
      var position = {left: parent.offsetLeft, top: parent.offsetTop}
      var width = Math.min(options.width || 100, position.left)
      if (width < 60 || !description) return
      marginTooltip.style.position = "absolute"
      marginTooltip.style["border-right"] = "solid 2px #337ab7"
      marginTooltip.style["font-size"] = "13px"
      marginTooltip.style["text-align"] = "right"
      marginTooltip.style["padding-right"] = "7px"
      marginTooltip.style.top = String(position.top) + "px"
      marginTooltip.style.left = String(position.left - width - 5) + "px"
      marginTooltip.style["min-height"] = String(parent.clientHeight) + "px"
      marginTooltip.style.display = "block"
      marginTooltip.style.width = String(width) + "px"
      marginTooltip.textContent = description
      fader.stop()
      fader.fadeIn(marginTooltip, 100)
    }
    el.onmouseleave = function () {
      fader.stop()
      fader.fadeOut(marginTooltip, 100)
    }
  })
}

/* Helpers (http://youmightnotneedjquery.com/) */
var Fader = function() {}

Fader.prototype.fadeIn = function(el, duration) {
  el.style.opacity = 0;
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity + (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity < 1) {
      this.animationId = (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

Fader.prototype.fadeOut = function(el, duration) {
  var last = +new Date();
  var tick = function() {
    el.style.opacity = +el.style.opacity - (new Date() - last) / duration;
    last = +new Date();

    if (+el.style.opacity > 0) {
      this.animationId = (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    }
  };

  tick();
}

Fader.prototype.stop = function() {
  (window.cancelAnimationFrame && window.cancelAnimationFrame(this.animationId)) || clearTimeout(this.animationId);
}
