"use strict";

/* global Color */

/* eslint no-unused-vars: off */

/**
 * Color Calculations.
 *
 * @since 1.0.0
 *
 * @param {string} backgroundColor - The background color.
 * @param {number} accentHue - The hue for our accent color.
 *
 * @return {Object} - this
 */
function _twentyTwentyColor(backgroundColor, accentHue) {
  // Set the object properties.
  this.backgroundColor = backgroundColor;
  this.accentHue = accentHue;
  this.bgColorObj = new Color(backgroundColor);
  this.textColorObj = this.bgColorObj.getMaxContrastColor();
  this.textColor = this.textColorObj.toCSS();
  this.isDark = 0.5 > this.bgColorObj.toLuminosity();
  this.isLight = !this.isDark; // Return the object.

  return this;
}
/**
 * Builds an array of Color objects based on the accent hue.
 * For improved performance we only build half the array
 * depending on dark/light background-color.
 *
 * @since 1.0.0
 *
 * @return {Object} - this
 */


_twentyTwentyColor.prototype.setAccentColorsArray = function () {
  var self = this,
      minSaturation = 65,
      maxSaturation = 100,
      minLightness = 30,
      maxLightness = 80,
      stepSaturation = 2,
      stepLightness = 2,
      pushColor = function pushColor() {
    var colorObj = new Color({
      h: self.accentHue,
      s: s,
      l: l
    }),
        item,

    /**
     * Get a score for this color in contrast to its background color and surrounding text.
     *
     * @since 1.0.0
     * @param {number} contrastBackground - WCAG contrast with the background color.
     * @param {number} contrastSurroundingText - WCAG contrast with surrounding text.
     * @return {number} - 0 is best, higher numbers have bigger difference with the desired scores.
     */
    getScore = function getScore(contrastBackground, contrastSurroundingText) {
      var diffBackground = 7 >= contrastBackground ? 0 : 7 - contrastBackground,
          diffSurroundingText = 3 >= contrastSurroundingText ? 0 : 3 - contrastSurroundingText;
      return diffBackground + diffSurroundingText;
    };

    item = {
      color: colorObj,
      contrastBackground: colorObj.getDistanceLuminosityFrom(self.bgColorObj),
      contrastText: colorObj.getDistanceLuminosityFrom(self.textColorObj)
    }; // Check a minimum of 4.5:1 contrast with the background and 3:1 with surrounding text.

    if (4.5 > item.contrastBackground || 3 > item.contrastText) {
      return;
    } // Get a score for this color by multiplying the 2 contrasts.
    // We'll use that to sort the array.


    item.score = getScore(item.contrastBackground, item.contrastText);
    self.accentColorsArray.push(item);
  },
      s,
      l,
      aaa;

  this.accentColorsArray = []; // We're using `for` loops here because they perform marginally better than other loops.

  for (s = minSaturation; s <= maxSaturation; s += stepSaturation) {
    for (l = minLightness; l <= maxLightness; l += stepLightness) {
      pushColor(s, l);
    }
  } // Check if we have colors that are AAA compliant.


  aaa = this.accentColorsArray.filter(function (color) {
    return 7 <= color.contrastBackground;
  }); // If we have AAA-compliant colors, always prefer them.

  if (aaa.length) {
    this.accentColorsArray = aaa;
  } // Sort colors by contrast.


  this.accentColorsArray.sort(function (a, b) {
    return a.score - b.score;
  });
  return this;
};
/**
 * Get accessible text-color.
 *
 * @since 1.0.0
 *
 * @return {Color} - Returns a Color object.
 */


_twentyTwentyColor.prototype.getTextColor = function () {
  return this.textColor;
};
/**
 * Get accessible color for the defined accent-hue and background-color.
 *
 * @since 1.0.0
 *
 * @return {Color} - Returns a Color object.
 */


_twentyTwentyColor.prototype.getAccentColor = function () {
  var fallback; // If we have colors returns the 1st one - it has the highest score.

  if (this.accentColorsArray[0]) {
    return this.accentColorsArray[0].color;
  } // Fallback.


  fallback = new Color('hsl(' + this.accentHue + ',75%,50%)');
  return fallback.getReadableContrastingColor(this.bgColorObj, 4.5);
};
/**
 * Return a new instance of the _twentyTwentyColor object.
 *
 * @since 1.0.0
 * @param {string} backgroundColor - The background color.
 * @param {number} accentHue - The hue for our accent color.
 * @return {Object} - this
 */


function twentyTwentyColor(backgroundColor, accentHue) {
  // jshint ignore:line
  var color = new _twentyTwentyColor(backgroundColor, accentHue);
  color.setAccentColorsArray();
  return color;
}
"use strict";

/* global twentyTwentyBgColors, twentyTwentyColor, jQuery, wp, _ */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains extra logic for our Customizer controls & settings.
 *
 * @since 1.0.0
 */
(function () {
  // Wait until the customizer has finished loading.
  wp.customize.bind('ready', function () {
    // Add a listener for accent-color changes.
    wp.customize('accent_hue', function (value) {
      value.bind(function (to) {
        // Update the value for our accessible colors for all areas.
        Object.keys(twentyTwentyBgColors).forEach(function (context) {
          var backgroundColorValue;

          if (twentyTwentyBgColors[context].color) {
            backgroundColorValue = twentyTwentyBgColors[context].color;
          } else {
            backgroundColorValue = wp.customize(twentyTwentyBgColors[context].setting).get();
          }

          twentyTwentySetAccessibleColorsValue(context, backgroundColorValue, to);
        });
      });
    }); // Add a listener for background-color changes.

    Object.keys(twentyTwentyBgColors).forEach(function (context) {
      wp.customize(twentyTwentyBgColors[context].setting, function (value) {
        value.bind(function (to) {
          // Update the value for our accessible colors for this area.
          twentyTwentySetAccessibleColorsValue(context, to, wp.customize('accent_hue').get(), to);
        });
      });
    });
  });
  /**
   * Updates the value of the "accent_accessible_colors" setting.
   *
   * @since 1.0.0
   *
   * @param {string} context The area for which we want to get colors. Can be for example "content", "header" etc.
   * @param {string} backgroundColor The background color (HEX value).
   * @param {number} accentHue Numeric representation of the selected hue (0 - 359).
   *
   * @return {void}
   */

  function twentyTwentySetAccessibleColorsValue(context, backgroundColor, accentHue) {
    var value, colors; // Get the current value for our accessible colors, and make sure it's an object.

    value = wp.customize('accent_accessible_colors').get();
    value = _.isObject(value) && !_.isArray(value) ? value : {}; // Get accessible colors for the defined background-color and hue.

    colors = twentyTwentyColor(backgroundColor, accentHue); // Sanity check.

    if (colors.getAccentColor() && 'function' === typeof colors.getAccentColor().toCSS) {
      // Update the value for this context.
      value[context] = {
        text: colors.getTextColor(),
        accent: colors.getAccentColor().toCSS(),
        background: backgroundColor
      }; // Get borders color.

      value[context].borders = colors.bgColorObj.clone().getReadableContrastingColor(colors.bgColorObj, 1.36).toCSS(); // Get secondary color.

      value[context].secondary = colors.bgColorObj.clone().getReadableContrastingColor(colors.bgColorObj).s(colors.bgColorObj.s() / 2).toCSS();
    } // Change the value.


    wp.customize('accent_accessible_colors').set(value); // Small hack to save the option.

    wp.customize('accent_accessible_colors')._dirty = true;
  }
})(jQuery);
"use strict";

/* global twentyTwentyBgColors, twentyTwentyPreviewEls, jQuery, _, wp */

/**
 * Customizer enhancements for a better user experience.
 *
 * Contains handlers to make Theme Customizer preview reload changes asynchronously.
 *
 * @since 1.0.0
 */
(function ($, api, _) {
  /**
   * Return a value for our partial refresh.
   *
   * @param {Object} partial  Current partial.
   *
   * @return {jQuery.Promise} Resolved promise.
   */
  function returnDeferred(partial) {
    var deferred = new $.Deferred();
    deferred.resolveWith(partial, _.map(partial.placements(), function () {
      return "";
    }));
    return deferred.promise();
  } // Selective refresh for "Fixed Background Image"


  api.selectiveRefresh.partialConstructor.cover_fixed = api.selectiveRefresh.Partial.extend({
    /**
     * Override the refresh method
     *
     * @return {jQuery.Promise} Resolved promise.
     */
    refresh: function refresh() {
      var partial, cover, params;
      partial = this;
      params = partial.params;
      cover = $(params.selector);

      if (cover.length && cover.hasClass("bg-image")) {
        cover.toggleClass("bg-attachment-fixed");
      }

      return returnDeferred(partial);
    }
  }); // Selective refresh for "Image Overlay Opacity"

  api.selectiveRefresh.partialConstructor.cover_opacity = api.selectiveRefresh.Partial.extend({
    /**
     * Input attributes.
     *
     * @type {Object}
     */
    attrs: {},

    /**
     * Override the refresh method
     *
     * @return {jQuery.Promise} Resolved promise.
     */
    refresh: function refresh() {
      var partial, ranges, attrs, setting, params, cover, className, classNames;
      partial = this;
      attrs = partial.attrs;
      ranges = _.range(attrs.min, attrs.max + attrs.step, attrs.step);
      params = partial.params;
      setting = api(params.primarySetting);
      cover = $(params.selector);

      if (cover.length) {
        classNames = _.map(ranges, function (val) {
          return "opacity-" + val;
        });
        className = classNames[ranges.indexOf(parseInt(setting.get(), 10))];
        cover.removeClass(classNames.join(" "));
        cover.addClass(className);
      }

      return returnDeferred(partial);
    }
  }); // Add listener for the "header_footer_background_color" control.

  api("header_footer_background_color", function (value) {
    value.bind(function (to) {
      // Add background color to header and footer wrappers.
      $("body:not(.overlay-header)#site-header, #site-footer").css("background-color", to); // Change body classes if this is the same background-color as the content background.

      if (to.toLowerCase() === api("background_color").get().toLowerCase()) {
        $("body").addClass("reduced-spacing");
      } else {
        $("body").removeClass("reduced-spacing");
      }
    });
  }); // Add listener for the "background_color" control.

  api("background_color", function (value) {
    value.bind(function (to) {
      // Change body classes if this is the same background-color as the header/footer background.
      if (to.toLowerCase() === api("header_footer_background_color").get().toLowerCase()) {
        $("body").addClass("reduced-spacing");
      } else {
        $("body").removeClass("reduced-spacing");
      }
    });
  }); // Add listener for the accent color.

  api("accent_hue", function (value) {
    value.bind(function () {
      // Generate the styles.
      // Add a small delay to be sure the accessible colors were generated.
      setTimeout(function () {
        Object.keys(twentyTwentyBgColors).forEach(function (context) {
          twentyTwentyGenerateColorA11yPreviewStyles(context);
        });
      }, 50);
    });
  }); // Add listeners for background-color settings.

  Object.keys(twentyTwentyBgColors).forEach(function (context) {
    wp.customize(twentyTwentyBgColors[context].setting, function (value) {
      value.bind(function () {
        // Generate the styles.
        // Add a small delay to be sure the accessible colors were generated.
        setTimeout(function () {
          twentyTwentyGenerateColorA11yPreviewStyles(context);
        }, 50);
      });
    });
  });
  /**
   * Add styles to elements in the preview pane.
   *
   * @since 1.0.0
   *
   * @param {string} context The area for which we want to generate styles. Can be for example "content", "header" etc.
   *
   * @return {void}
   */

  function twentyTwentyGenerateColorA11yPreviewStyles(context) {
    // Get the accessible colors option.
    var a11yColors = window.parent.wp.customize("accent_accessible_colors").get(),
        stylesheedID = "csismag-customizer-styles-" + context,
        stylesheet = $("#" + stylesheedID),
        styles = ""; // If the stylesheet doesn't exist, create it and append it to <head>.

    if (!stylesheet.length) {
      $("#csismag-style-inline-css").after('<style id="' + stylesheedID + '"></style>');
      stylesheet = $("#" + stylesheedID);
    }

    if (!_.isUndefined(a11yColors[context])) {
      // Check if we have elements defined.
      if (twentyTwentyPreviewEls[context]) {
        _.each(twentyTwentyPreviewEls[context], function (items, setting) {
          _.each(items, function (elements, property) {
            if (!_.isUndefined(a11yColors[context][setting])) {
              styles += elements.join(",") + "{" + property + ":" + a11yColors[context][setting] + ";}";
            }
          });
        });
      }
    } // Add styles.


    stylesheet.html(styles);
  } // Generate styles on load. Handles page-changes on the preview pane.


  $(document).ready(function () {
    twentyTwentyGenerateColorA11yPreviewStyles("content");
    twentyTwentyGenerateColorA11yPreviewStyles("header-footer");
  });
})(jQuery, wp.customize, _);
"use strict";

/* global wp, jQuery */
(function ($, api) {
  $(document).ready(function () {
    // Make it possible to reset the color based on a radio input's value.
    // `active` can be either `custom` or `default`.
    api.control('accent_hue_active').setting.bind(function (active) {
      var control = api.control('accent_hue'); // Get the accent hue control.

      if ('custom' === active) {
        // Activate the hue color picker control and focus it.
        control.activate({
          completeCallback: function completeCallback() {
            control.focus();
          }
        });
      } else {
        // If the `custom` option isn't selected, deactivate the hue color picker and set a default.
        control.deactivate({
          completeCallback: function completeCallback() {
            control.setting.set(control.params.defaultValue);
          }
        });
      }
    });
  });
})(jQuery, wp.customize);
"use strict";

/**
 * Remove squared button style
 *
 * @since 1.0.0
 */

/* global wp */
wp.domReady(function () {
  wp.blocks.unregisterBlockStyle('core/button', 'squared');
});
"use strict";

/*	-----------------------------------------------------------------------------------------------
	Namespace
--------------------------------------------------------------------------------------------------- */
var csismag = csismag || {}; // Set a default value for scrolled.

csismag.scrolled = 0; // polyfill closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (el.matches(s)) {
        return el;
      }

      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);

    return null;
  };
} // polyfill forEach
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill


if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    var i;
    var len = this.length;
    thisArg = thisArg || window;

    for (i = 0; i < len; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // event "polyfill"


csismag.createEvent = function (eventName) {
  var event;

  if (typeof window.Event === "function") {
    event = new Event(eventName);
  } else {
    event = document.createEvent("Event");
    event.initEvent(eventName, true, false);
  }

  return event;
}; // matches "polyfill"
// https://developer.mozilla.org/es/docs/Web/API/Element/matches


if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;

    while (--i >= 0 && matches.item(i) !== this) {}

    return i > -1;
  };
} // Add a class to the body for when touch is enabled for browsers that don't support media queries
// for interaction media features. Adapted from <https://codepen.io/Ferie/pen/vQOMmO>


csismag.touchEnabled = {
  init: function init() {
    var matchMedia = function matchMedia() {
      // Include the 'heartz' as a way to have a non matching MQ to help terminate the join. See <https://git.io/vznFH>.
      var prefixes = ["-webkit-", "-moz-", "-o-", "-ms-"];
      var query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join("");
      return window.matchMedia && window.matchMedia(query).matches;
    };

    if ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || matchMedia()) {
      document.body.classList.add("touch-enabled");
    }
  }
}; // csismag.touchEnabled

/*	-----------------------------------------------------------------------------------------------
	Cover Modals
--------------------------------------------------------------------------------------------------- */

csismag.coverModals = {
  init: function init() {
    if (document.querySelector(".cover-modal")) {
      // Handle cover modals when they're toggled
      this.onToggle(); // When toggled, untoggle if visitor clicks on the wrapping element of the modal

      this.outsideUntoggle(); // Close on escape key press

      this.closeOnEscape(); // Hide and show modals before and after their animations have played out

      this.hideAndShowModals();
    }
  },
  // Handle cover modals when they're toggled
  onToggle: function onToggle() {
    document.querySelectorAll(".cover-modal").forEach(function (element) {
      element.addEventListener("toggled", function (event) {
        var modal = event.target,
            body = document.body;

        if (modal.classList.contains("active")) {
          body.classList.add("showing-modal");
        } else {
          body.classList.remove("showing-modal");
          body.classList.add("hiding-modal"); // Remove the hiding class after a delay, when animations have been run

          setTimeout(function () {
            body.classList.remove("hiding-modal");
          }, 500);
        }
      });
    });
  },
  // Close modal on outside click
  outsideUntoggle: function outsideUntoggle() {
    document.addEventListener("click", function (event) {
      var target = event.target;
      var modal = document.querySelector(".cover-modal.active");

      if (target === modal) {
        this.untoggleModal(target);
      }
    }.bind(this));
  },
  // Close modal on escape key press
  closeOnEscape: function closeOnEscape() {
    document.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        event.preventDefault();
        document.querySelectorAll(".cover-modal.active").forEach(function (element) {
          this.untoggleModal(element);
        }.bind(this));
      }
    }.bind(this));
  },
  // Hide and show modals before and after their animations have played out
  hideAndShowModals: function hideAndShowModals() {
    var _doc = document,
        _win = window,
        modals = _doc.querySelectorAll(".cover-modal"),
        htmlStyle = _doc.documentElement.style,
        adminBar = _doc.querySelector("#wpadminbar");

    function getAdminBarHeight(negativeValue) {
      var height,
          currentScroll = _win.pageYOffset;

      if (adminBar) {
        height = currentScroll + adminBar.getBoundingClientRect().height;
        return negativeValue ? -height : height;
      }

      return currentScroll === 0 ? 0 : -currentScroll;
    }

    function htmlStyles() {
      var overflow = _win.innerHeight > _doc.documentElement.getBoundingClientRect().height;

      return {
        "overflow-y": overflow ? "hidden" : "scroll",
        position: "fixed",
        width: "100%",
        top: getAdminBarHeight(true) + "px",
        left: 0
      };
    } // Show the modal


    modals.forEach(function (modal) {
      modal.addEventListener("toggle-target-before-inactive", function (event) {
        var styles = htmlStyles(),
            offsetY = _win.pageYOffset,
            paddingTop = Math.abs(getAdminBarHeight()) - offsetY + "px",
            mQuery = _win.matchMedia("(max-width: 600px)");

        if (event.target !== modal) {
          return;
        }

        Object.keys(styles).forEach(function (styleKey) {
          htmlStyle.setProperty(styleKey, styles[styleKey]);
        });
        _win.csismag.scrolled = parseInt(styles.top, 10);

        if (adminBar) {
          _doc.body.style.setProperty("padding-top", paddingTop);

          if (mQuery.matches) {
            if (offsetY >= getAdminBarHeight()) {
              modal.style.setProperty("top", 0);
            } else {
              modal.style.setProperty("top", getAdminBarHeight() - offsetY + "px");
            }
          }
        }

        modal.classList.add("show-modal");
      }); // Hide the modal after a delay, so animations have time to play out

      modal.addEventListener("toggle-target-after-inactive", function (event) {
        if (event.target !== modal) {
          return;
        }

        setTimeout(function () {
          var clickedEl = csismag.toggles.clickedEl;
          modal.classList.remove("show-modal");
          Object.keys(htmlStyles()).forEach(function (styleKey) {
            htmlStyle.removeProperty(styleKey);
          });

          if (adminBar) {
            _doc.body.style.removeProperty("padding-top");

            modal.style.removeProperty("top");
          }

          if (clickedEl !== false) {
            clickedEl.focus();
            clickedEl = false;
          }

          _win.scrollTo(0, Math.abs(_win.csismag.scrolled + getAdminBarHeight()));

          _win.csismag.scrolled = 0;
        }, 500);
      });
    });
  },
  // Untoggle a modal
  untoggleModal: function untoggleModal(modal) {
    var modalTargetClass,
        modalToggle = false; // If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string
    // The modal-target-string must match the string toggles use to target the modal

    if (modal.dataset.modalTargetString) {
      modalTargetClass = modal.dataset.modalTargetString;
      modalToggle = document.querySelector('*[data-toggle-target="' + modalTargetClass + '"]');
    } // If a modal toggle exists, trigger it so all of the toggle options are included


    if (modalToggle) {
      modalToggle.click(); // If one doesn't exist, just hide the modal
    } else {
      modal.classList.remove("active");
    }
  }
}; // csismag.coverModals

/*	-----------------------------------------------------------------------------------------------
	Intrinsic Ratio Embeds
--------------------------------------------------------------------------------------------------- */

csismag.intrinsicRatioVideos = {
  init: function init() {
    this.makeFit();
    window.addEventListener("resize", function () {
      this.makeFit();
    }.bind(this));
  },
  makeFit: function makeFit() {
    document.querySelectorAll("iframe, object, video").forEach(function (video) {
      var ratio,
          iTargetWidth,
          container = video.parentNode; // Skip videos we want to ignore

      if (video.classList.contains("intrinsic-ignore") || video.parentNode.classList.contains("intrinsic-ignore")) {
        return true;
      }

      if (!video.dataset.origwidth) {
        // Get the video element proportions
        video.setAttribute("data-origwidth", video.width);
        video.setAttribute("data-origheight", video.height);
      }

      iTargetWidth = container.offsetWidth; // Get ratio from proportions

      ratio = iTargetWidth / video.dataset.origwidth; // Scale based on ratio, thus retaining proportions

      video.style.width = iTargetWidth + "px";
      video.style.height = video.dataset.origheight * ratio + "px";
    });
  }
}; // csismag.instrinsicRatioVideos

/*	-----------------------------------------------------------------------------------------------
	Modal Menu
--------------------------------------------------------------------------------------------------- */

csismag.modalMenu = {
  init: function init() {
    // If the current menu item is in a sub level, expand all the levels higher up on load
    this.expandLevel();
    this.keepFocusInModal();
  },
  expandLevel: function expandLevel() {
    var modalMenus = document.querySelectorAll(".modal-menu");
    modalMenus.forEach(function (modalMenu) {
      var activeMenuItem = modalMenu.querySelector(".current-menu-item");

      if (activeMenuItem) {
        csismagFindParents(activeMenuItem, "li").forEach(function (element) {
          var subMenuToggle = element.querySelector(".sub-menu-toggle");

          if (subMenuToggle) {
            csismag.toggles.performToggle(subMenuToggle, true);
          }
        });
      }
    });
  },
  keepFocusInModal: function keepFocusInModal() {
    var _doc = document;

    _doc.addEventListener("keydown", function (event) {
      var toggleTarget,
          modal,
          selectors,
          elements,
          menuType,
          bottomMenu,
          activeEl,
          lastEl,
          firstEl,
          tabKey,
          shiftKey,
          clickedEl = csismag.toggles.clickedEl;

      if (clickedEl && _doc.body.classList.contains("showing-modal")) {
        toggleTarget = clickedEl.dataset.toggleTarget;
        selectors = "input, a, button";
        modal = _doc.querySelector(toggleTarget);
        elements = modal.querySelectorAll(selectors);
        elements = Array.prototype.slice.call(elements);

        if (".menu-modal" === toggleTarget) {
          menuType = window.matchMedia("(min-width: 1000px)").matches;
          menuType = menuType ? ".expanded-menu" : ".mobile-menu";
          elements = elements.filter(function (element) {
            return null !== element.closest(menuType) && null !== element.offsetParent;
          });
          elements.unshift(_doc.querySelector(".close-nav-toggle"));
          bottomMenu = _doc.querySelector(".menu-bottom > nav");

          if (bottomMenu) {
            bottomMenu.querySelectorAll(selectors).forEach(function (element) {
              elements.push(element);
            });
          }
        }

        lastEl = elements[elements.length - 1];
        firstEl = elements[0];
        activeEl = _doc.activeElement;
        tabKey = event.keyCode === 9;
        shiftKey = event.shiftKey;

        if (!shiftKey && tabKey && lastEl === activeEl) {
          event.preventDefault();
          firstEl.focus();
        }

        if (shiftKey && tabKey && firstEl === activeEl) {
          event.preventDefault();
          lastEl.focus();
        }
      }
    });
  }
}; // csismag.modalMenu

/*	-----------------------------------------------------------------------------------------------
	Primary Menu
--------------------------------------------------------------------------------------------------- */

csismag.primaryMenu = {
  init: function init() {
    this.focusMenuWithChildren();
  },
  // The focusMenuWithChildren() function implements Keyboard Navigation in the Primary Menu
  // by adding the '.focus' class to all 'li.menu-item-has-children' when the focus is on the 'a' element.
  focusMenuWithChildren: function focusMenuWithChildren() {
    // Get all the link elements within the primary menu.
    var links,
        i,
        len,
        menu = document.querySelector(".primary-menu-wrapper");

    if (!menu) {
      return false;
    }

    links = menu.getElementsByTagName("a"); // Each time a menu link is focused or blurred, toggle focus.

    for (i = 0, len = links.length; i < len; i++) {
      links[i].addEventListener("focus", toggleFocus, true);
      links[i].addEventListener("blur", toggleFocus, true);
    } //Sets or removes the .focus class on an element.


    function toggleFocus() {
      var self = this; // Move up through the ancestors of the current link until we hit .primary-menu.

      while (-1 === self.className.indexOf("primary-menu")) {
        // On li elements toggle the class .focus.
        if ("li" === self.tagName.toLowerCase()) {
          if (-1 !== self.className.indexOf("focus")) {
            self.className = self.className.replace(" focus", "");
          } else {
            self.className += " focus";
          }
        }

        self = self.parentElement;
      }
    }
  }
}; // csismag.primaryMenu

/*	-----------------------------------------------------------------------------------------------
	Toggles
--------------------------------------------------------------------------------------------------- */

csismag.toggles = {
  clickedEl: false,
  init: function init() {
    // Do the toggle
    this.toggle(); // Check for toggle/untoggle on resize

    this.resizeCheck(); // Check for untoggle on escape key press

    this.untoggleOnEscapeKeyPress();
  },
  performToggle: function performToggle(element, instantly) {
    var target,
        timeOutTime,
        classToToggle,
        self = this,
        _doc = document,
        // Get our targets
    toggle = element,
        targetString = toggle.dataset.toggleTarget,
        activeClass = "active"; // Elements to focus after modals are closed

    if (!_doc.querySelectorAll(".show-modal").length) {
      self.clickedEl = _doc.activeElement;
    }

    if (targetString === "next") {
      target = toggle.nextSibling;
    } else {
      target = _doc.querySelector(targetString);
    } // Trigger events on the toggle targets before they are toggled


    if (target.classList.contains(activeClass)) {
      target.dispatchEvent(csismag.createEvent("toggle-target-before-active"));
    } else {
      target.dispatchEvent(csismag.createEvent("toggle-target-before-inactive"));
    } // Get the class to toggle, if specified


    classToToggle = toggle.dataset.classToToggle ? toggle.dataset.classToToggle : activeClass; // For cover modals, set a short timeout duration so the class animations have time to play out

    timeOutTime = 0;

    if (target.classList.contains("cover-modal")) {
      timeOutTime = 10;
    }

    setTimeout(function () {
      var focusElement,
          subMenued = target.classList.contains("sub-menu"),
          newTarget = subMenued ? toggle.closest(".menu-item").querySelector(".sub-menu") : target,
          duration = toggle.dataset.toggleDuration; // Toggle the target of the clicked toggle

      if (toggle.dataset.toggleType === "slidetoggle" && !instantly && duration !== "0") {
        csismagMenuToggle(newTarget, duration);
      } else {
        newTarget.classList.toggle(classToToggle);
      } // If the toggle target is 'next', only give the clicked toggle the active class


      if (targetString === "next") {
        toggle.classList.toggle(activeClass);
      } else if (target.classList.contains("sub-menu")) {
        toggle.classList.toggle(activeClass);
      } else {
        // If not, toggle all toggles with this toggle target
        _doc.querySelector('*[data-toggle-target="' + targetString + '"]').classList.toggle(activeClass);
      } // Toggle aria-expanded on the toggle


      csismagToggleAttribute(toggle, "aria-expanded", "true", "false");

      if (self.clickedEl && -1 !== toggle.getAttribute("class").indexOf("close-")) {
        csismagToggleAttribute(self.clickedEl, "aria-expanded", "true", "false");
      } // Toggle body class


      if (toggle.dataset.toggleBodyClass) {
        _doc.body.classList.toggle(toggle.dataset.toggleBodyClass);
      } // Check whether to set focus


      if (toggle.dataset.setFocus) {
        focusElement = _doc.querySelector(toggle.dataset.setFocus);

        if (focusElement) {
          if (target.classList.contains(activeClass)) {
            focusElement.focus();
          } else {
            focusElement.blur();
          }
        }
      } // Trigger the toggled event on the toggle target


      target.dispatchEvent(csismag.createEvent("toggled")); // Trigger events on the toggle targets after they are toggled

      if (target.classList.contains(activeClass)) {
        target.dispatchEvent(csismag.createEvent("toggle-target-after-active"));
      } else {
        target.dispatchEvent(csismag.createEvent("toggle-target-after-inactive"));
      }
    }, timeOutTime);
  },
  // Do the toggle
  toggle: function toggle() {
    var self = this;
    document.querySelectorAll("*[data-toggle-target]").forEach(function (element) {
      element.addEventListener("click", function (event) {
        event.preventDefault();
        self.performToggle(element);
      });
    });
  },
  // Check for toggle/untoggle on screen resize
  resizeCheck: function resizeCheck() {
    if (document.querySelectorAll("*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]").length) {
      window.addEventListener("resize", function () {
        var winWidth = window.innerWidth,
            toggles = document.querySelectorAll(".toggle");
        toggles.forEach(function (toggle) {
          var unToggleAbove = toggle.dataset.untoggleAbove,
              unToggleBelow = toggle.dataset.untoggleBelow,
              toggleAbove = toggle.dataset.toggleAbove,
              toggleBelow = toggle.dataset.toggleBelow; // If no width comparison is set, continue

          if (!unToggleAbove && !unToggleBelow && !toggleAbove && !toggleBelow) {
            return;
          } // If the toggle width comparison is true, toggle the toggle


          if ((unToggleAbove && winWidth > unToggleAbove || unToggleBelow && winWidth < unToggleBelow) && toggle.classList.contains("active") || (toggleAbove && winWidth > toggleAbove || toggleBelow && winWidth < toggleBelow) && !toggle.classList.contains("active")) {
            toggle.click();
          }
        });
      });
    }
  },
  // Close toggle on escape key press
  untoggleOnEscapeKeyPress: function untoggleOnEscapeKeyPress() {
    document.addEventListener("keyup", function (event) {
      if (event.key === "Escape") {
        document.querySelectorAll("*[data-untoggle-on-escape].active").forEach(function (element) {
          if (element.classList.contains("active")) {
            element.click();
          }
        });
      }
    });
  }
}; // csismag.toggles

/**
 * Is the DOM ready
 *
 * this implementation is coming from https://gomakethings.com/a-native-javascript-equivalent-of-jquerys-ready-method/
 *
 * @param {Function} fn Callback function to run.
 */

function csismagDomReady(fn) {
  if (typeof fn !== "function") {
    return;
  }

  if (document.readyState === "interactive" || document.readyState === "complete") {
    return fn();
  }

  document.addEventListener("DOMContentLoaded", fn, false);
}

csismagDomReady(function () {
  csismag.toggles.init(); // Handle toggles

  csismag.coverModals.init(); // Handle cover modals

  csismag.intrinsicRatioVideos.init(); // Retain aspect ratio of videos on window resize

  csismag.modalMenu.init(); // Modal Menu

  csismag.primaryMenu.init(); // Primary Menu

  csismag.touchEnabled.init(); // Add class to body if device is touch-enabled
});
/*	-----------------------------------------------------------------------------------------------
	Helper functions
--------------------------------------------------------------------------------------------------- */

/* Toggle an attribute ----------------------- */

function csismagToggleAttribute(element, attribute, trueVal, falseVal) {
  if (trueVal === undefined) {
    trueVal = true;
  }

  if (falseVal === undefined) {
    falseVal = false;
  }

  if (element.getAttribute(attribute) !== trueVal) {
    element.setAttribute(attribute, trueVal);
  } else {
    element.setAttribute(attribute, falseVal);
  }
}
/**
 * Toggle a menu item on or off.
 *
 * @param {HTMLElement} target
 * @param {number} duration
 */


function csismagMenuToggle(target, duration) {
  var initialParentHeight,
      finalParentHeight,
      menu,
      menuItems,
      _transitionListener,
      initialPositions = [],
      finalPositions = [];

  if (!target) {
    return;
  }

  menu = target.closest(".menu-wrapper"); // Step 1: look at the initial positions of every menu item.

  menuItems = menu.querySelectorAll(".menu-item");
  menuItems.forEach(function (menuItem, index) {
    initialPositions[index] = {
      x: menuItem.offsetLeft,
      y: menuItem.offsetTop
    };
  });
  initialParentHeight = target.parentElement.offsetHeight;
  target.classList.add("toggling-target"); // Step 2: toggle target menu item and look at the final positions of every menu item.

  target.classList.toggle("active");
  menuItems.forEach(function (menuItem, index) {
    finalPositions[index] = {
      x: menuItem.offsetLeft,
      y: menuItem.offsetTop
    };
  });
  finalParentHeight = target.parentElement.offsetHeight; // Step 3: close target menu item again.
  // The whole process happens without giving the browser a chance to render, so it's invisible.

  target.classList.toggle("active"); // Step 4: prepare animation.
  // Position all the items with absolute offsets, at the same starting position.
  // Shouldn't result in any visual changes if done right.

  menu.classList.add("is-toggling");
  target.classList.toggle("active");
  menuItems.forEach(function (menuItem, index) {
    var initialPosition = initialPositions[index];

    if (initialPosition.y === 0 && menuItem.parentElement === target) {
      initialPosition.y = initialParentHeight;
    }

    menuItem.style.transform = "translate(" + initialPosition.x + "px, " + initialPosition.y + "px)";
  }); // The double rAF is unfortunately needed, since we're toggling CSS classes, and
  // the only way to ensure layout completion here across browsers is to wait twice.
  // This just delays the start of the animation by 2 frames and is thus not an issue.

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      // Step 5: start animation by moving everything to final position.
      // All the layout work has already happened, while we were preparing for the animation.
      // The animation now runs entirely in CSS, using cheap CSS properties (opacity and transform)
      // that don't trigger the layout or paint stages.
      menu.classList.add("is-animating");
      menuItems.forEach(function (menuItem, index) {
        var finalPosition = finalPositions[index];

        if (finalPosition.y === 0 && menuItem.parentElement === target) {
          finalPosition.y = finalParentHeight;
        }

        if (duration !== undefined) {
          menuItem.style.transitionDuration = duration + "ms";
        }

        menuItem.style.transform = "translate(" + finalPosition.x + "px, " + finalPosition.y + "px)";
      });

      if (duration !== undefined) {
        target.style.transitionDuration = duration + "ms";
      }
    }); // Step 6: finish toggling.
    // Remove all transient classes when the animation ends.

    _transitionListener = function transitionListener() {
      menu.classList.remove("is-animating");
      menu.classList.remove("is-toggling");
      target.classList.remove("toggling-target");
      menuItems.forEach(function (menuItem) {
        menuItem.style.transform = "";
        menuItem.style.transitionDuration = "";
      });
      target.style.transitionDuration = "";
      target.removeEventListener("transitionend", _transitionListener);
    };

    target.addEventListener("transitionend", _transitionListener);
  });
}
/**
 * traverses the DOM up to find elements matching the query
 *
 * @param {HTMLElement} target
 * @param {string} query
 * @return {NodeList} parents matching query
 */


function csismagFindParents(target, query) {
  var parents = []; // recursively go up the DOM adding matches to the parents array

  function traverse(item) {
    var parent = item.parentNode;

    if (parent instanceof HTMLElement) {
      if (parent.matches(query)) {
        parents.push(parent);
      }

      traverse(parent);
    }
  }

  traverse(target);
  return parents;
}
"use strict";

/**
 * File skip-link-focus-fix.js.
 *
 * Helps with accessibility for keyboard only users.
 *
 * This is the source file for what is minified in the csismag_skip_link_focus_fix() PHP function.
 *
 * Learn more: https://git.io/vWdr2
 */
(function () {
  var isIe = /(trident|msie)/i.test(navigator.userAgent);

  if (isIe && document.getElementById && window.addEventListener) {
    window.addEventListener("hashchange", function () {
      var id = location.hash.substring(1),
          element;

      if (!/^[A-z0-9_-]+$/.test(id)) {
        return;
      }

      element = document.getElementById(id);

      if (element) {
        if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) {
          element.tabIndex = -1;
        }

        element.focus();
      }
    }, false);
  }
})();