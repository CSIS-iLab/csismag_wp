/*	-----------------------------------------------------------------------------------------------
	Namespace
--------------------------------------------------------------------------------------------------- */

var csismag = csismag || {}

// Set a default value for scrolled.
csismag.scrolled = 0

// polyfill closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this

    do {
      if (el.matches(s)) {
        return el
      }

      el = el.parentElement || el.parentNode
    } while (el !== null && el.nodeType === 1)

    return null
  }
}

// polyfill forEach
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    var i
    var len = this.length

    thisArg = thisArg || window

    for (i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this)
    }
  }
}

// event "polyfill"
csismag.createEvent = function (eventName) {
  var event
  if (typeof window.Event === 'function') {
    event = new Event(eventName)
  } else {
    event = document.createEvent('Event')
    event.initEvent(eventName, true, false)
  }
  return event
}

// matches "polyfill"
// https://developer.mozilla.org/es/docs/Web/API/Element/matches
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.msMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
}

// Add a class to the body for when touch is enabled for browsers that don't support media queries
// for interaction media features. Adapted from <https://codepen.io/Ferie/pen/vQOMmO>
csismag.touchEnabled = {
  init: function () {
    var matchMedia = function () {
      // Include the 'heartz' as a way to have a non matching MQ to help terminate the join. See <https://git.io/vznFH>.
      var prefixes = ['-webkit-', '-moz-', '-o-', '-ms-']
      var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join(
        ''
      )
      return window.matchMedia && window.matchMedia(query).matches
    }

    if (
      'ontouchstart' in window ||
      (window.DocumentTouch && document instanceof window.DocumentTouch) ||
      matchMedia()
    ) {
      document.body.classList.add('touch-enabled')
    }
  },
} // csismag.touchEnabled

/**
 * Is the DOM ready
 *
 * this implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */
function csismagDomReady(fn) {
  if (typeof fn !== 'function') {
    return
  }

  if (
    document.readyState === 'interactive' ||
    document.readyState === 'complete'
  ) {
    return fn()
  }

  document.addEventListener('DOMContentLoaded', fn, false)
}

csismagDomReady(function () {
  csismag.touchEnabled.init() // Add class to body if device is touch-enabled
})
