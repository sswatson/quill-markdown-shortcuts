 // Quill.js Plugin - Markdown Shortcuts
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

import Quill from 'quill';

import HorizontalRule from './formats/hr';
import { tabCompletionMap } from './constants';

const Block = Quill.import('blots/block')

Quill.register('formats/horizontal', HorizontalRule)

class MarkdownShortcuts {
  constructor (quill, options) {
    this.quill = quill
    this.options = options

    this.ignoreTags = ['PRE']
    this.matches = [
      {
        name: 'header',
        pattern: /^(#){1,6}\s/g,
        action: (text, selection, pattern) => {
          var match = pattern.exec(text)
          if (!match) return
          const size = match[0].length
          // Need to defer this action https://github.com/quilljs/quill/issues/1134
          setTimeout(() => {
            this.quill.formatLine(selection.index, 0, 'header', size - 1)
            this.quill.deleteText(selection.index - size, size)
          }, 0)
        }
      },
      {
        name: 'blockquote',
        pattern: /^(>)\s/g,
        action: (text, selection) => {
          // Need to defer this action https://github.com/quilljs/quill/issues/1134
          setTimeout(() => {
            this.quill.formatLine(selection.index, 1, 'blockquote', true)
            this.quill.deleteText(selection.index - 2, 2)
          }, 0)
        }
      },
      {
        name: 'code-block',
        pattern: /^`{3}(?:\s|\n)/g,
        action: (text, selection) => {
          // Need to defer this action https://github.com/quilljs/quill/issues/1134
          setTimeout(() => {
            this.quill.formatLine(selection.index, 1, 'code-block', true)
            this.quill.deleteText(selection.index - 4, 4)
          }, 0)
        }
      },
      {
        name: 'bolditalic',
        pattern: /(?:\*){3}(.+?)(?:\*){3}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {bold: true, italic: true})
            this.quill.format('bold', false)
          }, 0)
        }
      },
      {
        name: 'bold',
        pattern: /(?:\*){2}(.+?)(?:\*){2}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {bold: true})
            this.quill.format('bold', false)
          }, 0)
        }
      },
      {
        name: 'italic',
        pattern: /(?:\*){1}(.+?)(?:\*){1}/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {italic: true})
            this.quill.format('italic', false)
          }, 0)
        }
      },
      {
        name: 'strikethrough',
        pattern: /(?:~~)(.+?)(?:~~)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {strike: true})
            this.quill.format('strike', false)
          }, 0)
        }
      },
     {
        name: 'displayformula',
        pattern: /(?:\$\$)(.+?)(?:\$\$)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertEmbed(startIndex, 'formula', '\\displaystyle ' + matchedText)
            this.quill.insertText(startIndex + 1, '\n', 'align', 'center')
          }, 0)
        }
     },
     {
        name: 'formula',
        pattern: /(?:\$)(.+?)(?:\$)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertEmbed(startIndex, 'formula', matchedText)
          }, 0)
        }
      },
      {
        name: 'code',
        pattern: /(?:`)(.+?)(?:`)/g,
        action: (text, selection, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          setTimeout(() => {
            this.quill.deleteText(startIndex, annotatedText.length)
            this.quill.insertText(startIndex, matchedText, {code: true})
          }, 0)
        }
      },
      {
        name: 'hr',
        pattern: /^(-\s?){3}/g,
        action: (text, selection, pattern) => {
          setTimeout(() => {
            const matchedText = text.match(pattern)[0];
            const startIndex = selection.index - matchedText.length
            this.quill.deleteText(startIndex, matchedText.length)

            this.quill.insertEmbed(startIndex, 'hr', true, Quill.sources.USER);
            this.quill.setSelection(startIndex + 1, Quill.sources.SILENT);
          }, 0)
        }
      },
      {
        name: 'plus-ul',
        // Quill 1.3.5 already treat * as another trigger for bullet lists
        pattern: /^\+\s$/g,
        action: (text, selection, pattern) => {
          setTimeout(() => {
            this.quill.formatLine(selection.index, 1, 'list', 'unordered')
            this.quill.deleteText(selection.index - 2, 2)
          }, 0)
        }
      },
      {
        name: 'image',
        pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, selection, pattern) => {
          const startIndex = text.search(pattern)
          const matchedText = text.match(pattern)[0]
          // const hrefText = text.match(/(?:!\[(.*?)\])/g)[0]
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0]
          const start = selection.index - matchedText.length - 1
          if (startIndex !== -1) {
            setTimeout(() => {
              this.quill.deleteText(start, matchedText.length)
              this.quill.insertEmbed(start, 'image', hrefLink.slice(1, hrefLink.length - 1))
            }, 0)
          }
        }
      },
      {
        name: 'link',
        pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, selection, pattern) => {
          const startIndex = text.search(pattern)
          const matchedText = text.match(pattern)[0]
          const hrefText = text.match(/(?:\[(.*?)\])/g)[0]
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0]
          const start = selection.index - matchedText.length - 1
          if (startIndex !== -1) {
            setTimeout(() => {
              this.quill.deleteText(start, matchedText.length)
              this.quill.insertText(start, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1))
            }, 0)
          }
        }
      }
    ]

    this.quill.keyboard.bindings[9].unshift({
      key: 9,
      format: ['code-block'],
      handler: () => this.onTab(true),
    });
    this.quill.keyboard.addBinding({ key: 9 }, () => this.onTab())

    // Handler that looks for insert deltas that match specific characters
    this.quill.on('text-change', (delta, oldContents, source) => {
      for (let i = 0; i < delta.ops.length; i++) {
        if (delta.ops[i].hasOwnProperty('insert')) {
          if (delta.ops[i].insert === ' ') {
            this.onSpace()
          }
        } else if (delta.ops[i].hasOwnProperty('delete') && source === 'user') {
           this.onDelete()
        }
      }
    })
  }

  isValid (text, tagName) {
    return (
      typeof text !== 'undefined' &&
      text &&
      this.ignoreTags.indexOf(tagName) === -1
    )
  }

  onTab(codeBlock=false) {
    const selection = this.quill.getSelection()
    if (!selection) true
    const [line, offset] = this.quill.getLine(selection.index)
    const lineStart = selection.index - offset

    const text = this.quill.getContents(lineStart, offset)
                           .filter(op => typeof op.insert === 'string' || op.insert.formula)
                           .map(op => op.insert.formula ? " " : op.insert)
                           .join('');
    let j = 1;
    while (j <= text.length) {
      const idx = text.length - j;
      if (text[idx] === ' ') {
        return true
      } else if (text[idx] === '\\') {
        const potentialMatch = text.slice(-j)
        if (tabCompletionMap.has(potentialMatch)) {
          const quillIndex = selection.index - j
          this.quill.deleteText(quillIndex, j)
          this.quill.insertText(quillIndex, tabCompletionMap.get(potentialMatch))
          return false
        } else {
          return true;
        }
      } else {
        j++;
      }
    }
    return true;
  }

  onSpace () {
    const selection = this.quill.getSelection()
    if (!selection) return
    const [line, offset] = this.quill.getLine(selection.index)
    const lineStart = selection.index - offset

    // formulas count as a single character for insertion/deletion
    // purposes, yet they don't show up the output of getText.
    // So we have to compensate:
    // see https://github.com/quilljs/quill/blob/cb0fb6630a59aa8efff3e0d1caa6645e565d19bd/core/editor.js#L147
    // for the implementation of getText, which is what we were using before here
    const text = this.quill.getContents(lineStart, selection.index)
                           .filter(op => typeof op.insert === 'string' || op.insert.formula)
                           .map(op => op.insert.formula ? " " : op.insert)
                           .join('');

    if (this.isValid(text, line.domNode.tagName)) {
      for (let match of this.matches) {
        const matchedText = text.match(match.pattern)
        if (matchedText) {
          // We need to replace only matched text not the whole line
          match.action(text, selection, match.pattern, lineStart)
          console.log("Quill match made (" + match.name + ")");
          return
        }
      }
    }
  }

   onDelete () {
     const range = this.quill.getSelection();
     if (!range) return;
     const format = this.quill.getFormat(range);
      if (format.blockquote || format.code || format['code-block']) {
       if (this.isLastBrElement(range) || this.isEmptyLine(range)) {
         this.quill.removeFormat(range.index, range.length);
       }
     }
   }

   isLastBrElement (range) {
     const [block] = this.quill.scroll.descendant(Block, range.index)
     const isBrElement = block != null && block.domNode.firstChild instanceof HTMLBRElement
     return isBrElement
   }

   isEmptyLine (range) {
     const [line, offset] = this.quill.getLine(range.index)
     if (!line ||
         !line.children ||
         !line.children.head ||
         !line.children.head.text ||
         !line.children.head.text.trim) {
           return true
         }
     const lines = line.children.head.text.split('\n')
     if (lines.length === 0) return true
     if (lines[0].trim() === "" && offset === 0) return true
     const isEmpty = line.children.head.text.trim() === ""
     return isEmpty
   }
}

if (window.Quill) {
  window.Quill.register('modules/markdownShortcuts', MarkdownShortcuts)
}

module.exports = { MarkdownShortcuts, tabCompletionMap }
