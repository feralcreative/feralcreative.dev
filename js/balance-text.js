(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.balanceText = factory();
  }
})(this, () => {
  let breakMatches, wsnwMatches, wsnwOffset;
  const watching = { sel: [], el: [] };
  let handlersInitialized = false;
  let polyfilled = false;
  function noop() {}
  function forEach(elements, callback) {
    Array.prototype.forEach.call(elements, callback);
  }
  function ready(fn) {
    if (document.readyState !== "loading") {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      document.attachEvent("onreadystatechange", () => {
        if (document.readyState !== "loading") {
          fn();
        }
      });
    }
  }
  function debounce(func, threshold, execAsap, ...args) {
    let timeout;
    return function () {
      const obj = this;
      function delayed() {
        if (!execAsap) {
          func.apply(obj, args);
        }
        timeout = null;
      }
      if (timeout) {
        clearTimeout(timeout);
      } else if (execAsap) {
        func.apply(obj, args);
      }
      timeout = setTimeout(delayed, threshold || 100);
    };
  }
  function hasTextWrap() {
    if (typeof window === "undefined") {
      return false;
    }
    const { style: style } = document.documentElement;
    return style.textWrap || style.WebkitTextWrap || style.MozTextWrap || style.MsTextWrap;
  }
  function NextWS_params() {
    this.reset();
  }
  NextWS_params.prototype.reset = function () {
    this.index = 0;
    this.width = 0;
  };
  function isWhiteSpaceNoWrap(index) {
    return wsnwMatches.some((range) => range.start < index && index < range.end);
  }
  function recursiveCalcNoWrapOffsetsForLine(el, includeTag) {
    if (el.nodeType === el.ELEMENT_NODE) {
      const style = window.getComputedStyle(el);
      if (style.whiteSpace === "nowrap") {
        const len = el.outerHTML.length;
        wsnwMatches.push({ start: wsnwOffset, end: wsnwOffset + len });
        wsnwOffset += len;
      } else {
        forEach(el.childNodes, (child) => {
          recursiveCalcNoWrapOffsetsForLine(child, true);
        });
        if (includeTag) {
          wsnwOffset += el.outerHTML.length - el.innerHTML.length;
        }
      }
    } else if (el.nodeType === el.COMMENT_NODE) {
      wsnwOffset += el.length + 7;
    } else if (el.nodeType === el.PROCESSING_INSTRUCTION_NODE) {
      wsnwOffset += el.length + 2;
    } else {
      wsnwOffset += el.length;
    }
  }
  function calcNoWrapOffsetsForLine(el, oldWS, lineCharOffset) {
    if (lineCharOffset === 0) {
      el.style.whiteSpace = oldWS;
      wsnwOffset = 0;
      wsnwMatches = [];
      recursiveCalcNoWrapOffsetsForLine(el, false);
      el.style.whiteSpace = "nowrap";
    } else {
      const newMatches = [];
      wsnwMatches.forEach((match) => {
        if (match.start > lineCharOffset) {
          newMatches.push({ start: match.start - lineCharOffset, end: match.end - lineCharOffset });
        }
      });
      wsnwMatches = newMatches;
    }
  }
  function removeTags(el) {
    let brs = el.querySelectorAll('br[data-owner="balance-text-hyphen"]');
    forEach(brs, (br) => {
      br.outerHTML = "";
    });
    brs = el.querySelectorAll('br[data-owner="balance-text"]');
    forEach(brs, (br) => {
      br.outerHTML = " ";
    });
    let spans = el.querySelectorAll('span[data-owner="balance-text-softhyphen"]');
    if (spans.length > 0) {
      forEach(spans, (span) => {
        const textNode = document.createTextNode("­");
        span.parentNode.insertBefore(textNode, span);
        span.parentNode.removeChild(span);
      });
    }
    spans = el.querySelectorAll('span[data-owner="balance-text-justify"]');
    if (spans.length > 0) {
      let txt = "";
      forEach(spans, (span) => {
        txt += span.textContent;
        span.parentNode.removeChild(span);
      });
      el.innerHTML = txt;
    }
  }
  const isJustified = function (el) {
    const style = el.currentStyle || window.getComputedStyle(el, null);
    return style.textAlign === "justify";
  };
  function justify(el, txt, conWidth) {
    txt = txt.trim();
    const words = txt.split(" ").length;
    txt = `${txt} `;
    if (words < 2) {
      return txt;
    }
    const tmp = document.createElement("span");
    tmp.innerHTML = txt;
    el.appendChild(tmp);
    const size = tmp.offsetWidth;
    tmp.parentNode.removeChild(tmp);
    const wordSpacing = Math.floor((conWidth - size) / (words - 1));
    tmp.style.wordSpacing = `${wordSpacing}px`;
    tmp.setAttribute("data-owner", "balance-text-justify");
    const div = document.createElement("div");
    div.appendChild(tmp);
    return div.innerHTML;
  }
  function isBreakChar(txt, index) {
    const re = /([^\S\u00a0]|-|\u2014|\u2013|\u00ad)(?![^<]*>)/g;
    let match;
    if (!breakMatches) {
      breakMatches = [];
      match = re.exec(txt);
      while (match !== null) {
        if (!isWhiteSpaceNoWrap(match.index)) {
          breakMatches.push(match.index);
        }
        match = re.exec(txt);
      }
    }
    return breakMatches.indexOf(index) !== -1;
  }
  function isBreakOpportunity(txt, index) {
    return index === 0 || index === txt.length || (isBreakChar(txt, index - 1) && !isBreakChar(txt, index));
  }
  function findBreakOpportunity(el, txt, conWidth, desWidth, dir, c, ret) {
    let w;
    if (txt && typeof txt === "string") {
      for (;;) {
        while (!isBreakOpportunity(txt, c)) {
          c += dir;
        }
        el.innerHTML = txt.substr(0, c);
        w = el.offsetWidth;
        if (dir < 0) {
          if (w <= desWidth || w <= 0 || c === 0) {
            break;
          }
        } else if (desWidth <= w || conWidth <= w || c === txt.length) {
          break;
        }
        c += dir;
      }
    }
    ret.index = c;
    ret.width = w;
  }
  function getSpaceWidth(el, h) {
    const container = document.createElement("div");
    container.style.display = "block";
    container.style.position = "absolute";
    container.style.bottom = 0;
    container.style.right = 0;
    container.style.width = 0;
    container.style.height = 0;
    container.style.margin = 0;
    container.style.padding = 0;
    container.style.visibility = "hidden";
    container.style.overflow = "hidden";
    const space = document.createElement("span");
    space.style.fontSize = "2000px";
    space.innerHTML = "&nbsp;";
    container.appendChild(space);
    el.appendChild(container);
    const dims = space.getBoundingClientRect();
    container.parentNode.removeChild(container);
    const spaceRatio = dims.height / dims.width;
    return h / spaceRatio;
  }
  function getElementsList(elements) {
    if (!elements) {
      return [];
    }
    if (typeof elements === "string") {
      return document.querySelectorAll(elements);
    }
    if (elements.tagName && elements.querySelectorAll) {
      return [elements];
    }
    return elements;
  }
  function balanceText(elements) {
    forEach(getElementsList(elements), (el) => {
      const maxTextWidth = 5e3;
      removeTags(el);
      const oldWS = el.style.whiteSpace;
      const oldFloat = el.style.float;
      const oldDisplay = el.style.display;
      const oldPosition = el.style.position;
      const oldLH = el.style.lineHeight;
      el.style.lineHeight = "normal";
      const containerWidth = el.offsetWidth;
      const containerHeight = el.offsetHeight;
      el.style.whiteSpace = "nowrap";
      el.style.float = "none";
      el.style.display = "inline";
      el.style.position = "static";
      let nowrapWidth = el.offsetWidth;
      const nowrapHeight = el.offsetHeight;
      const spaceWidth = oldWS === "pre-wrap" ? 0 : getSpaceWidth(el, nowrapHeight);
      if (containerWidth > 0 && nowrapWidth > containerWidth && nowrapWidth < maxTextWidth) {
        let remainingText = el.innerHTML;
        let newText = "";
        let lineText = "";
        const shouldJustify = isJustified(el);
        const totLines = Math.round(containerHeight / nowrapHeight);
        let remLines = totLines;
        let lineCharOffset = 0;
        let desiredWidth, guessIndex, le, ge, splitIndex, isHyphen, isSoftHyphen;
        while (remLines > 1) {
          breakMatches = null;
          calcNoWrapOffsetsForLine(el, oldWS, lineCharOffset);
          desiredWidth = Math.round((nowrapWidth + spaceWidth) / remLines - spaceWidth);
          guessIndex = Math.round((remainingText.length + 1) / remLines) - 1;
          le = new NextWS_params();
          findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);
          ge = new NextWS_params();
          guessIndex = le.index;
          findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, +1, guessIndex, ge);
          le.reset();
          guessIndex = ge.index;
          findBreakOpportunity(el, remainingText, containerWidth, desiredWidth, -1, guessIndex, le);
          if (le.index === 0) {
            splitIndex = ge.index;
          } else if (containerWidth < ge.width || le.index === ge.index) {
            splitIndex = le.index;
          } else {
            splitIndex = Math.abs(desiredWidth - le.width) < Math.abs(ge.width - desiredWidth) ? le.index : ge.index;
          }
          lineText = remainingText.substr(0, splitIndex).replace(/\s$/, "");
          isSoftHyphen = Boolean(lineText.match(/\u00ad$/));
          if (isSoftHyphen) {
            lineText = lineText.replace(/\u00ad$/, '<span data-owner="balance-text-softhyphen">-</span>');
          }
          if (shouldJustify) {
            newText += justify(el, lineText, containerWidth);
          } else {
            newText += lineText;
            isHyphen = isSoftHyphen || Boolean(lineText.match(/(-|\u2014|\u2013)$/));
            newText += isHyphen ? '<br data-owner="balance-text-hyphen" />' : '<br data-owner="balance-text" />';
          }
          remainingText = remainingText.substr(splitIndex);
          lineCharOffset = splitIndex;
          remLines--;
          el.innerHTML = remainingText;
          nowrapWidth = el.offsetWidth;
        }
        if (shouldJustify) {
          el.innerHTML = newText + justify(el, remainingText, containerWidth);
        } else {
          el.innerHTML = newText + remainingText;
        }
      }
      el.style.whiteSpace = oldWS;
      el.style.float = oldFloat;
      el.style.display = oldDisplay;
      el.style.position = oldPosition;
      el.style.lineHeight = oldLH;
    });
  }
  function updateWatched() {
    const selectors = watching.sel.join(",");
    const selectedElements = getElementsList(selectors);
    const elements = Array.prototype.concat.apply(watching.el, selectedElements);
    balanceText(elements);
  }
  function initHandlers() {
    if (handlersInitialized) {
      return;
    }
    ready(updateWatched);
    window.addEventListener("load", updateWatched);
    window.addEventListener("resize", debounce(updateWatched));
    handlersInitialized = true;
  }
  function balanceTextAndWatch(elements) {
    if (typeof elements === "string") {
      watching.sel.push(elements);
    } else {
      forEach(getElementsList(elements), (el) => {
        watching.el.push(el);
      });
    }
    initHandlers();
    updateWatched();
  }
  function unwatch(elements) {
    if (typeof elements === "string") {
      watching.sel = watching.sel.filter((el) => el !== elements);
    } else {
      elements = getElementsList(elements);
      watching.el = watching.el.filter((el) => elements.indexOf(el) === -1);
    }
  }
  function polyfill() {
    if (polyfilled) {
      return;
    }
    watching.sel.push(".balance-text");
    initHandlers();
    polyfilled = true;
  }
  function publicInterface(elements, options) {
    if (!elements) {
      polyfill();
    } else if (options && options.watch === true) {
      balanceTextAndWatch(elements);
    } else if (options && options.watch === false) {
      unwatch(elements);
    } else {
      balanceText(elements);
    }
  }
  publicInterface.updateWatched = updateWatched;
  if (hasTextWrap()) {
    noop.updateWatched = noop;
    return noop;
  }
  return publicInterface;
});
