(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("quill"));
	else if(typeof define === 'function' && define.amd)
		define(["quill"], factory);
	else if(typeof exports === 'object')
		exports["MarkdownShortcuts"] = factory(require("quill"));
	else
		root["MarkdownShortcuts"] = factory(root["quill"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Quill.js Plugin - Markdown Shortcuts
// This is a module for the Quill.js WYSIWYG editor (https://quilljs.com/)
// which converts text entered as markdown to rich text.
//
// v0.0.5
//
// Author: Patrick Lee (me@patricklee.nyc)
//
// (c) Copyright 2017 Patrick Lee (me@patricklee.nyc).
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

var _hr = __webpack_require__(2);

var _hr2 = _interopRequireDefault(_hr);

var _constants = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Block = _quill2.default.import('blots/block');

_quill2.default.register('formats/horizontal', _hr2.default);

var MarkdownShortcuts = function () {
  function MarkdownShortcuts(quill, options) {
    var _this = this;

    _classCallCheck(this, MarkdownShortcuts);

    this.quill = quill;
    this.options = options;

    this.ignoreTags = ['PRE'];
    this.matches = [{
      name: 'header',
      pattern: /^(#){1,6}\s/g,
      action: function action(text, selection, pattern) {
        var match = pattern.exec(text);
        if (!match) return;
        var size = match[0].length;
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 0, 'header', size - 1);
          _this.quill.deleteText(selection.index - size, size);
        }, 0);
      }
    }, {
      name: 'blockquote',
      pattern: /^(>)\s/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'blockquote', true);
          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'code-block',
      pattern: /^`{3}(?:\s|\n)/g,
      action: function action(text, selection) {
        // Need to defer this action https://github.com/quilljs/quill/issues/1134
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'code-block', true);
          _this.quill.deleteText(selection.index - 4, 4);
        }, 0);
      }
    }, {
      name: 'bolditalic',
      pattern: /(?:\*){3}(.+?)(?:\*){3}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true, italic: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'bold',
      pattern: /(?:\*){2}(.+?)(?:\*){2}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { bold: true });
          _this.quill.format('bold', false);
        }, 0);
      }
    }, {
      name: 'italic',
      pattern: /(?:\*){1}(.+?)(?:\*){1}/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { italic: true });
          _this.quill.format('italic', false);
        }, 0);
      }
    }, {
      name: 'strikethrough',
      pattern: /(?:~~)(.+?)(?:~~)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { strike: true });
          _this.quill.format('strike', false);
        }, 0);
      }
    }, {
      name: 'displayformula',
      pattern: /(?:\$\$)(.+?)(?:\$\$)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertEmbed(startIndex, 'formula', '\\displaystyle ' + matchedText);
          _this.quill.insertText(startIndex + 1, '\n', 'align', 'center');
        }, 0);
      }
    }, {
      name: 'formula',
      pattern: /(?:\$)(.+?)(?:\$)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertEmbed(startIndex, 'formula', matchedText);
        }, 0);
      }
    }, {
      name: 'code',
      pattern: /(?:`)(.+?)(?:`)/g,
      action: function action(text, selection, pattern, lineStart) {
        var match = pattern.exec(text);

        var annotatedText = match[0];
        var matchedText = match[1];
        var startIndex = lineStart + match.index;

        if (text.match(/^([*_ \n]+)$/g)) return;

        setTimeout(function () {
          _this.quill.deleteText(startIndex, annotatedText.length);
          _this.quill.insertText(startIndex, matchedText, { code: true });
        }, 0);
      }
    }, {
      name: 'hr',
      pattern: /^(-\s?){3}/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          var matchedText = text.match(pattern)[0];
          var startIndex = selection.index - matchedText.length;
          _this.quill.deleteText(startIndex, matchedText.length);

          _this.quill.insertEmbed(startIndex, 'hr', true, _quill2.default.sources.USER);
          _this.quill.setSelection(startIndex + 1, _quill2.default.sources.SILENT);
        }, 0);
      }
    }, {
      name: 'plus-ul',
      // Quill 1.3.5 already treat * as another trigger for bullet lists
      pattern: /^\+\s$/g,
      action: function action(text, selection, pattern) {
        setTimeout(function () {
          _this.quill.formatLine(selection.index, 1, 'list', 'unordered');
          _this.quill.deleteText(selection.index - 2, 2);
        }, 0);
      }
    }, {
      name: 'image',
      pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;
        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);
            _this.quill.insertEmbed(start, 'image', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }, {
      name: 'link',
      pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
      action: function action(text, selection, pattern) {
        var startIndex = text.search(pattern);
        var matchedText = text.match(pattern)[0];
        var hrefText = text.match(/(?:\[(.*?)\])/g)[0];
        var hrefLink = text.match(/(?:\((.*?)\))/g)[0];
        var start = selection.index - matchedText.length - 1;
        if (startIndex !== -1) {
          setTimeout(function () {
            _this.quill.deleteText(start, matchedText.length);
            _this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1));
          }, 0);
        }
      }
    }];

    this.quill.keyboard.bindings[9].unshift({
      key: 9,
      format: ['code-block'],
      handler: function handler() {
        return _this.onTab(true);
      }
    });
    this.quill.keyboard.addBinding({ key: 9 }, function () {
      return _this.onTab();
    });

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', function (delta, oldContents, source) {
      for (var i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if (delta.ops[i].insert === ' ') {
            _this.onSpace();
          }
        } else if (delta.ops[i].hasOwnProperty('delete') && source === 'user') {
          _this.onDelete();
        }
      }
    });
  }

  _createClass(MarkdownShortcuts, [{
    key: 'isValid',
    value: function isValid(text, tagName) {
      return typeof text !== 'undefined' && text && this.ignoreTags.indexOf(tagName) === -1;
    }
  }, {
    key: 'onTab',
    value: function onTab() {
      var codeBlock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var selection = this.quill.getSelection();
      if (!selection) true;

      var _quill$getLine = this.quill.getLine(selection.index),
          _quill$getLine2 = _slicedToArray(_quill$getLine, 2),
          line = _quill$getLine2[0],
          offset = _quill$getLine2[1];

      var lineStart = selection.index - offset;

      var text = this.quill.getContents(lineStart, offset).filter(function (op) {
        return typeof op.insert === 'string' || op.insert.formula;
      }).map(function (op) {
        return op.insert.formula ? " " : op.insert;
      }).join('');
      var j = 1;
      while (j <= text.length) {
        var idx = text.length - j;
        if (text[idx] === ' ') {
          return true;
        } else if (text[idx] === '\\') {
          var potentialMatch = text.slice(-j);
          if (_constants.tabCompletionMap.has(potentialMatch)) {
            var quillIndex = selection.index - j;
            this.quill.deleteText(quillIndex, j);
            this.quill.insertText(quillIndex, _constants.tabCompletionMap.get(potentialMatch));
            return false;
          } else {
            return true;
          }
        } else {
          j++;
        }
      }
      return true;
    }
  }, {
    key: 'onSpace',
    value: function onSpace() {
      var selection = this.quill.getSelection();
      if (!selection) return;

      var _quill$getLine3 = this.quill.getLine(selection.index),
          _quill$getLine4 = _slicedToArray(_quill$getLine3, 2),
          line = _quill$getLine4[0],
          offset = _quill$getLine4[1];

      var lineStart = selection.index - offset;

      // formulas count as a single character for insertion/deletion
      // purposes, yet they don't show up the output of getText.
      // So we have to compensate:
      // see https://github.com/quilljs/quill/blob/cb0fb6630a59aa8efff3e0d1caa6645e565d19bd/core/editor.js#L147
      // for the implementation of getText, which is what we were using before here
      var text = this.quill.getContents(lineStart, selection.index).filter(function (op) {
        return typeof op.insert === 'string' || op.insert.formula;
      }).map(function (op) {
        return op.insert.formula ? " " : op.insert;
      }).join('');

      if (this.isValid(text, line.domNode.tagName)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.matches[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var match = _step.value;

            var matchedText = text.match(match.pattern);
            if (matchedText) {
              // We need to replace only matched text not the whole line
              match.action(text, selection, match.pattern, lineStart);
              console.log("Quill match made (" + match.name + ")");
              return;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }, {
    key: 'onDelete',
    value: function onDelete() {
      var range = this.quill.getSelection();
      if (!range) return;
      var format = this.quill.getFormat(range);
      if (format.blockquote || format.code || format['code-block']) {
        if (this.isLastBrElement(range) || this.isEmptyLine(range)) {
          this.quill.removeFormat(range.index, range.length);
        }
      }
    }
  }, {
    key: 'isLastBrElement',
    value: function isLastBrElement(range) {
      var _quill$scroll$descend = this.quill.scroll.descendant(Block, range.index),
          _quill$scroll$descend2 = _slicedToArray(_quill$scroll$descend, 1),
          block = _quill$scroll$descend2[0];

      var isBrElement = block != null && block.domNode.firstChild instanceof HTMLBRElement;
      return isBrElement;
    }
  }, {
    key: 'isEmptyLine',
    value: function isEmptyLine(range) {
      var _quill$getLine5 = this.quill.getLine(range.index),
          _quill$getLine6 = _slicedToArray(_quill$getLine5, 2),
          line = _quill$getLine6[0],
          offset = _quill$getLine6[1];

      if (!line || !line.children || !line.children.head || !line.children.head.text || !line.children.head.text.trim) {
        return true;
      }
      var lines = line.children.head.text.split('\n');
      if (lines.length === 0) return true;
      if (lines[0].trim() === "" && offset === 0) return true;
      var isEmpty = line.children.head.text.trim() === "";
      return isEmpty;
    }
  }]);

  return MarkdownShortcuts;
}();

if (window.Quill) {
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts);
}

module.exports = { MarkdownShortcuts: MarkdownShortcuts, tabCompletionMap: _constants.tabCompletionMap };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _quill = __webpack_require__(0);

var _quill2 = _interopRequireDefault(_quill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockEmbed = _quill2.default.import('blots/block/embed');

var HorizontalRule = function (_BlockEmbed) {
  _inherits(HorizontalRule, _BlockEmbed);

  function HorizontalRule() {
    _classCallCheck(this, HorizontalRule);

    return _possibleConstructorReturn(this, (HorizontalRule.__proto__ || Object.getPrototypeOf(HorizontalRule)).apply(this, arguments));
  }

  return HorizontalRule;
}(BlockEmbed);

HorizontalRule.blotName = 'hr';
HorizontalRule.tagName = 'hr';

exports.default = HorizontalRule;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var tabCompletionMap = exports.tabCompletionMap = new Map(Object.entries({ "\\peer": "👥", "\\shrug": "🤷", "\\idk": "🤷", "\\dgt": "🕔", "\\clock": "🕔", "\\timer": "🕔", "\\draw": "✏", "\\pin": "📌", "\\unpin": "⊗", "\\RR": "®", "\\required": "®", "\\note": "📝", "\\clear": "♻", "\\bscra": "𝓪", "\\:children_crossing:": "🚸", "\\Re": "ℜ", "\\bbz": "𝕫", "\\urcorner": "⌝", "\\^2": "²", "\\pi": "π", "\\bbF": "𝔽", "\\nrightarrow": "↛", "\\upsilon": "υ", "\\copyright": "©", "\\backsimeq": "⋍", "\\:person_frowning:": "🙍", "\\^l": "ˡ", "\\succeqq": "⪴", "\\urblacktriangle": "◥", "\\overbrace": "⏞", "\\danger": "☡", "\\rightharpoondown": "⇁", "\\RRightarrow": "⭆", "\\bisansMu": "𝞛", "\\isansZ": "𝘡", "\\succapprox": "⪸", "\\:taurus:": "♉", "\\:boot:": "👢", "\\bsansvarrho": "𝞎", "\\pointint": "⨕", "\\original": "⊶", "\\nvtwoheadleftarrow": "⬴", "\\bsanspartial": "𝞉", "\\:skin-tone-2:": "🏻", "\\:open_mouth:": "😮", "\\nBumpeq": "≎̸", "\\clockoint": "⨏", "\\rarrx": "⥇", "\\bij": "𝒋", "\\:wc:": "🚾", "\\leo": "♌", "\\:white_flower:": "💮", "\\DownArrowBar": "⤓", "\\:smiling_imp:": "😈", "\\bbk": "𝕜", "\\twoheaddownarrow": "↡", "\\fraku": "𝔲", "\\ElOr": "⩖", "\\Otimes": "⨷", "\\:microphone:": "🎤", "\\frakS": "𝔖", "\\frakG": "𝔊", "\\:pig_nose:": "🐽", "\\lnsim": "⋦", "\\itjmath": "𝚥", "\\gnapprox": "⪊", "\\twoheaduparrowcircle": "⥉", "\\:phone:": "☎", "\\NotLeftTriangleBar": "⧏̸", "\\veedoublebar": "⩣", "\\biU": "𝑼", "\\eqdef": "≝", "\\eqqslantless": "⪛", "\\:trident:": "🔱", "\\:clock1130:": "🕦", "\\l": "ł", "\\:cold_sweat:": "😰", "\\bisansNu": "𝞜", "\\:bouquet:": "💐", "\\lvertneqq": "≨︀", "\\:earth_africa:": "🌍", "\\itNu": "𝛮", "\\fisheye": "◉", "\\NotSquareSubset": "⊏̸", "\\:european_post_office:": "🏤", "\\:rice:": "🍚", "\\bscrA": "𝓐", "\\bsansTheta": "𝝝", "\\:kimono:": "👘", "\\isansc": "𝘤", "\\bbD": "𝔻", "\\bsanstheta": "𝝷", "\\:a:": "🅰", "\\itC": "𝐶", "\\:battery:": "🔋", "\\_phi": "ᵩ", "\\^)": "⁾", "\\bsansUpsilon": "𝝪", "\\bigwhitestar": "☆", "\\:cl:": "🆑", "\\sansone": "𝟣", "\\ngtr": "≯", "\\hksearow": "⤥", "\\bisansB": "𝘽", "\\parallelogramblack": "▰", "\\angles": "⦞", "\\:green_heart:": "💚", "\\Sqcap": "⩎", "\\bisansg": "𝙜", "\\^W": "ᵂ", "\\sagittarius": "♐", "\\biN": "𝑵", "\\upoldKoppa": "Ϙ", "\\:dragon_face:": "🐲", "\\looparrowright": "↬", "\\:mountain_railway:": "🚞", "\\fdiagovrdiag": "⤬", "\\itchi": "𝜒", "\\ngeqslant": "⩾̸", "\\bfrakJ": "𝕵", "\\:broken_heart:": "💔", "\\:snake:": "🐍", "\\biNu": "𝜨", "\\beta": "β", "\\twonotes": "♫", "\\ttnine": "𝟿", "\\:cupid:": "💘", "\\nvtwoheadrightarrowtail": "⤗", "\\bisansY": "𝙔", "\\itmu": "𝜇", "\\:worried:": "😟", "\\:carousel_horse:": "🎠", "\\nvtwoheadleftarrowtail": "⬼", "\\:steam_locomotive:": "🚂", "\\bsanss": "𝘀", "\\^I": "ᴵ", "\\frakb": "𝔟", "\\:incoming_envelope:": "📨", "\\ddddot": "⃜", "\\_j": "ⱼ", "\\longrightarrow": "⟶", "\\varcarriagereturn": "⏎", "\\dottedsquare": "⬚", "\\:lock_with_ink_pen:": "🔏", "\\:clock4:": "🕓", "\\:bell:": "🔔", "\\lmoustache": "⎰", "\\^h": "ʰ", "\\ttr": "𝚛", "\\capwedge": "⩄", "\\ttU": "𝚄", "\\bfraks": "𝖘", "\\itc": "𝑐", "\\openbracketright": "⟧", "\\vec": "⃗", "\\:barber:": "💈", "\\sansw": "𝗐", "\\bfrake": "𝖊", "\\L": "Ł", "\\ni": "∋", "\\itvarkappa": "𝜘", "\\vardiamondsuit": "♦", "\\isansA": "𝘈", "\\itt": "𝑡", "\\leftrightharpoonsdown": "⥧", "\\bialpha": "𝜶", "\\:round_pushpin:": "📍", "\\frakq": "𝔮", "\\bsansvarphi": "𝞍", "\\:truck:": "🚚", "\\supsetplus": "⫀", "\\bsansP": "𝗣", "\\bbp": "𝕡", "\\NotNestedLessLess": "⪡̸", "\\bfL": "𝐋", "\\:o:": "⭕", "\\twoheadleftdbkarrow": "⬷", "\\:roller_coaster:": "🎢", "\\similarleftarrow": "⭉", "\\rtlz": "ʐ", "\\:white_square_button:": "🔳", "\\bisansU": "𝙐", "\\vardoublebarwedge": "⌆", "\\invwhiteupperhalfcircle": "◚", "\\rightdotarrow": "⤑", "\\leqslant": "⩽", "\\wedgeonwedge": "⩕", "\\bscrD": "𝓓", "\\:light_rail:": "🚈", "\\lmrk": "ː", "\\simgE": "⪠", "\\:closed_umbrella:": "🌂", "\\Equal": "⩵", "\\varhexagon": "⬡", "\\sansr": "𝗋", "\\bsansMu": "𝝡", "\\bkarow": "⤍", "\\bfrakw": "𝖜", "\\:checkered_flag:": "🏁", "\\bscrq": "𝓺", "\\bfrakF": "𝕱", "\\napprox": "≉", "\\sansA": "𝖠", "\\:high_brightness:": "🔆", "\\bisansk": "𝙠", "\\lesseqgtr": "⋚", "\\varnothing": "∅", "\\:bangbang:": "‼", "\\rppolint": "⨒", "\\cirfr": "◑", "\\:sweat_drops:": "💦", "\\eta": "η", "\\:sos:": "🆘", "\\^gamma": "ᵞ", "\\:loud_sound:": "🔊", "\\nsupset": "⊅", "\\supsetneqq": "⫌", "\\lesdotor": "⪃", "\\dotequiv": "⩧", "\\:fish_cake:": "🍥", "\\:massage:": "💆", "\\bfrakG": "𝕲", "\\bigtriangleup": "△", "\\underbar": "̲", "\\:dizzy:": "💫", "\\bimu": "𝝁", "\\image": "⊷", "\\:clock830:": "🕣", "\\sansfour": "𝟦", "\\smashtimes": "⨳", "\\:mute:": "🔇", "\\DDownarrow": "⟱", "\\subsim": "⫇", "\\diameter": "⌀", "\\house": "⌂", "\\bfpsi": "𝛙", "\\:bullettrain_side:": "🚄", "\\in": "∈", "\\:name_badge:": "📛", "\\:musical_score:": "🎼", "\\biD": "𝑫", "\\bsansR": "𝗥", "\\:hammer:": "🔨", "\\bsanspsi": "𝞇", "\\bfa": "𝐚", "\\smwhtlozenge": "⬫", "\\bbzero": "𝟘", "\\ttzero": "𝟶", "\\bsansb": "𝗯", "\\bfrakg": "𝖌", "\\QED": "∎", "\\^b": "ᵇ", "\\bbfive": "𝟝", "\\:smirk_cat:": "😼", "\\:peach:": "🍑", "\\tts": "𝚜", "\\dicei": "⚀", "\\squarenwsefill": "▧", "\\:raising_hand:": "🙋", "\\:tractor:": "🚜", "\\:curly_loop:": "➰", "\\bisansSigma": "𝞢", "\\bigsqcup": "⨆", "\\:cool:": "🆒", "\\:beers:": "🍻", "\\nequiv": "≢", "\\lat": "⪫", "\\isansS": "𝘚", "\\ttb": "𝚋", "\\:mag_right:": "🔎", "\\_0": "₀", "\\:shirt:": "👕", "\\implies": "⟹", "\\bfg": "𝐠", "\\:dancer:": "💃", "\\dotminus": "∸", "\\oint": "∮", "\\bscrE": "𝓔", "\\diamondleftblack": "⬖", "\\nHdownarrow": "⇟", "\\bbJ": "𝕁", "\\:house:": "🏠", "\\frakg": "𝔤", "\\nsucc": "⊁", "\\:heart_decoration:": "💟", "\\isansv": "𝘷", "\\:black_nib:": "✒", "\\scrC": "𝒞", "\\bsansdelta": "𝝳", "\\neovnwarrow": "⤱", "\\langle": "⟨", "\\:non-potable_water:": "🚱", "\\biEta": "𝜢", "\\backsim": "∽", "\\minhat": "⩟", "\\bfmu": "𝛍", "\\varphi": "φ", "\\:mag:": "🔍", "\\Tau": "Τ", "\\:arrow_double_up:": "⏫", "\\isansX": "𝘟", "\\sansj": "𝗃", "\\nsim": "≁", "\\ocirc": "̊", "\\sansJ": "𝖩", "\\bbsum": "⅀", "\\:skin-tone-5:": "🏾", "\\itBeta": "𝛣", "\\equalleftarrow": "⭀", "\\bscrg": "𝓰", "\\enclosetriangle": "⃤", "\\bsansalpha": "𝝰", "\\itz": "𝑧", "\\scrO": "𝒪", "\\:package:": "📦", "\\rightrightarrows": "⇉", "\\:fireworks:": "🎆", "\\bfvarphi": "𝛗", "\\itOmicron": "𝛰", "\\italpha": "𝛼", "\\DownLeftRightVector": "⥐", "\\:telescope:": "🔭", "\\:joy_cat:": "😹", "\\^R": "ᴿ", "\\bfsix": "𝟔", "\\rightarrowdiamond": "⤞", "\\bisanszeta": "𝞯", "\\:notebook_with_decorative_cover:": "📔", "\\circlellquad": "◵", "\\upuparrows": "⇈", "\\:closed_lock_with_key:": "🔐", "\\varclubsuit": "♧", "\\sim": "∼", "\\:arrow_right_hook:": "↪", "\\scrJ": "𝒥", "\\rightarrowbsimilar": "⭌", "\\:heavy_minus_sign:": "➖", "\\:moon:": "🌔", "\\:womans_clothes:": "👚", "\\bbie": "ⅇ", "\\itTau": "𝛵", "\\underleftharpoondown": "⃭", "\\smwhitestar": "⭒", "\\nprec": "⊀", "\\_n": "ₙ", "\\eighthnote": "♪", "\\bbrktbrk": "⎶", "\\:speedboat:": "🚤", "\\leftrightarrowtriangle": "⇿", "\\eparsl": "⧣", "\\nleqslant": "⩽̸", "\\bia": "𝒂", "\\bisansLambda": "𝞚", "\\btimes": "⨲", "\\sbrhr": "˒", "\\itlambda": "𝜆", "\\isansE": "𝘌", "\\:sagittarius:": "♐", "\\_=": "₌", "\\nvleftarrow": "⇷", "\\Swarrow": "⇙", "\\:dash:": "💨", "\\inversewhitecircle": "◙", "\\commaminus": "⨩", "\\bsansV": "𝗩", "\\:arrow_left:": "⬅", "\\:womans_hat:": "👒", "\\simlE": "⪟", "\\cirfb": "◒", "\\bscrk": "𝓴", "\\rightsquigarrow": "⇝", "\\leftarrow": "←", "\\nVtwoheadleftarrowtail": "⬽", "\\revemptyset": "⦰", "\\hkswarow": "⤦", "\\bisansq": "𝙦", "\\:bridge_at_night:": "🌉", "\\^B": "ᴮ", "\\doublebarvee": "⩢", "\\bfzeta": "𝛇", "\\bih": "𝒉", "\\:taxi:": "🚕", "\\:arrow_heading_up:": "⤴", "\\leftarrowapprox": "⭊", "\\:oncoming_police_car:": "🚔", "\\itnu": "𝜈", "\\scrT": "𝒯", "\\:unamused:": "😒", "\\lrtriangleeq": "⧡", "\\bscrL": "𝓛", "\\varointclockwise": "∲", "\\bsansiota": "𝝸", "\\llblacktriangle": "◣", "\\lltriangle": "◺", "\\bii": "𝒊", "\\:bar_chart:": "📊", "\\openbracketleft": "⟦", "\\simgtr": "⪞", "\\triangleleft": "◁", "\\barrightarrowdiamond": "⤠", "\\ttg": "𝚐", "\\:suspension_railway:": "🚟", "\\:mouse:": "🐭", "\\bfdigamma": "𝟋", "\\profline": "⌒", "\\itupsilon": "𝜐", "\\UpEquilibrium": "⥮", "\\:file_folder:": "📁", "\\scrE": "ℰ", "\\Zbar": "Ƶ", "\\itvarepsilon": "𝜖", "\\bigwedge": "⋀", "\\sanss": "𝗌", "\\:electric_plug:": "🔌", "\\diamondbotblack": "⬙", "\\curlyvee": "⋎", "\\eth": "ð", "\\bisansF": "𝙁", "\\lesseqqgtr": "⪋", "\\bbu": "𝕦", "\\twocups": "⩊", "\\ttseven": "𝟽", "\\isansI": "𝘐", "\\:balloon:": "🎈", "\\_6": "₆", "\\Lsh": "↰", "\\trianglelefteq": "⊴", "\\:mortar_board:": "🎓", "\\degree": "°", "\\dicevi": "⚅", "\\:oden:": "🍢", "\\updownharpoonleftright": "⥍", "\\bbone": "𝟙", "\\fraka": "𝔞", "\\:aries:": "♈", "\\ddagger": "‡", "\\bscrc": "𝓬", "\\itW": "𝑊", "\\:gemini:": "♊", "\\:moneybag:": "💰", "\\circeq": "≗", "\\Phi": "Φ", "\\guilsinglleft": "‹", "\\bisansA": "𝘼", "\\AE": "Æ", "\\intx": "⨘", "\\parallelogram": "▱", "\\bsansD": "𝗗", "\\overbracket": "⎴", "\\bfchi": "𝛘", "\\:watch:": "⌚", "\\:skin-tone-3:": "🏼", "\\biI": "𝑰", "\\:100:": "💯", "\\:camel:": "🐫", "\\:eyes:": "👀", "\\Prec": "⪻", "\\:u7121:": "🈚", "\\:kissing:": "😗", "\\tricolon": "⁝", "\\LeftTriangleBar": "⧏", "\\:smoking:": "🚬", "\\:traffic_light:": "🚥", "\\wideangleup": "⦧", "\\:calling:": "📲", "\\niobar": "⋾", "\\mp": "∓", "\\:bulb:": "💡", "\\NG": "Ŋ", "\\biG": "𝑮", "\\bfrakN": "𝕹", "\\bisansT": "𝙏", "\\:headphones:": "🎧", "\\tildelow": "˜", "\\:outbox_tray:": "📤", "\\:no_bell:": "🔕", "\\bip": "𝒑", "\\twoheadleftarrowtail": "⬻", "\\:mailbox_with_no_mail:": "📭", "\\smte": "⪬", "\\whitepointerright": "▻", "\\:fast_forward:": "⏩", "\\nvLeftrightarrow": "⤄", "\\revangleubar": "⦥", "\\sansthree": "𝟥", "\\ttN": "𝙽", "\\bfdelta": "𝛅", "\\vartheta": "ϑ", "\\varlrtriangle": "⊿", "\\frakX": "𝔛", "\\itS": "𝑆", "\\kernelcontraction": "∻", "\\ntriangleright": "⋫", "\\bisansEta": "𝞖", "\\itvartheta": "𝜗", "\\:heart_eyes:": "😍", "\\bigcirc": "○", "\\:astonished:": "😲", "\\sigma": "σ", "\\bisansOmicron": "𝞞", "\\:racehorse:": "🐎", "\\^w": "ʷ", "\\bbA": "𝔸", "\\sqrtbottom": "⎷", "\\rightharpoonsupdown": "⥤", "\\:dromedary_camel:": "🐪", "\\bfrakH": "𝕳", "\\bullet": "•", "\\:arrow_forward:": "▶", "\\:kissing_closed_eyes:": "😚", "\\:moyai:": "🗿", "\\:mailbox_closed:": "📪", "\\ttd": "𝚍", "\\bsansM": "𝗠", "\\itkappa": "𝜅", "\\scrj": "𝒿", "\\nsqsupseteq": "⋣", "\\bfrakA": "𝕬", "\\bisansW": "𝙒", "\\top": "⊤", "\\:heavy_division_sign:": "➗", "\\rasp": "ʼ", "\\downharpoonright": "⇂", "\\bsanssix": "𝟲", "\\squarellblack": "⬕", "\\emdash": "—", "\\:haircut:": "💇", "\\rfloor": "⌋", "\\bisansM": "𝙈", "\\^phi": "ᵠ", "\\bisansd": "𝙙", "\\eqcolon": "≕", "\\wedge": "∧", "\\cdots": "⋯", "\\7/8": "⅞", "\\spadesuit": "♠", "\\bfChi": "𝚾", "\\:jack_o_lantern:": "🎃", "\\DownArrowUpArrow": "⇵", "\\intbar": "⨍", "\\npreceq": "⪯̸", "\\isansM": "𝘔", "\\bfPhi": "𝚽", "\\:copyright:": "©", "\\:zzz:": "💤", "\\Vvert": "⦀", "\\circledS": "Ⓢ", "\\bbtwo": "𝟚", "\\boxdot": "⊡", "\\mdwhtlozenge": "⬨", "\\_7": "₇", "\\itO": "𝑂", "\\smwhtcircle": "◦", "\\rightarrowgtr": "⭃", "\\:tropical_fish:": "🐠", "\\:repeat:": "🔁", "\\itGamma": "𝛤", "\\itg": "𝑔", "\\boxminus": "⊟", "\\:tired_face:": "😫", "\\bfBeta": "𝚩", "\\^z": "ᶻ", "\\gtrapprox": "⪆", "\\lessgtr": "≶", "\\frakE": "𝔈", "\\overleftrightarrow": "⃡", "\\bfrakX": "𝖃", "\\trademark": "™", "\\:repeat_one:": "🔂", "\\bbfour": "𝟜", "\\:earth_asia:": "🌏", "\\bio": "𝒐", "\\eqcirc": "≖", "\\frakJ": "𝔍", "\\:game_die:": "🎲", "\\bsansvarepsilon": "𝞊", "\\:clock630:": "🕡", "\\lgwhtsquare": "⬜", "\\:page_with_curl:": "📃", "\\supsetneq": "⊋", "\\5/6": "⅚", "\\:police_car:": "🚓", "\\:santa:": "🎅", "\\succneqq": "⪶", "\\precneq": "⪱", "\\bbY": "𝕐", "\\bisansbeta": "𝞫", "\\:cat:": "🐱", "\\:station:": "🚉", "\\:thought_balloon:": "💭", "\\trnsa": "ɒ", "\\:bride_with_veil:": "👰", "\\^u": "ᵘ", "\\:first_quarter_moon:": "🌓", "\\euro": "€", "\\circ": "∘", "\\bisansnabla": "𝞩", "\\biTheta": "𝜣", "\\mdwhtsquare": "◻", "\\uplus": "⊎", "\\numero": "№", "\\carriagereturn": "↵", "\\:up:": "🆙", "\\bsanso": "𝗼", "\\DJ": "Đ", "\\scrq": "𝓆", "\\bfOmega": "𝛀", "\\:globe_with_meridians:": "🌐", "\\bfrakE": "𝕰", "\\:ram:": "🐏", "\\barcup": "⩂", "\\bftheta": "𝛉", "\\simrdots": "⩫", "\\enclosediamond": "⃟", "\\bir": "𝒓", "\\cap": "∩", "\\bib": "𝒃", "\\:baby_bottle:": "🍼", "\\:fuelpump:": "⛽", "\\biguplus": "⨄", "\\itr": "𝑟", "\\frakQ": "𝔔", "\\isansg": "𝘨", "\\:point_right:": "👉", "\\:relieved:": "😌", "\\rightanglearc": "⊾", "\\blkvertoval": "⬮", "\\longleftarrow": "⟵", "\\downzigzagarrow": "↯", "\\dj": "đ", "\\supedot": "⫄", "\\bfomega": "𝛚", "\\:laughing:": "😆", "\\:oncoming_taxi:": "🚖", "\\:handbag:": "👜", "\\mdsmblksquare": "◾", "\\:wind_chime:": "🎐", "\\bisansxi": "𝞷", "\\_5": "₅", "\\measangleurtone": "⦬", "\\rho": "ρ", "\\bfrakh": "𝖍", "\\emptysetobar": "⦱", "\\_a": "ₐ", "\\bigblacktriangledown": "▼", "\\dotplus": "∔", "\\bbj": "𝕛", "\\bsansa": "𝗮", "\\VDash": "⊫", "\\bscro": "𝓸", "\\rsqhook": "⫎", "\\palh": "̡", "\\:v:": "✌", "\\^6": "⁶", "\\:clap:": "👏", "\\bscry": "𝔂", "\\geqqslant": "⫺", "\\:card_index:": "📇", "\\:pray:": "🙏", "\\bsansfour": "𝟰", "\\binabla": "𝜵", "\\rtls": "ʂ", "\\bfPi": "𝚷", "\\itQ": "𝑄", "\\preccurlyeq": "≼", "\\nvrightarrowtail": "⤔", "\\:tm:": "™", "\\:fries:": "🍟", "\\bfE": "𝐄", "\\_t": "ₜ", "\\:atm:": "🏧", "\\:arrow_lower_right:": "↘", "\\NotSquareSuperset": "⊐̸", "\\bsanszeta": "𝝵", "\\ltlmr": "ɱ", "\\squareurblack": "⬔", "\\ominus": "⊖", "\\bbm": "𝕞", "\\grave": "̀", "\\rightpentagonblack": "⭓", "\\:triangular_flag_on_post:": "🚩", "\\lesges": "⪓", "\\bowtie": "⋈", "\\bbU": "𝕌", "\\prod": "∏", "\\lgblksquare": "⬛", "\\:sunglasses:": "😎", "\\:books:": "📚", "\\downwhitearrow": "⇩", "\\:guardsman:": "💂", "\\succcurlyeq": "≽", "\\:symbols:": "🔣", "\\frako": "𝔬", "\\bigoplus": "⨁", "\\:negative_squared_cross_mark:": "❎", "\\ohm": "Ω", "\\H": "̋", "\\2/3": "⅔", "\\sansV": "𝖵", "\\:lemon:": "🍋", "\\bfseven": "𝟕", "\\:imp:": "👿", "\\biT": "𝑻", "\\divideontimes": "⋇", "\\:u7533:": "🈸", "\\disin": "⋲", "\\NotNestedGreaterGreater": "⪢̸", "\\lgwhtcircle": "◯", "\\doteq": "≐", "\\upint": "⨛", "\\:tv:": "📺", "\\bscrT": "𝓣", "\\simeq": "≃", "\\vysmblkcircle": "∙", "\\gvertneqq": "≩︀", "\\bsansr": "𝗿", "\\bisanstheta": "𝞱", "\\:trumpet:": "🎺", "\\bfrakp": "𝖕", "\\triangleleftblack": "◭", "\\:strawberry:": "🍓", "\\llarc": "◟", "\\bscri": "𝓲", "\\lllnest": "⫷", "\\starequal": "≛", "\\blanksymbol": "␢", "\\itd": "𝑑", "\\iteta": "𝜂", "\\bfrakb": "𝖇", "\\isindot": "⋵", "\\blacktriangleleft": "◀", "\\bisansb": "𝙗", "\\cong": "≅", "\\:gem:": "💎", "\\pppprime": "⁗", "\\:love_letter:": "💌", "\\bisanss": "𝙨", "\\:skin-tone-4:": "🏽", "\\eqvparsl": "⧥", "\\measangleultonw": "⦭", "\\bigsqcap": "⨅", "\\sun": "☼", "\\rh": "̢", "\\:mega:": "📣", "\\bsansbeta": "𝝱", "\\biE": "𝑬", "\\:ophiuchus:": "⛎", "\\:fork_and_knife:": "🍴", "\\bfW": "𝐖", "\\bbe": "𝕖", "\\^s": "ˢ", "\\isansf": "𝘧", "\\approxeq": "≊", "\\rightarrowbar": "⇥", "\\:snail:": "🐌", "\\hermitconjmatrix": "⊹", "\\notslash": "⌿", "\\bisigma": "𝝈", "\\Mapsfrom": "⤆", "\\:recycle:": "♻", "\\1/3": "⅓", "\\:deciduous_tree:": "🌳", "\\_l": "ₗ", "\\viewdata": "⌗", "\\diamondleftarrowbar": "⤟", "\\bisansO": "𝙊", "\\itv": "𝑣", "\\:cherry_blossom:": "🌸", "\\:two_men_holding_hands:": "👬", "\\:sa:": "🈂", "\\candra": "̐", "\\:notes:": "🎶", "\\:skin-tone-6:": "🏿", "\\bffour": "𝟒", "\\bsansi": "𝗶", "\\:capital_abcd:": "🔠", "\\revangle": "⦣", "\\gtrdot": "⋗", "\\veeodot": "⩒", "\\biupsilon": "𝝊", "\\nsime": "≄", "\\NotRightTriangleBar": "⧐̸", "\\bfC": "𝐂", "\\Rrightarrow": "⇛", "\\itsigma": "𝜎", "\\itf": "𝑓", "\\:no_mobile_phones:": "📵", "\\seovnearrow": "⤭", "\\openo": "ɔ", "\\gneqq": "≩", "\\:minibus:": "🚐", "\\1/4": "¼", "\\lesdoto": "⪁", "\\bisansphi": "𝞿", "\\:large_blue_circle:": "🔵", "\\leftarrowonoplus": "⬲", "\\itbeta": "𝛽", "\\upin": "⟒", "\\gtcir": "⩺", "\\:construction:": "🚧", "\\varkappa": "ϰ", "\\cbrt": "∛", "\\:bathtub:": "🛁", "\\_(": "₍", "\\:orange_book:": "📙", "\\:fist:": "✊", "\\:basketball:": "🏀", "\\sansU": "𝖴", "\\bisansN": "𝙉", "\\:o2:": "🅾", "\\bieta": "𝜼", "\\itZeta": "𝛧", "\\itEpsilon": "𝛦", "\\sansp": "𝗉", "\\itY": "𝑌", "\\bsanszero": "𝟬", "\\sblhr": "˓", "\\join": "⨝", "\\bsansA": "𝗔", "\\bot": "⊥", "\\gnsim": "⋧", "\\biO": "𝑶", "\\_m": "ₘ", "\\lneqq": "≨", "\\trnrl": "ɺ", "\\bbx": "𝕩", "\\:stars:": "🌠", "\\:oncoming_automobile:": "🚘", "\\mlcp": "⫛", "\\leftsquigarrow": "⇜", "\\1/8": "⅛", "\\blacktriangleright": "▶", "\\pitchfork": "⋔", "\\blockqtrshaded": "░", "\\bsansPi": "𝝥", "\\sansseven": "𝟩", "\\Updownarrow": "⇕", "\\:clock9:": "🕘", "\\Theta": "Θ", "\\:cake:": "🍰", "\\rightmoon": "☽", "\\ttc": "𝚌", "\\:chicken:": "🐔", "\\bbN": "ℕ", "\\0/3": "↉", "\\smile": "⌣", "\\lq": null, "\\mapsfrom": "↤", "\\perp": "⟂", "\\timesbar": "⨱", "\\bigtimes": "⨉", "\\:white_large_square:": "⬜", "\\leftharpoondown": "↽", "\\alpha": "α", "\\bsansI": "𝗜", "\\bfvarkappa": "𝛞", "\\upNu": "Ν", "\\sansg": "𝗀", "\\bisansh": "𝙝", "\\:facepunch:": "👊", "\\itimath": "𝚤", "\\:womens:": "🚺", "\\:syringe:": "💉", "\\sumint": "⨋", "\\bfQ": "𝐐", "\\plussubtwo": "⨧", "\\nleftrightarrow": "↮", "\\bsansK": "𝗞", "\\ttW": "𝚆", "\\smallblacktriangleright": "▸", "\\leftwhitearrow": "⇦", "\\rttrnr": "ɻ", "\\amalg": "⨿", "\\:kiss:": "💋", "\\bfr": "𝐫", "\\frakM": "𝔐", "\\nvleftarrowtail": "⬹", "\\biXi": "𝜩", "\\plussim": "⨦", "\\rvboxline": "⎹", "\\bfnu": "𝛎", "\\sterling": "£", "\\nvRightarrow": "⤃", "\\isanss": "𝘴", "\\theta": "θ", "\\bftau": "𝛕", "\\male": "♂", "\\LeftUpVectorBar": "⥘", "\\1/": "⅟", "\\bigslopedvee": "⩗", "\\blocklowhalf": "▄", "\\Alpha": "Α", "\\scrc": "𝒸", "\\:fire:": "🔥", "\\bbK": "𝕂", "\\:video_game:": "🎮", "\\fraks": "𝔰", "\\Sampi": "Ϡ", "\\overleftarrow": "⃖", "\\star": "⋆", "\\bsanseight": "𝟴", "\\bfS": "𝐒", "\\^J": "ᴶ", "\\bsansz": "𝘇", "\\itrho": "𝜌", "\\rtld": "ɖ", "\\bsansseven": "𝟳", "\\sbbrg": "̪", "\\:vs:": "🆚", "\\squarebotblack": "⬓", "\\gtreqless": "⋛", "\\dottimes": "⨰", "\\biB": "𝑩", "\\frakN": "𝔑", "\\forksnot": "⫝", "\\Angle": "⦜", "\\ReverseUpEquilibrium": "⥯", "\\:hotel:": "🏨", "\\:smile_cat:": "😸", "\\bsansW": "𝗪", "\\varisins": "⋳", "\\blacksmiley": "☻", "\\ddfnc": "⦙", "\\:birthday:": "🎂", "\\frakk": "𝔨", "\\nVtwoheadleftarrow": "⬵", "\\ttI": "𝙸", "\\checkmark": "✓", "\\bbh": "𝕙", "\\rl": "ɼ", "\\:abc:": "🔤", "\\bisansXi": "𝞝", "\\nsubseteqq": "⫅̸", "\\bfrho": "𝛒", "\\:large_blue_diamond:": "🔷", "\\isansd": "𝘥", "\\obar": "⌽", "\\:free:": "🆓", "\\rvbull": "◘", "\\:ok:": "🆗", "\\:persevere:": "😣", "\\bsansDelta": "𝝙", "\\:pineapple:": "🍍", "\\:tea:": "🍵", "\\bivarTheta": "𝜭", "\\:crossed_flags:": "🎌", "\\ocommatopright": "̕", "\\bfLambda": "𝚲", "\\:low_brightness:": "🔅", "\\perspcorrespond": "⩞", "\\twoheadrightarrow": "↠", "\\plustrif": "⨨", "\\bfpartial": "𝛛", "\\upwhitearrow": "⇧", "\\bsansvarpi": "𝞏", "\\sqrt": "√", "\\:hourglass:": "⌛", "\\plusdot": "⨥", "\\varTheta": "ϴ", "\\^m": "ᵐ", "\\ltcc": "⪦", "\\medblackstar": "⭑", "\\itU": "𝑈", "\\:vhs:": "📼", "\\:congratulations:": "㊗", "\\itp": "𝑝", "\\:black_medium_square:": "◼", "\\aleph": "ℵ", "\\:violin:": "🎻", "\\bisansnu": "𝞶", "\\tti": "𝚒", "\\:purse:": "👛", "\\^o": "ᵒ", "\\:joy:": "😂", "\\pm": "±", "\\bfXi": "𝚵", "\\disjquant": "⨈", "\\:ear:": "👂", "\\measuredangleleft": "⦛", "\\bbv": "𝕧", "\\bisansmu": "𝞵", "\\nvleftrightarrow": "⇹", "\\itF": "𝐹", "\\ito": "𝑜", "\\itUpsilon": "𝛶", "\\:left_luggage:": "🛅", "\\invv": "ʌ", "\\blockfull": "█", "\\subseteqq": "⫅", "\\:christmas_tree:": "🎄", "\\:angel:": "👼", "\\bfb": "𝐛", "\\bisansTau": "𝞣", "\\:point_up_2:": "👆", "\\bsansH": "𝗛", "\\:vertical_traffic_light:": "🚦", "\\subset": "⊂", "\\bsanstau": "𝞃", "\\thinspace": null, "\\fallingdotseq": "≒", "\\frakC": "ℭ", "\\invwhitelowerhalfcircle": "◛", "\\partial": "∂", "\\wedgedoublebar": "⩠", "\\eqqslantgtr": "⪜", "\\:u5272:": "🈹", "\\frakx": "𝔵", "\\bisansvarepsilon": "𝟄", "\\sansq": "𝗊", "\\Vvdash": "⊪", "\\wp": "℘", "\\bfomicron": "𝛐", "\\:door:": "🚪", "\\bisansgamma": "𝞬", "\\:clapper:": "🎬", "\\:radio:": "📻", "\\bsansX": "𝗫", "\\:rowboat:": "🚣", "\\ttz": "𝚣", "\\lneq": "⪇", "\\^e": "ᵉ", "\\varheartsuit": "♥", "\\bigstar": "★", "\\smblkdiamond": "⬩", "\\tdcol": "⫶", "\\ngeq": "≱", "\\supseteq": "⊇", "\\varrho": "ϱ", "\\dots": "…", "\\longleftrightarrow": "⟷", "\\:beer:": "🍺", "\\:anger:": "💢", "\\:clock230:": "🕝", "\\isins": "⋴", "\\gescc": "⪩", "\\threedangle": "⟀", "\\_o": "ₒ", "\\biTau": "𝜯", "\\:u6709:": "🈶", "\\diagup": "╱", "\\isansi": "𝘪", "\\rightwavearrow": "↝", "\\underbrace": "⏟", "\\:purple_heart:": "💜", "\\boxplus": "⊞", "\\:water_buffalo:": "🐃", "\\^x": "ˣ", "\\:clock930:": "🕤", "\\biChi": "𝜲", "\\ultriangle": "◸", "\\bfN": "𝐍", "\\:heartbeat:": "💓", "\\:lipstick:": "💄", "\\bscrH": "𝓗", "\\:rabbit2:": "🐇", "\\^0": "⁰", "\\enclosecircle": "⃝", "\\:ballot_box_with_check:": "☑", "\\biiota": "𝜾", "\\^alpha": "ᵅ", "\\:hearts:": "♥", "\\nvrightarrow": "⇸", "\\sanstwo": "𝟤", "\\imath": "ı", "\\biZeta": "𝜡", "\\bfiota": "𝛊", "\\:small_red_triangle_down:": "🔻", "\\boxbar": "◫", "\\Ldsh": "↲", "\\veebar": "⊻", "\\nsuccsim": "≿̸", "\\tto": "𝚘", "\\bisansy": "𝙮", "\\leftdasharrow": "⇠", "\\:flushed:": "😳", "\\triangletimes": "⨻", "\\closedvarcup": "⩌", "\\:hospital:": "🏥", "\\:point_down:": "👇", "\\minusrdots": "⨬", "\\bfbeta": "𝛃", "\\eqqplus": "⩱", "\\barleftarrow": "⇤", "\\bscrr": "𝓻", "\\isansN": "𝘕", "\\bbthree": "𝟛", "\\:crystal_ball:": "🔮", "\\:european_castle:": "🏰", "\\:clubs:": "♣", "\\itw": "𝑤", "\\:u5408:": "🈴", "\\:smirk:": "😏", "\\:raised_hands:": "🙌", "\\isansO": "𝘖", "\\bie": "𝒆", "\\rightleftharpoonsdown": "⥩", "\\acute": "́", "\\bsansl": "𝗹", "\\biu": "𝒖", "\\bigtriangledown": "▽", "\\sansh": "𝗁", "\\circledrightdot": "⚆", "\\:kissing_smiling_eyes:": "😙", "\\:baby_symbol:": "🚼", "\\Longmapsfrom": "⟽", "\\scrZ": "𝒵", "\\itvarrho": "𝜚", "\\:pouch:": "👝", "\\bsansC": "𝗖", "\\downdownarrows": "⇊", "\\^f": "ᶠ", "\\lowint": "⨜", "\\sansM": "𝖬", "\\blacklozenge": "⧫", "\\isansV": "𝘝", "\\:high_heel:": "👠", "\\:wedding:": "💒", "\\:wavy_dash:": "〰", "\\sansG": "𝖦", "\\:computer:": "💻", "\\turnk": "ʞ", "\\bigcupdot": "⨃", "\\iiint": "∭", "\\lvboxline": "⎸", "\\:ng:": "🆖", "\\subsetneq": "⊊", "\\ovhook": "̉", "\\frakf": "𝔣", "\\:put_litter_in_its_place:": "🚮", "\\itP": "𝑃", "\\:u6307:": "🈯", "\\:blue_car:": "🚙", "\\Sqcup": "⩏", "\\isansa": "𝘢", "\\DownRightTeeVector": "⥟", "\\bbC": "ℂ", "\\bfnabla": "𝛁", "\\saturn": "♄", "\\bsansBeta": "𝝗", "\\curlyeqsucc": "⋟", "\\:rage:": "😡", "\\veemidvert": "⩛", "\\leftouterjoin": "⟕", "\\hslash": "ℏ", "\\bbid": "ⅆ", "\\nVleftarrow": "⇺", "\\circleonrightarrow": "⇴", "\\ttY": "𝚈", "\\:factory:": "🏭", "\\blockhalfshaded": "▒", "\\brokenbar": "¦", "\\blacksquare": "■", "\\bisansi": "𝙞", "\\frakW": "𝔚", "\\bbd": "𝕕", "\\:ok_woman:": "🙆", "\\conjquant": "⨇", "\\biPi": "𝜫", "\\:wrench:": "🔧", "\\bisanspi": "𝞹", "\\:rice_scene:": "🎑", "\\:chocolate_bar:": "🍫", "\\:sob:": "😭", "\\aquarius": "♒", "\\isinvb": "⋸", "\\oturnedcomma": "̒", "\\bfvarepsilon": "𝛜", "\\dashv": "⊣", "\\:cactus:": "🌵", "\\ngtrsim": "≵", "\\_s": "ₛ", "\\sqsupset": "⊐", "\\diamond": "⋄", "\\Lap": "⧊", "\\otimesrhrim": "⨵", "\\LeftUpTeeVector": "⥠", "\\risingdotseq": "≓", "\\RightUpTeeVector": "⥜", "\\:bread:": "🍞", "\\bfEpsilon": "𝚬", "\\forall": "∀", "\\rightarrowtriangle": "⇾", "\\leftarrowx": "⬾", "\\bba": "𝕒", "\\supset": "⊃", "\\supsim": "⫈", "\\sharp": "♯", "\\_2": "₂", "\\epsilon": "ϵ", "\\dualmap": "⧟", "\\vrecto": "▯", "\\vrectangleblack": "▮", "\\strike": "̶", "\\:older_woman:": "👵", "\\sansK": "𝖪", "\\bfzero": "𝟎", "\\_p": "ₚ", "\\scry": "𝓎", "\\lfloor": "⌊", "\\:bear:": "🐻", "\\sphericalangle": "∢", "\\ttm": "𝚖", "\\rLarr": "⥄", "\\boxtimes": "⊠", "\\_i": "ᵢ", "\\:new_moon:": "🌑", "\\wedgeodot": "⩑", "\\interleave": "⫴", "\\:sake:": "🍶", "\\sansx": "𝗑", "\\Ddownarrow": "⤋", "\\nVrightarrow": "⇻", "\\:question:": "❓", "\\minusfdots": "⨫", "\\diceiv": "⚃", "\\ll": "≪", "\\Leftarrow": "⇐", "\\:hushed:": "😯", "\\defas": "⧋", "\\wr": "≀", "\\intcap": "⨙", "\\gtcc": "⪧", "\\:scroll:": "📜", "\\:leaves:": "🍃", "\\biv": "𝒗", "\\bisansm": "𝙢", "\\dotsminusdots": "∺", "\\scrV": "𝒱", "\\questiondown": "¿", "\\itN": "𝑁", "\\:jeans:": "👖", "\\ttA": "𝙰", "\\sansfive": "𝟧", "\\:dress:": "👗", "\\ttk": "𝚔", "\\bfrakd": "𝖉", "\\underleftrightarrow": "͍", "\\:ok_hand:": "👌", "\\intercal": "⊺", "\\:bee:": "🐝", "\\:aerial_tramway:": "🚡", "\\scrL": "ℒ", "\\bfp": "𝐩", "\\fourthroot": "∜", "\\dshfnc": "┆", "\\blackcircledrightdot": "⚈", "\\ttx": "𝚡", "\\:date:": "📅", "\\:dragon:": "🐉", "\\:clock12:": "🕛", "\\sqfr": "◨", "\\:runner:": "🏃", "\\1/5": "⅕", "\\coprod": "∐", "\\sansF": "𝖥", "\\^epsilon": "ᵋ", "\\cupdot": "⊍", "\\:white_medium_square:": "◻", "\\:ramen:": "🍜", "\\xrat": "℞", "\\blacklefthalfcircle": "◖", "\\isansR": "𝘙", "\\:bow:": "🙇", "\\bigcap": "⋂", "\\bibeta": "𝜷", "\\:money_with_wings:": "💸", "\\:tokyo_tower:": "🗼", "\\hlmrk": "ˑ", "\\Upsilon": "Υ", "\\arceq": "≘", "\\LeftUpDownVector": "⥑", "\\sanse": "𝖾", "\\bbseven": "𝟟", "\\rightarrowbackapprox": "⭈", "\\varspadesuit": "♤", "\\Mapsto": "⤇", "\\bivarpi": "𝝕", "\\:crocodile:": "🐊", "\\:heavy_check_mark:": "✔", "\\varisinobar": "⋶", "\\bfU": "𝐔", "\\:ideograph_advantage:": "🉐", "\\swarrow": "↙", "\\bfrako": "𝖔", "\\biQ": "𝑸", "\\invnot": "⌐", "\\:scream_cat:": "🙀", "\\LeftRightVector": "⥎", "\\bfrakW": "𝖂", "\\ittheta": "𝜃", "\\gtreqqless": "⪌", "\\:sunrise_over_mountains:": "🌄", "\\vdots": "⋮", "\\:hatching_chick:": "🐣", "\\bisansRho": "𝞠", "\\bisansepsilon": "𝞮", "\\:envelope_with_arrow:": "📩", "\\:beetle:": "🐞", "\\:clock6:": "🕕", "\\:bug:": "🐛", "\\bisansv": "𝙫", "\\Lleftarrow": "⇚", "\\:rice_ball:": "🍙", "\\nearrow": "↗", "\\:musical_note:": "🎵", "\\varnis": "⋻", "\\:rocket:": "🚀", "\\:grimacing:": "😬", "\\backpprime": "‶", "\\:snowman:": "⛄", "\\:kissing_cat:": "😽", "\\bfrakz": "𝖟", "\\breve": "̆", "\\angleubar": "⦤", "\\hatapprox": "⩯", "\\succeq": "⪰", "\\isansQ": "𝘘", "\\plushat": "⨣", "\\^L": "ᴸ", "\\int": "∫", "\\curlyeqprec": "⋞", "\\sansY": "𝖸", "\\bscrW": "𝓦", "\\neovsearrow": "⤮", "\\:watermelon:": "🍉", "\\:leopard:": "🐆", "\\bfAlpha": "𝚨", "\\lgE": "⪑", "\\bffive": "𝟓", "\\equalparallel": "⋕", "\\:running_shirt_with_sash:": "🎽", "\\precapprox": "⪷", "\\curvearrowright": "↷", "\\:movie_camera:": "🎥", "\\:spades:": "♠", "\\:arrow_up_small:": "🔼", "\\blacktriangledown": "▾", "\\:rabbit:": "🐰", "\\:floppy_disk:": "💾", "\\:information_source:": "ℹ", "\\itPhi": "𝛷", "\\:man:": "👨", "\\bisansOmega": "𝞨", "\\:dango:": "🍡", "\\trapezium": "⏢", "\\scro": "ℴ", "\\:no_entry_sign:": "🚫", "\\bbnine": "𝟡", "\\itdelta": "𝛿", "\\isansL": "𝘓", "\\sansN": "𝖭", "\\tau": "τ", "\\Uparrow": "⇑", "\\bisansu": "𝙪", "\\isansz": "𝘻", "\\nolinebreak": "⁠", "\\rangle": "⟩", "\\:art:": "🎨", "\\:soon:": "🔜", "\\esh": "ʃ", "\\_r": "ᵣ", "\\tieconcat": "⁀", "\\:bowling:": "🎳", "\\bsansm": "𝗺", "\\supseteqq": "⫆", "\\csup": "⫐", "\\bfrakx": "𝖝", "\\bilambda": "𝝀", "\\k": "̨", "\\nparallel": "∦", "\\:confused:": "😕", "\\:black_joker:": "🃏", "\\scrw": "𝓌", "\\ttthree": "𝟹", "\\bix": "𝒙", "\\bisansrho": "𝞺", "\\dotsim": "⩪", "\\:smiley_cat:": "😺", "\\preceqq": "⪳", "\\bscrz": "𝔃", "\\vysmblksquare": "⬝", "\\sansf": "𝖿", "\\itChi": "𝛸", "\\^U": "ᵁ", "\\bisansI": "𝙄", "\\frakw": "𝔴", "\\bfIota": "𝚰", "\\rtll": "ɭ", "\\bim": "𝒎", "\\precsim": "≾", "\\invw": "ʍ", "\\^E": "ᴱ", "\\:tanabata_tree:": "🎋", "\\upkoppa": "ϟ", "\\bsansOmega": "𝝮", "\\:notebook:": "📓", "\\notin": "∉", "\\frakl": "𝔩", "\\:memo:": "📝", "\\prime": "′", "\\biH": "𝑯", "\\itomicron": "𝜊", "\\Angstrom": "Å", "\\blockuphalf": "▀", "\\leftthreearrows": "⬱", "\\bisansvarTheta": "𝞡", "\\circledtwodots": "⚇", "\\sansnine": "𝟫", "\\bsansh": "𝗵", "\\ldots": "…", "\\scrx": "𝓍", "\\mdblklozenge": "⬧", "\\itvarsigma": "𝜍", "\\:bamboo:": "🎍", "\\bif": "𝒇", "\\midbarvee": "⩝", "\\RightUpDownVector": "⥏", "\\:sandal:": "👡", "\\:baseball:": "⚾", "\\bfH": "𝐇", "\\bscrh": "𝓱", "\\varpi": "ϖ", "\\circledast": "⊛", "\\frakh": "𝔥", "\\:triangular_ruler:": "📐", "\\_chi": "ᵪ", "\\scrf": "𝒻", "\\sqfse": "◪", "\\rightharpoonupdash": "⥬", "\\^a": "ᵃ", "\\^v": "ᵛ", "\\bisansV": "𝙑", "\\whiteinwhitetriangle": "⟁", "\\:straight_ruler:": "📏", "\\tona": "⤧", "\\isansw": "𝘸", "\\scre": "ℯ", "\\leftarrowtail": "↢", "\\smallni": "∍", "\\bisansvarphi": "𝟇", "\\measuredangle": "∡", "\\bfrakK": "𝕶", "\\LeftTeeVector": "⥚", "\\:night_with_stars:": "🌃", "\\:dizzy_face:": "😵", "\\scrr": "𝓇", "\\:cookie:": "🍪", "\\:inbox_tray:": "📥", "\\biW": "𝑾", "\\bsansnine": "𝟵", "\\:cow:": "🐮", "\\whitepointerleft": "◅", "\\3/8": "⅜", "\\frakz": "𝔷", "\\gtrsim": "≳", "\\bidelta": "𝜹", "\\downdasharrow": "⇣", "\\bfthree": "𝟑", "\\ittau": "𝜏", "\\:man_with_turban:": "👳", "\\:bullettrain_front:": "🚅", "\\oiint": "∯", "\\searrow": "↘", "\\nvtwoheadrightarrow": "⤀", "\\diceii": "⚁", "\\:dog2:": "🐕", "\\bic": "𝒄", "\\linefeed": "↴", "\\ttJ": "𝙹", "\\bisanseta": "𝞰", "\\bfrakO": "𝕺", "\\dyogh": "ʤ", "\\:scream:": "😱", "\\:japanese_ogre:": "👹", "\\sqrint": "⨖", "\\:weary:": "😩", "\\ddots": "⋱", "\\sansu": "𝗎", "\\:u7a7a:": "🈳", "\\bisansiota": "𝞲", "\\bscre": "𝓮", "\\:milky_way:": "🌌", "\\:m:": "Ⓜ", "\\:snowboarder:": "🏂", "\\simplus": "⨤", "\\bisansEpsilon": "𝞔", "\\mdlgblkcircle": "●", "\\:evergreen_tree:": "🌲", "\\bbq": "𝕢", "\\bsansepsilon": "𝝴", "\\isinobar": "⋷", "\\:satellite:": "📡", "\\neuter": "⚲", "\\:sparkles:": "✨", "\\:sushi:": "🍣", "\\squareulblack": "◩", "\\:seedling:": "🌱", "\\isansn": "𝘯", "\\leftharpoonsupdown": "⥢", "\\:monkey_face:": "🐵", "\\geqslant": "⩾", "\\^c": "ᶜ", "\\awint": "⨑", "\\bisanspsi": "𝟁", "\\veeeq": "≚", "\\itPi": "𝛱", "\\obslash": "⦸", "\\bsansvarsigma": "𝞁", "\\:crown:": "👑", "\\:clock1:": "🕐", "\\bisansPhi": "𝞥", "\\vartriangleright": "⊳", "\\bisansBeta": "𝞑", "\\nsupseteqq": "⫆̸", "\\bisansUpsilon": "𝞤", "\\subsup": "⫓", "\\:tongue:": "👅", "\\bixi": "𝝃", "\\ttS": "𝚂", "\\urarc": "◝", "\\bbL": "𝕃", "\\bis": "𝒔", "\\multimap": "⊸", "\\Delta": "Δ", "\\:space_invader:": "👾", "\\Rho": "Ρ", "\\bfh": "𝐡", "\\bfj": "𝐣", "\\:black_square_button:": "🔲", "\\highminus": "¯", "\\LeftDownTeeVector": "⥡", "\\ttt": "𝚝", "\\:house_with_garden:": "🏡", "\\nvLeftarrow": "⤂", "\\circlearrowright": "↻", "\\scrp": "𝓅", "\\:sweat_smile:": "😅", "\\sansX": "𝖷", "\\:wave:": "👋", "\\bscrG": "𝓖", "\\bsanssigma": "𝞂", "\\bsansw": "𝘄", "\\:sleeping:": "😴", "\\:sun_with_face:": "🌞", "\\:camera:": "📷", "\\:bath:": "🛀", "\\:flags:": "🎏", "\\bfY": "𝐘", "\\nleq": "≰", "\\:no_smoking:": "🚭", "\\biPhi": "𝜱", "\\bivarkappa": "𝝒", "\\frakv": "𝔳", "\\RightTeeVector": "⥛", "\\ttR": "𝚁", "\\rightharpoonup": "⇀", "\\:pig:": "🐷", "\\upand": "⅋", "\\geqq": "≧", "\\rmoustache": "⎱", "\\u": "˘", "\\bbpi": "ℼ", "\\Epsilon": "Ε", "\\leftrightharpoondownup": "⥋", "\\itJ": "𝐽", "\\RightDownTeeVector": "⥝", "\\1/7": "⅐", "\\bfx": "𝐱", "\\biRho": "𝜬", "\\gneq": "⪈", "\\itn": "𝑛", "\\curvearrowleft": "↶", "\\frakp": "𝔭", "\\isansW": "𝘞", "\\le": "≤", "\\leftcurvedarrow": "⬿", "\\bfD": "𝐃", "\\bfupsilon": "𝛖", "\\hermaphrodite": "⚥", "\\ulcorner": "⌜", "\\bsansTau": "𝝩", "\\intprodr": "⨽", "\\downarrow": "↓", "\\eulermascheroni": "ℇ", "\\:stuck_out_tongue_closed_eyes:": "😝", "\\downarrowbarred": "⤈", "\\leq": "≤", "\\sansC": "𝖢", "\\:trophy:": "🏆", "\\parallel": "∥", "\\squarehfill": "▤", "\\PropertyLine": "⅊", "\\leftleftarrows": "⇇", "\\bsansphi": "𝞅", "\\bbc": "𝕔", "\\updasharrow": "⇡", "\\bisansP": "𝙋", "\\bsansx": "𝘅", "\\^-": "⁻", "\\:kissing_heart:": "😘", "\\sansz": "𝗓", "\\bfRho": "𝚸", "\\ttZ": "𝚉", "\\oplus": "⊕", "\\ttV": "𝚅", "\\itH": "𝐻", "\\sansW": "𝖶", "\\cup": "∪", "\\ringplus": "⨢", "\\lsimg": "⪏", "\\ttone": "𝟷", "\\rdiagovsearrow": "⤰", "\\bscrp": "𝓹", "\\bbr": "𝕣", "\\scrG": "𝒢", "\\trianglerighteq": "⊵", "\\emptysetocirc": "⦲", "\\euler": "ℯ", "\\bfB": "𝐁", "\\exists": "∃", "\\:fearful:": "😨", "\\bscrJ": "𝓙", "\\:pill:": "💊", "\\bsansomicron": "𝝾", "\\endash": "–", "\\:pencil2:": "✏", "\\ttl": "𝚕", "\\bisansvartheta": "𝟅", "\\bbsemi": "⨟", "\\:foggy:": "🌁", "\\:hibiscus:": "🌺", "\\smt": "⪪", "\\scrP": "𝒫", "\\trna": "ɐ", "\\wideangledown": "⦦", "\\bby": "𝕪", "\\subsetdot": "⪽", "\\scrD": "𝒟", "\\frakP": "𝔓", "\\tripleplus": "⧻", "\\vertoverlay": "⃒", "\\:iphone:": "📱", "\\:libra:": "♎", "\\rtln": "ɳ", "\\:no_bicycles:": "🚳", "\\ite": "𝑒", "\\rq": null, "\\bsansy": "𝘆", "\\guilsinglright": "›", "\\bisansc": "𝙘", "\\:ghost:": "👻", "\\:rooster:": "🐓", "\\frakY": "𝔜", "\\nless": "≮", "\\:shaved_ice:": "🍧", "\\bfrakq": "𝖖", "\\npreccurlyeq": "⋠", "\\bfrakL": "𝕷", "\\:no_good:": "🙅", "\\:mens:": "🚹", "\\bisansX": "𝙓", "\\:crescent_moon:": "🌙", "\\bisansD": "𝘿", "\\hvlig": "ƕ", "\\blockrighthalf": "▐", "\\bscrB": "𝓑", "\\ttn": "𝚗", "\\:octopus:": "🐙", "\\:athletic_shoe:": "👟", "\\bsanskappa": "𝝹", "\\llcorner": "⌞", "\\circleddash": "⊝", "\\:relaxed:": "☺", "\\:small_orange_diamond:": "🔸", "\\precneqq": "⪵", "\\nsupseteq": "⊉", "\\iota": "ι", "\\impliedby": "⟸", "\\Rsh": "↱", "\\bisanssigma": "𝞼", "\\frakD": "𝔇", "\\itx": "𝑥", "\\underleftarrow": "⃮", "\\measangledltosw": "⦯", "\\eqqsim": "⩳", "\\bfrakR": "𝕽", "\\surd": "√", "\\:six_pointed_star:": "🔯", "\\ointctrclockwise": "∳", "\\bagmember": "⋿", "\\bfvarTheta": "𝚹", "\\isansp": "𝘱", "\\measangledrtose": "⦮", "\\:ring:": "💍", "\\doubleplus": "⧺", "\\Game": "⅁", "\\_x": "ₓ", "\\sanseight": "𝟪", "\\NestedGreaterGreater": "⪢", "\\pentagon": "⬠", "\\supmult": "⫂", "\\bfu": "𝐮", "\\sansLturned": "⅂", "\\bumpeqq": "⪮", "\\leftarrowtriangle": "⇽", "\\itgamma": "𝛾", "\\smallblacktriangleleft": "◂", "\\:waning_crescent_moon:": "🌘", "\\nRightarrow": "⇏", "\\backepsilon": "϶", "\\nsucccurlyeq": "⋡", "\\ng": "ŋ", "\\:older_man:": "👴", "\\isansF": "𝘍", "\\S": "§", "\\backppprime": "‷", "\\leftdotarrow": "⬸", "\\omega": "ω", "\\boxcircle": "⧇", "\\isansu": "𝘶", "\\:top:": "🔝", "\\sansy": "𝗒", "\\Bumpeq": "≎", "\\daleth": "ℸ", "\\csub": "⫏", "\\recorder": "⌕", "\\cupvee": "⩅", "\\bbR": "ℝ", "\\bfG": "𝐆", "\\:star:": "⭐", "\\shuffle": "⧢", "\\quotedblleft": "“", "\\ttK": "𝙺", "\\:currency_exchange:": "💱", "\\clomeg": "ɷ", "\\bigblacktriangleup": "▲", "\\circlevertfill": "◍", "\\:restroom:": "🚻", "\\frakA": "𝔄", "\\:skull:": "💀", "\\:white_medium_small_square:": "◽", "\\leftarrowplus": "⥆", "\\bbt": "𝕥", "\\mars": "♂", "\\:fried_shrimp:": "🍤", "\\acidfree": "♾", "\\lesssim": "≲", "\\isansl": "𝘭", "\\:cocktail:": "🍸", "\\boxquestion": "⍰", "\\:white_small_square:": "▫", "\\:passport_control:": "🛂", "\\bbeight": "𝟠", "\\Colon": "∷", "\\ltphi": "ɸ", "\\frakO": "𝔒", "\\bsansomega": "𝞈", "\\:yen:": "💴", "\\sansv": "𝗏", "\\dot": "̇", "\\Omega": "Ω", "\\ttG": "𝙶", "\\bisansR": "𝙍", "\\^1": "¹", "\\itl": "𝑙", "\\pluseqq": "⩲", "\\blkhorzoval": "⬬", "\\mdblkdiamond": "⬥", "\\itOmega": "𝛺", "\\approxnotequal": "≆", "\\isansx": "𝘹", "\\subsetneqq": "⫋", "\\neg": "¬", "\\bscrx": "𝔁", "\\barwedge": "⊼", "\\sansL": "𝖫", "\\:minidisc:": "💽", "\\bfkappa": "𝛋", "\\leftbkarrow": "⤌", "\\Cap": "⋒", "\\bfz": "𝐳", "\\bbW": "𝕎", "\\:keycap_ten:": "🔟", "\\:microscope:": "🔬", "\\:hear_no_evil:": "🙉", "\\Equiv": "≣", "\\:u7981:": "🈲", "\\accurrent": "⏦", "\\draftingarrow": "➛", "\\bbGamma": "ℾ", "\\DH": "Ð", "\\circleonleftarrow": "⬰", "\\egsdot": "⪘", "\\bsansLambda": "𝝠", "\\bivartheta": "𝝑", "\\ttC": "𝙲", "\\bscrn": "𝓷", "\\:cancer:": "♋", "\\:family:": "👪", "\\:gift_heart:": "💝", "\\ttH": "𝙷", "\\profsurf": "⌓", "\\_v": "ᵥ", "\\:ambulance:": "🚑", "\\:nose:": "👃", "\\bisansr": "𝙧", "\\bivarepsilon": "𝝐", "\\sqlozenge": "⌑", "\\:8ball:": "🎱", "\\:u55b6:": "🈺", "\\ttfour": "𝟺", "\\gtrless": "≷", "\\:unlock:": "🔓", "\\:beginner:": "🔰", "\\turnednot": "⌙", "\\wedgedot": "⟑", "\\:apple:": "🍎", "\\bsansu": "𝘂", "\\:no_mouth:": "😶", "\\lescc": "⪨", "\\sanso": "𝗈", "\\isansY": "𝘠", "\\hspace": null, "\\:baby_chick:": "🐤", "\\trnr": "ɹ", "\\frake": "𝔢", "\\bsanschi": "𝞆", "\\fullouterjoin": "⟗", "\\:small_blue_diamond:": "🔹", "\\isansj": "𝘫", "\\nHuparrow": "⇞", "\\gamma": "γ", "\\bflambda": "𝛌", "\\varstar": "✶", "\\:see_no_evil:": "🙈", "\\Doteq": "≑", "\\:confetti_ball:": "🎊", "\\ttD": "𝙳", "\\:dvd:": "📀", "\\:exclamation:": "❗", "\\nsubset": "⊄", "\\bbn": "𝕟", "\\1/6": "⅙", "\\bisanso": "𝙤", "\\P": "¶", "\\ttT": "𝚃", "\\ltquest": "⩻", "\\:koko:": "🈁", "\\bsansGamma": "𝝘", "\\smeparsl": "⧤", "\\:snowflake:": "❄", "\\bisansx": "𝙭", "\\bisansa": "𝙖", "\\bsansU": "𝗨", "\\:disappointed:": "😞", "\\Vdash": "⊩", "\\^G": "ᴳ", "\\:speech_balloon:": "💬", "\\:pager:": "📟", "\\:id:": "🆔", "\\gemini": "♊", "\\bivarsigma": "𝝇", "\\bff": "𝐟", "\\_1": "₁", "\\bfvarrho": "𝛠", "\\:statue_of_liberty:": "🗽", "\\ttj": "𝚓", "\\itL": "𝐿", "\\ita": "𝑎", "\\biEpsilon": "𝜠", "\\:left_right_arrow:": "↔", "\\supdsub": "⫘", "\\Zeta": "Ζ", "\\nisd": "⋺", "\\biR": "𝑹", "\\bigamma": "𝜸", "\\bisansJ": "𝙅", "\\circledcirc": "⊚", "\\:innocent:": "😇", "\\:neutral_face:": "😐", "\\:clock3:": "🕒", "\\towa": "⤪", "\\schwa": "ə", "\\bfe": "𝐞", "\\chi": "χ", "\\itD": "𝐷", "\\mapsdown": "↧", "\\:bank:": "🏦", "\\squareurquad": "◳", "\\bfrakU": "𝖀", "\\bisanst": "𝙩", "\\^V": "ⱽ", "\\rightthreearrows": "⇶", "\\:-1:": "👎", "\\:postal_horn:": "📯", "\\:man_with_gua_pi_mao:": "👲", "\\:aquarius:": "♒", "\\bisansl": "𝙡", "\\scrm": "𝓂", "\\its": "𝑠", "\\sansH": "𝖧", "\\:clock10:": "🕙", "\\RightUpVectorBar": "⥔", "\\itX": "𝑋", "\\verymuchless": "⋘", "\\rrbracket": "⟧", "\\bfc": "𝐜", "\\triangleq": "≜", "\\:boom:": "💥", "\\ogreaterthan": "⧁", "\\Beta": "Β", "\\ast": "∗", "\\bsansq": "𝗾", "\\bsansOmicron": "𝝤", "\\enclosesquare": "⃞", "\\ncong": "≇", "\\^theta": "ᶿ", "\\Succ": "⪼", "\\:clock330:": "🕞", "\\_schwa": "ₔ", "\\ttf": "𝚏", "\\bsansEta": "𝝜", "\\dddot": "⃛", "\\scri": "𝒾", "\\:chart_with_upwards_trend:": "📈", "\\bfeta": "𝛈", "\\bscrN": "𝓝", "\\circlearrowleft": "↺", "\\blackinwhitediamond": "◈", "\\:dog:": "🐶", "\\diamondsuit": "♢", "\\llbracket": "⟦", "\\UUparrow": "⟰", "\\bfphi": "𝛟", "\\succ": "≻", "\\bfd": "𝐝", "\\bisansIota": "𝞘", "\\bbgamma": "ℽ", "\\biomicron": "𝝄", "\\bbT": "𝕋", "\\pscrv": "ʋ", "\\twoheadmapsto": "⤅", "\\DownRightVectorBar": "⥗", "\\elsdot": "⪗", "\\:speaker:": "🔈", "\\rightangle": "∟", "\\xor": "⊻", "\\:cyclone:": "🌀", "\\:musical_keyboard:": "🎹", "\\:airplane:": "✈", "\\isansJ": "𝘑", "\\measeq": "≞", "\\:registered:": "®", "\\itAlpha": "𝛢", "\\looparrowleft": "↫", "\\nVtwoheadrightarrow": "⤁", "\\:ship:": "🚢", "\\div": "÷", "\\longmapsfrom": "⟻", "\\squarehvfill": "▦", "\\bfv": "𝐯", "\\:tent:": "⛺", "\\leftrightharpoonupdown": "⥊", "\\And": "⩓", "\\bisansTheta": "𝞗", "\\:monkey:": "🐒", "\\bscrC": "𝓒", "\\cancer": "♋", "\\lrblacktriangle": "◢", "\\:flashlight:": "🔦", "\\:star2:": "🌟", "\\scrI": "ℐ", "\\rightouterjoin": "⟖", "\\bfrakZ": "𝖅", "\\twoheadmapsfrom": "⬶", "\\bisansE": "𝙀", "\\binu": "𝝂", "\\:clock8:": "🕗", "\\^g": "ᵍ", "\\bfOmicron": "𝚶", "\\biq": "𝒒", "\\:wolf:": "🐺", "\\bfrakI": "𝕴", "\\leftwavearrow": "↜", "\\notlessgreater": "≸", "\\:hamburger:": "🍔", "\\:church:": "⛪", "\\3/5": "⅗", "\\blackpointerright": "►", "\\cdotp": "·", "\\:rice_cracker:": "🍘", "\\:fountain:": "⛲", "\\biY": "𝒀", "\\:sweet_potato:": "🍠", "\\notbackslash": "⍀", "\\blacktriangle": "▴", "\\mdblkcircle": "⚫", "\\ordmasculine": "º", "\\DownLeftTeeVector": "⥞", "\\:baby:": "👶", "\\:volcano:": "🌋", "\\bfraki": "𝖎", "\\planck": "ℎ", "\\:vibration_mode:": "📳", "\\bsansRho": "𝝦", "\\:mask:": "😷", "\\vDash": "⊨", "\\:arrows_clockwise:": "🔃", "\\bscrX": "𝓧", "\\:revolving_hearts:": "💞", "\\RuleDelayed": "⧴", "\\:cinema:": "🎦", "\\bfepsilon": "𝛆", "\\ggg": "⋙", "\\:angry:": "😠", "\\:mushroom:": "🍄", "\\:grapes:": "🍇", "\\rightthreetimes": "⋌", "\\bscrR": "𝓡", "\\O": "Ø", "\\curlywedge": "⋏", "\\itk": "𝑘", "\\circleulquad": "◴", "\\itphi": "𝜑", "\\leftrightarrows": "⇆", "\\biSigma": "𝜮", "\\^(": "⁽", "\\1/2": "½", "\\iint": "∬", "\\squarelrquad": "◲", "\\measanglerdtose": "⦪", "\\:post_office:": "🏣", "\\nprecsim": "≾̸", "\\:large_orange_diamond:": "🔶", "\\bisansDelta": "𝞓", "\\bbw": "𝕨", "\\:wine_glass:": "🍷", "\\bfrakP": "𝕻", "\\ordfeminine": "ª", "\\bsansY": "𝗬", "\\Nwarrow": "⇖", "\\bsansmu": "𝝻", "\\ae": "æ", "\\:credit_card:": "💳", "\\infty": "∞", "\\eqgtr": "⋝", "\\:honey_pot:": "🍯", "\\:yum:": "😋", "\\leftharpoonaccent": "⃐", "\\bbb": "𝕓", "\\bisansf": "𝙛", "\\bisansChi": "𝞦", "\\btdl": "ɬ", "\\:rotating_light:": "🚨", "\\:railway_car:": "🚃", "\\smblksquare": "▪", "\\lrcorner": "⌟", "\\birho": "𝝆", "\\:herb:": "🌿", "\\^M": "ᴹ", "\\_8": "₈", "\\bit": "𝒕", "\\bisansvarsigma": "𝞻", "\\:ledger:": "📒", "\\frakK": "𝔎", "\\:pouting_cat:": "😾", "\\isansC": "𝘊", "\\circledwhitebullet": "⦾", "\\itEta": "𝛨", "\\isansG": "𝘎", "\\:city_sunset:": "🌆", "\\measanglelutonw": "⦩", "\\neqsim": "≂̸", "\\smwhtsquare": "▫", "\\Koppa": "Ϟ", "\\gggnest": "⫸", "\\:whale2:": "🐋", "\\angle": "∠", "\\itSigma": "𝛴", "\\underrightarrow": "⃯", "\\:baggage_claim:": "🛄", "\\:waxing_crescent_moon:": "🌒", "\\twoheadrightarrowtail": "⤖", "\\_u": "ᵤ", "\\ddotseq": "⩷", "\\boxupcaret": "⍓", "\\approxeqq": "⩰", "\\^k": "ᵏ", "\\:heart_eyes_cat:": "😻", "\\isansK": "𝘒", "\\bfGamma": "𝚪", "\\bscrS": "𝓢", "\\forkv": "⫙", "\\updownarrowbar": "↨", "\\upepsilon": "ε", "\\:black_large_square:": "⬛", "\\pertenthousand": "‱", "\\precnsim": "⋨", "\\reapos": "‛", "\\biC": "𝑪", "\\:eggplant:": "🍆", "\\aries": "♈", "\\itMu": "𝛭", "\\nleftarrow": "↚", "\\mho": "℧", "\\benzenr": "⏣", "\\:smiley:": "😃", "\\sinewave": "∿", "\\bbii": "ⅈ", "\\leftrightarrowcircle": "⥈", "\\itK": "𝐾", "\\bsolhsub": "⟈", "\\:panda_face:": "🐼", "\\bsansf": "𝗳", "\\bsansj": "𝗷", "\\itI": "𝐼", "\\bisanspartial": "𝟃", "\\circlelrquad": "◶", "\\lessdot": "⋖", "\\subsetplus": "⪿", "\\bfP": "𝐏", "\\blackcircledtwodots": "⚉", "\\bfk": "𝐤", "\\rsolbar": "⧷", "\\sansa": "𝖺", "\\nVtwoheadrightarrowtail": "⤘", "\\ttX": "𝚇", "\\ularc": "◜", "\\aa": "å", "\\1/9": "⅑", "\\:hotsprings:": "♨", "\\:two_women_holding_hands:": "👭", "\\:x:": "❌", "\\itnabla": "𝛻", "\\emptysetoarr": "⦳", "\\topbot": "⌶", "\\itvarpi": "𝜛", "\\check": "̌", "\\bfNu": "𝚴", "\\Dashv": "⫤", "\\sansb": "𝖻", "\\bfSigma": "𝚺", "\\bbg": "𝕘", "\\subsetapprox": "⫉", "\\hookleftarrow": "↩", "\\bisansK": "𝙆", "\\bfDelta": "𝚫", "\\csube": "⫑", "\\natural": "♮", "\\postalmark": "〒", "\\frakc": "𝔠", "\\dashrightharpoondown": "⥭", "\\^H": "ᴴ", "\\gimel": "ℷ", "\\iiiint": "⨌", "\\:expressionless:": "😑", "\\:cd:": "💿", "\\ttq": "𝚚", "\\TH": "Þ", "\\:fax:": "📠", "\\clwintegral": "∱", "\\:school:": "🏫", "\\circledbullet": "⦿", "\\:ferris_wheel:": "🎡", "\\:u6708:": "🈷", "\\hat": "̂", "\\:speak_no_evil:": "🙊", "\\bscrP": "𝓟", "\\Iota": "Ι", "\\trnt": "ʇ", "\\isansU": "𝘜", "\\enspace": null, "\\:blowfish:": "🐡", "\\itvarTheta": "𝛳", "\\leftharpoonup": "↼", "\\barleftarrowrightarrowbar": "↹", "\\:grey_question:": "❔", "\\rightwhitearrow": "⇨", "\\nVrightarrowtail": "⤕", "\\Leftrightarrow": "⇔", "\\lceil": "⌈", "\\bfi": "𝐢", "\\ne": "≠", "\\varsubsetneqq": "⊊︀", "\\bfrakf": "𝖋", "\\:horse:": "🐴", "\\itRho": "𝛲", "\\subedot": "⫃", "\\:grinning:": "😀", "\\dashleftharpoondown": "⥫", "\\:japanese_castle:": "🏯", "\\sqspne": "⋥", "\\:rainbow:": "🌈", "\\bfm": "𝐦", "\\:elephant:": "🐘", "\\:green_book:": "📗", "\\:eyeglasses:": "👓", "\\bbZ": "ℤ", "\\itiota": "𝜄", "\\:japan:": "🗾", "\\succsim": "≿", "\\dashV": "⫣", "\\itzeta": "𝜁", "\\biA": "𝑨", "\\scrM": "ℳ", "\\delta": "δ", "\\twoheaduparrow": "↟", "\\eqslantless": "⪕", "\\bfvarsigma": "𝛓", "\\:arrows_counterclockwise:": "🔄", "\\^i": "ⁱ", "\\bfrakM": "𝕸", "\\nsubseteq": "⊈", "\\bisansomega": "𝟂", "\\^N": "ᴺ", "\\:on:": "🔛", "\\:lips:": "👄", "\\tildetrpl": "≋", "\\dbkarow": "⤏", "\\:sunny:": "☀", "\\nasymp": "≭", "\\bbV": "𝕍", "\\sansc": "𝖼", "\\bfrakC": "𝕮", "\\isansB": "𝘉", "\\bisansPsi": "𝞧", "\\squaretopblack": "⬒", "\\:arrow_down:": "⬇", "\\:dollar:": "💵", "\\barovernorthwestarrow": "↸", "\\:soccer:": "⚽", "\\bsansE": "𝗘", "\\bscrd": "𝓭", "\\squarevfill": "▥", "\\:construction_worker:": "👷", "\\LeftVectorBar": "⥒", "\\:potable_water:": "🚰", "\\:arrow_down_small:": "🔽", "\\:fire_engine:": "🚒", "\\ttfive": "𝟻", "\\dsol": "⧶", "\\odot": "⊙", "\\bisansS": "𝙎", "\\Pi": "Π", "\\:earth_americas:": "🌎", "\\:first_quarter_moon_with_face:": "🌛", "\\bscrY": "𝓨", "\\:bird:": "🐦", "\\rightarrowsupset": "⭄", "\\itu": "𝑢", "\\quarternote": "♩", "\\measangleldtosw": "⦫", "\\:ox:": "🐂", "\\wedgeq": "≙", "\\hrectangleblack": "▬", "\\hookrightarrow": "↪", "\\nis": "⋼", "\\bbX": "𝕏", "\\:clock1230:": "🕧", "\\diamondleftarrow": "⤝", "\\:anguished:": "😧", "\\bfTau": "𝚻", "\\:loop:": "➿", "\\bsansZ": "𝗭", "\\biphi": "𝝋", "\\bfraka": "𝖆", "\\preceq": "⪯", "\\Gamma": "Γ", "\\^d": "ᵈ", "\\bscrM": "𝓜", "\\tosa": "⤩", "\\otimeslhrim": "⨴", "\\inglst": "ʖ", "\\:warning:": "⚠", "\\ulblacktriangle": "◤", "\\bil": "𝒍", "\\leftdbkarrow": "⤎", "\\itb": "𝑏", "\\scrK": "𝒦", "\\gsiml": "⪐", "\\:rat:": "🐀", "\\:pig2:": "🐖", "\\:car:": "🚗", "\\trny": "ʎ", "\\^3": "³", "\\:black_circle:": "⚫", "\\:busstop:": "🚏", "\\:boy:": "👦", "\\ttM": "𝙼", "\\bisansAlpha": "𝞐", "\\^5": "⁵", "\\rightleftharpoonsup": "⥨", "\\ltcir": "⩹", "\\varhexagonlrbonds": "⌬", "\\scrR": "ℛ", "\\:video_camera:": "📹", "\\:blue_heart:": "💙", "\\Kappa": "Κ", "\\vdash": "⊢", "\\because": "∵", "\\barcap": "⩃", "\\elinters": "⏧", "\\bfvarpi": "𝛡", "\\Times": "⨯", "\\:pizza:": "🍕", "\\:chestnut:": "🌰", "\\varniobar": "⋽", "\\^iota": "ᶥ", "\\nVleftrightarrow": "⇼", "\\lrarc": "◞", "\\setminus": "∖", "\\doublepipe": "ǂ", "\\bsansone": "𝟭", "\\:person_with_blond_hair:": "👱", "\\bisansPi": "𝞟", "\\:no_pedestrians:": "🚷", "\\:sunflower:": "🌻", "\\biX": "𝑿", "\\scrd": "𝒹", "\\ppprime": "‴", "\\bsansg": "𝗴", "\\notgreaterless": "≹", "\\bscrI": "𝓘", "\\biy": "𝒚", "\\bisansz": "𝙯", "\\sansQ": "𝖰", "\\:banana:": "🍌", "\\:open_hands:": "👐", "\\:tada:": "🎉", "\\bscrK": "𝓚", "\\itxi": "𝜉", "\\bfpi": "𝛑", "\\bsansPsi": "𝝭", "\\leftthreetimes": "⋋", "\\bfrakc": "𝖈", "\\jupiter": "♃", "\\tta": "𝚊", "\\bumpeq": "≏", "\\:palm_tree:": "🌴", "\\opluslhrim": "⨭", "\\:busts_in_silhouette:": "👥", "\\mdwhtdiamond": "⬦", "\\itT": "𝑇", "\\:bento:": "🍱", "\\diamondtopblack": "⬘", "\\:rewind:": "⏪", "\\ttE": "𝙴", "\\bfA": "𝐀", "\\:princess:": "👸", "\\upomicron": "ο", "\\bsansT": "𝗧", "\\bisansC": "𝘾", "\\trnm": "ɯ", "\\bfrakD": "𝕯", "\\:arrow_upper_right:": "↗", "\\upsampi": "ϡ", "\\quotedblright": "”", "\\itDelta": "𝛥", "\\^y": "ʸ", "\\bisansupsilon": "𝞾", "\\:sheep:": "🐑", "\\:girl:": "👧", "\\bfM": "𝐌", "\\otimes": "⊗", "\\bichi": "𝝌", "\\vartriangleleft": "⊲", "\\:bomb:": "💣", "\\:full_moon_with_face:": "🌝", "\\Psi": "Ψ", "\\scrb": "𝒷", "\\scrv": "𝓋", "\\:whale:": "🐳", "\\:black_medium_small_square:": "◾", "\\bfone": "𝟏", "\\bfraku": "𝖚", "\\biUpsilon": "𝜰", "\\:flower_playing_cards:": "🎴", "\\sansn": "𝗇", "\\:do_not_litter:": "🚯", "\\:golf:": "⛳", "\\big": "𝒈", "\\bscrw": "𝔀", "\\scrW": "𝒲", "\\_)": "₎", "\\not": "̸", "\\circledequal": "⊜", "\\rightanglemdot": "⦝", "\\biAlpha": "𝜜", "\\:red_circle:": "🔴", "\\:bust_in_silhouette:": "👤", "\\bsansd": "𝗱", "\\bisanschi": "𝟀", "\\:goat:": "🐐", "\\upstigma": "ϛ", "\\digamma": "ϝ", "\\bsanseta": "𝝶", "\\:arrow_right:": "➡", "\\bfrakr": "𝖗", "\\:sleepy:": "😪", "\\bbG": "𝔾", "\\gsime": "⪎", "\\:arrow_upper_left:": "↖", "\\jmath": "ȷ", "\\bfraky": "𝖞", "\\blackinwhitesquare": "▣", "\\bsansgamma": "𝝲", "\\diagdown": "╲", "\\bigslopedwedge": "⩘", "\\supsup": "⫖", "\\:secret:": "㊙", "\\bigcup": "⋃", "\\bfT": "𝐓", "\\varhexagonblack": "⬢", "\\iff": "⟺", "\\isansm": "𝘮", "\\backprime": "‵", "\\lambda": "λ", "\\triangledown": "▿", "\\closedvarcap": "⩍", "\\pbgam": "ɤ", "\\eqqless": "⪙", "\\bfrakl": "𝖑", "\\varsupsetneq": "⊋︀", "\\low": "˕", "\\medwhitestar": "⭐", "\\isansb": "𝘣", "\\:point_up:": "☝", "\\supsub": "⫔", "\\lazysinv": "∾", "\\asteq": "⩮", "\\itV": "𝑉", "\\:rose:": "🌹", "\\vysmwhtsquare": "⬞", "\\:arrow_up_down:": "↕", "\\bisansGamma": "𝞒", "\\:tiger2:": "🐅", "\\:+1:": "👍", "\\sqcap": "⊓", "\\:department_store:": "🏬", "\\succnapprox": "⪺", "\\bbsix": "𝟞", "\\:helicopter:": "🚁", "\\ttL": "𝙻", "\\:fish:": "🐟", "\\^9": "⁹", "\\_h": "ₕ", "\\dlcorn": "⎣", "\\:ticket:": "🎫", "\\:trolleybus:": "🚎", "\\rightarrow": "→", "\\frakB": "𝔅", "\\rightpentagon": "⭔", "\\circletophalfblack": "◓", "\\:bus:": "🚌", "\\overbar": "̅", "\\ttv": "𝚟", "\\zeta": "ζ", "\\:heavy_plus_sign:": "➕", "\\:crying_cat_face:": "😿", "\\:boar:": "🐗", "\\bbPi": "ℿ", "\\:coffee:": "☕", "\\:briefcase:": "💼", "\\^O": "ᴼ", "\\lpargt": "⦠", "\\bscrm": "𝓶", "\\^7": "⁷", "\\triangleplus": "⨹", "\\:diamonds:": "♦", "\\bbI": "𝕀", "\\sansP": "𝖯", "\\tteight": "𝟾", "\\bisanslambda": "𝞴", "\\yogh": "ʒ", "\\:stuck_out_tongue_winking_eye:": "😜", "\\:two_hearts:": "💕", "\\glst": "ʔ", "\\annuity": "⃧", "\\:zap:": "⚡", "\\sanssix": "𝟨", "\\blackrighthalfcircle": "◗", "\\:mount_fuji:": "🗻", "\\minusdot": "⨪", "\\circledR": "®", "\\nVdash": "⊮", "\\:back:": "🔙", "\\:penguin:": "🐧", "\\:couplekiss:": "💏", "\\Digamma": "Ϝ", "\\verti": "ˌ", "\\eqless": "⋜", "\\toea": "⤨", "\\frakd": "𝔡", "\\:poodle:": "🐩", "\\dingasterisk": "✽", "\\:school_satchel:": "🎒", "\\:alien:": "👽", "\\rceil": "⌉", "\\bivarphi": "𝝓", "\\longrightsquigarrow": "⟿", "\\_e": "ₑ", "\\sansd": "𝖽", "\\biF": "𝑭", "\\bscru": "𝓾", "\\biOmicron": "𝜪", "\\:stew:": "🍲", "\\:poultry_leg:": "🍗", "\\fhr": "ɾ", "\\blackcircleulquadwhite": "◕", "\\oslash": "⊘", "\\:mountain_cableway:": "🚠", "\\simminussim": "⩬", "\\:tram:": "🚊", "\\Chi": "Χ", "\\sqfl": "◧", "\\:pound:": "💷", "\\scrX": "𝒳", "\\:radio_button:": "🔘", "\\:eight_spoked_asterisk:": "✳", "\\models": "⊧", "\\:muscle:": "💪", "\\:bikini:": "👙", "\\ttF": "𝙵", "\\:metro:": "🚇", "\\^4": "⁴", "\\bisanskappa": "𝞳", "\\leftarrowbsimilar": "⭋", "\\sqsubseteq": "⊑", "\\bscrV": "𝓥", "\\:white_circle:": "⚪", "\\fltns": "⏥", "\\bitau": "𝝉", "\\bitheta": "𝜽", "\\:izakaya_lantern:": "🏮", "\\biS": "𝑺", "\\bik": "𝒌", "\\between": "≬", "\\blockthreeqtrshaded": "▓", "\\frown": "⌢", "\\RoundImplies": "⥰", "\\:candy:": "🍬", "\\bsansthree": "𝟯", "\\fraki": "𝔦", "\\tilde": "̃", "\\rightleftarrows": "⇄", "\\fdiagovnearrow": "⤯", "\\biw": "𝒘", "\\bfo": "𝐨", "\\scrs": "𝓈", "\\Im": "ℑ", "\\bisansvarrho": "𝟈", "\\whtvertoval": "⬯", "\\smallin": "∊", "\\:corn:": "🌽", "\\bfrakV": "𝖁", "\\:clipboard:": "📋", "\\bsansChi": "𝝬", "\\ge": "≥", "\\squareulquad": "◰", "\\biKappa": "𝜥", "\\turnangle": "⦢", "\\wideutilde": "̰", "\\trianglerightblack": "◮", "\\uparrow": "↑", "\\_4": "₄", "\\bisansvarpi": "𝟉", "\\:blue_book:": "📘", "\\bscrs": "𝓼", "\\frakU": "𝔘", "\\nVDash": "⊯", "\\downharpoonsleftright": "⥥", "\\yen": "¥", "\\bbB": "𝔹", "\\bfZ": "𝐙", "\\:swimmer:": "🏊", "\\:chart:": "💹", "\\bfrakm": "𝖒", "\\forks": "⫝̸", "\\:footprints:": "👣", "\\psi": "ψ", "\\gesdotol": "⪄", "\\botsemicircle": "◡", "\\updownharpoonrightleft": "⥌", "\\bisansj": "𝙟", "\\olessthan": "⧀", "\\Downarrow": "⇓", "\\:clock2:": "🕑", "\\:clock7:": "🕖", "\\Longmapsto": "⟾", "\\gesdot": "⪀", "\\NotLessLess": "≪̸", "\\visiblespace": "␣", "\\glE": "⪒", "\\twocaps": "⩋", "\\bsansupsilon": "𝞄", "\\:feet:": "🐾", "\\Elroang": "⦆", "\\asteraccent": "⃰", "\\leftharpoonupdash": "⥪", "\\^D": "ᴰ", "\\:cow2:": "🐄", "\\wedgemidvert": "⩚", "\\dicev": "⚄", "\\2/5": "⅖", "\\_3": "₃", "\\bisansH": "𝙃", "\\bisansL": "𝙇", "\\scrk": "𝓀", "\\rightleftharpoons": "⇌", "\\bfgamma": "𝛄", "\\:tangerine:": "🍊", "\\isansP": "𝘗", "\\scrg": "ℊ", "\\ttB": "𝙱", "\\isanse": "𝘦", "\\rais": "˔", "\\itA": "𝐴", "\\bfrakn": "𝖓", "\\sansZ": "𝖹", "\\bbiD": "ⅅ", "\\scrn": "𝓃", "\\:wheelchair:": "♿", "\\3/4": "¾", "\\prurel": "⊰", "\\bsansk": "𝗸", "\\verts": "ˈ", "\\perthousand": "‰", "\\bfK": "𝐊", "\\scrY": "𝒴", "\\scrt": "𝓉", "\\isansy": "𝘺", "\\Vert": "‖", "\\_k": "ₖ", "\\:smile:": "😄", "\\biV": "𝑽", "\\bsanslambda": "𝝺", "\\c": "̧", "\\blackpointerleft": "◄", "\\bft": "𝐭", "\\:arrow_double_down:": "⏬", "\\bigodot": "⨀", "\\bsimilarleftarrow": "⭁", "\\bbQ": "ℚ", "\\bfxi": "𝛏", "\\biLambda": "𝜦", "\\:clock430:": "🕟", "\\Rightarrow": "⇒", "\\bsansvarkappa": "𝞌", "\\scra": "𝒶", "\\bsansnabla": "𝝯", "\\xi": "ξ", "\\lessapprox": "⪅", "\\:anchor:": "⚓", "\\to": "→", "\\itPsi": "𝛹", "\\:toilet:": "🚽", "\\upoldkoppa": "ϙ", "\\scrN": "𝒩", "\\prec": "≺", "\\:gift:": "🎁", "\\:arrow_heading_down:": "⤵", "\\bsansS": "𝗦", "\\bfJ": "𝐉", "\\:egg:": "🍳", "\\:shell:": "🐚", "\\downharpoonleft": "⇃", "\\phi": "ϕ", "\\:clock130:": "🕜", "\\lozenge": "◊", "\\circledparallel": "⦷", "\\:pear:": "🍐", "\\widebridgeabove": "⃩", "\\:newspaper:": "📰", "\\:horse_racing:": "🏇", "\\sphericalangleup": "⦡", "\\bsansAlpha": "𝝖", "\\heartsuit": "♡", "\\circledstar": "✪", "\\:heavy_multiplication_x:": "✖", "\\venus": "♀", "\\partialmeetcontraction": "⪣", "\\squarecrossfill": "▩", "\\approx": "≈", "\\bscrO": "𝓞", "\\ntriangleleft": "⋪", "\\barvee": "⊽", "\\pluto": "♇", "\\kappa": "κ", "\\:hamster:": "🐹", "\\mdsmwhtsquare": "◽", "\\whthorzoval": "⬭", "\\blocklefthalf": "▌", "\\sansE": "𝖤", "\\:surfer:": "🏄", "\\questeq": "≟", "\\:clock11:": "🕚", "\\ttO": "𝙾", "\\bfrakS": "𝕾", "\\NotGreaterGreater": "≫̸", "\\bsansB": "𝗕", "\\:bookmark_tabs:": "📑", "\\LLeftarrow": "⭅", "\\trnmlr": "ɰ", "\\:hand:": "✋", "\\intcup": "⨚", "\\^delta": "ᵟ", "\\:saxophone:": "🎷", "\\bisansG": "𝙂", "\\:information_desk_person:": "💁", "\\:page_facing_up:": "📄", "\\itXi": "𝛯", "\\neptune": "♆", "\\lgblkcircle": "⬤", "\\:book:": "📖", "\\scrH": "ℋ", "\\Join": "⨝", "\\bipsi": "𝝍", "\\bsansIota": "𝝞", "\\:melon:": "🍈", "\\:blossom:": "🌼", "\\sansB": "𝖡", "\\:gun:": "🔫", "\\:small_red_triangle:": "🔺", "\\nexists": "∄", "\\nVleftarrowtail": "⬺", "\\bsansZeta": "𝝛", "\\circleurquadblack": "◔", "\\:ice_cream:": "🍨", "\\oplusrhrim": "⨮", "\\bsansG": "𝗚", "\\OE": "Œ", "\\underbracket": "⎵", "\\capricornus": "♑", "\\bsanstwo": "𝟮", "\\:ant:": "🐜", "\\:couple:": "👫", "\\itM": "𝑀", "\\bsansv": "𝘃", "\\:abcd:": "🔡", "\\bfrakk": "𝖐", "\\bscrQ": "𝓠", "\\:football:": "🏈", "\\modtwosum": "⨊", "\\measanglerutone": "⦨", "\\sansLmirrored": "⅃", "\\pes": "₧", "\\frakL": "𝔏", "\\bsansxi": "𝝽", "\\scrU": "𝒰", "\\:guitar:": "🎸", "\\bisansalpha": "𝞪", "\\angdnr": "⦟", "\\:email:": "✉", "\\Xi": "Ξ", "\\bsansN": "𝗡", "\\bsanspi": "𝝿", "\\frakr": "𝔯", "\\bfrakQ": "𝕼", "\\bbH": "ℍ", "\\_gamma": "ᵧ", "\\lrtriangle": "◿", "\\congdot": "⩭", "\\:ribbon:": "🎀", "\\bscrf": "𝓯", "\\bsansF": "𝗙", "\\bisansp": "𝙥", "\\ttsix": "𝟼", "\\itLambda": "𝛬", "\\equivDD": "⩸", "\\biM": "𝑴", "\\Finv": "Ⅎ", "\\:rugby_football:": "🏉", "\\bsanst": "𝘁", "\\:calendar:": "📆", "\\:lock:": "🔒", "\\smalltriangleleft": "◃", "\\bsansnu": "𝝼", "\\bsansL": "𝗟", "\\nLeftarrow": "⇍", "\\:ocean:": "🌊", "\\Nearrow": "⇗", "\\:nail_care:": "💅", "\\Longleftarrow": "⟸", "\\square": "□", "\\isanso": "𝘰", "\\Yup": "⅄", "\\clubsuit": "♣", "\\:hocho:": "🔪", "\\Stigma": "Ϛ", "\\5/8": "⅝", "\\:clock530:": "🕠", "\\emptyset": "∅", "\\bsansp": "𝗽", "\\itvarphi": "𝜙", "\\:blush:": "😊", "\\bisansn": "𝙣", "\\ttp": "𝚙", "\\beth": "ℶ", "\\itj": "𝑗", "\\:train2:": "🚆", "\\itpi": "𝜋", "\\bfrakt": "𝖙", "\\_-": "₋", "\\bfsigma": "𝛔", "\\itE": "𝐸", "\\threeunderdot": "⃨", "\\:euro:": "💶", "\\:frog:": "🐸", "\\frakF": "𝔉", "\\midbarwedge": "⩜", "\\sqcup": "⊔", "\\bikappa": "𝜿", "\\Longrightarrow": "⟹", "\\dagger": "†", "\\:meat_on_bone:": "🍖", "\\supsetdot": "⪾", "\\bbf": "𝕗", "\\:full_moon:": "🌕", "\\:leo:": "♌", "\\supsetapprox": "⫊", "\\ttP": "𝙿", "\\:b:": "🅱", "\\allequal": "≌", "\\bfV": "𝐕", "\\del": "∇", "\\female": "♀", "\\bsansc": "𝗰", "\\^T": "ᵀ", "\\capdot": "⩀", "\\ntrianglerighteq": "⋭", "\\nni": "∌", "\\:pensive:": "😔", "\\:dolls:": "🎎", "\\:dolphin:": "🐬", "\\rdiagovfdiag": "⤫", "\\mapsto": "↦", "\\:confounded:": "😖", "\\maltese": "✠", "\\mdlgblkdiamond": "◆", "\\taurus": "♉", "\\bfq": "𝐪", "\\4/5": "⅘", "\\^8": "⁸", "\\:heavy_dollar_sign:": "💲", "\\^p": "ᵖ", "\\sum": "∑", "\\sansS": "𝖲", "\\:end:": "🔚", "\\:tophat:": "🎩", "\\uranus": "♅", "\\biepsilon": "𝜺", "\\nbumpeq": "≏̸", "\\tth": "𝚑", "\\mdlgwhtdiamond": "◇", "\\biZ": "𝒁", "\\biGamma": "𝜞", "\\bsansKappa": "𝝟", "\\:fallen_leaf:": "🍂", "\\:oncoming_bus:": "🚍", "\\gg": "≫", "\\bfrakB": "𝕭", "\\glj": "⪤", "\\frakt": "𝔱", "\\hexagon": "⎔", "\\:sweat:": "😓", "\\oe": "œ", "\\:green_apple:": "🍏", "\\bbl": "𝕝", "\\ttu": "𝚞", "\\bfDigamma": "𝟊", "\\:grin:": "😁", "\\:mans_shoe:": "👞", "\\equiv": "≡", "\\:clock730:": "🕢", "\\bbo": "𝕠", "\\bfMu": "𝚳", "\\nrleg": "ƞ", "\\bigotimes": "⨂", "\\bsansn": "𝗻", "\\isinE": "⋹", "\\:tennis:": "🎾", "\\whitearrowupfrombar": "⇪", "\\bsansO": "𝗢", "\\scrQ": "𝒬", "\\eqslantgtr": "⪖", "\\scpolint": "⨓", "\\nwarrow": "↖", "\\bfvartheta": "𝛝", "\\leqq": "≦", "\\:tomato:": "🍅", "\\urtriangle": "◹", "\\biP": "𝑷", "\\dottedcircle": "◌", "\\bfl": "𝐥", "\\gtquest": "⩼", "\\:seat:": "💺", "\\^r": "ʳ", "\\:u6e80:": "🈵", "\\complement": "∁", "\\biL": "𝑳", "\\ttw": "𝚠", "\\biOmega": "𝜴", "\\simless": "⪝", "\\sqsubsetneq": "⋤", "\\_rho": "ᵨ", "\\itIota": "𝛪", "\\upMu": "Μ", "\\bscrU": "𝓤", "\\isansq": "𝘲", "\\bfF": "𝐅", "\\Eta": "Η", "\\vartriangle": "▵", "\\bfrakv": "𝖛", "\\asymp": "≍", "\\times": "×", "\\ss": "ß", "\\:umbrella:": "☔", "\\upOmicron": "Ο", "\\:arrow_backward:": "◀", "\\suphsub": "⫗", "\\:diamond_shape_with_a_dot_inside:": "💠", "\\circleurquad": "◷", "\\:shower:": "🚿", "\\:sparkle:": "❇", "\\droang": "̚", "\\leftarrowbackapprox": "⭂", "\\nvdash": "⊬", "\\bfTheta": "𝚯", "\\:sparkler:": "🎇", "\\oiiint": "∰", "\\:icecream:": "🍦", "\\succneq": "⪲", "\\ttQ": "𝚀", "\\bbs": "𝕤", "\\emptysetoarrl": "⦴", "\\ntrianglelefteq": "⋬", "\\bigvee": "⋁", "\\minus": "−", "\\submult": "⫁", "\\bisansQ": "𝙌", "\\lsime": "⪍", "\\:twisted_rightwards_arrows:": "🔀", "\\:love_hotel:": "🏩", "\\bsansXi": "𝝣", "\\scorpio": "♏", "\\upharpoonright": "↾", "\\:clock5:": "🕔", "\\:dart:": "🎯", "\\:performing_arts:": "🎭", "\\sansm": "𝗆", "\\bsansvartheta": "𝞋", "\\:heartpulse:": "💗", "\\increment": "∆", "\\bftwo": "𝟐", "\\leftrightharpoonsup": "⥦", "\\fraky": "𝔶", "\\:link:": "🔗", "\\bisanstau": "𝞽", "\\otimeshat": "⨶", "\\bsansNu": "𝝢", "\\dblarrowupdown": "⇅", "\\:no_entry:": "⛔", "\\isanst": "𝘵", "\\scurel": "⊱", "\\triangleminus": "⨺", "\\ddot": "̈", "\\hexagonblack": "⬣", "\\:sparkling_heart:": "💖", "\\scrA": "𝒜", "\\:frowning:": "😦", "\\:eight_pointed_black_star:": "✴", "\\gesles": "⪔", "\\:ab:": "🆎", "\\ltimes": "⋉", "\\leftrightarrow": "↔", "\\^P": "ᴾ", "\\:person_with_pouting_face:": "🙎", "\\:accept:": "🉑", "\\mid": "∣", "\\bivarrho": "𝝔", "\\sansT": "𝖳", "\\sqfnw": "┙", "\\isansD": "𝘋", "\\^=": "⁼", "\\bar": "̄", "\\rtlt": "ʈ", "\\biK": "𝑲", "\\subseteq": "⊆", "\\squareneswfill": "▨", "\\isansT": "𝘛", "\\isansr": "𝘳", "\\Longleftrightarrow": "⟺", "\\bigbot": "⟘", "\\varbarwedge": "⌅", "\\:train:": "🚋", "\\mapsup": "↥", "\\scrz": "𝓏", "\\_9": "₉", "\\:bike:": "🚲", "\\:underage:": "🔞", "\\bfy": "𝐲", "\\th": "þ", "\\bscrZ": "𝓩", "\\frakT": "𝔗", "\\Searrow": "⇘", "\\tte": "𝚎", "\\:sound:": "🔉", "\\:koala:": "🐨", "\\closedvarcupsmashprod": "⩐", "\\itq": "𝑞", "\\nwovnearrow": "⤲", "\\bsansfive": "𝟱", "\\suphsol": "⟉", "\\bisansZ": "𝙕", "\\:cop:": "👮", "\\bsansrho": "𝞀", "\\rightarrowplus": "⥅", "\\:mahjong:": "🀄", "\\bscrv": "𝓿", "\\:virgo:": "♍", "\\:tiger:": "🐯", "\\UpArrowBar": "⤒", "\\:tropical_drink:": "🍹", "\\bfs": "𝐬", "\\:cloud:": "☁", "\\itpsi": "𝜓", "\\^+": "⁺", "\\:nut_and_bolt:": "🔩", "\\trnh": "ɥ", "\\boxbslash": "⧅", "\\biz": "𝒛", "\\cirfnint": "⨐", "\\bbi": "𝕚", "\\bisansvarkappa": "𝟆", "\\itepsilon": "𝜀", "\\nLeftrightarrow": "⇎", "\\itomega": "𝜔", "\\hrectangle": "▭", "\\bbM": "𝕄", "\\:closed_book:": "📕", "\\bfX": "𝐗", "\\precnapprox": "⪹", "\\pentagonblack": "⬟", "\\sansi": "𝗂", "\\:pushpin:": "📌", "\\squoval": "▢", "\\sqsubset": "⊏", "\\underrightharpoondown": "⃬", "\\biJ": "𝑱", "\\bin": "𝒏", "\\bsansJ": "𝗝", "\\:stuck_out_tongue:": "😛", "\\smblklozenge": "⬪", "\\bullseye": "◎", "\\leftrightsquigarrow": "↭", "\\^t": "ᵗ", "\\Sigma": "Σ", "\\longmapsto": "⟼", "\\:new:": "🆕", "\\virgo": "♍", "\\:1234:": "🔢", "\\boxast": "⧆", "\\bfUpsilon": "𝚼", "\\csupe": "⫒", "\\drbkarrow": "⤐", "\\bfrakY": "𝖄", "\\bscrl": "𝓵", "\\:interrobang:": "⁉", "\\ell": "ℓ", "\\:japanese_goblin:": "👺", "\\:wink:": "😉", "\\bsanse": "𝗲", "\\sanszero": "𝟢", "\\twoheadleftarrow": "↞", "\\bfeight": "𝟖", "\\rightdasharrow": "⇢", "\\sanst": "𝗍", "\\sansO": "𝖮", "\\:cry:": "😢", "\\libra": "♎", "\\:mountain_bicyclist:": "🚵", "\\Lambda": "Λ", "\\sqsupseteq": "⊒", "\\Rdsh": "↳", "\\varveebar": "⩡", "\\^n": "ⁿ", "\\conictaper": "⌲", "\\biBeta": "𝜝", "\\mdwhtcircle": "⚪", "\\coloneq": "≔", "\\pisces": "♓", "\\:white_check_mark:": "✅", "\\RightVectorBar": "⥓", "\\bfnine": "𝟗", "\\upharpoonleft": "↿", "\\sansl": "𝗅", "\\biIota": "𝜤", "\\bisansdelta": "𝞭", "\\:yellow_heart:": "💛", "\\bisansKappa": "𝞙", "\\:four_leaf_clover:": "🍀", "\\sout": "̶", "\\isansH": "𝘏", "\\:cherries:": "🍒", "\\:custard:": "🍮", "\\:arrow_lower_left:": "↙", "\\_beta": "ᵦ", "\\sansR": "𝖱", "\\:last_quarter_moon:": "🌗", "\\isansh": "𝘩", "\\cdot": "⋅", "\\bid": "𝒅", "\\rtimes": "⋊", "\\:slot_machine:": "🎰", "\\nmid": "∤", "\\trianglecdot": "◬", "\\bfZeta": "𝚭", "\\^j": "ʲ", "\\DownLeftVectorBar": "⥖", "\\Supset": "⋑", "\\pgamma": "ɣ", "\\:part_alternation_mark:": "〽", "\\upharpoonsleftright": "⥣", "\\:tulip:": "🌷", "\\:black_small_square:": "▪", "\\smalltriangleright": "▹", "\\^beta": "ᵝ", "\\bigtop": "⟙", "\\bipi": "𝝅", "\\:waning_gibbous_moon:": "🌖", "\\:articulated_lorry:": "🚛", "\\eqsim": "≂", "\\:ski:": "🎿", "\\pupsil": "ʊ", "\\nsqsubseteq": "⋢", "\\lesdot": "⩿", "\\scrl": "𝓁", "\\bbO": "𝕆", "\\therefore": "∴", "\\iti": "𝑖", "\\sansk": "𝗄", "\\reglst": "ʕ", "\\intprod": "⨼", "\\frakn": "𝔫", "\\^A": "ᴬ", "\\scrF": "ℱ", "\\:cat2:": "🐈", "\\rtlr": "ɽ", "\\subsub": "⫕", "\\strns": "⏤", "\\uparrowbarred": "⤉", "\\^Phi": "ᶲ", "\\adots": "⋰", "\\dh": "ð", "\\:loudspeaker:": "📢", "\\:monorail:": "🚝", "\\gla": "⪥", "\\:spaghetti:": "🍝", "\\:hatched_chick:": "🐥", "\\:sunrise:": "🌅", "\\:woman:": "👩", "\\mdsmwhtcircle": "⚬", "\\bfEta": "𝚮", "\\eqdot": "⩦", "\\biPsi": "𝜳", "\\bbS": "𝕊", "\\:scissors:": "✂", "\\:hankey:": "💩", "\\bfrakj": "𝖏", "\\biDelta": "𝜟", "\\scrh": "𝒽", "\\cirfl": "◐", "\\:doughnut:": "🍩", "\\:e-mail:": "📧", "\\frakV": "𝔙", "\\longleftsquigarrow": "⬳", "\\boxdiag": "⧄", "\\:grey_exclamation:": "❕", "\\itKappa": "𝛫", "\\:ear_of_rice:": "🌾", "\\varsigma": "ς", "\\mdblksquare": "◼", "\\scrB": "ℬ", "\\bipartial": "𝝏", "\\:fishing_pole_and_fish:": "🎣", "\\nu": "ν", "\\leftrightharpoons": "⇋", "\\flat": "♭", "\\itTheta": "𝛩", "\\npolint": "⨔", "\\lnapprox": "⪉", "\\astrosun": "☉", "\\:capricorn:": "♑", "\\scrS": "𝒮", "\\bsansEpsilon": "𝝚", "\\:maple_leaf:": "🍁", "\\:pisces:": "♓", "\\:chart_with_downwards_trend:": "📉", "\\upvarbeta": "ϐ", "\\bisansomicron": "𝞸", "\\RightDownVectorBar": "⥕", "\\odiv": "⨸", "\\late": "⪭", "\\bscrt": "𝓽", "\\odotslashdot": "⦼", "\\sansD": "𝖣", "\\eqeqeq": "⩶", "\\frakH": "ℌ", "\\:mailbox:": "📫", "\\:mouse2:": "🐁", "\\LeftDownVectorBar": "⥙", "\\nsucceq": "⪰̸", "\\^K": "ᴷ", "\\:scorpius:": "♏", "\\squarellquad": "◱", "\\bfR": "𝐑", "\\:partly_sunny:": "⛅", "\\NestedLessLess": "⪡", "\\o": "ø", "\\triangleright": "▷", "\\:walking:": "🚶", "\\bfw": "𝐰", "\\bbE": "𝔼", "\\geq": "≥", "\\bfKappa": "𝚱", "\\rightarrowtail": "↣", "\\diceiii": "⚂", "\\^chi": "ᵡ", "\\leqqslant": "⫹", "\\topsemicircle": "◠", "\\itpartial": "𝜕", "\\itR": "𝑅", "\\bisansZeta": "𝞕", "\\frakZ": "ℨ", "\\bfrakT": "𝕿", "\\succnsim": "⋩", "\\bfn": "𝐧", "\\bsansPhi": "𝝫", "\\isansk": "𝘬", "\\quad": null, "\\eqqgtr": "⪚", "\\bfI": "𝐈", "\\ity": "𝑦", "\\ltln": "ɲ", "\\RightTriangleBar": "⧐", "\\:customs:": "🛃", "\\Subset": "⋐", "\\Rlarr": "⥂", "\\:arrow_up:": "⬆", "\\leftmoon": "☾", "\\:mailbox_with_mail:": "📬", "\\_+": "₊", "\\:alarm_clock:": "⏰", "\\:mobile_phone_off:": "📴", "\\:signal_strength:": "📶", "\\:office:": "🏢", "\\pprime": "″", "\\bfO": "𝐎", "\\vee": "∨", "\\:last_quarter_moon_with_face:": "🌜", "\\:couple_with_heart:": "💑", "\\itB": "𝐵", "\\1/10": "⅒", "\\intBar": "⨎", "\\:convenience_store:": "🏪", "\\rightharpoonaccent": "⃑", "\\bisansw": "𝙬", "\\mu": "μ", "\\sansI": "𝖨", "\\:paperclip:": "📎", "\\:open_file_folder:": "📂", "\\diamondrightblack": "⬗", "\\:parking:": "🅿", "\\exclamdown": "¡", "\\:postbox:": "📮", "\\:clock1030:": "🕥", "\\nlesssim": "≴", "\\mercury": "☿", "\\bscrF": "𝓕", "\\:city_sunrise:": "🌇", "\\tttwo": "𝟸", "\\:curry:": "🍛", "\\:droplet:": "💧", "\\:hourglass_flowing_sand:": "⏳", "\\hbar": "ħ", "\\itZ": "𝑍", "\\varepsilon": "ε", "\\tty": "𝚢", "\\bsimilarrightarrow": "⭇", "\\:point_left:": "👈", "\\:disappointed_relieved:": "😥", "\\:bookmark:": "🔖", "\\scru": "𝓊", "\\bsansSigma": "𝝨", "\\frakm": "𝔪", "\\nvDash": "⊭", "\\:leftwards_arrow_with_hook:": "↩", "\\:bicyclist:": "🚴", "\\:boat:": "⛵", "\\:circus_tent:": "🎪", "\\uminus": "⩁", "\\updownarrow": "↕", "\\itG": "𝐺", "\\:triumph:": "😤", "\\itm": "𝑚", "\\Or": "⩔", "\\lsqhook": "⫍", "\\tesh": "ʧ", "\\bbP": "ℙ", "\\:turtle:": "🐢", "\\Coloneq": "⩴", "\\:new_moon_with_face:": "🌚", "\\AA": "Å", "\\frakj": "𝔧", "\\bfalpha": "𝛂", "\\:key:": "🔑", "\\Uuparrow": "⤊", "\\biMu": "𝜧", "\\thickspace": null, "\\bsansQ": "𝗤", "\\bizeta": "𝜻", "\\bsansvarTheta": "𝝧", "\\gesdoto": "⪂", "\\bscrb": "𝓫", "\\:necktie:": "👔", "\\bisanse": "𝙚", "\\turnediota": "℩", "\\:telephone_receiver:": "📞", "\\bscrj": "𝓳", "\\:lollipop:": "🍭", "\\:heart:": "❤", "\\:dancers:": "👯", "\\nabla": "∇", "\\Cup": "⋓", "\\propto": "∝", "\\bfPsi": "𝚿", "\\biomega": "𝝎", "\\bbij": "ⅉ" }));

/***/ })
/******/ ]);
});
//# sourceMappingURL=markdownShortcuts.js.map