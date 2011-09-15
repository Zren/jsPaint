
<!-- saved from url=(0058)https://raw.github.com/kangax/fabric.js/master/dist/all.js -->
<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"></head><body><pre style="word-wrap: break-word; white-space: pre-wrap;">/*! Fabric.js Copyright 2008-2011, Bitsonnet (Juriy Zaytsev, Maxim Chernyak) */

var fabric = fabric || { version: "0.5.10" };

if (typeof exports != 'undefined') {
  exports.fabric = fabric;
}

if (typeof document != 'undefined' &amp;&amp; typeof window != 'undefined') {
  fabric.document = document;
  fabric.window = window;
}
else {
  // assume we're running under node.js when document/window are not present
  fabric.document = require("jsdom").jsdom("&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;head&gt;&lt;/head&gt;&lt;body&gt;&lt;/body&gt;&lt;/html&gt;");
  fabric.window = fabric.document.createWindow();
}
/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&amp;nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n &lt; 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &amp;&amp;
                        value.slice(0, 5) === 'Date(' &amp;&amp;
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n &lt; 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value &amp;&amp; typeof value === 'object' &amp;&amp;
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i &lt; length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep &amp;&amp; typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i &lt; length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i &lt; space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer &amp;&amp; typeof replacer !== 'function' &amp;&amp;
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value &amp;&amp; typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());
/*!
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 */

var Cufon = (function() {
  
  var api = function() {  
    return api.replace.apply(null, arguments);
  };
  
  var DOM = api.DOM = {
      
    ready: (function() {
    
      var complete = false, readyStatus = { loaded: 1, complete: 1 };
    
      var queue = [], perform = function() {
        if (complete) return;
        complete = true;
        for (var fn; fn = queue.shift(); fn());
      };
      
      // Gecko, Opera, WebKit r26101+
      
      if (fabric.document.addEventListener) {
        fabric.document.addEventListener('DOMContentLoaded', perform, false);
        fabric.window.addEventListener('pageshow', perform, false); // For cached Gecko pages
      }
      
      // Old WebKit, Internet Explorer
      
      if (!fabric.window.opera &amp;&amp; fabric.document.readyState) (function() {
        readyStatus[fabric.document.readyState] ? perform() : setTimeout(arguments.callee, 10);
      })();
      
      // Internet Explorer
      
      if (fabric.document.readyState &amp;&amp; fabric.document.createStyleSheet) (function() {
        try {
          fabric.document.body.doScroll('left');
          perform();
        }
        catch (e) {
          setTimeout(arguments.callee, 1);
        }
      })();
      
      addEvent(fabric.window, 'load', perform); // Fallback
      
      return function(listener) {
        if (!arguments.length) perform();
        else complete ? listener() : queue.push(listener);
      };
      
    })()
    
  };

  var CSS = api.CSS = {
  
    Size: function(value, base) {
    
      this.value = parseFloat(value);
      this.unit = String(value).match(/[a-z%]*$/)[0] || 'px';
    
      this.convert = function(value) {
        return value / base * this.value;
      };
      
      this.convertFrom = function(value) {
        return value / this.value * base;
      };
      
      this.toString = function() {
        return this.value + this.unit;
      };

    },
  
    getStyle: function(el) {
      return new Style(el.style);
      /*
      var view = document.defaultView;
      if (view &amp;&amp; view.getComputedStyle) return new Style(view.getComputedStyle(el, null));
      if (el.currentStyle) return new Style(el.currentStyle);
      return new Style(el.style);
      */
    },
    
    quotedList: cached(function(value) {
      // doesn't work properly with empty quoted strings (""), but
      // it's not worth the extra code.
      var list = [], re = /\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g, match;
      while (match = re.exec(value)) list.push(match[3] || match[1]);
      return list;
    }),
    
    ready: (function() {
      
      var complete = false;
      
      var queue = [], perform = function() {
        complete = true;
        for (var fn; fn = queue.shift(); fn());
      };
      
      // Safari 2 does not include &lt;style&gt; elements in document.styleSheets.
      // Safari 2 also does not support Object.prototype.propertyIsEnumerable.
      
      var styleElements = Object.prototype.propertyIsEnumerable ? elementsByTagName('style') : { length: 0 };
      var linkElements = elementsByTagName('link');
      
      DOM.ready(function() {
        // These checks are actually only needed for WebKit-based browsers, but don't really hurt other browsers.
        var linkStyles = 0, link;
        for (var i = 0, l = linkElements.length; link = linkElements[i], i &lt; l; ++i) {
          // WebKit does not load alternate stylesheets.
          if (!link.disabled &amp;&amp; link.rel.toLowerCase() == 'stylesheet') ++linkStyles;
        }
        if (fabric.document.styleSheets.length &gt;= styleElements.length + linkStyles) perform();
        else setTimeout(arguments.callee, 10);
      });
      
      return function(listener) {
        if (complete) listener();
        else queue.push(listener);
      };
      
    })(),

    supports: function(property, value) {
      var checker = fabric.document.createElement('span').style;
      if (checker[property] === undefined) return false;
      checker[property] = value;
      return checker[property] === value;
    },
    
    textAlign: function(word, style, position, wordCount) {
      if (style.get('textAlign') == 'right') {
        if (position &gt; 0) word = ' ' + word;
      }
      else if (position &lt; wordCount - 1) word += ' ';
      return word;
    },
    
    textDecoration: function(el, style) {
      if (!style) style = this.getStyle(el);
      var types = {
        underline: null,
        overline: null,
        'line-through': null
      };
      for (var search = el; search.parentNode &amp;&amp; search.parentNode.nodeType == 1; ) {
        var foundAll = true;
        for (var type in types) {
          if (types[type]) continue;
          if (style.get('textDecoration').indexOf(type) != -1) types[type] = style.get('color');
          foundAll = false;
        }
        if (foundAll) break; // this is rather unlikely to happen
        style = this.getStyle(search = search.parentNode);
      }
      return types;
    },
    
    textShadow: cached(function(value) {
      if (value == 'none') return null;
      var shadows = [], currentShadow = {}, result, offCount = 0;
      var re = /(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;
      while (result = re.exec(value)) {
        if (result[0] == ',') {
          shadows.push(currentShadow);
          currentShadow = {}, offCount = 0;
        }
        else if (result[1]) {
          currentShadow.color = result[1];
        }
        else {
          currentShadow[[ 'offX', 'offY', 'blur' ][offCount++]] = result[2];
        }
      }
      shadows.push(currentShadow);
      return shadows;
    }),
    
    color: cached(function(value) {
      var parsed = {};
      parsed.color = value.replace(/^rgba\((.*?),\s*([\d.]+)\)/, function($0, $1, $2) {
        parsed.opacity = parseFloat($2);
        return 'rgb(' + $1 + ')';
      });
      return parsed;
    }),
    
    textTransform: function(text, style) {
      return text[{
        uppercase: 'toUpperCase',
        lowercase: 'toLowerCase'
      }[style.get('textTransform')] || 'toString']();
    }
    
  };
  
  function Font(data) {
    
    var face = this.face = data.face;
    this.glyphs = data.glyphs;
    this.w = data.w;
    this.baseSize = parseInt(face['units-per-em'], 10);
    
    this.family = face['font-family'].toLowerCase();
    this.weight = face['font-weight'];
    this.style = face['font-style'] || 'normal';
    
    this.viewBox = (function () {
      var parts = face.bbox.split(/\s+/);
      var box = {
        minX: parseInt(parts[0], 10),
        minY: parseInt(parts[1], 10),
        maxX: parseInt(parts[2], 10),
        maxY: parseInt(parts[3], 10)
      };
      box.width = box.maxX - box.minX,
      box.height = box.maxY - box.minY;
      box.toString = function() {
        return [ this.minX, this.minY, this.width, this.height ].join(' ');
      };
      return box;
    })();
    
    this.ascent = -parseInt(face.ascent, 10);
    this.descent = -parseInt(face.descent, 10);
    
    this.height = -this.ascent + this.descent;
    
  }
  
  function FontFamily() {

    var styles = {}, mapping = {
      oblique: 'italic',
      italic: 'oblique'
    };
    
    this.add = function(font) {
      (styles[font.style] || (styles[font.style] = {}))[font.weight] = font;
    };
    
    this.get = function(style, weight) {
      var weights = styles[style] || styles[mapping[style]]
        || styles.normal || styles.italic || styles.oblique;
      if (!weights) return null;
      // we don't have to worry about "bolder" and "lighter"
      // because IE's currentStyle returns a numeric value for it,
      // and other browsers use the computed value anyway
      weight = {
        normal: 400,
        bold: 700
      }[weight] || parseInt(weight, 10);
      if (weights[weight]) return weights[weight];
      // http://www.w3.org/TR/CSS21/fonts.html#propdef-font-weight
      // Gecko uses x99/x01 for lighter/bolder
      var up = {
        1: 1,
        99: 0
      }[weight % 100], alts = [], min, max;
      if (up === undefined) up = weight &gt; 400;
      if (weight == 500) weight = 400;
      for (var alt in weights) {
        alt = parseInt(alt, 10);
        if (!min || alt &lt; min) min = alt;
        if (!max || alt &gt; max) max = alt;
        alts.push(alt);
      }
      if (weight &lt; min) weight = min;
      if (weight &gt; max) weight = max;
      alts.sort(function(a, b) {
        return (up
          ? (a &gt; weight &amp;&amp; b &gt; weight) ? a &lt; b : a &gt; b
          : (a &lt; weight &amp;&amp; b &lt; weight) ? a &gt; b : a &lt; b) ? -1 : 1;
      });
      return weights[alts[0]];
    };
  
  }
  
  function HoverHandler() {
    
    function contains(node, anotherNode) {
      if (node.contains) return node.contains(anotherNode);
      return node.compareDocumentPosition(anotherNode) &amp; 16;
    }
    
    function onOverOut(e) {
      var related = e.relatedTarget;
      if (!related || contains(this, related)) return;
      trigger(this);
    }
    
    function onEnterLeave(e) {
      trigger(this);
    }

    function trigger(el) {
      // A timeout is needed so that the event can actually "happen"
      // before replace is triggered. This ensures that styles are up
      // to date.
      setTimeout(function() {
        api.replace(el, sharedStorage.get(el).options, true);
      }, 10);
    }
    
    this.attach = function(el) {
      if (el.onmouseenter === undefined) {
        addEvent(el, 'mouseover', onOverOut);
        addEvent(el, 'mouseout', onOverOut);
      }
      else {
        addEvent(el, 'mouseenter', onEnterLeave);
        addEvent(el, 'mouseleave', onEnterLeave);
      }
    };
    
  }
  
  function Storage() {
    
    var map = {}, at = 0;
    
    function identify(el) {
      return el.cufid || (el.cufid = ++at);
    }
    
    this.get = function(el) {
      var id = identify(el);
      return map[id] || (map[id] = {});
    };
    
  }
  
  function Style(style) {
    
    var custom = {}, sizes = {};
    
    this.get = function(property) {
      return custom[property] != undefined ? custom[property] : style[property];
    };
    
    this.getSize = function(property, base) {
      return sizes[property] || (sizes[property] = new CSS.Size(this.get(property), base));
    };
    
    this.extend = function(styles) {
      for (var property in styles) custom[property] = styles[property];
      return this;
    };
    
  }
  
  function addEvent(el, type, listener) {
    if (el.addEventListener) {
      el.addEventListener(type, listener, false);
    }
    else if (el.attachEvent) {
      el.attachEvent('on' + type, function() {
        return listener.call(el, fabric.window.event);
      });
    }
  }
  
  function attach(el, options) {
    var storage = sharedStorage.get(el);
    if (storage.options) return el;
    if (options.hover &amp;&amp; options.hoverables[el.nodeName.toLowerCase()]) {
      hoverHandler.attach(el);
    }
    storage.options = options;
    return el;
  }
  
  function cached(fun) {
    var cache = {};
    return function(key) {
      if (!cache.hasOwnProperty(key)) cache[key] = fun.apply(null, arguments);
      return cache[key];
    };  
  }
  
  function getFont(el, style) {
    if (!style) style = CSS.getStyle(el);
    var families = CSS.quotedList(style.get('fontFamily').toLowerCase()), family;
    for (var i = 0, l = families.length; i &lt; l; ++i) {
      family = families[i];
      if (fonts[family]) return fonts[family].get(style.get('fontStyle'), style.get('fontWeight'));
    }
    return null;
  }
  
  function elementsByTagName(query) {
    return fabric.document.getElementsByTagName(query);
  }
  
  function merge() {
    var merged = {}, key;
    for (var i = 0, l = arguments.length; i &lt; l; ++i) {
      for (key in arguments[i]) merged[key] = arguments[i][key];
    }
    return merged;
  }
  
  function process(font, text, style, options, node, el) {
    
    var separate = options.separate;
    if (separate == 'none') return engines[options.engine].apply(null, arguments);
    var fragment = fabric.document.createDocumentFragment(), processed;
    var parts = text.split(separators[separate]), needsAligning = (separate == 'words');
    if (needsAligning &amp;&amp; HAS_BROKEN_REGEXP) {
      // @todo figure out a better way to do this
      if (/^\s/.test(text)) parts.unshift('');
      if (/\s$/.test(text)) parts.push('');
    }
    for (var i = 0, l = parts.length; i &lt; l; ++i) {
      processed = engines[options.engine](font,
        needsAligning ? CSS.textAlign(parts[i], style, i, l) : parts[i],
        style, options, node, el, i &lt; l - 1);
      if (processed) fragment.appendChild(processed);
    }
    return fragment;
  }
  
  function replaceElement(el, options) {
    var font, style, nextNode, redraw;
    for (var node = attach(el, options).firstChild; node; node = nextNode) {
      nextNode = node.nextSibling;
      redraw = false;
      if (node.nodeType == 1) {
        if (!node.firstChild) continue;
        if (!/cufon/.test(node.className)) {
          arguments.callee(node, options);
          continue;
        }
        else redraw = true;
      }
      if (!style) style = CSS.getStyle(el).extend(options);
      if (!font) font = getFont(el, style);
      
      if (!font) continue;
      if (redraw) {
        engines[options.engine](font, null, style, options, node, el);
        continue;
      }
      var text = node.data;
      if (text === '') continue;
      var processed = process(font, text, style, options, node, el);
      if (processed) node.parentNode.replaceChild(processed, node);
      else node.parentNode.removeChild(node);
    }
  }
  
  var HAS_BROKEN_REGEXP = ' '.split(/\s+/).length == 0;
  
  var sharedStorage = new Storage();
  var hoverHandler = new HoverHandler();
  var replaceHistory = [];
  
  var engines = {}, fonts = {}, defaultOptions = {
    enableTextDecoration: false,
    engine: null,
    //fontScale: 1,
    //fontScaling: false,
    hover: false,
    hoverables: {
      a: true
    },
    printable: true,
    //rotation: 0,
    //selectable: false,
    selector: (
        fabric.window.Sizzle
      ||  (fabric.window.jQuery &amp;&amp; function(query) { return jQuery(query); }) // avoid noConflict issues
      ||  (fabric.window.dojo &amp;&amp; dojo.query)
      ||  (fabric.window.$$ &amp;&amp; function(query) { return $$(query); })
      ||  (fabric.window.$ &amp;&amp; function(query) { return $(query); })
      ||  (fabric.document.querySelectorAll &amp;&amp; function(query) { return fabric.document.querySelectorAll(query); })
      ||  elementsByTagName
    ),
    separate: 'words', // 'none' and 'characters' are also accepted
    textShadow: 'none'
  };
  
  var separators = {
    words: /\s+/,
    characters: ''
  };
  
  api.now = function() {
    DOM.ready();
    return api;
  };
  
  api.refresh = function() {
    var currentHistory = replaceHistory.splice(0, replaceHistory.length);
    for (var i = 0, l = currentHistory.length; i &lt; l; ++i) {
      api.replace.apply(null, currentHistory[i]);
    }
    return api;
  };
  
  api.registerEngine = function(id, engine) {
    if (!engine) return api;
    engines[id] = engine;
    return api.set('engine', id);
  };
  
  api.registerFont = function(data) {
    var font = new Font(data), family = font.family;
    if (!fonts[family]) fonts[family] = new FontFamily();
    fonts[family].add(font);
    return api.set('fontFamily', '"' + family + '"');
  };
  
  api.replace = function(elements, options, ignoreHistory) {
    options = merge(defaultOptions, options);
    if (!options.engine) return api; // there's no browser support so we'll just stop here
    if (typeof options.textShadow == 'string' &amp;&amp; options.textShadow)
      options.textShadow = CSS.textShadow(options.textShadow);
    if (!ignoreHistory) replaceHistory.push(arguments);
    if (elements.nodeType || typeof elements == 'string') elements = [ elements ];
    CSS.ready(function() {
      for (var i = 0, l = elements.length; i &lt; l; ++i) {
        var el = elements[i];
        if (typeof el == 'string') api.replace(options.selector(el), options, true);
        else replaceElement(el, options);
      }
    });
    return api;
  };
  
  api.replaceElement = function(el, options) {
    options = merge(defaultOptions, options);
    if (typeof options.textShadow == 'string' &amp;&amp; options.textShadow)
      options.textShadow = CSS.textShadow(options.textShadow);
    return replaceElement(el, options);
  };
  
  // ==&gt;
  api.engines = engines;
  api.fonts = fonts;
  api.getOptions = function() {
    return merge(defaultOptions);
  }
  // &lt;==
  
  api.set = function(option, value) {
    defaultOptions[option] = value;
    return api;
  };
  
  return api;
  
})();

Cufon.registerEngine('canvas', (function() {

  // Safari 2 doesn't support .apply() on native methods
  
  var check = fabric.document.createElement('canvas');
  if (!check || !check.getContext || !check.getContext.apply) return;
  check = null;
  
  var HAS_INLINE_BLOCK = Cufon.CSS.supports('display', 'inline-block');
  
  // Firefox 2 w/ non-strict doctype (almost standards mode)
  var HAS_BROKEN_LINEHEIGHT = !HAS_INLINE_BLOCK &amp;&amp; (fabric.document.compatMode == 'BackCompat' || /frameset|transitional/i.test(fabric.document.doctype.publicId));
  
  var styleSheet = fabric.document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.appendChild(fabric.document.createTextNode(
    '.cufon-canvas{text-indent:0}' +
    '@media screen,projection{' +
      '.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle' + 
      (HAS_BROKEN_LINEHEIGHT
        ? ''
        : ';font-size:1px;line-height:1px') +
      '}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden}' +
      (HAS_INLINE_BLOCK
        ? '.cufon-canvas canvas{position:relative}'
        : '.cufon-canvas canvas{position:absolute}') +
    '}' +
    '@media print{' +
      '.cufon-canvas{padding:0 !important}' +
      '.cufon-canvas canvas{display:none}' +
      '.cufon-canvas .cufon-alt{display:inline}' +
    '}'
  ));
  fabric.document.getElementsByTagName('head')[0].appendChild(styleSheet);

  function generateFromVML(path, context) {
    var atX = 0, atY = 0;
    var code = [], re = /([mrvxe])([^a-z]*)/g, match;
    generate: for (var i = 0; match = re.exec(path); ++i) {
      var c = match[2].split(',');
      switch (match[1]) {
        case 'v':
          code[i] = { m: 'bezierCurveTo', a: [ atX + ~~c[0], atY + ~~c[1], atX + ~~c[2], atY + ~~c[3], atX += ~~c[4], atY += ~~c[5] ] };
          break;
        case 'r':
          code[i] = { m: 'lineTo', a: [ atX += ~~c[0], atY += ~~c[1] ] };
          break;
        case 'm':
          code[i] = { m: 'moveTo', a: [ atX = ~~c[0], atY = ~~c[1] ] };
          break;
        case 'x':
          code[i] = { m: 'closePath' };
          break;
        case 'e':
          break generate;
      }
      context[code[i].m].apply(context, code[i].a);
    }
    return code;
  }
  
  function interpret(code, context) {
    for (var i = 0, l = code.length; i &lt; l; ++i) {
      var line = code[i];
      context[line.m].apply(context, line.a);
    }
  }
  
  return function(font, text, style, options, node, el) {

    var redraw = (text === null);

    var viewBox = font.viewBox;

    var size = style.getSize('fontSize', font.baseSize);

    var letterSpacing = style.get('letterSpacing');
    letterSpacing = (letterSpacing == 'normal') ? 0 : size.convertFrom(parseInt(letterSpacing, 10));

    var expandTop = 0, expandRight = 0, expandBottom = 0, expandLeft = 0;
    var shadows = options.textShadow, shadowOffsets = [];
    if (shadows) {
      for (var i = 0, l = shadows.length; i &lt; l; ++i) {
        var shadow = shadows[i];
        var x = size.convertFrom(parseFloat(shadow.offX));
        var y = size.convertFrom(parseFloat(shadow.offY));
        shadowOffsets[i] = [ x, y ];
        if (y &lt; expandTop) expandTop = y;
        if (x &gt; expandRight) expandRight = x;
        if (y &gt; expandBottom) expandBottom = y;
        if (x &lt; expandLeft) expandLeft = x;
      }
    }

    var chars = Cufon.CSS.textTransform(redraw ? node.alt : text, style).split('');

    var width = 0, lastWidth = null;

    var maxWidth = 0, lines = 1, lineWidths = [ ];
    for (var i = 0, l = chars.length; i &lt; l; ++i) {
      if (chars[i] === '\n') {
        lines++;
        if (width &gt; maxWidth) {
          maxWidth = width;
        }
        lineWidths.push(width);
        width = 0;
        continue;
      }
      var glyph = font.glyphs[chars[i]] || font.missingGlyph;
      if (!glyph) continue;
      width += lastWidth = Number(glyph.w || font.w) + letterSpacing;
    }
    lineWidths.push(width);
    
    width = Math.max(maxWidth, width);
    
    var lineOffsets = [ ];
    for (var i = lineWidths.length; i--; ) {
      lineOffsets[i] = width - lineWidths[i];
    }

    if (lastWidth === null) return null; // there's nothing to render

    expandRight += (viewBox.width - lastWidth);
    expandLeft += viewBox.minX;

    var wrapper, canvas;

    if (redraw) {
      wrapper = node;
      canvas = node.firstChild;
    }
    else {
      wrapper = fabric.document.createElement('span');
      wrapper.className = 'cufon cufon-canvas';
      wrapper.alt = text;

      canvas = fabric.document.createElement('canvas');
      wrapper.appendChild(canvas);

      if (options.printable) {
        var print = fabric.document.createElement('span');
        print.className = 'cufon-alt';
        print.appendChild(fabric.document.createTextNode(text));
        wrapper.appendChild(print);
      }
    }

    var wStyle = wrapper.style;
    var cStyle = canvas.style || { };
    
    var height = size.convert(viewBox.height - expandTop + expandBottom);
    var roundedHeight = Math.ceil(height);
    var roundingFactor = roundedHeight / height;

    canvas.width = Math.ceil(size.convert(width + expandRight - expandLeft) * roundingFactor);
    canvas.height = roundedHeight;

    expandTop += viewBox.minY;

    cStyle.top = Math.round(size.convert(expandTop - font.ascent)) + 'px';
    cStyle.left = Math.round(size.convert(expandLeft)) + 'px';

    var _width = Math.ceil(size.convert(width * roundingFactor));
    var wrapperWidth = _width + 'px';
    var _height = size.convert(font.height);
    var totalLineHeight = (options.lineHeight - 1) * size.convert(-font.ascent / 5) * (lines - 1);

    Cufon.textOptions.width = _width;
    Cufon.textOptions.height = (_height * lines) + totalLineHeight;
    Cufon.textOptions.lines = lines;

    if (HAS_INLINE_BLOCK) {
      wStyle.width = wrapperWidth;
      wStyle.height = _height + 'px';
    }
    else {
      wStyle.paddingLeft = wrapperWidth;
      wStyle.paddingBottom = (_height - 1) + 'px';
    }

    var g = Cufon.textOptions.context || canvas.getContext('2d'),
        scale = roundedHeight / viewBox.height;

    g.save();
    g.scale(scale, scale);
    
    g.translate(
      // we're at the center of an object and need to jump to the top left corner 
      // where first character is to be drawn
      -expandLeft - ((1/scale * canvas.width) / 2) + (Cufon.fonts[font.family].offsetLeft || 0),
      -expandTop - (Cufon.textOptions.height / scale) / 2
    );

    g.lineWidth = font.face['underline-thickness'];

    g.save();

    function line(y, color) {
      g.strokeStyle = color;

      g.beginPath();

      g.moveTo(0, y);
      g.lineTo(width, y);

      g.stroke();
    }

    var textDecoration = options.enableTextDecoration ? Cufon.CSS.textDecoration(el, style) : {},
        isItalic = options.fontStyle === 'italic';
    
    function renderBackground() {
      g.save();
      
      g.fillStyle = options.backgroundColor;
      
      var left = 0, lineNum = 0;
      
      if (options.textAlign === 'right') {
        g.translate(lineOffsets[lineNum], 0);
      }
      else if (options.textAlign === 'center') {
        g.translate(lineOffsets[lineNum] / 2, 0);
      }
      
      for (var i = 0, l = chars.length; i &lt; l; ++i) {
        if (chars[i] === '\n') {
          
          lineNum++;
          
          var topOffset = -font.ascent - ((font.ascent / 5) * options.lineHeight);
          
          if (options.textAlign === 'right') {
            g.translate(-width, topOffset);
            g.translate(lineOffsets[lineNum], 0);
          }
          else if (options.textAlign === 'center') {
            // offset to the start of text in previous line AND half of its offset 
            // (essentially moving caret to the left edge of bounding box)
            g.translate(-left - (lineOffsets[lineNum - 1] / 2), topOffset);
            g.translate(lineOffsets[lineNum] / 2, 0);
          }
          else {
            g.translate(-left, topOffset);
          }
          
          left = 0;
          
          continue;
        }
        var glyph = font.glyphs[chars[i]] || font.missingGlyph;
        if (!glyph) continue;
        
        var charWidth = Number(glyph.w || font.w) + letterSpacing;
        
        g.save();
        g.translate(0, font.ascent);
        g.fillRect(0, 0, charWidth + 10, -font.ascent + font.descent);
        g.restore();
        
        g.translate(charWidth, 0);
        left += charWidth;
      }
      g.restore();
    }
    
    function renderText() {
      g.fillStyle = Cufon.textOptions.color || style.get('color');
      
      var left = 0, lineNum = 0;
      
      if (options.textAlign === 'right') {
        g.translate(lineOffsets[lineNum], 0);
      }
      else if (options.textAlign === 'center') {
        g.translate(lineOffsets[lineNum] / 2, 0);
      }
      
      for (var i = 0, l = chars.length; i &lt; l; ++i) {
        if (chars[i] === '\n') {
          
          lineNum++;
          
          var topOffset = -font.ascent - ((font.ascent / 5) * options.lineHeight);
          
          if (options.textAlign === 'right') {
            g.translate(-width, topOffset);
            g.translate(lineOffsets[lineNum], 0);
          }
          else if (options.textAlign === 'center') {
            // offset to the start of text in previous line AND half of its offset 
            // (essentially moving caret to the left edge of bounding box)
            g.translate(-left - (lineOffsets[lineNum - 1] / 2), topOffset);
            g.translate(lineOffsets[lineNum] / 2, 0);
          }
          else {
            g.translate(-left, topOffset);
          }
          
          left = 0;
          
          continue;
        }
        var glyph = font.glyphs[chars[i]] || font.missingGlyph;
        if (!glyph) continue;
        
        var charWidth = Number(glyph.w || font.w) + letterSpacing;
        
        if (textDecoration) {
          g.save();
          g.strokeStyle = g.fillStyle;
          g.beginPath();
          if (textDecoration.underline) {
            g.moveTo(0, -font.face['underline-position']);
            g.lineTo(charWidth, -font.face['underline-position']);
          }
          if (textDecoration.overline) {
            g.moveTo(0, font.ascent);
            g.lineTo(charWidth, font.ascent);
          }
          if (textDecoration['line-through']) {
            g.moveTo(0, -font.descent);
            g.lineTo(charWidth, -font.descent);
          }
          g.stroke();
          g.restore();
        }
        
        if (isItalic) {
          g.save();
          g.transform(1, 0, -0.25, 1, 0, 0);
        }
        
        g.beginPath();
        if (glyph.d) {
          if (glyph.code) interpret(glyph.code, g);
          else glyph.code = generateFromVML('m' + glyph.d, g);
        }
        
        g.fill();
        
        if (options.strokeStyle) {
          g.closePath();
          g.save();
          g.lineWidth = options.strokeWidth;
          g.strokeStyle = options.strokeStyle;
          g.stroke();
          g.restore();
        }
        
        if (isItalic) {
          g.restore();
        }
        
        g.translate(charWidth, 0);
        left += charWidth;
      }
    }
    
    if (shadows) {
      for (var i = 0, l = shadows.length; i &lt; l; ++i) {
        var shadow = shadows[i];
        g.save();
        g.fillStyle = shadow.color;
        g.translate.apply(g, shadowOffsets[i]);
        renderText();
        g.restore();
      }
    }

    g.save();
    if (options.backgroundColor) {
      renderBackground();
    }
    renderText();
    g.restore();
    g.restore();
    g.restore();

    return wrapper;

  };
  
})());

Cufon.registerEngine('vml', (function() {

  if (!fabric.document.namespaces) return;
  
  var canvasEl = fabric.document.createElement('canvas');
  if (canvasEl &amp;&amp; canvasEl.getContext &amp;&amp; canvasEl.getContext.apply) return;
  
  if (fabric.document.namespaces.cvml == null) {
    fabric.document.namespaces.add('cvml', 'urn:schemas-microsoft-com:vml');
  }
  
  var check = fabric.document.createElement('cvml:shape');
  check.style.behavior = 'url(#default#VML)';
  if (!check.coordsize) return; // VML isn't supported
  check = null;
  
  fabric.document.write('&lt;style type="text/css"&gt;' +
    '.cufon-vml-canvas{text-indent:0}' +
    '@media screen{' + 
      'cvml\\:shape,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute}' +
      '.cufon-vml-canvas{position:absolute;text-align:left}' +
      '.cufon-vml{display:inline-block;position:relative;vertical-align:middle}' +
      '.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px}' +
      'a .cufon-vml{cursor:pointer}' +
    '}' +
    '@media print{' + 
      '.cufon-vml *{display:none}' +
      '.cufon-vml .cufon-alt{display:inline}' +
    '}' +
  '&lt;/style&gt;');

  function getFontSizeInPixels(el, value) {
    return getSizeInPixels(el, /(?:em|ex|%)$/i.test(value) ? '1em' : value);
  }
  
  // Original by Dead Edwards.
  // Combined with getFontSizeInPixels it also works with relative units.
  function getSizeInPixels(el, value) {
    if (/px$/i.test(value)) return parseFloat(value);
    var style = el.style.left, runtimeStyle = el.runtimeStyle.left;
    el.runtimeStyle.left = el.currentStyle.left;
    el.style.left = value;
    var result = el.style.pixelLeft;
    el.style.left = style;
    el.runtimeStyle.left = runtimeStyle;
    return result;
  }
  
  return function(font, text, style, options, node, el, hasNext) {
    var redraw = (text === null);
    
    if (redraw) text = node.alt;
    
    // @todo word-spacing, text-decoration
  
    var viewBox = font.viewBox;
    
    var size = style.computedFontSize || 
      (style.computedFontSize = new Cufon.CSS.Size(getFontSizeInPixels(el, style.get('fontSize')) + 'px', font.baseSize));
    
    var letterSpacing = style.computedLSpacing;
    
    if (letterSpacing == undefined) {
      letterSpacing = style.get('letterSpacing');
      style.computedLSpacing = letterSpacing = 
        (letterSpacing == 'normal') ? 0 : ~~size.convertFrom(getSizeInPixels(el, letterSpacing));
    }
    
    var wrapper, canvas;
    
    if (redraw) {
      wrapper = node;
      canvas = node.firstChild;
    }
    else {
      wrapper = fabric.document.createElement('span');
      wrapper.className = 'cufon cufon-vml';
      wrapper.alt = text;
      
      canvas = fabric.document.createElement('span');
      canvas.className = 'cufon-vml-canvas';
      wrapper.appendChild(canvas);
      
      if (options.printable) {
        var print = fabric.document.createElement('span');
        print.className = 'cufon-alt';
        print.appendChild(fabric.document.createTextNode(text));
        wrapper.appendChild(print);
      }
      
      // ie6, for some reason, has trouble rendering the last VML element in the document.
      // we can work around this by injecting a dummy element where needed.
      // @todo find a better solution
      if (!hasNext) wrapper.appendChild(fabric.document.createElement('cvml:shape'));
    }
    
    var wStyle = wrapper.style;
    var cStyle = canvas.style;
    
    var height = size.convert(viewBox.height), roundedHeight = Math.ceil(height);
    var roundingFactor = roundedHeight / height;
    var minX = viewBox.minX, minY = viewBox.minY;
    
    cStyle.height = roundedHeight;
    cStyle.top = Math.round(size.convert(minY - font.ascent));
    cStyle.left = Math.round(size.convert(minX));
    
    wStyle.height = size.convert(font.height) + 'px';
    
    var textDecoration = options.enableTextDecoration ? Cufon.CSS.textDecoration(el, style) : {};
    
    var color = style.get('color');
    
    var chars = Cufon.CSS.textTransform(text, style).split('');
    
    var width = 0, offsetX = 0, advance = null;
    
    var glyph, shape, shadows = options.textShadow;
    
    // pre-calculate width
    for (var i = 0, k = 0, l = chars.length; i &lt; l; ++i) {
      glyph = font.glyphs[chars[i]] || font.missingGlyph;
      if (glyph) width += advance = ~~(glyph.w || font.w) + letterSpacing;
    }
    
    if (advance === null) return null;
    
    var fullWidth = -minX + width + (viewBox.width - advance);
  
    var shapeWidth = size.convert(fullWidth * roundingFactor), roundedShapeWidth = Math.round(shapeWidth);
    
    var coordSize = fullWidth + ',' + viewBox.height, coordOrigin;
    var stretch = 'r' + coordSize + 'nsnf';
    
    for (i = 0; i &lt; l; ++i) {
      
      glyph = font.glyphs[chars[i]] || font.missingGlyph;
      if (!glyph) continue;
      
      if (redraw) {
        // some glyphs may be missing so we can't use i
        shape = canvas.childNodes[k];
        if (shape.firstChild) shape.removeChild(shape.firstChild); // shadow
      }
      else { 
        shape = fabric.document.createElement('cvml:shape');
        canvas.appendChild(shape);
      }
      
      shape.stroked = 'f';
      shape.coordsize = coordSize;
      shape.coordorigin = coordOrigin = (minX - offsetX) + ',' + minY;
      shape.path = (glyph.d ? 'm' + glyph.d + 'xe' : '') + 'm' + coordOrigin + stretch;
      shape.fillcolor = color;
      
      // it's important to not set top/left or IE8 will grind to a halt
      var sStyle = shape.style;
      sStyle.width = roundedShapeWidth;
      sStyle.height = roundedHeight;
      
      if (shadows) {
        // due to the limitations of the VML shadow element there
        // can only be two visible shadows. opacity is shared
        // for all shadows.
        var shadow1 = shadows[0], shadow2 = shadows[1];
        var color1 = Cufon.CSS.color(shadow1.color), color2;
        var shadow = fabric.document.createElement('cvml:shadow');
        shadow.on = 't';
        shadow.color = color1.color;
        shadow.offset = shadow1.offX + ',' + shadow1.offY;
        if (shadow2) {
          color2 = Cufon.CSS.color(shadow2.color);
          shadow.type = 'double';
          shadow.color2 = color2.color;
          shadow.offset2 = shadow2.offX + ',' + shadow2.offY;
        }
        shadow.opacity = color1.opacity || (color2 &amp;&amp; color2.opacity) || 1;
        shape.appendChild(shadow);
      }
      
      offsetX += ~~(glyph.w || font.w) + letterSpacing;
      
      ++k;
      
    }
    
    wStyle.width = Math.max(Math.ceil(size.convert(width * roundingFactor)), 0);
    
    return wrapper;
    
  };
  
})());

if (typeof exports != 'undefined') {
  exports.Cufon = Cufon;
}
/**
 * Wrapper around `console.log` (when available)
 * @method log
 * @param {Any} Values to log
 */
fabric.log = function() { };

/**
 * Wrapper around `console.warn` (when available)
 * @method warn
 * @param {Any} Values to log as a warning
 */
fabric.warn = function() { };

if (typeof console !== 'undefined') {
  if (typeof console.log !== 'undefined' &amp;&amp; console.log.apply) {
    fabric.log = function() { 
      return console.log.apply(console, arguments);
    };
  }
  if (typeof console.warn !== 'undefined' &amp;&amp; console.warn.apply) {
    fabric.warn = function() { 
      return console.warn.apply(console, arguments);
    };
  }
}

fabric.Observable = {
  
  /**
   * @mthod observe
   * @param {String} eventName
   * @param {Function} handler
   */
  observe: function(eventName, handler) {
    if (!this.__eventListeners) {
      this.__eventListeners = { };
    }
    // one object with key/value pairs was passed
    if (arguments.length === 1) {
      for (var prop in eventName) {
        this.observe(prop, eventName[prop]);
      }
    }
    else {
      if (!this.__eventListeners[eventName]) {
        this.__eventListeners[eventName] = [ ];
      }
      this.__eventListeners[eventName].push(handler);
    }
  },
  
  /**
   * @mthod stopObserving
   * @memberOf fabric.util
   * @param {String} eventName
   * @param {Function} handler
   */
  stopObserving: function(eventName, handler) {
    if (!this.__eventListeners) {
      this.__eventListeners = { };
    }
    if (this.__eventListeners[eventName]) {
      fabric.util.removeFromArray(this.__eventListeners[eventName], handler);
    }
  },
  
  /**
   * Fires event with an optional memo object
   * @mthod fire
   * @memberOf fabric.util
   * @param {String} eventName
   * @param {Object} [memo]
   */
  fire: function(eventName, memo) {
    if (!this.__eventListeners) {
      this.__eventListeners = { }
    }
    var listenersForEvent = this.__eventListeners[eventName];
    if (!listenersForEvent) return;
    for (var i = 0, len = listenersForEvent.length; i &lt; len; i++) {
      // avoiding try/catch for perf. reasons
      listenersForEvent[i]({ memo: memo });
    }
  }
};
(function() {
  
  fabric.util = { };
  
  /**
   * Removes value from an array.
   * Presence of value (and its position in an array) is determined via `Array.prototype.indexOf`
   * @static
   * @memberOf fabric.util
   * @method removeFromArray
   * @param {Array} array
   * @param {Any} value
   * @return {Array} original array
   */
  function removeFromArray(array, value) {
    var idx = array.indexOf(value);
    if (idx !== -1) {
      array.splice(idx, 1);
    }
    return array;
  };
  
  /**
   * Returns random number between 2 specified ones.
   * @static
   * @method getRandomInt
   * @memberOf fabric.util
   * @param {Number} min lower limit
   * @param {Number} max upper limit
   * @return {Number} random value (between min and max)
   */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  var PiBy180 = Math.PI / 180;
  
  /**
   * Transforms degrees to radians.
   * @static
   * @method degreesToRadians
   * @memberOf fabric.util
   * @param {Number} degrees value in degrees
   * @return {Number} value in radians
   */
  function degreesToRadians(degrees) {
    return degrees * PiBy180;
  }
  
  /**
   * A wrapper around Number#toFixed, which contrary to native method returns number, not string.
   * @static
   * @method toFixed
   * @memberOf fabric.util
   * @param {Number | String} number number to operate on
   * @param {Number} fractionDigits number of fraction digits to "leave"
   * @return {Number}
   */
   function toFixed(number, fractionDigits) {
     return parseFloat(Number(number).toFixed(fractionDigits));
   }
   
   /**
    * Function which always returns `false`.
    * @static
    * @method falseFunction
    * @memberOf fabric.util
    * @return {Boolean}
    */
   function falseFunction() {
     return false;
   }
   
   /**
    * Changes value from one to another within certain period of time, invoking callbacks as value is being changed.
    * @method animate
    * @memberOf fabric.util
    * @param {Object} [options] Animation options
    * @param {Function} [options.onChange] Callback; invoked on every value change
    * @param {Function} [options.onComplete] Callback; invoked when value change is completed
    * @param {Number} [options.startValue=0] Starting value
    * @param {Number} [options.endValue=100] Ending value
    * @param {Function} [options.easing] Easing function
    * @param {Number} [options.duration=500] Duration of change
    */
   function animate(options) {

     options || (options = { });

     var start = +new Date(), 
         duration = options.duration || 500,
         finish = start + duration, time, pos,
         onChange = options.onChange || function() { },
         abort = options.abort || function() { return false; },
         easing = options.easing || function(pos) { return (-Math.cos(pos * Math.PI) / 2) + 0.5; },
         startValue = 'startValue' in options ? options.startValue : 0,
         endValue = 'endValue' in options ? options.endValue : 100,
         isReversed = startValue &gt; endValue;

     options.onStart &amp;&amp; options.onStart();

     var interval = setInterval(function() {
       time = +new Date();
       pos = time &gt; finish ? 1 : (time - start) / duration;
       onChange(isReversed 
         ? (startValue - (startValue - endValue) * easing(pos)) 
         : (startValue + (endValue - startValue) * easing(pos)));
       if (time &gt; finish || abort()) {
         clearInterval(interval);
         options.onComplete &amp;&amp; options.onComplete();
       }
     }, 10);

     return interval;
   }
  
  fabric.util.removeFromArray = removeFromArray;
  fabric.util.degreesToRadians = degreesToRadians;
  fabric.util.toFixed = toFixed;
  fabric.util.getRandomInt = getRandomInt;
  fabric.util.falseFunction = falseFunction;
  fabric.util.animate = animate;
  
})();
(function() {
  
  var slice = Array.prototype.slice;
  
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
      if (this === void 0 || this === null) {
        throw new TypeError();
      }
      var t = Object(this), len = t.length &gt;&gt;&gt; 0;
      if (len === 0) {
        return -1;
      }
      var n = 0;
      if (arguments.length &gt; 0) {
        n = Number(arguments[1]);
        if (n !== n) { // shortcut for verifying if it's NaN
          n = 0;
        }
        else if (n !== 0 &amp;&amp; n !== (1 / 0) &amp;&amp; n !== -(1 / 0)) {
          n = (n &gt; 0 || -1) * Math.floor(Math.abs(n));
        }
      }
      if (n &gt;= len) {
        return -1;
      }
      var k = n &gt;= 0 ? n : Math.max(len - Math.abs(n), 0);
      for (; k &lt; len; k++) {
        if (k in t &amp;&amp; t[k] === searchElement) {
          return k;
        }
      }
      return -1;
    }
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function(fn, context) {
      for (var i = 0, len = this.length &gt;&gt;&gt; 0; i &lt; len; i++) {
        if (i in this) {
          fn.call(context, this[i], i, this);
        }  
      }
    };
  }

  if (!Array.prototype.map) {
    Array.prototype.map = function(fn, context) {
      var result = [ ];
      for (var i = 0, len = this.length &gt;&gt;&gt; 0; i &lt; len; i++) {
        if (i in this) {
          result[i] = fn.call(context, this[i], i, this);
        }
      }
      return result;
    };
  }

  if (!Array.prototype.every) {
    Array.prototype.every = function(fn, context) {
      for (var i = 0, len = this.length &gt;&gt;&gt; 0; i &lt; len; i++) {
        if (i in this &amp;&amp; !fn.call(context, this[i], i, this)) {
          return false;
        }
      }
      return true;
    };
  }

  if (!Array.prototype.some) {
    Array.prototype.some = function(fn, context) {
      for (var i = 0, len = this.length &gt;&gt;&gt; 0; i &lt; len; i++) {
        if (i in this &amp;&amp; fn.call(context, this[i], i, this)) {
          return true;
        }
      }
      return false;
    };
  }

  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fn, context) {
      var result = [ ], val;
      for (var i = 0, len = this.length &gt;&gt;&gt; 0; i &lt; len; i++) {
        if (i in this) {
          val = this[i]; // in case fn mutates this
          if (fn.call(context, val, i, this)) {
            result.push(val);
          }
        }
      }
      return result;
    };
  }

  if (!Array.prototype.reduce) {
    Array.prototype.reduce = function(fn /*, initial*/) {
      var len = this.length &gt;&gt;&gt; 0,
          i = 0,
          rv;

      if (arguments.length &gt; 1) {
        rv = arguments[1];
      }
      else {
        do {
          if (i in this) {
            rv = this[i++];
            break;
          }
          // if array contains no values, no initial value to return
          if (++i &gt;= len) {
            throw new TypeError();
          }
        }
        while (true);
      }
      for (; i &lt; len; i++) {
        if (i in this) {
          rv = fn.call(null, rv, this[i], i, this);
        }
      }
      return rv;
    };
  }

  /**
   * Invokes method on all items in a given array
   * @method invoke
   * @memberOf fabric.util.array
   * @param {Array} array Array to iterate over
   * @param {String} method Name of a method to invoke
   */
  function invoke(array, method) {
    var args = slice.call(arguments, 2), result = [ ];
    for (var i = 0, len = array.length; i &lt; len; i++) {
      result[i] = args.length ? array[i][method].apply(array[i], args) : array[i][method].call(array[i]);
    }
    return result;
  }

  /**
   * Finds maximum value in array (not necessarily "first" one)
   * @method max
   * @memberOf fabric.util.array
   * @param {Array} array Array to iterate over
   * @param {String} byProperty
   */
  function max(array, byProperty) {
    var i = array.length - 1, 
        result = byProperty ? array[i][byProperty] : array[i];
    if (byProperty) {
      while (i--) {
        if (array[i][byProperty] &gt;= result) {
          result = array[i][byProperty];
        }
      }
    }
    else {
      while (i--) {
        if (array[i] &gt;= result) {
          result = array[i];
        }
      }
    }
    return result;
  }

  /**
   * Finds minimum value in array (not necessarily "first" one)
   * @method min
   * @memberOf fabric.util.array
   * @param {Array} array Array to iterate over
   * @param {String} byProperty
   */
  function min(array, byProperty) {
    var i = array.length - 1, 
        result = byProperty ? array[i][byProperty] : array[i];

    if (byProperty) {
      while (i--) {
        if (array[i][byProperty] &lt; result) {
          result = array[i][byProperty];
        }
      }
    }
    else {
      while (i--) {
        if (array[i] &lt; result) {
          result = array[i];
        }
      }
    }
    return result;
  }

  /** @namespace */
  fabric.util.array = {
    invoke: invoke,
    min: min,
    max: max
  };
  
})();
(function(){
  
  /**
   * Copies all enumerable properties of one object to another
   * @memberOf fabric.util.object
   * @method extend
   * @param {Object} destination Where to copy to
   * @param {Object} source Where to copy from
   */
  function extend(destination, source) {
    // JScript DontEnum bug is not taken care of
    for (var property in source) {
      destination[property] = source[property];
    }
    return destination;
  }

  /**
   * Creates an empty object and copies all enumerable properties of another object to it
   * @method clone
   * @memberOf fabric.util.object
   * @param {Object} object Object to clone
   */
  function clone(object) {
    return extend({ }, object);
  }

  /** @namespace fabric.util.object */
  fabric.util.object = {
    extend: extend,
    clone: clone
  };
  
})();
if (!String.prototype.trim) {
  /**
   * Trims a string (removing whitespace from the beginning and the end)
   * @method trim
   * @see &lt;a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/String/Trim"&gt;String#trim on MDN&lt;/a&gt;
   */
  String.prototype.trim = function () {
    // this trim is not fully ES3 or ES5 compliant, but it should cover most cases for now
    return this.replace(/^[\s\xA0]+/, '').replace(/[\s\xA0]+$/, '');
  };
}

/**
 * Camelizes a string
 * @memberOf fabric.util.string
 * @method camelize
 * @param {String} string String to camelize
 * @return {String} Camelized version of a string
 */
function camelize(string) {
  return string.replace(/-+(.)?/g, function(match, character) {
    return character ? character.toUpperCase() : '';
  });
}

/**
 * Capitalizes a string
 * @memberOf fabric.util.string
 * @method capitalize
 * @param {String} string String to capitalize
 * @return {String} Capitalized version of a string
 */
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

/** @namespace */
fabric.util.string = {
  camelize: camelize,
  capitalize: capitalize
};
(function() {
  
  var slice = Array.prototype.slice,
      apply = Function.prototype.apply,
      dummy = function() { };
  
  if (!Function.prototype.bind) {
    /**
     * Cross-browser approximation of ES5 Function.prototype.bind (not fully spec conforming)
     * @see &lt;a href="https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Function/bind"&gt;Function#bind on MDN&lt;/a&gt;
     * @param {Object} thisArg Object to bind function to
     * @param {Any[]} [...] Values to pass to a bound function
     * @return {Function}
     */
     Function.prototype.bind = function(thisArg) {
       var fn = this, args = slice.call(arguments, 1), bound;
       if (args.length) {
         bound = function() { 
           return apply.call(fn, this instanceof dummy ? this : thisArg, args.concat(slice.call(arguments))); 
         };
       }
       else {
         bound = function() { 
           return apply.call(fn, this instanceof dummy ? this : thisArg, arguments);
         };
       }
       dummy.prototype = this.prototype;
       bound.prototype = new dummy;
       
       return bound;
     };
  }
  
})();
(function() {
  
  var slice = Array.prototype.slice;
  
  var IS_DONTENUM_BUGGY = (function(){
    for (var p in { toString: 1 }) {
      if (p === 'toString') return false;
    }
    return true;
  })();
  
  var addMethods;
  if (IS_DONTENUM_BUGGY) {
    /** @ignore */
    addMethods = function(klass, source) {
      if (source.toString !== Object.prototype.toString) {
        klass.prototype.toString = source.toString;
      }
      if (source.valueOf !== Object.prototype.valueOf) {
        klass.prototype.valueOf = source.valueOf;
      }
      for (var property in source) {
        klass.prototype[property] = source[property];
      }
    };
  }
  else {
    /** @ignore */
    addMethods = function(klass, source) {
      for (var property in source) {
        klass.prototype[property] = source[property];
      }
    };
  }

  function subclass() { };
  
  /**
   * Helper for creation of "classes"
   * @method createClass
   * @memberOf fabric.util
   */
  function createClass() {
    var parent = null, 
        properties = slice.call(arguments, 0);
    
    if (typeof properties[0] === 'function') {
      parent = properties.shift();
    }
    function klass() {
      this.initialize.apply(this, arguments);
    }
    
    klass.superclass = parent;
    klass.subclasses = [ ];

    if (parent) {
      subclass.prototype = parent.prototype;
      klass.prototype = new subclass;
      parent.subclasses.push(klass);
    }
    for (var i = 0, length = properties.length; i &lt; length; i++) {
      addMethods(klass, properties[i]);
    }
    if (!klass.prototype.initialize) {
      klass.prototype.initialize = emptyFunction;
    }
    klass.prototype.constructor = klass;
    return klass;
  }
  
  fabric.util.createClass = createClass;
})();
(function (global) {
  
  /* EVENT HANDLING */
  
  function areHostMethods(object) {
    var methodNames = Array.prototype.slice.call(arguments, 1), 
        t, i, len = methodNames.length;
    for (i = 0; i &lt; len; i++) {
      t = typeof object[methodNames[i]];
      if (!(/^(?:function|object|unknown)$/).test(t)) return false;
    }
    return true;
  }
  var getUniqueId = (function () {
    if (typeof fabric.document.documentElement.uniqueID !== 'undefined') {
      return function (element) {
        return element.uniqueID;
      };
    }
    var uid = 0;
    return function (element) {
      return element.__uniqueID || (element.__uniqueID = 'uniqueID__' + uid++);
    };
  })();
  
  /** @ignore */
  var getElement, setElement;

  (function () {
    var elements = { };
    /** @ignore */
    getElement = function (uid) {
      return elements[uid];
    };
    /** @ignore */
    setElement = function (uid, element) {
      elements[uid] = element;
    };
  })();

  function createListener(uid, handler) {
    return {
      handler: handler,
      wrappedHandler: createWrappedHandler(uid, handler)
    };
  }

  function createWrappedHandler(uid, handler) {
    return function (e) {
      handler.call(getElement(uid), e || fabric.window.event);
    };
  }

  function createDispatcher(uid, eventName) {
    return function (e) {
      if (handlers[uid] &amp;&amp; handlers[uid][eventName]) {
        var handlersForEvent = handlers[uid][eventName];
        for (var i = 0, len = handlersForEvent.length; i &lt; len; i++) {
          handlersForEvent[i].call(this, e || fabric.window.event);
        }
      }
    };
  }

  var shouldUseAddListenerRemoveListener = (
        areHostMethods(fabric.document.documentElement, 'addEventListener', 'removeEventListener') &amp;&amp;
        areHostMethods(fabric.window, 'addEventListener', 'removeEventListener')),

      shouldUseAttachEventDetachEvent = (
        areHostMethods(fabric.document.documentElement, 'attachEvent', 'detachEvent') &amp;&amp;
        areHostMethods(fabric.window, 'attachEvent', 'detachEvent')),

      // IE branch
      listeners = { },

      // DOM L0 branch
      handlers = { },
      
      addListener, removeListener;

  if (shouldUseAddListenerRemoveListener) {
    /** @ignore */
    addListener = function (element, eventName, handler) {
      element.addEventListener(eventName, handler, false);
    };
    /** @ignore */
    removeListener = function (element, eventName, handler) {
      element.removeEventListener(eventName, handler, false);
    };
  }

  else if (shouldUseAttachEventDetachEvent) {
    /** @ignore */
    addListener = function (element, eventName, handler) { 
      var uid = getUniqueId(element);
      setElement(uid, element);
      if (!listeners[uid]) {
        listeners[uid] = { };
      }
      if (!listeners[uid][eventName]) {
        listeners[uid][eventName] = [ ];

      }
      var listener = createListener(uid, handler);
      listeners[uid][eventName].push(listener);
      element.attachEvent('on' + eventName, listener.wrappedHandler);
    };
    /** @ignore */
    removeListener = function (element, eventName, handler) {
      var uid = getUniqueId(element), listener;
      if (listeners[uid] &amp;&amp; listeners[uid][eventName]) {
        for (var i = 0, len = listeners[uid][eventName].length; i &lt; len; i++) {
          listener = listeners[uid][eventName][i];
          if (listener &amp;&amp; listener.handler === handler) {
            element.detachEvent('on' + eventName, listener.wrappedHandler);
            listeners[uid][eventName][i] = null;
          }
        }
      }        
    };
  }
  else {
    /** @ignore */
    addListener = function (element, eventName, handler) {
      var uid = getUniqueId(element);
      if (!handlers[uid]) {
        handlers[uid] = { };
      }
      if (!handlers[uid][eventName]) {
        handlers[uid][eventName] = [ ];
        var existingHandler = element['on' + eventName];
        if (existingHandler) {
          handlers[uid][eventName].push(existingHandler);
        }
        element['on' + eventName] = createDispatcher(uid, eventName);
      }
      handlers[uid][eventName].push(handler);
    };
    /** @ignore */
    removeListener = function (element, eventName, handler) {
      var uid = getUniqueId(element);
      if (handlers[uid] &amp;&amp; handlers[uid][eventName]) {
        var handlersForEvent = handlers[uid][eventName];
        for (var i = 0, len = handlersForEvent.length; i &lt; len; i++) {
          if (handlersForEvent[i] === handler) {
            handlersForEvent.splice(i, 1);
          }
        }
      }
    };
  }
  
  /**
   * Adds an event listener to an element
   * @mthod addListener
   * @memberOf fabric.util
   * @function
   * @param {HTMLElement} element
   * @param {String} eventName
   * @param {Function} handler
   */
  fabric.util.addListener = addListener;
  
  /**
   * Removes an event listener from an element
   * @mthod removeListener
   * @memberOf fabric.util
   * @function
   * @param {HTMLElement} element
   * @param {String} eventName
   * @param {Function} handler
   */
  fabric.util.removeListener = removeListener;
  
  /**
   * Cross-browser wrapper for getting event's coordinates
   * @method getPointer
   * @memberOf fabric.util
   * @param {Event} event
   */
  function getPointer(event) {
    // TODO (kangax): this method needs fixing
    return { x: pointerX(event), y: pointerY(event) };
  }

  function pointerX(event) {
    var docElement = fabric.document.documentElement,
        body = fabric.document.body || { scrollLeft: 0 };
    
    // looks like in IE (&lt;9) clientX at certain point (apparently when mouseup fires on VML element) 
    // is represented as COM object, with all the consequences, like "unknown" type and error on [[Get]]
    // need to investigate later
    return event.pageX || ((typeof event.clientX != 'unknown' ? event.clientX : 0) +
      (docElement.scrollLeft || body.scrollLeft) -
      (docElement.clientLeft || 0));
  }

  function pointerY(event) {
    var docElement = fabric.document.documentElement,
        body = fabric.document.body || { scrollTop: 0 };

    return  event.pageY || ((typeof event.clientY != 'unknown' ? event.clientY : 0) +
       (docElement.scrollTop || body.scrollTop) -
       (docElement.clientTop || 0));
  }
  
  fabric.util.getPointer = getPointer;
  
  fabric.util.object.extend(fabric.util, fabric.Observable);
  
})(this);
(function () {
  
  /**
   * Cross-browser wrapper for setting element's style
   * @method setStyle
   * @memberOf fabric.util
   * @param {HTMLElement} element
   * @param {Object} styles
   * @return {HTMLElement} Element that was passed as a first argument
   */
  function setStyle(element, styles) {
    var elementStyle = element.style, match;
    if (typeof styles === 'string') {
      element.style.cssText += ';' + styles;
      return styles.indexOf('opacity') &gt; -1 
        ? setOpacity(element, styles.match(/opacity:\s*(\d?\.?\d*)/)[1]) 
        : element;
    }
    for (var property in styles) {
      if (property === 'opacity') {
        setOpacity(element, styles[property]);
      }
      else {
        var normalizedProperty = (property === 'float' || property === 'cssFloat') 
          ? (typeof elementStyle.styleFloat === 'undefined' ? 'cssFloat' : 'styleFloat') 
          : property;
        elementStyle[normalizedProperty] = styles[property];
      }
    }
    return element;
  }

  var parseEl = fabric.document.createElement('div'),
      supportsOpacity = typeof parseEl.style.opacity === 'string', 
      supportsFilters = typeof parseEl.style.filter === 'string',
      view = fabric.document.defaultView,
      supportsGCS = view &amp;&amp; typeof view.getComputedStyle !== 'undefined',
      reOpacity = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
      
      /** @ignore */
      setOpacity = function (element) { return element; };

  if (supportsOpacity) {
    /** @ignore */
    setOpacity = function(element, value) {
      element.style.opacity = value;
      return element;
    };
  }
  else if (supportsFilters) {
    /** @ignore */
    setOpacity = function(element, value) {
      var es = element.style;
      if (element.currentStyle &amp;&amp; !element.currentStyle.hasLayout) {
        es.zoom = 1;
      }
      if (reOpacity.test(es.filter)) {
        value = value &gt;= 0.9999 ? '' : ('alpha(opacity=' + (value * 100) + ')');
        es.filter = es.filter.replace(reOpacity, value);
      }
      else {
        es.filter += ' alpha(opacity=' + (value * 100) + ')';
      }
      return element;
    };
  }

  fabric.util.setStyle = setStyle;
  
})();
(function() {
  
  var _slice = Array.prototype.slice;

  /**
   * Takes id and returns an element with that id (if one exists in a document)
   * @method getById
   * @memberOf fabric.util
   * @param {String|HTMLElement} id
   * @return {HTMLElement|null}
   */
  function getById(id) {
    return typeof id === 'string' ? fabric.document.getElementById(id) : id;
  }

  /**
   * Converts an array-like object (e.g. arguments or NodeList) to an array
   * @method toArray
   * @memberOf fabric.util
   * @param {Object} arrayLike
   * @return {Array}
   */
  function toArray(arrayLike) {
    return _slice.call(arrayLike, 0);
  }

  try {
    var sliceCanConvertNodelists = toArray(fabric.document.childNodes) instanceof Array;
  }
  catch(err) { }

  if (!sliceCanConvertNodelists) {
    toArray = function(arrayLike) {
      var arr = new Array(arrayLike.length), i = arrayLike.length;
      while (i--) {
        arr[i] = arrayLike[i];
      }
      return arr;
    };
  }

  /**
   * Creates specified element with specified attributes
   * @method makeElement
   * @memberOf fabric.util
   * @param {String} tagName Type of an element to create
   * @param {Object} [attributes] Attributes to set on an element
   * @return {HTMLElement} Newly created element
   */
  function makeElement(tagName, attributes) {
    var el = fabric.document.createElement(tagName);
    for (var prop in attributes) {
      if (prop === 'class') {
        el.className = attributes[prop];
      }
      else if (prop === 'for') {
        el.htmlFor = attributes[prop];
      }
      else {
        el.setAttribute(prop, attributes[prop]);
      }
    }
    return el;
  }

  /**
   * Adds class to an element
   * @method addClass
   * @memberOf fabric.util
   * @param {HTMLElement} element Element to add class to
   * @param {String} className Class to add to an element
   */
  function addClass(element, className) {
    if ((' ' + element.className + ' ').indexOf(' ' + className + ' ') === -1) {
      element.className += (element.className ? ' ' : '') + className;
    }  
  }

  /**
   * Wraps element with another element
   * @method wrapElement
   * @memberOf fabric.util
   * @param {HTMLElement} element Element to wrap
   * @param {HTMLElement|String} wrapper Element to wrap with
   * @param {Object} [attributes] Attributes to set on a wrapper
   * @return {HTMLElement} wrapper
   */
  function wrapElement(element, wrapper, attributes) {
    if (typeof wrapper === 'string') {
      wrapper = makeElement(wrapper, attributes);
    }
    if (element.parentNode) {
      element.parentNode.replaceChild(wrapper, element);
    }
    wrapper.appendChild(element);
    return wrapper;
  }

  /**
   * Returns offset for a given element
   * @method getElementOffset
   * @function
   * @memberOf fabric.util
   * @param {HTMLElement} element Element to get offset for
   * @return {Object} Object with "left" and "top" properties
   */
  function getElementOffset(element) {
    // TODO (kangax): need to fix this method
    var valueT = 0, valueL = 0;
    do {
      valueT += element.offsetTop  || 0;
      valueL += element.offsetLeft || 0;
      element = element.offsetParent;
    } 
    while (element);
    return ({ left: valueL, top: valueT });
  }

  (function () {
    var style = fabric.document.documentElement.style;

    var selectProp = 'userSelect' in style
      ? 'userSelect'
      : 'MozUserSelect' in style 
        ? 'MozUserSelect' 
        : 'WebkitUserSelect' in style 
          ? 'WebkitUserSelect' 
          : 'KhtmlUserSelect' in style 
            ? 'KhtmlUserSelect' 
            : '';

    /**
     * Makes element unselectable
     * @method makeElementUnselectable
     * @memberOf fabric.util
     * @param {HTMLElement} element Element to make unselectable
     * @return {HTMLElement} Element that was passed in
     */
    function makeElementUnselectable(element) {
      if (typeof element.onselectstart !== 'undefined') {
        element.onselectstart = fabric.util.falseFunction;
      }
      if (selectProp) {
        element.style[selectProp] = 'none';
      }
      else if (typeof element.unselectable == 'string') {
        element.unselectable = 'on';
      }
      return element;
    }

    fabric.util.makeElementUnselectable = makeElementUnselectable;
  })();

  (function() {

    /**
     * Inserts a script element with a given url into a document; invokes callback, when that script is finished loading
     * @method getScript
     * @memberOf fabric.util
     * @param {String} url URL of a script to load
     * @param {Function} callback Callback to execute when script is finished loading
     */
    function getScript(url, callback) {
    	var headEl = fabric.document.getElementsByTagName("head")[0],
    	    scriptEl = fabric.document.createElement('script'), 
    	    loading = true;

    	scriptEl.type = 'text/javascript';
    	scriptEl.setAttribute('runat', 'server');

    	/** @ignore */
    	scriptEl.onload = /** @ignore */ scriptEl.onreadystatechange = function(e) {
    	  if (loading) {
    	    if (typeof this.readyState == 'string' &amp;&amp; 
    	        this.readyState !== 'loaded' &amp;&amp; 
    	        this.readyState !== 'complete') return;
      	  loading = false;
      		callback(e || fabric.window.event);
      		scriptEl = scriptEl.onload = scriptEl.onreadystatechange = null;
      	}
    	};
    	scriptEl.src = url;
    	headEl.appendChild(scriptEl);
    	// causes issue in Opera
    	// headEl.removeChild(scriptEl);
    }

    fabric.util.getScript = getScript;
  })();

  fabric.util.getById = getById;
  fabric.util.toArray = toArray;
  fabric.util.makeElement = makeElement;
  fabric.util.addClass = addClass;
  fabric.util.wrapElement = wrapElement;
  fabric.util.getElementOffset = getElementOffset;
  
})();
(function(){
  
  function addParamToUrl(url, param) {
    return url + (/\?/.test(url) ? '&amp;' : '?') + param;
  }
  
  var makeXHR = (function() {
    var factories = [
      function() { return new ActiveXObject("Microsoft.XMLHTTP"); },
      function() { return new ActiveXObject("Msxml2.XMLHTTP"); },
      function() { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); },
      function() { return new XMLHttpRequest(); }
    ];
    for (var i = factories.length; i--; ) {
      try {
        var req = factories[i]();
        if (req) {
          return factories[i];
        }
      }
      catch (err) { }
    }
  })();

  function emptyFn() { };
  
  /**
   * Cross-browser abstraction for sending XMLHttpRequest
   * @method request
   * @memberOf fabric.util
   * @param {String} url URL to send XMLHttpRequest to
   * @param {Object} [options] Options object
   * @param {String} [options.method="GET"]
   * @param {Function} options.onComplete Callback to invoke when request is completed
   * @return {XMLHttpRequest} request
   */
  function request(url, options) {

    options || (options = { });

    var method = options.method ? options.method.toUpperCase() : 'GET',
        onComplete = options.onComplete || function() { },
        request = makeXHR(),
        body;
        
    /** @ignore */
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        onComplete(request);
        request.onreadystatechange = emptyFn;
      }
    };
    
    if (method === 'GET') {
      body = null;
      if (typeof options.parameters == 'string') {
        url = addParamToUrl(url, options.parameters);
      }
    }

    request.open(method, url, true);
    
    if (method === 'POST' || method === 'PUT') {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    request.send(body);
    return request;
  };
  
  fabric.util.request = request;
})();
(function(global) {
  
  "use strict";
  
  /**
   * @name fabric
   * @namespace
   */
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      capitalize = fabric.util.string.capitalize,
      clone = fabric.util.object.clone;
  
  var attributesMap = {
    'cx':             'left',
    'x':              'left',
    'cy':             'top',
    'y':              'top',
    'r':              'radius',
    'fill-opacity':   'opacity',
    'fill-rule':      'fillRule',
    'stroke-width':   'strokeWidth',
    'transform':      'transformMatrix'
  };
  
  /**
   * Returns an object of attributes' name/value, given element and an array of attribute names;
   * Parses parent "g" nodes recursively upwards.
   * @static
   * @memberOf fabric
   * @method parseAttributes
   * @param {DOMElement} element Element to parse
   * @param {Array} attributes Array of attributes to parse
   * @return {Object} object containing parsed attributes' names/values
   */
  function parseAttributes(element, attributes) {
    
    if (!element) {
      return;
    }
    
    var value, 
        parsed, 
        parentAttributes = { };

    // if there's a parent container (`g` node), parse its attributes recursively upwards
    if (element.parentNode &amp;&amp; /^g$/i.test(element.parentNode.nodeName)) {
      parentAttributes = fabric.parseAttributes(element.parentNode, attributes);
    }
    
    var ownAttributes = attributes.reduce(function(memo, attr) {
      value = element.getAttribute(attr);
      parsed = parseFloat(value);
      if (value) {        
        // "normalize" attribute values
        if ((attr === 'fill' || attr === 'stroke') &amp;&amp; value === 'none') {
          value = '';
        }
        if (attr === 'fill-rule') {
          value = (value === 'evenodd') ? 'destination-over' : value;
        }
        if (attr === 'transform') {
          value = fabric.parseTransformAttribute(value);
        }
        // transform attribute names
        if (attr in attributesMap) {
          attr = attributesMap[attr];
        }
        memo[attr] = isNaN(parsed) ? value : parsed;
      }
      return memo;
    }, { });
    
    // add values parsed from style, which take precedence over attributes
    // (see: http://www.w3.org/TR/SVG/styling.html#UsingPresentationAttributes)
    
    ownAttributes = extend(ownAttributes, extend(getGlobalStylesForElement(element), fabric.parseStyleAttribute(element)));
    return extend(parentAttributes, ownAttributes);
  };
  
  /**
   * Parses "transform" attribute, returning an array of values
   * @static
   * @function
   * @memberOf fabric
   * @method parseTransformAttribute
   * @param attributeValue {String} string containing attribute value
   * @return {Array} array of 6 elements representing transformation matrix
   */
  fabric.parseTransformAttribute = (function() {
    function rotateMatrix(matrix, args) {
      var angle = args[0];
      
      matrix[0] = Math.cos(angle);
      matrix[1] = Math.sin(angle);
      matrix[2] = -Math.sin(angle);
      matrix[3] = Math.cos(angle);
    }
    
    function scaleMatrix(matrix, args) {
      var multiplierX = args[0],
          multiplierY = (args.length === 2) ? args[1] : args[0];

      matrix[0] = multiplierX;
      matrix[3] = multiplierY;
    }
    
    function skewXMatrix(matrix, args) {
      matrix[2] = args[0];
    }
    
    function skewYMatrix(matrix, args) {
      matrix[1] = args[0];
    }
    
    function translateMatrix(matrix, args) {
      matrix[4] = args[0];
      if (args.length === 2) {
        matrix[5] = args[1];
      }
    }
    
    // identity matrix
    var iMatrix = [
          1, // a
          0, // b
          0, // c
          1, // d
          0, // e
          0  // f
        ],
    
        // == begin transform regexp
        number = '(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)',
        comma_wsp = '(?:\\s+,?\\s*|,\\s*)',
        
        skewX = '(?:(skewX)\\s*\\(\\s*(' + number + ')\\s*\\))',
        skewY = '(?:(skewY)\\s*\\(\\s*(' + number + ')\\s*\\))',
        rotate = '(?:(rotate)\\s*\\(\\s*(' + number + ')(?:' + comma_wsp + '(' + number + ')' + comma_wsp + '(' + number + '))?\\s*\\))',
        scale = '(?:(scale)\\s*\\(\\s*(' + number + ')(?:' + comma_wsp + '(' + number + '))?\\s*\\))',
        translate = '(?:(translate)\\s*\\(\\s*(' + number + ')(?:' + comma_wsp + '(' + number + '))?\\s*\\))',
        
        matrix = '(?:(matrix)\\s*\\(\\s*' + 
                  '(' + number + ')' + comma_wsp + 
                  '(' + number + ')' + comma_wsp + 
                  '(' + number + ')' + comma_wsp +
                  '(' + number + ')' + comma_wsp +
                  '(' + number + ')' + comma_wsp +
                  '(' + number + ')' + 
                  '\\s*\\))',
        
        transform = '(?:' +
                    matrix + '|' +
                    translate + '|' +
                    scale + '|' +
                    rotate + '|' +
                    skewX + '|' +
                    skewY + 
                    ')',
        
        transforms = '(?:' + transform + '(?:' + comma_wsp + transform + ')*' + ')',
        
        transform_list = '^\\s*(?:' + transforms + '?)\\s*$',
    
        // http://www.w3.org/TR/SVG/coords.html#TransformAttribute
        reTransformList = new RegExp(transform_list),
        // == end transform regexp
        
        reTransform = new RegExp(transform);
    
    return function(attributeValue) {
      
      // start with identity matrix
      var matrix = iMatrix.concat();
      
      // return if no argument was given or 
      // an argument does not match transform attribute regexp
      if (!attributeValue || (attributeValue &amp;&amp; !reTransformList.test(attributeValue))) {
        return matrix;
      }
      
      attributeValue.replace(reTransform, function(match) {
          
        var m = new RegExp(transform).exec(match).filter(function (match) {
              return (match !== '' &amp;&amp; match != null);
            }),
            operation = m[1],
            args = m.slice(2).map(parseFloat);
        
        switch(operation) {
          case 'translate':
            translateMatrix(matrix, args);
            break;
          case 'rotate':
            rotateMatrix(matrix, args);
            break;
          case 'scale':
            scaleMatrix(matrix, args);
            break;
          case 'skewX':
            skewXMatrix(matrix, args);
            break;
          case 'skewY':
            skewYMatrix(matrix, args);
            break;
          case 'matrix':
            matrix = args;
            break;
        }
      })
      return matrix;
    }
  })();
  
  /**
   * Parses "points" attribute, returning an array of values
   * @static
   * @memberOf fabric
   * @method parsePointsAttribute
   * @param points {String} points attribute string
   * @return {Array} array of points
   */
  function parsePointsAttribute(points) {
        
    // points attribute is required and must not be empty
    if (!points) return null;
    
    points = points.trim();
    var asPairs = points.indexOf(',') &gt; -1;
    
    points = points.split(/\s+/);
    var parsedPoints = [ ];
    
    // points could look like "10,20 30,40" or "10 20 30 40"
    if (asPairs) {  
     for (var i = 0, len = points.length; i &lt; len; i++) {
       var pair = points[i].split(',');
       parsedPoints.push({ x: parseFloat(pair[0]), y: parseFloat(pair[1]) });
     } 
    }
    else {
      for (var i = 0, len = points.length; i &lt; len; i+=2) {
        parsedPoints.push({ x: parseFloat(points[i]), y: parseFloat(points[i+1]) });
      }
    }
    
    // odd number of points is an error
    if (parsedPoints.length % 2 !== 0) {
      // return null;
    }
    
    return parsedPoints;
  };

  /**
   * Parses "style" attribute, retuning an object with values
   * @static
   * @memberOf fabric
   * @method parseStyleAttribute
   * @param {SVGElement} element Element to parse
   * @return {Object} Objects with values parsed from style attribute of an element
   */
  function parseStyleAttribute(element) {
    var oStyle = { },
        style = element.getAttribute('style');
    if (style) {
      if (typeof style == 'string') {
        style = style.replace(/;$/, '').split(';');
        oStyle = style.reduce(function(memo, current) {
          var attr = current.split(':'),
              key = attr[0].trim(),
              value = attr[1].trim();
          memo[key] = value;
          return memo;
        }, { });
      }
      else {
        for (var prop in style) {
          if (typeof style[prop] !== 'undefined') {
            oStyle[prop] = style[prop];
          }
        }
      }
    }
    return oStyle;
  };
  
  function resolveGradients(instances) {
    var activeInstance = fabric.Canvas.activeInstance,
        ctx = activeInstance ? activeInstance.getContext() : null;
        
    if (!ctx) return;

    for (var i = instances.length; i--; ) {
      var instanceFillValue = instances[i].get('fill');

      if (/^url\(/.test(instanceFillValue)) {

        var gradientId = instanceFillValue.slice(5, instanceFillValue.length - 1);

        if (fabric.gradientDefs[gradientId]) {
          instances[i].set('fill',
            fabric.Gradient.fromElement(fabric.gradientDefs[gradientId], ctx, instances[i]));
        }
      }
    }
  }

  /**
   * Transforms an array of svg elements to corresponding fabric.* instances
   * @static
   * @memberOf fabric
   * @method parseElements
   * @param {Array} elements Array of elements to parse
   * @param {Function} callback Being passed an array of fabric instances (transformed from SVG elements)
   * @param {Object} options Options object
   */
  function parseElements(elements, callback, options) {
    var instances = Array(elements.length), i = elements.length;

    function checkIfDone() {
      if (--i === 0) {
        instances = instances.filter(function(el) {
          return el != null;
        });
        resolveGradients(instances);
        callback(instances);
      }
    }
    
    for (var index = 0, el, len = elements.length; index &lt; len; index++) {
      el = elements[index];
      var klass = fabric[capitalize(el.tagName)];
      if (klass &amp;&amp; klass.fromElement) {
        try {
          if (klass.fromElement.async) {
            klass.fromElement(el, (function(index) { 
              return function(obj) {
                instances.splice(index, 0, obj);
                checkIfDone();
              };
            })(index), options);
          }
          else {
            instances.splice(index, 0, klass.fromElement(el, options));
            checkIfDone();
          }
        }
        catch(e) {
          fabric.log(e.message || e);
        }
      }
      else {
        checkIfDone();
      }
    }
  };
  
  /**
   * Returns CSS rules for a given SVG document
   * @static
   * @function
   * @memberOf fabric
   * @method getCSSRules
   * @param {SVGDocument} doc SVG document to parse
   * @return {Object} CSS rules of this document
   */
  function getCSSRules(doc) {
    var styles = doc.getElementsByTagName('style'),
        allRules = { },
        rules;
    
    // very crude parsing of style contents  
    for (var i = 0, len = styles.length; i &lt; len; i++) {
      var styleContents = styles[0].textContent;
      
      // remove comments
      styleContents = styleContents.replace(/\/\*[\s\S]*?\*\//g, '');
                         
      rules = styleContents.match(/[^{]*\{[\s\S]*?\}/g);
      rules = rules.map(function(rule) { return rule.trim() });
      
      rules.forEach(function(rule) {
        var match = rule.match(/([\s\S]*?)\s*\{([^}]*)\}/),
            rule = match[1],
            declaration = match[2].trim(),
            propertyValuePairs = declaration.replace(/;$/, '').split(/\s*;\s*/);
        
        if (!allRules[rule]) {
          allRules[rule] = { };
        }
        
        for (var i = 0, len = propertyValuePairs.length; i &lt; len; i++) {
          var pair = propertyValuePairs[i].split(/\s*:\s*/),
              property = pair[0],
              value = pair[1];
              
          allRules[rule][property] = value;
        }
      });
    }
    
    return allRules;
  }
  
  function getGlobalStylesForElement(element) {
    var nodeName = element.nodeName,
        className = element.getAttribute('class'),
        id = element.getAttribute('id'),
        styles = { };
    
    for (var rule in fabric.cssRules) {
      var ruleMatchesElement = (className &amp;&amp; new RegExp('^\\.' + className).test(rule)) ||
                               (id &amp;&amp; new RegExp('^#' + id).test(rule)) ||
                               (new RegExp('^' + nodeName).test(rule));
                               
      if (ruleMatchesElement) {
        for (var property in fabric.cssRules[rule]) {
          styles[property] = fabric.cssRules[rule][property];
        }
      }
    }
    
    return styles;
  }
  
  /**
   * Parses an SVG document, converts it to an array of corresponding fabric.* instances and passes them to a callback
   * @static
   * @function
   * @memberOf fabric
   * @method parseSVGDocument
   * @param {SVGDocument} doc SVG document to parse
   * @param {Function} callback Callback to call when parsing is finished; It's being passed an array of elements (parsed from a document).
   */
  fabric.parseSVGDocument = (function() {

    var reAllowedSVGTagNames = /^(path|circle|polygon|polyline|ellipse|rect|line|image)$/;

    // http://www.w3.org/TR/SVG/coords.html#ViewBoxAttribute
    // \d doesn't quite cut it (as we need to match an actual float number)

    // matches, e.g.: +14.56e-12, etc.
    var reNum = '(?:[-+]?\\d+(?:\\.\\d+)?(?:e[-+]?\\d+)?)';

    var reViewBoxAttrValue = new RegExp(
      '^' +
      '\\s*(' + reNum + '+)\\s*,?' +
      '\\s*(' + reNum + '+)\\s*,?' +
      '\\s*(' + reNum + '+)\\s*,?' +
      '\\s*(' + reNum + '+)\\s*' +
      '$'
    );
    
    function hasAncestorWithNodeName(element, nodeName) {
      while (element &amp;&amp; (element = element.parentNode)) {
        if (nodeName.test(element.nodeName)) {
          return true;
        }
      }
      return false;
    }

    return function(doc, callback) {
      if (!doc) return;
      
      var startTime = new Date(),
          descendants = fabric.util.toArray(doc.getElementsByTagName('*'));
      
      if (descendants.length === 0) {
        // we're likely in node, where "o3-xml" library fails to gEBTN("*")
        // https://github.com/ajaxorg/node-o3-xml/issues/21
        descendants = doc.selectNodes("//*[name(.)!='svg']");
        var arr = [ ];
        for (var i = 0, len = descendants.length; i &lt; len; i++) {
          arr[i] = descendants[i];
        }
        descendants = arr;
      }
      
      var elements = descendants.filter(function(el) {
        return reAllowedSVGTagNames.test(el.tagName) &amp;&amp; 
              !hasAncestorWithNodeName(el, /^(?:pattern|defs)$/); // http://www.w3.org/TR/SVG/struct.html#DefsElement
      });

      if (!elements || (elements &amp;&amp; !elements.length)) return;

      var viewBoxAttr = doc.getAttribute('viewBox'),
          widthAttr = doc.getAttribute('width'),
          heightAttr = doc.getAttribute('height'),
          width = null,
          height = null,
          minX,
          minY;
      
      if (viewBoxAttr &amp;&amp; (viewBoxAttr = viewBoxAttr.match(reViewBoxAttrValue))) {
        minX = parseInt(viewBoxAttr[1], 10);
        minY = parseInt(viewBoxAttr[2], 10);
        width = parseInt(viewBoxAttr[3], 10);
        height = parseInt(viewBoxAttr[4], 10);
      }

      // values of width/height attributes overwrite those extracted from viewbox attribute
      width = widthAttr ? parseFloat(widthAttr) : width;
      height = heightAttr ? parseFloat(heightAttr) : height;

      var options = { 
        width: width, 
        height: height
      };
      
      fabric.gradientDefs = fabric.getGradientDefs(doc);
      fabric.cssRules = getCSSRules(doc);
      
      // Precedence of rules:   style &gt; class &gt; attribute
      
      fabric.parseElements(elements, function(instances) {
        fabric.documentParsingTime = new Date() - startTime;
        if (callback) {
          callback(instances, options);
        }
      }, clone(options));
    };
  })();
  
  /**
    * Used for caching SVG documents (loaded via `fabric.Canvas#loadSVGFromURL`)
    * @property
    * @namespace
    */
   var svgCache = {
     
     /**
      * @method has
      * @param {String} name
      * @param {Function} callback
      */
     has: function (name, callback) { 
       callback(false);
     },
     
     /**
      * @method get
      * @param {String} url
      * @param {Function} callback
      */
     get: function (url, callback) {
       /* NOOP */
     },
     
     /**
      * @method set
      * @param {String} url
      * @param {Object} object
      */
     set: function (url, object) {
       /* NOOP */
     }
   };
   
   /**
    * Takes url corresponding to an SVG document, and parses it into a set of fabric objects
    * @method loadSVGFromURL
    * @param {String} url
    * @param {Function} callback
    */
   function loadSVGFromURL(url, callback) {
     
     url = url.replace(/^\n\s*/, '').replace(/\?.*$/, '').trim();
     
     svgCache.has(url, function (hasUrl) {
       if (hasUrl) {
         svgCache.get(url, function (value) {
           var enlivedRecord = _enlivenCachedObject(value);
           callback(enlivedRecord.objects, enlivedRecord.options);
         });
       }
       else {
         new fabric.util.request(url, {
           method: 'get',
           onComplete: onComplete
         });
       }
     });
     
     function onComplete(r) {
       
       var xml = r.responseXML;
       if (!xml) return;
       
       var doc = xml.documentElement;
       if (!doc) return;
       
       fabric.parseSVGDocument(doc, function (results, options) {
         svgCache.set(url, {
           objects: fabric.util.array.invoke(results, 'toObject'),
           options: options
         });
         callback(results, options);
       });
     }
   }
   
  /**
  * @method _enlivenCachedObject
  */
  function _enlivenCachedObject(cachedObject) {
 
   var objects = cachedObject.objects,
       options = cachedObject.options;
 
   objects = objects.map(function (o) {
     return fabric[capitalize(o.type)].fromObject(o);
   });
 
   return ({ objects: objects, options: options });
  }
  
  /**
    * Takes string corresponding to an SVG document, and parses it into a set of fabric objects
    * @method loadSVGFromString
    * @param {String} string
    * @param {Function} callback
    */
  function loadSVGFromString(string, callback) {
    string = string.trim();
    var doc;
    if (typeof DOMParser !== 'undefined') {
      var parser = new DOMParser();
      if (parser &amp;&amp; parser.parseFromString) {
        doc = parser.parseFromString(string, 'text/xml');
      }
    }
    else if (fabric.window.ActiveXObject) {
      var doc = new ActiveXObject('Microsoft.XMLDOM');
      if (doc &amp;&amp; doc.loadXML) {
        doc.async = 'false';
        doc.loadXML(string);
      }
    }
    
    fabric.parseSVGDocument(doc.documentElement, function (results, options) {
      callback(results, options);
    });
  }
  
  extend(fabric, {
    parseAttributes:        parseAttributes,
    parseElements:          parseElements,
    parseStyleAttribute:    parseStyleAttribute,
    parsePointsAttribute:   parsePointsAttribute,
    getCSSRules:            getCSSRules,
    
    loadSVGFromURL:         loadSVGFromURL,
    loadSVGFromString:      loadSVGFromString
  });
  
})(typeof exports != 'undefined' ? exports : this);
(function() {
  
  function getColorStopFromStyle(el) {
    var style = el.getAttribute('style');
    
    if (style) {
      var keyValuePairs = style.split(/\s*;\s*/);
      
      for (var i = keyValuePairs.length; i--; ) {
        
        var split = keyValuePairs[i].split(/\s*:\s*/),
            key = split[0].trim(),
            value = split[1].trim();
            
        if (key === 'stop-color') {
          return value;
        }
      }
    }
  }
  
  /** @namespace */
  
  fabric.Gradient = {
    
    /**
     * @method create
     * @static
     */
    create: function(ctx, options) {
      options || (options = { });

      var x1 = options.x1 || 0,
          y1 = options.y1 || 0,
          x2 = options.x2 || ctx.canvas.width,
          y2 = options.y2 || 0,
          colorStops = options.colorStops;
          
      var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
      
      for (var position in colorStops) {
        var colorValue = colorStops[position];
        gradient.addColorStop(parseFloat(position), colorValue);
      }
      return gradient;
    },
    
    /**
     * @method fromElement
     * @static
     * @see http://www.w3.org/TR/SVG/pservers.html#LinearGradientElement
     */
    fromElement: function(el, ctx, instance) {
      
      /**
       *  @example:
       *
       *  &lt;linearGradient id="grad1"&gt;
       *    &lt;stop offset="0%" stop-color="white"/&gt;
       *    &lt;stop offset="100%" stop-color="black"/&gt;
       *  &lt;/linearGradient&gt;
       *
       *  OR
       *
       *  &lt;linearGradient id="grad1"&gt;
       *    &lt;stop offset="0%" style="stop-color:rgb(255,255,255)"/&gt;
       *    &lt;stop offset="100%" style="stop-color:rgb(0,0,0)"/&gt;
       *  &lt;/linearGradient&gt;
       *
       */

      var colorStopEls = el.getElementsByTagName('stop'),
          el,
          offset,
          colorStops = { },
          colorStopFromStyle;

      for (var i = colorStopEls.length; i--; ) {
        el = colorStopEls[i];
        offset = parseInt(el.getAttribute('offset'), 10) / 100;
        colorStops[offset] = getColorStopFromStyle(el) || el.getAttribute('stop-color');
      }
      
      var coords = {
        x1: el.getAttribute('x1') || 0,
        y1: el.getAttribute('y1') || 0,
        x2: el.getAttribute('x2') || '100%',
        y2: el.getAttribute('y2') || 0
      };
      
      _convertPercentUnitsToValues(instance, coords);
      
      return fabric.Gradient.create(ctx, {
        x1: coords.x1,
        y1: coords.y1,
        x2: coords.x2,
        y2: coords.y2,
        colorStops: colorStops
      });
    },
    
    /**
     * @method forObject
     * @static
     */
    forObject: function(obj, ctx, options) {
      options || (options = { });
      
      _convertPercentUnitsToValues(obj, options);

      var gradient = fabric.Gradient.create(ctx, { 
        x1: options.x1 - (obj.width / 2),
        y1: options.y1 - (obj.height / 2),
        x2: options.x2 - (obj.width / 2),
        y2: options.y2 - (obj.height / 2),
        colorStops: options.colorStops
      });

      return gradient;
    }
  };
  
  function _convertPercentUnitsToValues(object, options) {
    for (var prop in options) {
      if (typeof options[prop] === 'string' &amp;&amp; /^\d+%$/.test(options[prop])) {
        var percents = parseFloat(options[prop], 10);
        if (prop === 'x1' || prop === 'x2') {
          options[prop] = object.width * percents / 100;
        }
        else if (prop === 'y1' || prop === 'y2') {
          options[prop] = object.height * percents / 100;
        }
      }
      // normalize rendering point (should be from top/left corner rather than center of the shape)
      if (prop === 'x1' || prop === 'x2') {
        options[prop] -= object.width / 2;
      }
      else if (prop === 'y1' || prop === 'y2') {
        options[prop] -= object.height / 2;
      }
    }
  }
  
  /**
   * Parses an SVG document, returning all of the gradient declarations found in it
   * @static
   * @function
   * @memberOf fabric
   * @method getGradientDefs
   * @param {SVGDocument} doc SVG document to parse
   * @return {Object} Gradient definitions; key corresponds to element id, value -- to gradient definition element
   */
  function getGradientDefs(doc) {
    var linearGradientEls = doc.getElementsByTagName('linearGradient'),
        radialGradientEls = doc.getElementsByTagName('radialGradient'),
        el,
        gradientDefs = { };
    
    for (var i = linearGradientEls.length; i--; ) {
      el = linearGradientEls[i];
      gradientDefs[el.id] = el;
    }
    
    for (var i = radialGradientEls.length; i--; ) {
      el = radialGradientEls[i];
      gradientDefs[el.id] = el;
    }
    
    return gradientDefs;
  }
  
  fabric.getGradientDefs = getGradientDefs;
  
})();
(function(global) {
  
  "use strict";
  
  /* Adaptation of work of Kevin Lindsey (kevin@kevlindev.com) */
  
  var fabric = global.fabric || (global.fabric = { });

  if (fabric.Point) {    
    fabric.warn('fabric.Point is already defined');
    return;
  }

  fabric.Point = Point;
  
  /**
   * @name Point
   * @memberOf fabric
   * @constructor
   * @param {Number} x
   * @param {Number} y
   * @return {fabric.Point} thisArg
   */
  function Point(x, y) {
    if (arguments.length &gt; 0) {
      this.init(x, y);
    }
  }
  
  Point.prototype = /** @scope fabric.Point.prototype */ {
    
    constructor: Point,
    
    /**
     * @method init
     * @param {Number} x
     * @param {Number} y
     */
    init: function (x, y) {
      this.x = x;
      this.y = y;
    },
    
    /**
     * @method add
     * @param {fabric.Point} that
     * @return {fabric.Point} new Point instance with added values
     */
    add: function (that) {
      return new Point(this.x + that.x, this.y + that.y);
    },
    
    /**
     * @method addEquals
     * @param {fabric.Point} that
     * @return {fabric.Point} thisArg
     */
    addEquals: function (that) {
      this.x += that.x;
      this.y += that.y;
      return this;
    },
    
    /**
     * @method scalarAdd
     * @param {Number} scalar
     * @return {fabric.Point} new Point with added value
     */
    scalarAdd: function (scalar) {
      return new Point(this.x + scalar, this.y + scalar);
    },
    
    /**
     * @method scalarAddEquals
     * @param {Number} scalar
     * @param {fabric.Point} thisArg
     */
    scalarAddEquals: function (scalar) {
      this.x += scalar;
      this.y += scalar;
      return this;
    },
    
    /**
     * @method subtract
     * @param {fabric.Point} that
     * @return {fabric.Point} new Point object with subtracted values
     */
    subtract: function (that) {
      return new Point(this.x - that.x, this.y - that.y);
    },
    
    /**
     * @method subtractEquals
     * @param {fabric.Point} that
     * @return {fabric.Point} thisArg
     */
    subtractEquals: function (that) {
      this.x -= that.x;
      this.y -= that.y;
      return this;
    },
    
    scalarSubtract: function (scalar) {
      return new Point(this.x - scalar, this.y - scalar);
    },
    
    scalarSubtractEquals: function (scalar) {
      this.x -= scalar;
      this.y -= scalar;
      return this;
    },
    
    multiply: function (scalar) {
      return new Point(this.x * scalar, this.y * scalar);
    },
    
    multiplyEquals: function (scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    },
    
    divide: function (scalar) {
      return new Point(this.x / scalar, this.y / scalar);
    },
    
    divideEquals: function (scalar) {
      this.x /= scalar;
      this.y /= scalar;
      return this;
    },
    
    eq: function (that) {
      return (this.x == that.x &amp;&amp; this.y == that.y);
    },
    
    lt: function (that) {
      return (this.x &lt; that.x &amp;&amp; this.y &lt; that.y);
    },
    
    lte: function (that) {
      return (this.x &lt;= that.x &amp;&amp; this.y &lt;= that.y);
    },
    
    gt: function (that) {
      return (this.x &gt; that.x &amp;&amp; this.y &gt; that.y);
    },
    
    gte: function (that) {
      return (this.x &gt;= that.x &amp;&amp; this.y &gt;= that.y);
    },
    
    lerp: function (that, t) {
      return new Point(this.x + (that.x - this.x) * t, this.y + (that.y - this.y) * t);
    },
    
    distanceFrom: function (that) {
      var dx = this.x - that.x,
          dy = this.y - that.y;
      return Math.sqrt(dx * dx + dy * dy);
    },
    
    min: function (that) {
      return new Point(Math.min(this.x, that.x), Math.min(this.y, that.y));
    },
    
    max: function (that) {
      return new Point(Math.max(this.x, that.x), Math.max(this.y, that.y));
    },
    
    toString: function () {
      return this.x + "," + this.y;
    },
    
    setXY: function (x, y) {
      this.x = x;
      this.y = y;
    },
    
    setFromPoint: function (that) {
      this.x = that.x;
      this.y = that.y;
    },
    
    swap: function (that) {
      var x = this.x,
          y = this.y;
      this.x = that.x;
      this.y = that.y;
      that.x = x;
      that.y = y;
    }
  };
  
})(typeof exports != 'undefined' ? exports : this);
//= require 'point.class'

(function(global) {
  
  "use strict";
  
  /* Adaptation of work of Kevin Lindsey (kevin@kevlindev.com) */
  
  var fabric = global.fabric || (global.fabric = { });
  
  if (fabric.Intersection) {    
    fabric.warn('fabric.Intersection is already defined');
    return;
  }
  
  /**
   * @class Intersection
   * @memberOf fabric
   */
  function Intersection(status) {
    if (arguments.length &gt; 0) {
      this.init(status);
    }
  }
  
  fabric.Intersection = Intersection;
  
  fabric.Intersection.prototype = /** @scope fabric.Intersection.prototype */ {
    
    /**
     * @method init
     * @param {String} status
     */
    init: function (status) {
      this.status = status;
      this.points = [];
    },
    
    /**
     * @method appendPoint
     * @param {String} status
     */
    appendPoint: function (point) {
      this.points.push(point);
    },
    
    /**
     * @method appendPoints
     * @param {String} status
     */
    appendPoints: function (points) {
      this.points = this.points.concat(points);
    }
  };
  
  /**
   * @static
   * @method intersectLineLine
   */
  fabric.Intersection.intersectLineLine = function (a1, a2, b1, b2) {
    var result,
        ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x),
        ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x),
        u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
    if (u_b != 0) {
      var ua = ua_t / u_b,
          ub = ub_t / u_b;
      if (0 &lt;= ua &amp;&amp; ua &lt;= 1 &amp;&amp; 0 &lt;= ub &amp;&amp; ub &lt;= 1) {
        result = new Intersection("Intersection");
        result.points.push(new fabric.Point(a1.x + ua * (a2.x - a1.x), a1.y + ua * (a2.y - a1.y)));
      }
      else {
        result = new Intersection("No Intersection");
      }
    }
    else {
      if (ua_t == 0 || ub_t == 0) {
        result = new Intersection("Coincident");
      }
      else {
        result = new Intersection("Parallel");
      }
    }
    return result;
  };
  
  /**
   * @method intersectLinePolygon
   */
  fabric.Intersection.intersectLinePolygon = function(a1,a2,points){
    var result = new Intersection("No Intersection"),
        length = points.length;
        
    for (var i = 0; i &lt; length; i++) {
      var b1 = points[i],
          b2 = points[(i+1) % length],
          inter = Intersection.intersectLineLine(a1, a2, b1, b2);
          
      result.appendPoints(inter.points);
    }
    if (result.points.length &gt; 0) {
      result.status = "Intersection";
    }
    return result;
  };
  
  /**
   * @method intersectPolygonPolygon
   */
  fabric.Intersection.intersectPolygonPolygon = function (points1, points2) {
    var result = new Intersection("No Intersection"),
        length = points1.length;
        
    for (var i = 0; i &lt; length; i++) {
      var a1 = points1[i],
          a2 = points1[(i+1) % length],
          inter = Intersection.intersectLinePolygon(a1, a2, points2);
          
      result.appendPoints(inter.points);
    }
    if (result.points.length &gt; 0) {
      result.status = "Intersection";
    }
    return result;
  };
  
  /**
   * @method intersectPolygonRectangle
   */
  fabric.Intersection.intersectPolygonRectangle = function (points, r1, r2) {
    var min = r1.min(r2),
        max = r1.max(r2),
        topRight = new fabric.Point(max.x, min.y),
        bottomLeft = new fabric.Point(min.x, max.y),
        inter1 = Intersection.intersectLinePolygon(min, topRight, points),
        inter2 = Intersection.intersectLinePolygon(topRight, max, points),
        inter3 = Intersection.intersectLinePolygon(max, bottomLeft, points),
        inter4 = Intersection.intersectLinePolygon(bottomLeft, min, points),
        result = new Intersection("No Intersection");
        
    result.appendPoints(inter1.points);
    result.appendPoints(inter2.points);
    result.appendPoints(inter3.points);
    result.appendPoints(inter4.points);
    if (result.points.length &gt; 0) {
      result.status="Intersection";
    }
    return result;
  };
  
})(typeof exports != 'undefined' ? exports : this);
(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { });
  
  if (fabric.Color) {
    fabric.warn('fabric.Color is already defined.');
    return;
  }
  
  /**
   * The purpose of {@link fabric.Color} is to abstract and encapsulate common color operations;
   * {@link fabric.Color} is a constructor and creates instances of {@link fabric.Color} objects.
   *
   * @class Color
   * @memberOf fabric
   * @param {String} color (optional) in hex or rgb(a) format
   */
  function Color(color) {
    if (!color) {
      this.setSource([0, 0, 0, 1]);
    }
    else {
      this._tryParsingColor(color);
    }
  }
  
  fabric.Color = Color;
  
  fabric.Color.prototype = /** @scope fabric.Color.prototype */ {
    
    /**
     * @private
     * @method _tryParsingColor
     */
    _tryParsingColor: function(color) {
      var source = Color.sourceFromHex(color);
      if (!source) {
        source = Color.sourceFromRgb(color);
      }
      if (source) {
        this.setSource(source);
      }
    },

    /**
     * Returns source of this color (where source is an array representation; ex: [200, 200, 100, 1])
     * @method getSource
     * @return {Array}
     */
    getSource: function() {
      return this._source;
    },

    /**
     * Sets source of this color (where source is an array representation; ex: [200, 200, 100, 1])
     * @method setSource
     * @param {Array} source
     */
    setSource: function(source) {
      this._source = source;
    },

    /**
     * Returns color represenation in RGB format
     * @method toRgb
     * @return {String} ex: rgb(0-255,0-255,0-255)
     */
    toRgb: function() {
      var source = this.getSource();
      return 'rgb(' + source[0] + ',' + source[1] + ',' + source[2] + ')';
    },

    /**
     * Returns color represenation in RGBA format
     * @method toRgba
     * @return {String} ex: rgba(0-255,0-255,0-255,0-1)
     */
    toRgba: function() {
      var source = this.getSource();
      return 'rgba(' + source[0] + ',' + source[1] + ',' + source[2] + ',' + source[3] + ')';
    },

    /**
     * Returns color represenation in HEX format
     * @method toHex
     * @return {String} ex: FF5555
     */
    toHex: function() {
      var source = this.getSource();

      var r = source[0].toString(16);
      r = (r.length == 1) ? ('0' + r) : r;

      var g = source[1].toString(16);
      g = (g.length == 1) ? ('0' + g) : g;

      var b = source[2].toString(16);
      b = (b.length == 1) ? ('0' + b) : b;

      return r.toUpperCase() + g.toUpperCase() + b.toUpperCase();
    },

    /**
     * Gets value of alpha channel for this color 
     * @method getAlpha
     * @return {Number} 0-1
     */
    getAlpha: function() {
      return this.getSource()[3];
    },

    /**
     * Sets value of alpha channel for this color
     * @method setAlpha
     * @param {Number} 0-1
     * @return {fabric.Color} thisArg
     */
    setAlpha: function(alpha) {
      var source = this.getSource();
      source[3] = alpha;
      this.setSource(source);
      return this;
    },

    /**
     * Transforms color to its grayscale representation
     * @method toGrayscale
     * @return {fabric.Color} thisArg
     */
    toGrayscale: function() {
      var source = this.getSource(),
          average = parseInt((source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0), 10),
          currentAlpha = source[3];
      this.setSource([average, average, average, currentAlpha]);
      return this;
    },

    /**
     * Transforms color to its black and white representation
     * @method toGrayscale
     * @return {fabric.Color} thisArg
     */
    toBlackWhite: function(threshold) {
      var source = this.getSource(),
          average = (source[0] * 0.3 + source[1] * 0.59 + source[2] * 0.11).toFixed(0),
          currentAlpha = source[3],
          threshold = threshold || 127;

      average = (Number(average) &lt; Number(threshold)) ? 0 : 255;
      this.setSource([average, average, average, currentAlpha]);
      return this;
    },

    /**
     * Overlays color with another color
     * @method overlayWith
     * @param {String|fabric.Color} otherColor
     * @return {fabric.Color} thisArg
     */
    overlayWith: function(otherColor) {
      if (!(otherColor instanceof Color)) {
        otherColor = new Color(otherColor);
      }

      var result = [],
          alpha = this.getAlpha(),
          otherAlpha = 0.5,
          source = this.getSource(),
          otherSource = otherColor.getSource();

      for (var i = 0; i &lt; 3; i++) {
        result.push(Math.round((source[i] * (1 - otherAlpha)) + (otherSource[i] * otherAlpha)));
      }

      result[4] = alpha;
      this.setSource(result);
      return this;
    }
  };
  
  /**
   * Regex matching color in RGB or RGBA formats (ex: rgb(0, 0, 0), rgb(255, 100, 10, 0.5), rgb(1,1,1))
   * @static
   * @field
   */
  fabric.Color.reRGBa = /^rgba?\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(\d+(?:\.\d+)?))?\)$/;
  
  /**
   * Regex matching color in HEX format (ex: #FF5555, 010155, aff)
   * @static
   * @field
   */
  fabric.Color.reHex = /^#?([0-9a-f]{6}|[0-9a-f]{3})$/i;

  /**
   * Returns new color object, when given a color in RGB format
   * @method fromRgb
   * @param {String} color ex: rgb(0-255,0-255,0-255)
   * @return {fabric.Color}
   */
  fabric.Color.fromRgb = function(color) {
    return Color.fromSource(Color.sourceFromRgb(color));
  };
  
  /**
   * Returns array represenatation (ex: [100, 100, 200, 1]) of a color that's in RGB or RGBA format
   * @method sourceFromRgb
   * @param {String} color ex: rgb(0-255,0-255,0-255)
   * @return {Array} source
   */
  fabric.Color.sourceFromRgb = function(color) {
    var match = color.match(Color.reRGBa);
    if (match) {
      return [
        parseInt(match[1], 10),
        parseInt(match[2], 10),
        parseInt(match[3], 10),
        match[4] ? parseFloat(match[4]) : 1
      ];
    }
  };

  /**
   * Returns new color object, when given a color in RGBA format
   * @static
   * @function
   * @method fromRgba
   * @param {String} color
   * @return {fabric.Color}
   */
  fabric.Color.fromRgba = Color.fromRgb;

  /**
   * Returns new color object, when given a color in HEX format
   * @static
   * @method fromHex
   * @return {fabric.Color}
   */
  fabric.Color.fromHex = function(color) {
    return Color.fromSource(Color.sourceFromHex(color));
  };
  
  /**
   * Returns array represenatation (ex: [100, 100, 200, 1]) of a color that's in HEX format
   * @static
   * @method sourceFromHex
   * @param {String} color ex: FF5555
   * @return {Array} source
   */
  fabric.Color.sourceFromHex = function(color) {
    if (color.match(Color.reHex)) {
      var value = color.slice(color.indexOf('#') + 1),
          isShortNotation = (value.length === 3),
          r = isShortNotation ? (value.charAt(0) + value.charAt(0)) : value.substring(0, 2),
          g = isShortNotation ? (value.charAt(1) + value.charAt(1)) : value.substring(2, 4),
          b = isShortNotation ? (value.charAt(2) + value.charAt(2)) : value.substring(4, 6);

      return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16),
        1
      ];
    }
  };
  
  /**
   * Returns new color object, when given color in array representation (ex: [200, 100, 100, 0.5])
   * @static
   * @method fromSource
   * @return {fabric.Color}
   */
  fabric.Color.fromSource = function(source) {
    var oColor = new Color();
    oColor.setSource(source);
    return oColor;
  };

})(typeof exports != 'undefined' ? exports : this);
(function (global) {
  
  "use strict";
  
  if (fabric.Canvas) {
    fabric.warn('fabric.Canvas is already defined.');
    return;
  }
  
  // aliases for faster resolution
  var extend = fabric.util.object.extend,
      capitalize = fabric.util.string.capitalize,
      camelize = fabric.util.string.camelize,
      getPointer = fabric.util.getPointer,
      getElementOffset = fabric.util.getElementOffset,
      removeFromArray = fabric.util.removeFromArray,
      addListener = fabric.util.addListener,
      removeListener = fabric.util.removeListener,
      
      utilMin = fabric.util.array.min,
      utilMax = fabric.util.array.max,
      
      sqrt = Math.sqrt,
      pow = Math.pow,
      atan2 = Math.atan2,
      abs = Math.abs,
      min = Math.min,
      max = Math.max,
      
      CANVAS_INIT_ERROR = new Error('Could not initialize `canvas` element'),
      STROKE_OFFSET = 0.5,
      
      cursorMap = {
        'tr': 'ne-resize',
        'br': 'se-resize',
        'bl': 'sw-resize',
        'tl': 'nw-resize',
        'ml': 'w-resize',
        'mt': 'n-resize',
        'mr': 'e-resize',
        'mb': 's-resize'
      };
  
  /**
   * @class fabric.Canvas
   * @constructor
   * @param {HTMLElement | String} el &amp;lt;canvas&gt; element to initialize instance on
   * @param {Object} [options] Options object
   */
  fabric.Canvas = function (el, options) {
    
    options || (options = { });
    
    /**
     * The object literal containing mouse position if clicked in an empty area (no image)
     * @property _groupSelector
     * @type object
     */
    this._groupSelector = null;

    /**
     * The array literal containing all objects on canvas
     * @property _objects
     * @type array
     */
    this._objects = [];

    /**
     * The element that references the canvas interface implementation
     * @property _context
     * @type object
     */
    this._context = null;

    /**
     * The object literal containing the current x,y params of the transformation
     * @property _currentTransform
     * @type object
     */
    this._currentTransform = null;
    
    /**
     * References instance of fabric.Group - when multiple objects are selected
     * @property _activeGroup
     * @type object
     */
    this._activeGroup = null;
    
    /**
     * X coordinates of a path, captured during free drawing
     */
    this._freeDrawingXPoints = [ ];
    
    /**
     * Y coordinates of a path, captured during free drawing
     */
    this._freeDrawingYPoints = [ ];
    
    this._createUpperCanvas(el);
    this._initOptions(options);
    this._initWrapperElement();
    this._createLowerCanvas();

    this._initEvents();
    
    if (options.overlayImage) {
      this.setOverlayImage(options.overlayImage);
    }
    if (options.backgroundImage) {
      this.setBackgroundImage(options.backgroundImage);
    }
    
    this.calcOffset();
    
    fabric.Canvas.activeInstance = this;
  };
  
  extend(fabric.Canvas.prototype, fabric.Observable);
  
  extend(fabric.Canvas.prototype, /** @scope fabric.Canvas.prototype */ {
    
    /**
     * Background color of this canvas instance
     * @property
     * @type String
     */
    backgroundColor:        'rgba(0, 0, 0, 0)',
    
    /**
     * Background image of this canvas instance
     * Should be set via `setBackgroundImage`
     * @property
     * @type String
     */
    backgroundImage:        '',
    
    /**
     * Indicates whether object selection should be enabled
     * @property
     * @type Boolean
     */
    selection:              true,
    
    /**
     * Color of selection
     * @property
     * @type String
     */
    selectionColor:         'rgba(100, 100, 255, 0.3)', // blue
    
    /**
     * Color of the border of selection (usually slightly darker than color of selection itself)
     * @property
     * @type String
     */
    selectionBorderColor:   'rgba(255, 255, 255, 0.3)',
    
    /**
     * Width of a line used in selection
     * @property
     * @type Number
     */
    selectionLineWidth:     1,
    
    /**
     * Color of the line used in free drawing mode
     * @property
     * @type String
     */
    freeDrawingColor:       'rgb(0, 0, 0)',
    
    /**
     * Width of a line used in free drawing mode
     * @property
     * @type Number
     */
    freeDrawingLineWidth:   1,
    
    /**
     * @property
     * @type Boolean
     */
    includeDefaultValues:   true,
    
    /**
     * Indicates whether images loaded via `fabric.Canvas#loadImageFromUrl` should be cached
     * @property
     * @type Boolean
     */
    shouldCacheImages:      false,
    
    /**
     * Indicates whether objects' state should be saved
     * @property
     * @type Boolean
     */
    stateful:               true,
    
    /**
     * Indicates whether fabric.Canvas#add should also re-render canvas. 
     * Disabling this option could give a great performance boost when adding a lot of objects to canvas at once 
     * (followed by a manual rendering after addition)
     */
    renderOnAddition:       true,
    
    /**
     * @constant
     * @type Number
     */
    CANVAS_WIDTH:           600,
    
    /**
     * @constant
     * @type Number
     */
    CANVAS_HEIGHT:          600,
    
    /**
     * @constant
     * @type String
     */
    CONTAINER_CLASS:        'canvas-container',
    
    /**
     * @constant
     * @type String
     */
    HOVER_CURSOR:           'move',
    
    /**
     * Callback; invoked right before object is about to be scaled/rotated
     * @method onBeforeScaleRotate
     * @param {fabric.Object} target Object that's about to be scaled/rotated
     */
    onBeforeScaleRotate: function (target) {
      /* NOOP */
    },
    
    /**
     * Callback; invoked on every redraw of canvas and is being passed a number indicating current fps
     * @method onFpsUpdate
     * @param {Number} fps
     */
    onFpsUpdate: null,
    
    /**
     * Calculates canvas element offset relative to the document
     * This method is also attached as "resize" event handler of window
     * @method calcOffset
     * @return {fabric.Canvas} instance
     * @chainable
     */
    calcOffset: function () {
      this._offset = getElementOffset(this.upperCanvasEl);
      return this;
    },
    
    /**
     * @private
     */
    _loadImage: function(url, callback) {
      if (url) {
        var _this = this, img = new Image();
        
        /** @ignore */
        img.onload = function () { 
          callback.call(_this, img);
          img = img.onload = null;
        };
        img.src = url;
      }
      return this;
    },
    
    /**
     * Sets overlay image for this canvas
     * @method setOverlayImage
     * @param {String} url url of an image to set overlay to
     * @param {Function} callback callback to invoke when image is loaded and set as an overlay
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    setOverlayImage: function (url, callback) { // TODO (kangax): test callback
      return this._loadImage(url, function(img) {
        this.overlayImage = img;
        callback &amp;&amp; callback();
      });
    },
    
    /**
     * Sets background image for this canvas
     * @method setBackgroundImage
     * @param {String} url url of an image to set background to
     * @param {Function} callback callback to invoke when image is loaded and set as background
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    setBackgroundImage: function (url, callback) {
      return this._loadImage(url, function(img) {
        this.backgroundImage = img;
        callback &amp;&amp; callback();
      });
    },
    
    /**
     * @private
     * @method _initWrapperElement
     * @param {Number} width
     * @param {Number} height
     */
    _initWrapperElement: function () {
      this.wrapperEl = fabric.util.wrapElement(this.upperCanvasEl, 'div', { 
        'class': this.CONTAINER_CLASS
      });
      fabric.util.setStyle(this.wrapperEl, {
        width: this.getWidth() + 'px',
        height: this.getHeight() + 'px',
        position: 'relative'
      });
      fabric.util.makeElementUnselectable(this.wrapperEl);
    },
    
    /**
     * @private
     * @method _applyCanvasStyle
     * @param {Element} element
     */
    _applyCanvasStyle: function (element) {
      var width = this.getWidth() || element.width,
          height = this.getHeight() || element.height;
          
      fabric.util.setStyle(element, {
        position: 'absolute',
        width: width + 'px',
        height: height + 'px',
        left: 0,
        top: 0
      });
      element.width = width;
      element.height = height;
      fabric.util.makeElementUnselectable(element);
    },
    
    /**
     * @private
     * @method _createCanvasElement
     * @param {Element} element
     */
    _createCanvasElement: function() {
      var element = fabric.document.createElement('canvas');
      if (!element.style) {
        element.style = { };
      }
      if (!element) {
        throw CANVAS_INIT_ERROR;
      }
      this._initCanvasElement(element);
      return element;
    },
    
    _initCanvasElement: function(element) {
      if (typeof element.getContext === 'undefined' &amp;&amp; 
          typeof G_vmlCanvasManager !== 'undefined' &amp;&amp; 
          G_vmlCanvasManager.initElement) {
            
        G_vmlCanvasManager.initElement(element);
      }
      if (typeof element.getContext === 'undefined') {
        throw CANVAS_INIT_ERROR;
      }
    },

    /**
     * @method _initOptions
     * @param {Object} options
     */
    _initOptions: function (options) {
      for (var prop in options) {
        this[prop] = options[prop];
      }
      
      this.width = parseInt(this.upperCanvasEl.width, 10) || 0;
      this.height = parseInt(this.upperCanvasEl.height, 10) || 0;

      this.upperCanvasEl.style.width = this.width + 'px';
      this.upperCanvasEl.style.height = this.height + 'px';
    },

    /**
     * Adds mouse listeners to  canvas
     * @method _initEvents
     * @private
     * See configuration documentation for more details.
     */
    _initEvents: function () {
      var _this = this;
      
      this._onMouseDown = function (e) { 
        _this.__onMouseDown(e);
        addListener(fabric.document, 'mouseup', _this._onMouseUp);
        addListener(fabric.document, 'mousemove', _this._onMouseMove);
        removeListener(_this.upperCanvasEl, 'mousemove', _this._onMouseMove);
      };
      this._onMouseUp = function (e) { 
        _this.__onMouseUp(e);
        removeListener(fabric.document, 'mouseup', _this._onMouseUp);
        removeListener(fabric.document, 'mousemove', _this._onMouseMove);
        addListener(_this.upperCanvasEl, 'mousemove', _this._onMouseMove);
      };
      this._onMouseMove = function (e) { _this.__onMouseMove(e); };
      this._onResize = function (e) { _this.calcOffset() };
      
      addListener(this.upperCanvasEl, 'mousedown', this._onMouseDown);
      addListener(this.upperCanvasEl, 'mousemove', this._onMouseMove);
      addListener(fabric.window, 'resize', this._onResize);
    },
    
    /**
     * @method _createUpperCanvas
     * @param {HTMLElement|String} canvasEl Canvas element
     * @throws {CANVAS_INIT_ERROR} If canvas can not be initialized
     */
    _createUpperCanvas: function (canvasEl) {
      this.upperCanvasEl = fabric.util.getById(canvasEl) || this._createCanvasElement();
      this._initCanvasElement(this.upperCanvasEl);
      
      fabric.util.addClass(this.upperCanvasEl, 'upper-canvas');
      this._applyCanvasStyle(this.upperCanvasEl);
      
      this.contextTop = this.upperCanvasEl.getContext('2d');
    },
    
    /**
     * Creates a secondary canvas
     * @method _createLowerCanvas
     */
    _createLowerCanvas: function () {
      this.lowerCanvasEl = this._createCanvasElement();
      this.lowerCanvasEl.className = 'lower-canvas';
      
      this.wrapperEl.insertBefore(this.lowerCanvasEl, this.upperCanvasEl);
      
      this._applyCanvasStyle(this.lowerCanvasEl);
      this.contextContainer = this.lowerCanvasEl.getContext('2d');
    },
    
    /**
     * Returns canvas width
     * @method getWidth
     * @return {Number}
     */
    getWidth: function () {
      return this.width;
    },
    
    /**
     * Returns canvas height
     * @method getHeight
     * @return {Number}
     */
    getHeight: function () {
      return this.height;
    },
    
    /**
     * Sets width of this canvas instance
     * @method setWidth
     * @param {Number} width value to set width to
     * @return {fabric.Canvas} instance
     * @chainable true
     */
    setWidth: function (value) {
      return this._setDimension('width', value);
    },
    
    /**
     * Sets height of this canvas instance
     * @method setHeight
     * @param {Number} height value to set height to
     * @return {fabric.Canvas} instance
     * @chainable true
     */
    setHeight: function (value) {
      return this._setDimension('height', value);
    },
    
    /**
     * Sets dimensions (width, height) of this canvas instance
     * @method setDimensions
     * @param {Object} dimensions
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    setDimensions: function(dimensions) {
      for (var prop in dimensions) {
        this._setDimension(prop, dimensions[prop]);
      }
      return this;
    },
    
    /**
     * Helper for setting width/height
     * @private
     * @method _setDimensions
     * @param {String} prop property (width|height)
     * @param {Number} value value to set property to
     * @return {fabric.Canvas} instance
     * @chainable true
     */
    _setDimension: function (prop, value) {
      this.lowerCanvasEl[prop] = value;
      this.lowerCanvasEl.style[prop] = value + 'px';
      
      this.upperCanvasEl[prop] = value;
      this.upperCanvasEl.style[prop] = value + 'px';
      
      this.wrapperEl.style[prop] = value + 'px';
      
      this[prop] = value;
      
      this.calcOffset();
      this.renderAll();
      
      return this;
    },
    
    /**
     * Method that defines the actions when mouse is released on canvas.
     * The method resets the currentTransform parameters, store the image corner
     * position in the image object and render the canvas on top.
     * @method __onMouseUp
     * @param {Event} e Event object fired on mouseup
     *
     */
    __onMouseUp: function (e) {
      
      if (this.isDrawingMode &amp;&amp; this._isCurrentlyDrawing) {
        this._finalizeDrawingPath();
        return;
      }
      
      if (this._currentTransform) {
        
        var transform = this._currentTransform,
            target = transform.target;
            
        if (target._scaling) {
          target._scaling = false;
        }
        
        // determine the new coords everytime the image changes its position
        var i = this._objects.length;
        while (i--) {
          this._objects[i].setCoords();
        }
        
        // only fire :modified event if target coordinates were changed during mousedown-mouseup
        if (this.stateful &amp;&amp; target.hasStateChanged()) {
          target.isMoving = false;
          this.fire('object:modified', { target: target });
        }
      }
      
      this._currentTransform = null;
      
      if (this._groupSelector) {
        // group selection was completed, determine its bounds
        this._findSelectedObjects(e);
      }
      var activeGroup = this.getActiveGroup();
      if (activeGroup) {
        activeGroup.setObjectsCoords();
        activeGroup.set('isMoving', false);
        this._setCursor('default');
      }
      
      // clear selection
      this._groupSelector = null;
      this.renderAll();
      
      this._setCursorFromEvent(e, target);
      
      // fix for FF
      this._setCursor('');
      
      var _this = this;
      setTimeout(function () {
        _this._setCursorFromEvent(e, target);
      }, 50);
      
      this.fire('mouse:up', { target: target, e: e });
    },
    
    _shouldClearSelection: function (e) {
      var target = this.findTarget(e),
          activeGroup = this.getActiveGroup();
      return (
        !target || (
          target &amp;&amp; 
          activeGroup &amp;&amp; 
          !activeGroup.contains(target) &amp;&amp; 
          activeGroup !== target &amp;&amp; 
          !e.shiftKey
        )
      );
    },

    /**
     * Method that defines the actions when mouse is clic ked on canvas.
     * The method inits the currentTransform parameters and renders all the
     * canvas so the current image can be placed on the top canvas and the rest
     * in on the container one.
     * @method __onMouseDown
     * @param e {Event} Event object fired on mousedown
     *
     */
    __onMouseDown: function (e) {
      
      // accept only left clicks
      if (e.which !== 1) return;
      
      if (this.isDrawingMode) {
        this._prepareForDrawing(e);
        
        // capture coordinates immediately; this allows to draw dots (when movement never occurs)
        this._captureDrawingPath(e);
        
        return;
      }
      
      // ignore if some object is being transformed at this moment
      if (this._currentTransform) return;
      
      var target = this.findTarget(e),
          pointer = this.getPointer(e),
          activeGroup = this.getActiveGroup(), 
          corner;
      
      if (this._shouldClearSelection(e)) {
        
        this._groupSelector = {
          ex: pointer.x,
          ey: pointer.y,
          top: 0,
          left: 0
        };
        
        this.deactivateAllWithDispatch();
      }
      else {
        // determine if it's a drag or rotate case
        // rotate and scale will happen at the same time
        this.stateful &amp;&amp; target.saveState();
        
        if (corner = target._findTargetCorner(e, this._offset)) {
          this.onBeforeScaleRotate(target);
        }
        
        this._setupCurrentTransform(e, target);
        
        var shouldHandleGroupLogic = e.shiftKey &amp;&amp; (activeGroup || this.getActiveObject());
        if (shouldHandleGroupLogic) {
          this._handleGroupLogic(e, target);
        }
        else {
          if (target !== this.getActiveGroup()) {
            this.deactivateAll();
          }
          this.setActiveObject(target);
        }
      }
      // we must renderAll so that active image is placed on the top canvas
      this.renderAll();
      
      this.fire('mouse:down', { target: target, e: e });
    },
    
    /**
     * Returns &amp;lt;canvas&gt; element corresponding to this instance
     * @method getElement
     * @return {HTMLCanvasElement}
     */
    getElement: function () {
      return this.upperCanvasEl;
    },
    
    /**
     * Deactivates all objects and dispatches appropriate events
     * @method deactivateAllWithDispatch
     * @return {fabric.Canvas} thisArg
     */
    deactivateAllWithDispatch: function () {
      var activeObject = this.getActiveGroup() || this.getActiveObject();
      if (activeObject) {
        this.fire('before:selection:cleared', { target: activeObject });
      }
      this.deactivateAll();
      if (activeObject) {
        this.fire('selection:cleared');
      }
      return this;
    },
    
    /**
     * @private
     * @method _setupCurrentTransform
     */
    _setupCurrentTransform: function (e, target) {
      var action = 'drag', 
          corner,
          pointer = getPointer(e);
      
      if (corner = target._findTargetCorner(e, this._offset)) {
        action = (corner === 'ml' || corner === 'mr') 
          ? 'scaleX' 
          : (corner === 'mt' || corner === 'mb') 
            ? 'scaleY' 
            : 'rotate';
      }
      
      this._currentTransform = {
        target: target,
        action: action,
        scaleX: target.scaleX,
        scaleY: target.scaleY,
        offsetX: pointer.x - target.left,
        offsetY: pointer.y - target.top,
        ex: pointer.x,
        ey: pointer.y,
        left: target.left, 
        top: target.top,
        theta: target.theta,
        width: target.width * target.scaleX
      };
      
      this._currentTransform.original = {
        left: target.left,
        top: target.top
      };
    },
    
    _handleGroupLogic: function (e, target) {
      if (target.isType('group')) {
        // if it's a group, find target again, this time skipping group
        target = this.findTarget(e, true);
        // if even object is not found, bail out
        if (!target || target.isType('group')) {
          return;
        }
      }
      var activeGroup = this.getActiveGroup();
      if (activeGroup) {
        if (activeGroup.contains(target)) {
          activeGroup.remove(target);
          target.setActive(false);
          if (activeGroup.size() === 1) {
            // remove group alltogether if after removal it only contains 1 object
            this.discardActiveGroup();
          }
        }
        else {
          activeGroup.add(target);
        }
        this.fire('selection:created', { target: activeGroup });
        activeGroup.setActive(true);
      }
      else {
        // group does not exist
        if (this._activeObject) {
          // only if there's an active object
          if (target !== this._activeObject) {
            // and that object is not the actual target
            var group = new fabric.Group([ this._activeObject,target ]);
            this.setActiveGroup(group);
            activeGroup = this.getActiveGroup();
          }
        }
        // activate target object in any case
        target.setActive(true);
      }
      
      if (activeGroup) {
        activeGroup.saveCoords();
      }
    },
    
    /**
     * @private
     * @method _prepareForDrawing
     */
    _prepareForDrawing: function(e) {
      
      this._isCurrentlyDrawing = true;
      
      this.discardActiveObject().renderAll();
      
      var pointer = this.getPointer(e);
      
      this._freeDrawingXPoints.length = this._freeDrawingYPoints.length = 0;
      
      this._freeDrawingXPoints.push(pointer.x);
      this._freeDrawingYPoints.push(pointer.y);
      
      this.contextTop.beginPath();
      this.contextTop.moveTo(pointer.x, pointer.y);
      this.contextTop.strokeStyle = this.freeDrawingColor;
      this.contextTop.lineWidth = this.freeDrawingLineWidth;
      this.contextTop.lineCap = this.contextTop.lineJoin = 'round';
    },
    
    /**
     * @private
     * @method _captureDrawingPath
     */
    _captureDrawingPath: function(e) {
      var pointer = this.getPointer(e);
      
      this._freeDrawingXPoints.push(pointer.x);
      this._freeDrawingYPoints.push(pointer.y);
      
      this.contextTop.lineTo(pointer.x, pointer.y);
      this.contextTop.stroke();
    },
    
    /**
     * @private
     * @method _finalizeDrawingPath
     */
    _finalizeDrawingPath: function() {
      
      this.contextTop.closePath();
      
      this._isCurrentlyDrawing = false;
      
      var minX = utilMin(this._freeDrawingXPoints),
          minY = utilMin(this._freeDrawingYPoints),
          maxX = utilMax(this._freeDrawingXPoints),
          maxY = utilMax(this._freeDrawingYPoints),
          ctx = this.contextTop,
          path = [ ],
          xPoint,
          yPoint,
          xPoints = this._freeDrawingXPoints,
          yPoints = this._freeDrawingYPoints;
      
      path.push('M ', xPoints[0] - minX, ' ', yPoints[0] - minY, ' ');
      
      for (var i = 1; xPoint = xPoints[i], yPoint = yPoints[i]; i++) {
        path.push('L ', xPoint - minX, ' ', yPoint - minY, ' ');
      }
      
      // TODO (kangax): maybe remove Path creation from here, to decouple fabric.Canvas from fabric.Path, 
      // and instead fire something like "drawing:completed" event with path string
      
      path = path.join('');
      
      if (path === "M 0 0 L 0 0 ") {
        // do not create 0 width/height paths, as they are rendered inconsistently across browsers
        // Firefox 4, for example, renders a dot, whereas Chrome 10 renders nothing
        return;
      }

      var p = new fabric.Path(path);
       
      p.fill = null;
      p.stroke = this.freeDrawingColor;
      p.strokeWidth = this.freeDrawingLineWidth;
      this.add(p);
      p.set("left", minX + (maxX - minX) / 2).set("top", minY + (maxY - minY) / 2).setCoords();
      this.renderAll();
      this.fire('path:created', { path: p });
    },

   /**
    * Method that defines the actions when mouse is hovering the canvas.
    * The currentTransform parameter will definde whether the user is rotating/scaling/translating
    * an image or neither of them (only hovering). A group selection is also possible and would cancel
    * all any other type of action.
    * In case of an image transformation only the top canvas will be rendered.
    * @method __onMouseMove
    * @param e {Event} Event object fired on mousemove
    *
    */
    __onMouseMove: function (e) {
      
      if (this.isDrawingMode) {
        if (this._isCurrentlyDrawing) {
          this._captureDrawingPath(e);
        }
        return;
      }
      
      var groupSelector = this._groupSelector;
      
      // We initially clicked in an empty area, so we draw a box for multiple selection.
      if (groupSelector !== null) {
        var pointer = getPointer(e);
        groupSelector.left = pointer.x - this._offset.left - groupSelector.ex;
        groupSelector.top = pointer.y - this._offset.top - groupSelector.ey;
        this.renderTop();
      }
      else if (!this._currentTransform) {
        
        // alias style to elimintate unnecessary lookup
        var style = this.upperCanvasEl.style;
        
        // Here we are hovering the canvas then we will determine
        // what part of the pictures we are hovering to change the caret symbol.
        // We won't do that while dragging or rotating in order to improve the
        // performance.
        var target = this.findTarget(e);
        
        if (!target) {  
          // image/text was hovered-out from, we remove its borders
          for (var i = this._objects.length; i--; ) {
            if (!this._objects[i].active) {
              this._objects[i].setActive(false);
            }
          }
          style.cursor = 'default';
        }
        else {
          // set proper cursor 
          this._setCursorFromEvent(e, target);
          if (target.isActive()) {
            // display corners when hovering over an image
            target.setCornersVisibility &amp;&amp; target.setCornersVisibility(true);
          }
        }
      }
      else {
        // object is being transformed (scaled/rotated/moved/etc.)
        var pointer = getPointer(e), 
            x = pointer.x, 
            y = pointer.y;
        
        this._currentTransform.target.isMoving = true;
        
        if (this._currentTransform.action === 'rotate') {  
          // rotate object only if shift key is not pressed 
          // and if it is not a group we are transforming
          
          if (!e.shiftKey) {
            this._rotateObject(x, y);
          }
          this._scaleObject(x, y);
        }
        else if (this._currentTransform.action === 'scaleX') {
          this._scaleObject(x, y, 'x');
        }
        else if (this._currentTransform.action === 'scaleY') {
          this._scaleObject(x, y, 'y');
        }
        else {
          this._translateObject(x, y);
          
          this.fire('object:moving', {
            target: this._currentTransform.target
          });
        }
        // only commit here. when we are actually moving the pictures
        this.renderAll();
      }
      this.fire('mouse:move', { target: target, e: e });
    },

    /**
     * Translates object by "setting" its left/top
     * @method _translateObject
     * @param x {Number} pointer's x coordinate
     * @param y {Number} pointer's y coordinate
     */
    _translateObject: function (x, y) {
      var target = this._currentTransform.target;
      target.lockMovementX || target.set('left', x - this._currentTransform.offsetX);
      target.lockMovementY || target.set('top', y - this._currentTransform.offsetY);
    },

    /**
     * Scales object by invoking its scaleX/scaleY methods
     * @method _scaleObject
     * @param x {Number} pointer's x coordinate
     * @param y {Number} pointer's y coordinate
     * @param by {String} Either 'x' or 'y' - specifies dimension constraint by which to scale an object. 
     *                    When not provided, an object is scaled by both dimensions equally
     */ 
    _scaleObject: function (x, y, by) {
      var t = this._currentTransform,
          offset = this._offset,
          target = t.target;
      
      if (target.lockScalingX &amp;&amp; target.lockScalingY) return;
      
      var lastLen = sqrt(pow(t.ey - t.top - offset.top, 2) + pow(t.ex - t.left - offset.left, 2)),
          curLen = sqrt(pow(y - t.top - offset.top, 2) + pow(x - t.left - offset.left, 2));
      
      target._scaling = true;
      
      if (!by) {
        target.lockScalingX || target.set('scaleX', t.scaleX * curLen/lastLen);
        target.lockScalingY || target.set('scaleY', t.scaleY * curLen/lastLen);
      }
      else if (by === 'x' &amp;&amp; !target.lockUniScaling) {
        target.lockScalingX || target.set('scaleX', t.scaleX * curLen/lastLen);
      }
      else if (by === 'y' &amp;&amp; !target.lockUniScaling) {
        target.lockScalingY || target.set('scaleY', t.scaleY * curLen/lastLen);
      }
    },

    /**
     * Rotates object by invoking its rotate method
     * @method _rotateObject
     * @param x {Number} pointer's x coordinate
     * @param y {Number} pointer's y coordinate
     */ 
    _rotateObject: function (x, y) {
      
      var t = this._currentTransform, 
          o = this._offset;
      
      if (t.target.lockRotation) return;
      
      var lastAngle = atan2(t.ey - t.top - o.top, t.ex - t.left - o.left),
          curAngle = atan2(y - t.top - o.top, x - t.left - o.left);
          
      t.target.set('theta', (curAngle - lastAngle) + t.theta);
    },
    
    /**
     * @method _setCursor
     */
    _setCursor: function (value) {
      this.upperCanvasEl.style.cursor = value;
    },
    
    /**
     * Sets the cursor depending on where the canvas is being hovered.
     * Note: very buggy in Opera
     * @method _setCursorFromEvent
     * @param e {Event} Event object
     * @param target {Object} Object that the mouse is hovering, if so.
     */
    _setCursorFromEvent: function (e, target) {
      var s = this.upperCanvasEl.style;
      if (!target) {
        s.cursor = 'default';
        return false;
      }
      else {
        var activeGroup = this.getActiveGroup();
        // only show proper corner when group selection is not active
        var corner = !!target._findTargetCorner 
                      &amp;&amp; (!activeGroup || !activeGroup.contains(target)) 
                      &amp;&amp; target._findTargetCorner(e, this._offset);
        
        if (!corner) {
          s.cursor = this.HOVER_CURSOR;
        }
        else {
          if (corner in cursorMap) {
            s.cursor = cursorMap[corner];
          }
          else {
            s.cursor = 'default';
            return false;
          }
        }
      }
      return true;
    },
    
    /**
     * Given a context, renders an object on that context 
     * @param ctx {Object} context to render object on
     * @param object {Object} object to render
     * @private
     */
    _draw: function (ctx, object) {
      object &amp;&amp; object.render(ctx);
    },
    
    /**
     * @method _drawSelection
     * @private
     */
    _drawSelection: function () {
      var groupSelector = this._groupSelector,
          left = groupSelector.left,
          top = groupSelector.top,
          aleft = abs(left),
          atop = abs(top);

      this.contextTop.fillStyle = this.selectionColor;

      this.contextTop.fillRect(
        groupSelector.ex - ((left &gt; 0) ? 0 : -left),
        groupSelector.ey - ((top &gt; 0) ? 0 : -top),
        aleft, 
        atop
      );

      this.contextTop.lineWidth = this.selectionLineWidth;
      this.contextTop.strokeStyle = this.selectionBorderColor;
      
      this.contextTop.strokeRect(
        groupSelector.ex + STROKE_OFFSET - ((left &gt; 0) ? 0 : aleft), 
        groupSelector.ey + STROKE_OFFSET - ((top &gt; 0) ? 0 : atop),
        aleft,
        atop
      );
    },
    
    _findSelectedObjects: function (e) {
      var target, 
          targetRegion,
          group = [ ],
          x1 = this._groupSelector.ex,
          y1 = this._groupSelector.ey,
          x2 = x1 + this._groupSelector.left,
          y2 = y1 + this._groupSelector.top,
          currentObject,
          selectionX1Y1 = new fabric.Point(min(x1, x2), min(y1, y2)),
          selectionX2Y2 = new fabric.Point(max(x1, x2), max(y1, y2));
      
      for (var i = 0, len = this._objects.length; i &lt; len; ++i) {
        currentObject = this._objects[i];
        
        if (currentObject.intersectsWithRect(selectionX1Y1, selectionX2Y2) || 
            currentObject.isContainedWithinRect(selectionX1Y1, selectionX2Y2)) {
          
          if (this.selection &amp;&amp; currentObject.selectable) {
            currentObject.setActive(true);
            group.push(currentObject);
          }
        }
      }
      
      // do not create group for 1 element only
      if (group.length === 1) {
        this.setActiveObject(group[0]);
        this.fire('object:selected', {
          target: group[0]
        });
      } 
      else if (group.length &gt; 1) {
        var group = new fabric.Group(group);
        this.setActiveGroup(group);
        group.saveCoords();
        this.fire('selection:created', { target: group });
      }
      
      this.renderAll();
    },
    
    /**
     * Adds objects to canvas, then renders canvas;
     * Objects should be instances of (or inherit from) fabric.Object
     * @method add
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    add: function () {
      this._objects.push.apply(this._objects, arguments);
      for (var i = arguments.length; i--; ) {
        this.stateful &amp;&amp; arguments[i].setupState();
        arguments[i].setCoords();
      }
      this.renderOnAddition &amp;&amp; this.renderAll();
      return this;
    },
    
    /**
     * Inserts an object to canvas at specified index and renders canvas. 
     * An object should be an instance of (or inherit from) fabric.Object
     * @method insertAt
     * @param object {Object} Object to insert
     * @param index {Number} index to insert object at
     * @return {fabric.Canvas} instance
     */
    insertAt: function (object, index) {
      this._objects.splice(index, 0, object);
      this.stateful &amp;&amp; object.setupState();
      object.setCoords();
      this.renderAll();
      return this;
    },
    
    /**
     * Returns an array of objects this instance has
     * @method getObjects
     * @return {Array}
     */
    getObjects: function () {
      return this._objects;
    },
    
    /**
     * Returns topmost canvas context
     * @method getContext
     * @return {CanvasRenderingContext2D}
     */
    getContext: function () {
      return this.contextTop;
    },
    
    /**
     * Clears specified context of canvas element
     * @method clearContext
     * @param context {Object} ctx context to clear
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    clearContext: function(ctx) {
      ctx.clearRect(0, 0, this.width, this.height);
      return this;
    },
    
    /**
     * Clears all contexts (background, main, top) of an instance
     * @method clear
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    clear: function () {
      this._objects.length = 0;
      this.clearContext(this.contextTop);
      this.clearContext(this.contextContainer);
      this.renderAll();
      return this;
    },

    /**
     * Renders both the top canvas and the secondary container canvas.
     * @method renderAll
     * @param allOnTop {Boolean} optional Whether we want to force all images to be rendered on the top canvas
     * @return {fabric.Canvas} instance
     * @chainable
     */ 
    renderAll: function (allOnTop) {
      
      var canvasToDrawOn = this[allOnTop ? 'contextTop' : 'contextContainer'];

      this.clearContext(this.contextTop);

      if (!allOnTop) {
        this.clearContext(canvasToDrawOn);
      }
      
      var length = this._objects.length,
          activeGroup = this.getActiveGroup(),
          startTime = new Date();
      
      if (this.clipTo) {
        canvasToDrawOn.save();
        canvasToDrawOn.beginPath();
        this.clipTo(canvasToDrawOn);
        canvasToDrawOn.clip();
      }
      
      canvasToDrawOn.fillStyle = this.backgroundColor;
      canvasToDrawOn.fillRect(0, 0, this.width, this.height);
      
      if (this.backgroundImage) {
        canvasToDrawOn.drawImage(this.backgroundImage, 0, 0, this.width, this.height);
      }
      
      if (length) {
        for (var i = 0; i &lt; length; ++i) {
          if (!activeGroup ||
              (activeGroup &amp;&amp;
              !activeGroup.contains(this._objects[i]))) {
            this._draw(canvasToDrawOn, this._objects[i]);
          }
        }
      }
      
      if (this.clipTo) {
        canvasToDrawOn.restore();
      }
      
      // delegate rendering to group selection (if one exists)
      if (activeGroup) {
        this._draw(this.contextTop, activeGroup);
      }
      
      if (this.overlayImage) {
        this.contextTop.drawImage(this.overlayImage, 0, 0);
      }
      
      if (this.onFpsUpdate) {
        var elapsedTime = new Date() - startTime;
        this.onFpsUpdate(~~(1000 / elapsedTime));
      }
      
      this.fire('after:render');
      
      return this;
    },

    /**
     * Method to render only the top canvas.
     * Also used to render the group selection box.
     * @method renderTop
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    renderTop: function () {
      
      this.clearContext(this.contextTop);
      if (this.overlayImage) {
        this.contextTop.drawImage(this.overlayImage, 0, 0);
      }
      
      // we render the top context - last object
      if (this.selection &amp;&amp; this._groupSelector) {
        this._drawSelection();
      }
      
      // delegate rendering to group selection if one exists
      // used for drawing selection borders/corners
      var activeGroup = this.getActiveGroup();
      if (activeGroup) {
        activeGroup.render(this.contextTop);
      }
      
      this.fire('after:render');
      
      return this;
    },
    
    /**
     * Applies one implementation of 'point inside polygon' algorithm
     * @method containsPoint
     * @param e { Event } event object
     * @param target { fabric.Object } object to test against
     * @return {Boolean} true if point contains within area of given object
     */
    containsPoint: function (e, target) {
      var pointer = this.getPointer(e),
          xy = this._normalizePointer(target, pointer),
          x = xy.x, 
          y = xy.y;
      
      // http://www.geog.ubc.ca/courses/klink/gis.notes/ncgia/u32.html
      // http://idav.ucdavis.edu/~okreylos/TAship/Spring2000/PointInPolygon.html
      
      // we iterate through each object. If target found, return it.
      var iLines = target._getImageLines(target.oCoords),
          xpoints = target._findCrossPoints(x, y, iLines);
      
      // if xcount is odd then we clicked inside the object
      // For the specific case of square images xcount === 1 in all true cases
      if ((xpoints &amp;&amp; xpoints % 2 === 1) || target._findTargetCorner(e, this._offset)) {
        return true;
      }
      return false;
    },
    
    /**
     * @private
     * @method _normalizePointer
     */
    _normalizePointer: function (object, pointer) {
      
      var activeGroup = this.getActiveGroup(), 
          x = pointer.x, 
          y = pointer.y;
      
      var isObjectInGroup = (
        activeGroup &amp;&amp; 
        object.type !== 'group' &amp;&amp; 
        activeGroup.contains(object)
      );
      
      if (isObjectInGroup) {
        x -= activeGroup.left;
        y -= activeGroup.top;
      }
      return { x: x, y: y };
    },

    /**
     * Method that determines what object we are clicking on
     * @method findTarget
     * @param {Event} e mouse event
     * @param {Boolean} skipGroup when true, group is skipped and only objects are traversed through
     */ 
    findTarget: function (e, skipGroup) {
      
      var target,
          pointer = this.getPointer(e);
      
      // first check current group (if one exists)
      var activeGroup = this.getActiveGroup();
      
      if (activeGroup &amp;&amp; !skipGroup &amp;&amp; this.containsPoint(e, activeGroup)) {
        target = activeGroup;
        return target;
      }
      
      // then check all of the objects on canvas
      for (var i = this._objects.length; i--; ) {
        if (this.containsPoint(e, this._objects[i])) {
          target = this._objects[i];
          this.relatedTarget = target;
          break;
        }
      }
      if (this.selection &amp;&amp; target &amp;&amp; target.selectable) {
        return target;
      }
    },

    /**
     * Exports canvas element to a dataurl image.
     * @method toDataURL
     * @param {String} format the format of the output image. Either "jpeg" or "png".
     * @return {String}
     */
    toDataURL: function (format) {
      this.renderAll(true);
      var data = this.upperCanvasEl.toDataURL('image/' + format);
      this.renderAll();
      return data;
    },
    
    /**
     * Exports canvas element to a dataurl image (allowing to change image size via multiplier).
     * @method toDataURLWithMultiplier
     * @param {String} format (png|jpeg)
     * @param {Number} multiplier
     * @return {String}
     */
    toDataURLWithMultiplier: function (format, multiplier) {
      
      var origWidth = this.getWidth(),
          origHeight = this.getHeight(),
          scaledWidth = origWidth * multiplier,
          scaledHeight = origHeight * multiplier,
          activeObject = this.getActiveObject();
      
      this.setWidth(scaledWidth).setHeight(scaledHeight);
      this.contextTop.scale(multiplier, multiplier);
      
      if (activeObject) {
        this.deactivateAll();
      }
      
      // restoring width, height for `renderAll` to draw 
      // background properly (while context is scaled)
      this.width = origWidth;
      this.height = origHeight;
      
      this.renderAll(true);
      
      var dataURL = this.toDataURL(format);

      this.contextTop.scale(1 / multiplier,  1 / multiplier);
      this.setWidth(origWidth).setHeight(origHeight);
      
      if (activeObject) {
        this.setActiveObject(activeObject);
      }
      this.renderAll();
      
      return dataURL;
    },
    
    /**
     * Returns pointer coordinates relative to canvas.
     * @method getPointer
     * @return {Object} object with "x" and "y" number values
     */
    getPointer: function (e) {
      var pointer = getPointer(e);
      return {
        x: pointer.x - this._offset.left,
        y: pointer.y - this._offset.top
      };
    },
    
    /**
     * Returns coordinates of a center of canvas.
     * Returned value is an object with top and left properties
     * @method getCenter
     * @return {Object} object with "top" and "left" number values
     */
    getCenter: function () {
      return {
        top: this.getHeight() / 2,
        left: this.getWidth() / 2
      };
    },
    
    /**
     * Centers object horizontally.
     * @method centerObjectH
     * @param {fabric.Object} object Object to center
     * @return {fabric.Canvas} thisArg
     */
    centerObjectH: function (object) {
      object.set('left', this.getCenter().left);
      this.renderAll();
      return this;
    },
    
    /**
     * Centers object vertically.
     * @method centerObjectH
     * @param {fabric.Object} object Object to center
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    centerObjectV: function (object) {
      object.set('top', this.getCenter().top);
      this.renderAll();
      return this;
    },
    
    /**
     * Straightens object, then rerenders canvas
     * @method straightenObject
     * @param {fabric.Object} object Object to straighten
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    straightenObject: function (object) {
      object.straighten();
      this.renderAll();
      return this;
    },
    
    /**
     * Returs dataless JSON representation of canvas
     * @method toDatalessJSON
     * @return {String} json string
     */
    toDatalessJSON: function () {
      return this.toDatalessObject();
    },
    
    /**
     * Returns object representation of canvas
     * @method toObject
     * @return {Object}
     */
    toObject: function () {
      return this._toObjectMethod('toObject');
    },
    
    /**
     * Returns dataless object representation of canvas
     * @method toDatalessObject
     * @return {Object}
     */
    toDatalessObject: function () {
      return this._toObjectMethod('toDatalessObject');
    },
    
    /**
     * @private
     * @method _toObjectMethod
     */
    _toObjectMethod: function (methodName) {
      return { 
        objects: this._objects.map(function (instance){
          // TODO (kangax): figure out how to clean this up
          if (!this.includeDefaultValues) {
            var originalValue = instance.includeDefaultValues;
            instance.includeDefaultValues = false;
          }
          var object = instance[methodName]();
          if (!this.includeDefaultValues) {
            instance.includeDefaultValues = originalValue;
          }
          return object;
        }, this),
        background: this.backgroundColor
      }
    },

    /**
     * Returns true if canvas contains no objects
     * @method isEmpty
     * @return {Boolean} true if canvas is empty
     */
    isEmpty: function () {
      return this._objects.length === 0;
    },
    
    /**
     * Loads an image from URL, creates an instance of fabric.Image and passes it to a callback
     * @function
     * @method loadImageFromURL
     * @param url {String} url of image to load
     * @param callback {Function} calback, invoked when image is loaded
     */
    loadImageFromURL: (function () {
      var imgCache = { };

      return function (url, callback) {
        // check cache first
        
        var _this = this;
        
        function checkIfLoaded() {
          var imgEl = fabric.document.getElementById(imgCache[url]);
          if (imgEl.width &amp;&amp; imgEl.height) {
            callback(new fabric.Image(imgEl));
          }
          else {
            setTimeout(checkIfLoaded, 50);
          }
        }

        // get by id from cache
        if (imgCache[url]) {
          // id can be cached but image might still not be loaded, so we poll here
          checkIfLoaded();
        }
        // else append a new image element
        else {
          var imgEl = new Image();
          
          /** @ignore */
          imgEl.onload = function () {
            imgEl.onload = null;
            
            // setTimeout is to work around Chrome's issue,
            // when "load" event fires for (cached) image, yet its dimensions are 0
            
            setTimeout(function() {
              if (imgEl.width &amp;&amp; imgEl.height) {
                callback(new fabric.Image(imgEl));
              }
            }, 0);
          };
          
          imgEl.className = 'canvas-img-clone';
          imgEl.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
          imgEl.src = url;
          
          if (this.shouldCacheImages) {
            // TODO (kangax): replace Element.identify w. fabric -based alternative
            imgCache[url] = Element.identify(imgEl);
          }
          
          fabric.document.body.appendChild(imgEl);
        }
      }
    })(),
    
    /**
     * Removes an object from canvas and returns it
     * @method remove
     * @param object {Object} Object to remove
     * @return {Object} removed object
     */
    remove: function (object) {
      removeFromArray(this._objects, object);
      if (this.getActiveObject() === object) {
        this.discardActiveObject();
      }
      this.renderAll();
      return object;
    },
    
    /**
     * Moves an object to the bottom of the stack of drawn objects
     * @method sendToBack
     * @param object {fabric.Object} Object to send to back
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    sendToBack: function (object) {
      removeFromArray(this._objects, object);
      this._objects.unshift(object);
      return this.renderAll();
    },
    
    /**
     * Moves an object to the top of the stack of drawn objects
     * @method bringToFront
     * @param object {fabric.Object} Object to send
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    bringToFront: function (object) {
      removeFromArray(this._objects, object);
      this._objects.push(object);
      return this.renderAll();
    },
    
    /**
     * Moves an object one level down in stack of drawn objects
     * @method sendBackwards
     * @param object {fabric.Object} Object to send
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    sendBackwards: function (object) {
      var idx = this._objects.indexOf(object),
          nextIntersectingIdx = idx;
      
      // if object is not on the bottom of stack
      if (idx !== 0) {
        
        // traverse down the stack looking for the nearest intersecting object
        for (var i=idx-1; i&gt;=0; --i) {
          if (object.intersectsWithObject(this._objects[i]) || object.isContainedWithinObject(this._objects[i])) {
            nextIntersectingIdx = i;
            break;
          }
        }
        removeFromArray(this._objects, object);
        this._objects.splice(nextIntersectingIdx, 0, object);
      }
      return this.renderAll();
    },
    
    /**
     * Moves an object one level up in stack of drawn objects
     * @method sendForward
     * @param object {fabric.Object} Object to send
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    bringForward: function (object) {
      var objects = this.getObjects(),
          idx = objects.indexOf(object),
          nextIntersectingIdx = idx;

      
      // if object is not on top of stack (last item in an array)
      if (idx !== objects.length-1) {
        
        // traverse up the stack looking for the nearest intersecting object
        for (var i = idx + 1, l = this._objects.length; i &lt; l; ++i) {
          if (object.intersectsWithObject(objects[i]) || object.isContainedWithinObject(this._objects[i])) {
            nextIntersectingIdx = i;
            break;
          }
        }
        removeFromArray(objects, object);
        objects.splice(nextIntersectingIdx, 0, object);
      }
      this.renderAll();
    },
    
    /**
     * Sets given object as active
     * @method setActiveObject
     * @param object {fabric.Object} Object to set as an active one
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    setActiveObject: function (object) {
      if (this._activeObject) {
        this._activeObject.setActive(false);
      }
      this._activeObject = object;
      object.setActive(true);
      
      this.renderAll();
      
      this.fire('object:selected', { target: object });
      return this;
    },
    
    /**
     * Returns currently active object
     * @method getActiveObject
     * @return {fabric.Object} active object
     */
    getActiveObject: function () {
      return this._activeObject;
    },
    
    /**
     * Discards currently active object
     * @method discardActiveObject
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    discardActiveObject: function () {
      if (this._activeObject) {
        this._activeObject.setActive(false);
      }
      this._activeObject = null;
      return this;
    },
    
    /**
     * Sets active group to a speicified one
     * @method setActiveGroup
     * @param {fabric.Group} group Group to set as a current one 
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    setActiveGroup: function (group) {
      this._activeGroup = group;
      return this;
    },
    
    /**
     * Returns currently active group
     * @method getActiveGroup
     * @return {fabric.Group} Current group
     */
    getActiveGroup: function () {
      return this._activeGroup;
    },
    
    /**
     * Removes currently active group
     * @method discardActiveGroup
     * @return {fabric.Canvas} thisArg
     */
    discardActiveGroup: function () {
      var g = this.getActiveGroup();
      if (g) {
        g.destroy();
      }
      return this.setActiveGroup(null);
    },
    
    /**
     * Returns object at specified index
     * @method item
     * @param {Number} index
     * @return {fabric.Object}
     */
    item: function (index) {
      return this.getObjects()[index];
    },
    
    /**
     * Deactivates all objects by calling their setActive(false)
     * @method deactivateAll
     * @return {fabric.Canvas} thisArg
     */
    deactivateAll: function () {
      var allObjects = this.getObjects(),
          i = 0,
          len = allObjects.length;
      for ( ; i &lt; len; i++) {
        allObjects[i].setActive(false);
      }
      this.discardActiveGroup();
      this.discardActiveObject();
      return this;
    },
    
    /**
     * Returns number representation of an instance complexity
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function () {
      return this.getObjects().reduce(function (memo, current) {
        memo += current.complexity ? current.complexity() : 0;
        return memo;
      }, 0);
    },
    
    /**
     * Iterates over all objects, invoking callback for each one of them
     * @method forEachObject
     * @return {fabric.Canvas} thisArg
     */
    forEachObject: function(callback, context) {
      var objects = this.getObjects(),
          i = objects.length;
      while (i--) {
        callback.call(context, objects[i], i, objects);
      }
      return this;
    },
    
    /**
     * Clears a canvas element and removes all event handlers.
     * @method dispose
     * @return {fabric.Canvas} thisArg
     * @chainable
     */
    dispose: function () {
      this.clear();
      removeListener(this.upperCanvasEl, 'mousedown', this._onMouseDown);
      removeListener(this.upperCanvasEl, 'mousemove', this._onMouseMove);
      removeListener(fabric.window, 'resize', this._onResize);
      return this;
    },
    
    /**
     * @private
     * @method _resizeImageToFit
     * @param {HTMLImageElement} imgEl
     */
    _resizeImageToFit: function (imgEl) {
      
      var imageWidth = imgEl.width || imgEl.offsetWidth,
          widthScaleFactor = this.getWidth() / imageWidth;
      
      // scale image down so that it has original dimensions when printed in large resolution
      if (imageWidth) {
        imgEl.width = imageWidth * widthScaleFactor;
      }
    }
  });
  
  /**
   * Returns a string representation of an instance
   * @method toString
   * @return {String} string representation of an instance
   */
  fabric.Canvas.prototype.toString = function () { // Assign explicitly since `extend` doesn't take care of DontEnum bug yet
    return '#&lt;fabric.Canvas (' + this.complexity() + '): '+
           '{ objects: ' + this.getObjects().length + ' }&gt;';
  };
  
  extend(fabric.Canvas, /** @scope fabric.Canvas */ {
    
    /**
     * @static
     * @property EMPTY_JSON
     * @type String
     */
    EMPTY_JSON: '{"objects": [], "background": "white"}',
    
    /**
     * Takes &amp;lt;canvas&gt; element and transforms its data in such way that it becomes grayscale
     * @static
     * @method toGrayscale
     * @param {HTMLCanvasElement} canvasEl
     */
    toGrayscale: function (canvasEl) {
       var context = canvasEl.getContext('2d'),
           imageData = context.getImageData(0, 0, canvasEl.width, canvasEl.height),
           data = imageData.data, 
           iLen = imageData.width,
           jLen = imageData.height,
           index, average, i, j;

       for (i = 0; i &lt; iLen; i++) {
         for (j = 0; j &lt; jLen; j++) {

           index = (i * 4) * jLen + (j * 4);
           average = (data[index] + data[index + 1] + data[index + 2]) / 3;

           data[index]     = average;
           data[index + 1] = average;
           data[index + 2] = average;
         }
       }

       context.putImageData(imageData, 0, 0);
     },
    
    /**
     * Provides a way to check support of some of the canvas methods 
     * (either those of HTMLCanvasElement itself, or rendering context)
     *
     * @method supports
     * @param methodName {String} Method to check support for; 
     *                            Could be one of "getImageData" or "toDataURL"
     * @return {Boolean | null} `true` if method is supported (or at least exists), 
     *                          `null` if canvas element or context can not be initialized
     */
    supports: function (methodName) {
      var el = fabric.document.createElement('canvas');
      
      if (typeof G_vmlCanvasManager !== 'undefined') {
        G_vmlCanvasManager.initElement(el);
      }
      if (!el || !el.getContext) {
        return null;
      }
      
      var ctx = el.getContext('2d');
      if (!ctx) {
        return null;
      }
      
      switch (methodName) {
        
        case 'getImageData':
          return typeof ctx.getImageData !== 'undefined';
          
        case 'toDataURL':
          return typeof el.toDataURL !== 'undefined';
          
        default:
          return null;
      }
    }
  });
  
  /**
   * Returs JSON representation of canvas
   * @function
   * @method toJSON
   * @return {String} json string
   */
  fabric.Canvas.prototype.toJSON = fabric.Canvas.prototype.toObject;
  
  /**
   * @class fabric.Element
   * @alias fabric.Canvas
   * @deprecated
   * @constructor
   */
  fabric.Element = fabric.Canvas;
  
})(typeof exports != 'undefined' ? exports : this);
fabric.util.object.extend(fabric.Canvas.prototype, {
  
  /**
   * Centers object horizontally with animation.
   * @method fxCenterObjectH
   * @param {fabric.Object} object Object to center
   * @param {Object} [callbacks] Callbacks object with optional "onComplete" and/or "onChange" properties
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  fxCenterObjectH: function (object, callbacks) {
    callbacks = callbacks || { };

    var empty = function() { },
        onComplete = callbacks.onComplete || empty,
        onChange = callbacks.onChange || empty,
        _this = this;

    fabric.util.animate({
      startValue: object.get('left'),
      endValue: this.getCenter().left,
      duration: this.FX_DURATION,
      onChange: function(value) {
        object.set('left', value);
        _this.renderAll();
        onChange();
      },
      onComplete: function() {
        object.setCoords();
        onComplete();
      }
    });

    return this;
  },

  /**
   * Centers object vertically with animation.
   * @method fxCenterObjectV
   * @param {fabric.Object} object Object to center
   * @param {Object} [callbacks] Callbacks object with optional "onComplete" and/or "onChange" properties
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  fxCenterObjectV: function (object, callbacks) {
    callbacks = callbacks || { };

    var empty = function() { },
        onComplete = callbacks.onComplete || empty,
        onChange = callbacks.onChange || empty,
        _this = this;

    fabric.util.animate({
      startValue: object.get('top'),
      endValue: this.getCenter().top,
      duration: this.FX_DURATION,
      onChange: function(value) {
        object.set('top', value);
        _this.renderAll();
        onChange();
      },
      onComplete: function() {
        object.setCoords();
        onComplete();
      }
    });

    return this;
  },

  /**
   * Same as `fabric.Canvas#straightenObject`, but animated
   * @method fxStraightenObject
   * @param {fabric.Object} object Object to straighten
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  fxStraightenObject: function (object) {
    object.fxStraighten({
      onChange: this.renderAll.bind(this)
    });
    return this;
  },

  /**
   * Same as `fabric.Canvas#remove` but animated
   * @method fxRemove
   * @param {fabric.Object} object Object to remove
   * @param {Function} callback Callback, invoked on effect completion
   * @return {fabric.Canvas} thisArg
   * @chainable
   */
  fxRemove: function (object, callback) {
    var _this = this;
    object.fxRemove({
      onChange: this.renderAll.bind(this),
      onComplete: function () {
        _this.remove(object);
        if (typeof callback === 'function') {
          callback();
        }
      }
    });
    return this;
  }
});
fabric.util.object.extend(fabric.Canvas.prototype, {
  
  /**
   * Populates canvas with data from the specified dataless JSON
   * JSON format must conform to the one of `fabric.Canvas#toDatalessJSON`
   * @method loadFromDatalessJSON
   * @param {String} json JSON string
   * @param {Function} callback Callback, invoked when json is parsed 
   *                            and corresponding objects (e.g: fabric.Image) 
   *                            are initialized
   * @return {fabric.Canvas} instance
   * @chainable
   */
  loadFromDatalessJSON: function (json, callback) {

    if (!json) {
      return;
    }

    // serialize if it wasn't already
    var serialized = (typeof json === 'string')
      ? JSON.parse(json)
      : json;

    if (!serialized || (serialized &amp;&amp; !serialized.objects)) return;

    this.clear();

    // TODO: test this
    this.backgroundColor = serialized.background;
    this._enlivenDatalessObjects(serialized.objects, callback);
  },

  /**
   * @method _enlivenDatalessObjects
   * @param {Array} objects
   * @param {Function} callback
   */
  _enlivenDatalessObjects: function (objects, callback) {

    /** @ignore */
    function onObjectLoaded(object, index) {
      _this.insertAt(object, index);
      object.setCoords();
      if (++numLoadedObjects === numTotalObjects) {
        callback &amp;&amp; callback();
      }
    }

    var _this = this,
        numLoadedObjects = 0,
        numTotalObjects = objects.length;

    if (numTotalObjects === 0 &amp;&amp; callback) {
      callback();
    }

    try {
      objects.forEach(function (obj, index) {

        var pathProp = obj.paths ? 'paths' : 'path';
        var path = obj[pathProp];

        delete obj[pathProp];

        if (typeof path !== 'string') {
          switch (obj.type) {
            case 'image':
            case 'text':
              fabric[fabric.util.string.capitalize(obj.type)].fromObject(obj, function (o) {
                onObjectLoaded(o, index);
              });
              break;
            default:
              var klass = fabric[fabric.util.string.camelize(fabric.util.string.capitalize(obj.type))];
              if (klass &amp;&amp; klass.fromObject) {
                // restore path
                if (path) {
                  obj[pathProp] = path;
                }
                onObjectLoaded(klass.fromObject(obj), index);
              }
              break;
          }
        }
        else {
          if (obj.type === 'image') {
            _this.loadImageFromURL(path, function (image) {
              image.setSourcePath(path);

              fabric.util.object.extend(image, obj);
              image.setAngle(obj.angle);

              onObjectLoaded(image, index);
            });
          }
          else if (obj.type === 'text') {

            obj.path = path;
            var object = fabric.Text.fromObject(obj);
            var onscriptload = function () {
              // TODO (kangax): find out why Opera refuses to work without this timeout
              if (Object.prototype.toString.call(fabric.window.opera) === '[object Opera]') {
                setTimeout(function () {
                  onObjectLoaded(object, index);
                }, 500);
              }
              else {
                onObjectLoaded(object, index);
              }
            }

            fabric.util.getScript(path, onscriptload);
          }
          else {
            fabric.loadSVGFromURL(path, function (elements, options) {
              if (elements.length &gt; 1) {
                var object = new fabric.PathGroup(elements, obj);
              }
              else {
                var object = elements[0];
              }
              object.setSourcePath(path);

              // copy parameters from serialied json to object (left, top, scaleX, scaleY, etc.)
              // skip this step if an object is a PathGroup, since we already passed it options object before
              if (!(object instanceof fabric.PathGroup)) {
                fabric.util.object.extend(object, obj);
                if (typeof obj.angle !== 'undefined') {
                  object.setAngle(obj.angle);
                }
              }

              onObjectLoaded(object, index);
            });
          }
        }
      }, this);
    } 
    catch(e) {
      fabric.log(e.message);
    }
  },
  
  /**
   * Populates canvas with data from the specified JSON
   * JSON format must conform to the one of `fabric.Canvas#toJSON`
   * @method loadFromJSON
   * @param {String} json JSON string
   * @param {Function} callback Callback, invoked when json is parsed 
   *                            and corresponding objects (e.g: fabric.Image) 
   *                            are initialized
   * @return {fabric.Canvas} instance
   * @chainable
   */
  loadFromJSON: function (json, callback) {
    if (!json) return;
    
    var serialized = JSON.parse(json);
    if (!serialized || (serialized &amp;&amp; !serialized.objects)) return;
    
    this.clear();
    var _this = this;
    this._enlivenObjects(serialized.objects, function () {
      _this.backgroundColor = serialized.background;
      if (callback) {
        callback();
      }
    });
    
    return this;
  },
  
  /**
   * @method _enlivenObjects
   * @param {Array} objects
   * @param {Function} callback
   */
  _enlivenObjects: function (objects, callback) {
    var numLoadedImages = 0,
        // get length of all images 
        numTotalImages = objects.filter(function (o) {
          return o.type === 'image';
        }).length;
    
    var _this = this;
    
    objects.forEach(function (o, index) {
      if (!o.type) {
        return;
      }
      switch (o.type) {
        case 'image':
        case 'font':
          fabric[fabric.util.string.capitalize(o.type)].fromObject(o, function (o) {
            _this.insertAt(o, index);
            if (++numLoadedImages === numTotalImages) {
              if (callback) {
                callback();
              }
            }
          });
          break;
        default:
          var klass = fabric[fabric.util.string.camelize(fabric.util.string.capitalize(o.type))];
          if (klass &amp;&amp; klass.fromObject) {
            _this.insertAt(klass.fromObject(o), index);
          }
          break;
      }
    });
    
    if (numTotalImages === 0 &amp;&amp; callback) {
      callback();
    }
  },
  
  /**
   * @private
   * @method _toDataURL
   * @param {String} format
   * @param {Function} callback
   */
  _toDataURL: function (format, callback) {
    this.clone(function (clone) {
      callback(clone.toDataURL(format));
    });
  },
  
  /**
   * @private
   * @method _toDataURLWithMultiplier
   * @param {String} format
   * @param {Number} multiplier
   * @param {Function} callback
   */
  _toDataURLWithMultiplier: function (format, multiplier, callback) {
    this.clone(function (clone) {
      callback(clone.toDataURLWithMultiplier(format, multiplier));
    });
  },
  
  /**
   * Clones canvas instance
   * @method clone
   * @param {Object} [callback] Expects `onBeforeClone` and `onAfterClone` functions
   * @return {fabric.Canvas} Clone of this instance
   */
  clone: function (callback) {
    var el = fabric.document.createElement('canvas');
    
    el.width = this.getWidth();
    el.height = this.getHeight();
        
    // cache
    var clone = this.__clone || (this.__clone = new fabric.Canvas(el));
    clone.clipTo = this.clipTo;
    
    return clone.loadFromJSON(JSON.stringify(this.toJSON()), function () {
      if (callback) {
        callback(clone);
      }
    });
  }
});
(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      clone = fabric.util.object.clone,
      toFixed = fabric.util.toFixed,
      capitalize = fabric.util.string.capitalize,
      getPointer = fabric.util.getPointer,
      degreesToRadians = fabric.util.degreesToRadians,
      slice = Array.prototype.slice;
      
  if (fabric.Object) {
    return;
  }
  
  /** 
   * @class Object
   * @memberOf fabric
   */
  fabric.Object = fabric.util.createClass(/** @scope fabric.Object.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type:                       'object',
    
    /**
     * @property
     * @type Boolean
     */
    includeDefaultValues:       true,
    
    /**
     * @constant
     * @type Number
     */
    NUM_FRACTION_DIGITS:        2,
    
    /**
     * @constant
     * @type Number
     */
    FX_DURATION:                500,
    
    /**
     * @constant
     * @type Number
     */
    MIN_SCALE_LIMIT:            0.1,
    
    /**
     * List of properties to consider when checking if state of an object is changed (fabric.Object#hasStateChanged); 
     * as well as for history (undo/redo) purposes
     * @property
     * @type Array
     */
    stateProperties:  ('top left width height scaleX scaleY flipX flipY ' +
                      'theta angle opacity cornersize fill overlayFill stroke ' +
                      'strokeWidth fillRule borderScaleFactor transformMatrix ' +
                      'selectable').split(' '),
    
    top:                      0,
    left:                     0,
    width:                    0,
    height:                   0,
    scaleX:                   1,
    scaleY:                   1,
    flipX:                    false,
    flipY:                    false,
    theta:                    0,
    opacity:                  1,
    angle:                    0,
    cornersize:               12,
    padding:                  0,
    borderColor:              'rgba(102,153,255,0.75)',
    cornerColor:              'rgba(102,153,255,0.5)',
    fill:                     'rgb(0,0,0)',
    fillRule:                 'source-over',
    overlayFill:              null,
    stroke:                   null,
    strokeWidth:              1,
    borderOpacityWhenMoving:  0.4,
    borderScaleFactor:        1,
    transformMatrix:          null,
    
    /**
     * When set to `false`, an object can not be selected for modification (using either point-click-based or group-based selection)
     * @property
     * @type Boolean
     */
    selectable:               true,
    
    /**
     * When set to `false`, object's controls are not displayed and can not be used to manipulate object
     * @property
     * @type Boolean
     */
    hasControls:              true,
    
    /**
     * When set to `false`, object's borders are not rendered
     * @property
     * @type Boolean
     */
    hasBorders:               true,
    
    /**
     * @method callSuper
     * @param {String} methodName
     */
    callSuper: function(methodName) {
      var fn = this.constructor.superclass.prototype[methodName];
      return (arguments.length &gt; 1) 
        ? fn.apply(this, slice.call(arguments, 1))
        : fn.call(this);
    },
    
    /**
     * Constructor
     * @method initialize
     * @param {Object} [options] Options object
     */
    initialize: function(options) {
      options &amp;&amp; this.setOptions(options);
    },
    
    /**
     * @method setOptions
     * @param {Object} [options]
     */
    setOptions: function(options) {
      var i = this.stateProperties.length, prop;
      while (i--) {
        prop = this.stateProperties[i];
        if (prop in options) {
          this.set(prop, options[prop]);
        }
      }
    },
    
    /**
     * @method transform
     * @param {CanvasRenderingContext2D} ctx Context
     */
    transform: function(ctx) {
      ctx.globalAlpha = this.opacity;
      ctx.translate(this.left, this.top);
      ctx.rotate(this.theta);
      ctx.scale(
        this.scaleX * (this.flipX ? -1 : 1), 
        this.scaleY * (this.flipY ? -1 : 1)
      );
    },
    
    /**
     * Returns an object representation of an instance
     * @method toObject
     * @return {Object}
     */
    toObject: function() {
      
      var object = {
        type:         this.type,
        left:         toFixed(this.left, this.NUM_FRACTION_DIGITS),
        top:          toFixed(this.top, this.NUM_FRACTION_DIGITS),
        width:        toFixed(this.width, this.NUM_FRACTION_DIGITS),
        height:       toFixed(this.height, this.NUM_FRACTION_DIGITS),
        fill:         this.fill,
        overlayFill:  this.overlayFill,
        stroke:       this.stroke,
        strokeWidth:  this.strokeWidth,
        scaleX:       toFixed(this.scaleX, this.NUM_FRACTION_DIGITS),
        scaleY:       toFixed(this.scaleY, this.NUM_FRACTION_DIGITS),
        angle:        toFixed(this.getAngle(), this.NUM_FRACTION_DIGITS),
        flipX:        this.flipX,
        flipY:        this.flipY,
        opacity:      toFixed(this.opacity, this.NUM_FRACTION_DIGITS),
        selectable:   this.selectable
      };
      
      if (!this.includeDefaultValues) {
        object = this._removeDefaultValues(object);
      }
      
      return object;
    },
    
    /**
     * Returns (dataless) object representation of an instance
     * @method toDatalessObject
     */
    toDatalessObject: function() {
      // will be overwritten by subclasses
      return this.toObject();
    },
    
    /**
     * @private
     * @method _removeDefaultValues
     */
    _removeDefaultValues: function(object) {
      var defaultOptions = fabric.Object.prototype.options;
      if (defaultOptions) {
        this.stateProperties.forEach(function(prop) {
          if (object[prop] === defaultOptions[prop]) {
            delete object[prop];
          }
        });
      }
      return object;
    },
    
    /**
     * Returns true if an object is in its active state
     * @return {Boolean} true if an object is in its active state
     */
    isActive: function() {
      return !!this.active;
    },
    
    /**
     * Sets state of an object - `true` makes it active, `false` - inactive
     * @param {Boolean} active
     * @return {fabric.Object} thisArg
     * @chainable
     */
    setActive: function(active) {
      this.active = !!active;
      return this;
    },
    
    /**
     * Returns a string representation of an instance
     * @return {String}
     */
    toString: function() {
      return "#&lt;fabric." + capitalize(this.type) + "&gt;";
    },
    
    /**
     * Basic setter
     * @param {Any} property
     * @param {Any} value
     * @return {fabric.Object} thisArg
     * @chainable
     */
    set: function(property, value) {
      var shouldConstrainValue = (property === 'scaleX' || property === 'scaleY') &amp;&amp; value &lt; this.MIN_SCALE_LIMIT;
      if (shouldConstrainValue) {
        value = this.MIN_SCALE_LIMIT;
      }
      if (typeof property == 'object') {
        for (var prop in property) {
          this.set(prop, property[prop]);
        }
      }
      else {
        if (property === 'angle') {
          this.setAngle(value);
        }
        else {
          this[property] = value;
        }
      }
      
      return this;
    },
    
    /**
     * Toggles specified property from `true` to `false` or from `false` to `true`
     * @method toggle
     * @param {String} property property to toggle
     * @return {fabric.Object} thisArg
     * @chainable
     */
    toggle: function(property) {
      var value = this.get(property);
      if (typeof value === 'boolean') {
        this.set(property, !value);
      }
      return this;
    },
    
    /**
     * @method setSourcePath
     * @param {String} value
     * @return {fabric.Object} thisArg
     * @chainable
     */
    setSourcePath: function(value) {
      this.sourcePath = value;
      return this;
    },
    
    /**
     * Basic getter
     * @method get
     * @param {Any} property
     * @return {Any} value of a property
     */
    get: function(property) {
      return (property === 'angle') 
        ? this.getAngle() 
        : this[property];
    },
    
    /**
     * @method render
     * @param {CanvasRenderingContext2D} ctx context to render on
     * @param {Boolean} noTransform
     */
    render: function(ctx, noTransform) {
      
      // do not render if width or height are zeros
      if (this.width === 0 || this.height === 0) return;
      
      ctx.save();
      
      var m = this.transformMatrix;
      if (m) {
        ctx.setTransform(m[0], m[1], m[2], m[3], m[4], m[5]);
      }
      
      if (!noTransform) {
        this.transform(ctx);
      }
      
      if (this.stroke) {
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeStyle = this.stroke;
      }
      
      if (this.overlayFill) {
        ctx.fillStyle = this.overlayFill;
      }
      else if (this.fill) {
        ctx.fillStyle = this.fill;
      }
      
      if (this.group) {
        // TODO: this breaks some shapes, need to look into it
        // ctx.translate(
        //    -this.group.width / 2 + this.width / 2, 
        //    -this.group.height / 2 + this.height / 2
        // );
      }
      this._render(ctx, noTransform);
      
      if (this.active &amp;&amp; !noTransform) {
        this.drawBorders(ctx);
        this.hideCorners || this.drawCorners(ctx);
      }
      ctx.restore();
    },
    
    /**
     * Returns width of an object
     * @method getWidth
     * @return {Number} width value
     */
    getWidth: function() {
      return this.width * this.scaleX;
    },
    
    /**
     * Returns height of an object
     * @method getHeight
     * @return {Number} height value
     */
    getHeight: function() {
      return this.height * this.scaleY;
    },
    
    /**
     * Scales an object (equally by x and y)
     * @method scale
     * @param value {Number} scale factor
     * @return {fabric.Object} thisArg
     * @chainable
     */
    scale: function(value) {
      this.scaleX = value;
      this.scaleY = value;
      return this;
    },
    
    /**
     * Scales an object to a given width (scaling by x/y equally)
     * @method scaleToWidth
     * @param value {Number} new width value
     * @return {fabric.Object} thisArg
     * @chainable
     */
    scaleToWidth: function(value) {
      return this.scale(value / this.width);
    },
    
    /**
     * Scales an object to a given height (scaling by x/y equally)
     * @method scaleToHeight
     * @param value {Number} new height value
     * @return {fabric.Object} thisArg
     * @chainable
     */
    scaleToHeight: function(value) {
      return this.scale(value / this.height);
    },
    
    /**
     * Sets object opacity 
     * @method setOpacity
     * @param value {Number} value 0-1
     * @return {fabric.Object} thisArg
     * @chainable
     */
    setOpacity: function(value) {
      this.set('opacity', value);
      return this;
    },
    
    /**
     * Returns object's angle value
     * @method getAngle
     * @return {Number} angle value
     */
    getAngle: function() {
      return this.theta * 180 / Math.PI;
    },
    
    /**
     * Sets object's angle
     * @method setAngle
     * @param value {Number} angle value
     * @return {Object} thisArg
     */
    setAngle: function(value) {
      this.theta = value / 180 * Math.PI;
      this.angle = value;
      return this;
    },
    
    /**
     * Sets corner position coordinates based on current angle, width and height.
     * @method setCoords
     * return {fabric.Object} thisArg
     * @chainable
     */
    setCoords: function() {
      
      this.currentWidth = this.width * this.scaleX;
      this.currentHeight = this.height * this.scaleY;
      
      this._hypotenuse = Math.sqrt(
        Math.pow(this.currentWidth / 2, 2) + 
        Math.pow(this.currentHeight / 2, 2));
        
      this._angle = Math.atan(this.currentHeight / this.currentWidth);

      // offset added for rotate and scale actions
      var offsetX = Math.cos(this._angle + this.theta) * this._hypotenuse,
          offsetY = Math.sin(this._angle + this.theta) * this._hypotenuse,
          theta = this.theta,
          sinTh = Math.sin(theta),
          cosTh = Math.cos(theta);

      var tl = {
        x: this.left - offsetX,
        y: this.top - offsetY
      };
      var tr = {
        x: tl.x + (this.currentWidth * cosTh),
        y: tl.y + (this.currentWidth * sinTh)
      };
      var br = {
        x: tr.x - (this.currentHeight * sinTh),
        y: tr.y + (this.currentHeight * cosTh)
      };
      var bl = {
        x: tl.x - (this.currentHeight * sinTh),
        y: tl.y + (this.currentHeight * cosTh)
      };
      var ml = {
        x: tl.x - (this.currentHeight/2 * sinTh),
        y: tl.y + (this.currentHeight/2 * cosTh)
      };
      var mt = {
        x: tl.x + (this.currentWidth/2 * cosTh),
        y: tl.y + (this.currentWidth/2 * sinTh)
      };
      var mr = {
        x: tr.x - (this.currentHeight/2 * sinTh),
        y: tr.y + (this.currentHeight/2 * cosTh)
      }
      var mb = {
        x: bl.x + (this.currentWidth/2 * cosTh),
        y: bl.y + (this.currentWidth/2 * sinTh)
      }
      
      // debugging
      
      // setTimeout(function() {
      //         canvas.contextTop.fillStyle = 'green';
      //         canvas.contextTop.fillRect(mb.x, mb.y, 3, 3);
      //         canvas.contextTop.fillRect(bl.x, bl.y, 3, 3);
      //         canvas.contextTop.fillRect(br.x, br.y, 3, 3);
      //         canvas.contextTop.fillRect(tl.x, tl.y, 3, 3);
      //         canvas.contextTop.fillRect(tr.x, tr.y, 3, 3);
      //         canvas.contextTop.fillRect(ml.x, ml.y, 3, 3);
      //         canvas.contextTop.fillRect(mr.x, mr.y, 3, 3);
      //         canvas.contextTop.fillRect(mt.x, mt.y, 3, 3);
      //       }, 50);
      
      // clockwise
      this.oCoords = { tl: tl, tr: tr, br: br, bl: bl, ml: ml, mt: mt, mr: mr, mb: mb };
      
      // set coordinates of the draggable boxes in the corners used to scale/rotate the image
      this._setCornerCoords();
      
      return this;
    },
    
    /**
     * Draws borders of an object's bounding box. 
     * Requires public properties: width, height
     * Requires public options: padding, borderColor
     * @method drawBorders
     * @param {CanvasRenderingContext2D} ctx Context to draw on
     * @return {fabric.Object} thisArg
     * @chainable
     */
    drawBorders: function(ctx) {
      if (!this.hasBorders) return;
      
      var padding = this.padding,
          padding2 = padding * 2;

      ctx.save();

      ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
      ctx.strokeStyle = this.borderColor;

      var scaleX = 1 / (this.scaleX &lt; this.MIN_SCALE_LIMIT ? this.MIN_SCALE_LIMIT : this.scaleX),
          scaleY = 1 / (this.scaleY &lt; this.MIN_SCALE_LIMIT ? this.MIN_SCALE_LIMIT : this.scaleY);

      ctx.lineWidth = 1 / this.borderScaleFactor;

      ctx.scale(scaleX, scaleY);

      var w = this.getWidth(),
          h = this.getHeight();

      ctx.strokeRect(
        ~~(-(w / 2) - padding) + 0.5, // offset needed to make lines look sharper
        ~~(-(h / 2) - padding) + 0.5,
        ~~(w + padding2),
        ~~(h + padding2)
      );

      ctx.restore();
      return this;
    },
    
    /**
     * Draws corners of an object's bounding box.
     * Requires public properties: width, height, scaleX, scaleY 
     * Requires public options: cornersize, padding
     * @method drawCorners
     * @param {CanvasRenderingContext2D} ctx Context to draw on
     * @return {fabric.Object} thisArg
     * @chainable
     */
    drawCorners: function(ctx) {
      if (!this.hasControls) return;
      
      var size = this.cornersize,
          size2 = size / 2,
          padding = this.padding,
          left = -(this.width / 2),
          top = -(this.height / 2),
          _left, 
          _top,
          sizeX = size / this.scaleX,
          sizeY = size / this.scaleY,
          scaleOffsetY = (padding + size2) / this.scaleY,
          scaleOffsetX = (padding + size2) / this.scaleX,
          scaleOffsetSizeX = (padding + size2 - size) / this.scaleX,
          scaleOffsetSizeY = (padding + size2 - size) / this.scaleY,
          height = this.height;
          
      ctx.save();
      
      ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
      ctx.fillStyle = this.cornerColor;
      
      // top-left
      _left = left - scaleOffsetX;
      _top = top - scaleOffsetY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // top-right
      _left = left + this.width - scaleOffsetX;
      _top = top - scaleOffsetY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // bottom-left
      _left = left - scaleOffsetX;
      _top = top + height + scaleOffsetSizeY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // bottom-right
      _left = left + this.width + scaleOffsetSizeX;
      _top = top + height + scaleOffsetSizeY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // middle-top
      _left = left + this.width/2 - scaleOffsetX;
      _top = top - scaleOffsetY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // middle-bottom
      _left = left + this.width/2 - scaleOffsetX;
      _top = top + height + scaleOffsetSizeY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // middle-right
      _left = left + this.width + scaleOffsetSizeX;
      _top = top + height/2 - scaleOffsetY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      // middle-left
      _left = left - scaleOffsetX;
      _top = top + height/2 - scaleOffsetY;
      ctx.fillRect(_left, _top, sizeX, sizeY);
      
      ctx.restore();
      
      return this;
    },
    
    /**
     * Clones an instance
     * @method clone
     * @param {Object} options object
     * @return {fabric.Object} clone of an instance
     */
    clone: function(options) {
      if (this.constructor.fromObject) {
        return this.constructor.fromObject(this.toObject(), options);
      }
      return new fabric.Object(this.toObject());
    },
    
    /**
     * Creates an instance of fabric.Image out of an object
     * @method cloneAsImage
     * @param callback {Function} callback, invoked with an instance as a first argument
     * @return {fabric.Object} thisArg
     * @chainable
     */
    cloneAsImage: function(callback) {
      if (fabric.Image) {
        var i = new Image();
        
        /** @ignore */
        i.onload = function() {
          if (callback) {
            callback(new fabric.Image(i), orig);
          }
          i = i.onload = null;
        };
        
        var orig = {
          angle: this.get('angle'),
          flipX: this.get('flipX'),
          flipY: this.get('flipY')
        };

        // normalize angle
        this.set('angle', 0).set('flipX', false).set('flipY', false);
        i.src = this.toDataURL();
      }
      return this;
    },
    
    /**
     * Converts an object into a data-url-like string
     * @method toDataURL
     * @return {String} string of data
     */
    toDataURL: function() {
      var el = fabric.document.createElement('canvas');
      
      el.width = this.getWidth();
      el.height = this.getHeight();
      
      fabric.util.wrapElement(el, 'div');

      var canvas = new fabric.Canvas(el);
      canvas.backgroundColor = 'transparent';
      canvas.renderAll();
      
      var clone = this.clone();
      clone.left = el.width / 2;
      clone.top = el.height / 2;
      
      clone.setActive(false);
      
      canvas.add(clone);
      var data = canvas.toDataURL('png');
      
      canvas.dispose();
      canvas = clone = null;
      return data;
    },
    
    /**
     * @method hasStateChanged
     * @return {Boolean} true if instance' state has changed
     */
    hasStateChanged: function() {
      return this.stateProperties.some(function(prop) {
        return this[prop] !== this.originalState[prop];
      }, this);
    },
    
    /**
     * @method saveState
     * @return {fabric.Object} thisArg
     * @chainable
     */
    saveState: function() {
      this.stateProperties.forEach(function(prop) {
        this.originalState[prop] = this.get(prop);
      }, this);
      return this;
    },
    
    /**
     * @method setupState
     */
    setupState: function() {
      this.originalState = { };
      this.saveState();
    },
    
    /**
     * Returns true if object intersects with an area formed by 2 points
     * @method intersectsWithRect
     * @param {Object} selectionTL
     * @param {Object} selectionBR
     * @return {Boolean}
     */
    intersectsWithRect: function(selectionTL, selectionBR) {
      var oCoords = this.oCoords,
          tl = new fabric.Point(oCoords.tl.x, oCoords.tl.y),
          tr = new fabric.Point(oCoords.tr.x, oCoords.tr.y),
          bl = new fabric.Point(oCoords.bl.x, oCoords.bl.y),
          br = new fabric.Point(oCoords.br.x, oCoords.br.y);
      
      var intersection = fabric.Intersection.intersectPolygonRectangle(
        [tl, tr, br, bl],
        selectionTL,
        selectionBR
      );
      return (intersection.status === 'Intersection');
    },
    
    /**
     * Returns true if object intersects with another object
     * @method intersectsWithObject
     * @param {Object} other Object to test
     * @return {Boolean}
     */
    intersectsWithObject: function(other) {
      // extracts coords
      function getCoords(oCoords) {
        return {
          tl: new fabric.Point(oCoords.tl.x, oCoords.tl.y),
          tr: new fabric.Point(oCoords.tr.x, oCoords.tr.y),
          bl: new fabric.Point(oCoords.bl.x, oCoords.bl.y),
          br: new fabric.Point(oCoords.br.x, oCoords.br.y)
        }
      }
      var thisCoords = getCoords(this.oCoords),
          otherCoords = getCoords(other.oCoords);
          
      var intersection = fabric.Intersection.intersectPolygonPolygon(
        [thisCoords.tl, thisCoords.tr, thisCoords.br, thisCoords.bl],
        [otherCoords.tl, otherCoords.tr, otherCoords.br, otherCoords.bl]
      );
      
      return (intersection.status === 'Intersection');
    },
    
    /**
     * Returns true if object is fully contained within area of another object
     * @method isContainedWithinObject
     * @param {Object} other Object to test
     * @return {Boolean}
     */
    isContainedWithinObject: function(other) {
      return this.isContainedWithinRect(other.oCoords.tl, other.oCoords.br);
    },
    
    /**
     * Returns true if object is fully contained within area formed by 2 points
     * @method isContainedWithinRect
     * @param {Object} selectionTL
     * @param {Object} selectionBR
     * @return {Boolean}
     */
    isContainedWithinRect: function(selectionTL, selectionBR) {
      var oCoords = this.oCoords,
          tl = new fabric.Point(oCoords.tl.x, oCoords.tl.y),
          tr = new fabric.Point(oCoords.tr.x, oCoords.tr.y),
          bl = new fabric.Point(oCoords.bl.x, oCoords.bl.y),
          br = new fabric.Point(oCoords.br.x, oCoords.br.y);
          
      return tl.x &gt; selectionTL.x
        &amp;&amp; tr.x &lt; selectionBR.x
        &amp;&amp; tl.y &gt; selectionTL.y
        &amp;&amp; bl.y &lt; selectionBR.y;
    },
    
    /**
     * @method isType
     * @param type {String} type to check against
     * @return {Boolean} true if specified type is identical to the type of instance
     */
    isType: function(type) {
      return this.type === type;
    },
    
    /**
     * Determines which one of the four corners has been clicked
     * @method _findTargetCorner
     * @private
     * @param e {Event} event object
     * @param offset {Object} canvas offset
     * @return {String|Boolean} corner code (tl, tr, bl, br, etc.), or false if nothing is found
     */
    _findTargetCorner: function(e, offset) {
      if (!this.hasControls) return false;
      
      var pointer = getPointer(e),
          ex = pointer.x - offset.left,
          ey = pointer.y - offset.top,
          xpoints,
          lines;
      
      for (var i in this.oCoords) {
        lines = this._getImageLines(this.oCoords[i].corner, i);
        // debugging
        // canvas.contextTop.fillRect(lines.bottomline.d.x, lines.bottomline.d.y, 2, 2);
        //         canvas.contextTop.fillRect(lines.bottomline.o.x, lines.bottomline.o.y, 2, 2);
        //         
        //         canvas.contextTop.fillRect(lines.leftline.d.x, lines.leftline.d.y, 2, 2);
        //         canvas.contextTop.fillRect(lines.leftline.o.x, lines.leftline.o.y, 2, 2);
        //         
        //         canvas.contextTop.fillRect(lines.topline.d.x, lines.topline.d.y, 2, 2);
        //         canvas.contextTop.fillRect(lines.topline.o.x, lines.topline.o.y, 2, 2);
        //         
        //         canvas.contextTop.fillRect(lines.rightline.d.x, lines.rightline.d.y, 2, 2);
        //         canvas.contextTop.fillRect(lines.rightline.o.x, lines.rightline.o.y, 2, 2);
        
        xpoints = this._findCrossPoints(ex, ey, lines);
        if (xpoints % 2 == 1 &amp;&amp; xpoints != 0) {
          this.__corner = i;
          return i;
        }   
      }
      return false;
    },
    
    /**
     * Helper method to determine how many cross points are between the 4 image edges
     * and the horizontal line determined by the position of our mouse when clicked on canvas
     * @method _findCrossPoints
     * @private
     * @param ex {Number} x coordinate of the mouse
     * @param ey {Number} y coordinate of the mouse
     * @param oCoords {Object} Coordinates of the image being evaluated
     */   
    _findCrossPoints: function(ex, ey, oCoords) {
      var b1, b2, a1, a2, xi, yi,
          xcount = 0,
          iLine;
          
      for (var lineKey in oCoords) {
        iLine = oCoords[lineKey];
        // optimisation 1: line below dot. no cross
        if ((iLine.o.y &lt; ey) &amp;&amp; (iLine.d.y &lt; ey)) {
          continue;
        }
        // optimisation 2: line above dot. no cross
        if ((iLine.o.y &gt;= ey) &amp;&amp; (iLine.d.y &gt;= ey)) {
          continue;
        }
        // optimisation 3: vertical line case
        if ((iLine.o.x == iLine.d.x) &amp;&amp; (iLine.o.x &gt;= ex)) { 
          xi = iLine.o.x;
          yi = ey;
        }
        // calculate the intersection point
        else {
          b1 = 0;
          b2 = (iLine.d.y-iLine.o.y)/(iLine.d.x-iLine.o.x); 
          a1 = ey-b1*ex;
          a2 = iLine.o.y-b2*iLine.o.x;

          xi = - (a1-a2)/(b1-b2); 
          yi = a1+b1*xi; 
        }
        // dont count xi &lt; ex cases
        if (xi &gt;= ex) { 
          xcount += 1;
        }
        // optimisation 4: specific for square images
        if (xcount == 2) {
          break;
        }
      }
      return xcount;
    },
    
    /**
     * Method that returns an object with the image lines in it given the coordinates of the corners
     * @method _getImageLines
     * @private
     * @param oCoords {Object} coordinates of the image corners
     */
    _getImageLines: function(oCoords, i) {
      return {
        topline: { 
          o: oCoords.tl,
          d: oCoords.tr
        },
        rightline: { 
          o: oCoords.tr,
          d: oCoords.br 
        },
        bottomline: { 
          o: oCoords.br,
          d: oCoords.bl 
        },
        leftline: { 
          o: oCoords.bl,
          d: oCoords.tl 
        }
      }
    },
    
    /**
     * Sets the coordinates of the draggable boxes in the corners of
     * the image used to scale/rotate it.
     * @method _setCornerCoords
     * @private
     */ 
    _setCornerCoords: function() {
      var coords = this.oCoords,
          theta = degreesToRadians(45 - this.getAngle()),
          cornerHypotenuse = Math.sqrt(2 * Math.pow(this.cornersize, 2)) / 2,
          cosHalfOffset = cornerHypotenuse * Math.cos(theta),
          sinHalfOffset = cornerHypotenuse * Math.sin(theta);

      coords.tl.corner = {
        tl: {
          x: coords.tl.x - sinHalfOffset,
          y: coords.tl.y - cosHalfOffset
        },
        tr: {
          x: coords.tl.x + cosHalfOffset,
          y: coords.tl.y - sinHalfOffset
        },
        bl: {
          x: coords.tl.x - cosHalfOffset,
          y: coords.tl.y + sinHalfOffset
        },
        br: {
          x: coords.tl.x + sinHalfOffset,
          y: coords.tl.y + cosHalfOffset
        }
      };
      
      coords.tr.corner = {
        tl: {
          x: coords.tr.x - sinHalfOffset,
          y: coords.tr.y - cosHalfOffset
        },
        tr: {
          x: coords.tr.x + cosHalfOffset,
          y: coords.tr.y - sinHalfOffset
        },
        br: {
          x: coords.tr.x + sinHalfOffset,
          y: coords.tr.y + cosHalfOffset
        },
        bl: {
          x: coords.tr.x - cosHalfOffset,
          y: coords.tr.y + sinHalfOffset
        }
      };
      
      coords.bl.corner = {
        tl: {
          x: coords.bl.x - sinHalfOffset,
          y: coords.bl.y - cosHalfOffset
        },
        bl: {
          x: coords.bl.x - cosHalfOffset,
          y: coords.bl.y + sinHalfOffset
        },
        br: {
          x: coords.bl.x + sinHalfOffset,
          y: coords.bl.y + cosHalfOffset
        },
        tr: {
          x: coords.bl.x + cosHalfOffset,
          y: coords.bl.y - sinHalfOffset
        }
      };
      
      coords.br.corner = {
        tr: {
          x: coords.br.x + cosHalfOffset,
          y: coords.br.y - sinHalfOffset
        },
        bl: {
          x: coords.br.x - cosHalfOffset,
          y: coords.br.y + sinHalfOffset
        },
        br: {
          x: coords.br.x + sinHalfOffset,
          y: coords.br.y + cosHalfOffset
        },
        tl: {
          x: coords.br.x - sinHalfOffset,
          y: coords.br.y - cosHalfOffset
        }
      };

      coords.ml.corner = {
        tl: {
          x: coords.ml.x - sinHalfOffset,
          y: coords.ml.y - cosHalfOffset
        },
        tr: {
          x: coords.ml.x + cosHalfOffset,
          y: coords.ml.y - sinHalfOffset
        },
        bl: {
          x: coords.ml.x - cosHalfOffset,
          y: coords.ml.y + sinHalfOffset
        },
        br: {
          x: coords.ml.x + sinHalfOffset,
          y: coords.ml.y + cosHalfOffset
        }
      };
      
      coords.mt.corner = {
        tl: {
          x: coords.mt.x - sinHalfOffset,
          y: coords.mt.y - cosHalfOffset
        },
        tr: {
          x: coords.mt.x + cosHalfOffset,
          y: coords.mt.y - sinHalfOffset
        },
        bl: {
          x: coords.mt.x - cosHalfOffset,
          y: coords.mt.y + sinHalfOffset
        },
        br: {
          x: coords.mt.x + sinHalfOffset,
          y: coords.mt.y + cosHalfOffset
        }
      };

      coords.mr.corner = {
        tl: {
          x: coords.mr.x - sinHalfOffset,
          y: coords.mr.y - cosHalfOffset
        },
        tr: {
          x: coords.mr.x + cosHalfOffset,
          y: coords.mr.y - sinHalfOffset
        },
        bl: {
          x: coords.mr.x - cosHalfOffset,
          y: coords.mr.y + sinHalfOffset
        },
        br: {
          x: coords.mr.x + sinHalfOffset,
          y: coords.mr.y + cosHalfOffset
        }
      };
      
      coords.mb.corner = {
        tl: {
          x: coords.mb.x - sinHalfOffset,
          y: coords.mb.y - cosHalfOffset
        },
        tr: {
          x: coords.mb.x + cosHalfOffset,
          y: coords.mb.y - sinHalfOffset
        },
        bl: {
          x: coords.mb.x - cosHalfOffset,
          y: coords.mb.y + sinHalfOffset
        },
        br: {
          x: coords.mb.x + sinHalfOffset,
          y: coords.mb.y + cosHalfOffset
        }
      };
    },
    
    /**
     * Makes object's color grayscale
     * @method toGrayscale
     * @return {fabric.Object} thisArg
     */
    toGrayscale: function() {
      var fillValue = this.get('fill');
      if (fillValue) {
        this.set('overlayFill', new fabric.Color(fillValue).toGrayscale().toRgb());
      }
      return this;
    },
    
    /**
     * @method complexity
     * @return {Number}
     */
    complexity: function() {
      return 0;
    },
    
    /**
     * @method getCenter
     * @return {Object} object with `x`, `y` properties corresponding to path center coordinates
     */
    getCenter: function() {
      return {
        x: this.get('left') + this.width / 2,
        y: this.get('top') + this.height / 2
      };
    },
    
    /**
     * @method straighten
     * @return {fabric.Object} thisArg
     * @chainable
     */
    straighten: function() {
      var angle = this._getAngleValueForStraighten();
      this.setAngle(angle);
      return this;
    },
    
    /**
     * @method fxStraighten
     * @param {Object} callbacks
     *                  - onComplete: invoked on completion
     *                  - onChange: invoked on every step of animation
     *
     * @return {fabric.Object} thisArg
     * @chainable
     */
    fxStraighten: function(callbacks) {
      callbacks = callbacks || { };
      
      var empty = function() { },
          onComplete = callbacks.onComplete || empty,
          onChange = callbacks.onChange || empty,
          _this = this;
      
      fabric.util.animate({
        startValue: this.get('angle'),
        endValue: this._getAngleValueForStraighten(),
        duration: this.FX_DURATION,
        onChange: function(value) {
          _this.setAngle(value);
          onChange();
        },
        onComplete: function() {
          _this.setCoords();
          onComplete();
        },
        onStart: function() {
          _this.setActive(false);
        }
      });
      
      return this;
    },
    
    /**
     * @method fxRemove
     * @param {Object} callbacks
     * @return {fabric.Object} thisArg
     * @chainable
     */
    fxRemove: function(callbacks) {
      callbacks || (callbacks = { });
      
      var empty = function() { },
          onComplete = callbacks.onComplete || empty,
          onChange = callbacks.onChange || empty,
          _this = this;
      
      fabric.util.animate({
        startValue: this.get('opacity'),
        endValue: 0,
        duration: this.FX_DURATION,
        onChange: function(value) {
          _this.set('opacity', value);
          onChange();
        },
        onComplete: onComplete,
        onStart: function() {
          _this.setActive(false);
        }
      });
      
      return this;
    },
    
    /**
     * @method _getAngleValueForStraighten
     * @return {Number} angle value
     * @private
     */
    _getAngleValueForStraighten: function() {
      var angle = this.get('angle');
      
      // TODO (kangax): can this be simplified?
      
      if      (angle &gt; -225 &amp;&amp; angle &lt;= -135) { return -180;  }
      else if (angle &gt; -135 &amp;&amp; angle &lt;= -45)  { return  -90;  }
      else if (angle &gt; -45  &amp;&amp; angle &lt;= 45)   { return    0;  }
      else if (angle &gt; 45   &amp;&amp; angle &lt;= 135)  { return   90;  }
      else if (angle &gt; 135  &amp;&amp; angle &lt;= 225 ) { return  180;  }
      else if (angle &gt; 225  &amp;&amp; angle &lt;= 315)  { return  270;  }
      else if (angle &gt; 315)                   { return  360;  }
      
      return 0;
    },
    
    /**
     * Returns a JSON representation of an instance
     * @method toJSON
     * @return {String} json
     */
    toJSON: function() {
      // delegate, not alias
      return this.toObject();
    },
    
    setGradientFill: function(ctx, options) {
      this.set('fill', fabric.Gradient.forObject(this, ctx, options));
    },
    
    animate: function(property, to, options) {
      var obj = this;
      
      if (!('from' in options)) {
        options.from = this.get(property);
      }
      
      if (/[+-]/.test(to.charAt(0))) {
        to = this.get(property) + parseFloat(to);
      }
      
      fabric.util.animate({
        startValue: options.from,
        endValue: to,
        duration: options.duration,
        onChange: function(value) {
          obj.set(property, value);
          options.onChange &amp;&amp; options.onChange();
        },
        onComplete: function() {
          obj.setCoords();
          options.onComplete &amp;&amp; options.onComplete();
        }
      });
    }
  });
  
  /**
   * @alias rotate -&gt; setAngle
   */
  fabric.Object.prototype.rotate = fabric.Object.prototype.setAngle;
  
  var proto = fabric.Object.prototype;
  for (var i = proto.stateProperties.length; i--; ) {
    
    var propName = proto.stateProperties[i],
        capitalizedPropName = propName.charAt(0).toUpperCase() + propName.slice(1),
        setterName = 'set' + capitalizedPropName,
        getterName = 'get' + capitalizedPropName;
    
    // using `new Function` for better introspection
    if (!proto[getterName]) {
      proto[getterName] = (function(property) {
        return new Function('return this.get("' + property + '")');
      })(propName);
    }
    if (!proto[setterName]) {
      proto[setterName] = (function(property) {
        return new Function('value', 'return this.set("' + property + '", value)');
      })(propName);
    }
  }
  
})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend;
      
  if (fabric.Line) {
    fabric.warn('fabric.Line is already defined');
    return;
  }
  
  /** 
   * @class Line
   * @extends fabric.Object
   */
  fabric.Line = fabric.util.createClass(fabric.Object, /** @scope fabric.Line.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'line',
    
    /**
     * Constructor
     * @method initialize
     * @param {Array} points Array of points
     * @param {Object} [options] Options object
     * @return {fabric.Line} thisArg
     */
    initialize: function(points, options) {
      if (!points) {
        points = [0, 0, 0, 0];
      }
      
      this.callSuper('initialize', options);
      
      this.set('x1', points[0]);
      this.set('y1', points[1]);
      this.set('x2', points[2]);
      this.set('y2', points[3]);
      
      this.set('width', (this.x2 - this.x1) || 1);
      this.set('height', (this.y2 - this.y1) || 1);
      this.set('left', this.x1 + this.width / 2);
      this.set('top', this.y1 + this.height / 2);
    },
    
    /**
     * @private
     * @method _render
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      ctx.beginPath();
      
      // move from center (of virtual box) to its left/top corner
      ctx.moveTo(-this.width / 2, -this.height / 2);
      ctx.lineTo(this.width / 2, this.height / 2);
      
      ctx.lineWidth = this.strokeWidth;
      
      // TODO: test this
      // make sure setting "fill" changes color of a line
      // (by copying fillStyle to strokeStyle, since line is stroked, not filled)
      var origStrokeStyle = ctx.strokeStyle;
      ctx.strokeStyle = ctx.fillStyle;
      ctx.stroke();
      ctx.strokeStyle = origStrokeStyle;
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return 1;
    },
    
    /**
     * Returns object representation of an instance
     * @methd toObject
     * @return {Object}
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        x1: this.get('x1'),
        y1: this.get('y1'),
        x2: this.get('x2'),
        y2: this.get('y2')
      });
    }
  });
  
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Line.fromElement`)
   * @static
   * @see http://www.w3.org/TR/SVG/shapes.html#LineElement
   */
  fabric.Line.ATTRIBUTE_NAMES = 'x1 y1 x2 y2 stroke stroke-width transform'.split(' ');
  
  /**
   * Returns fabric.Line instance from an SVG element
   * @static
   * @method fabric.Line.fromElement
   * @param {SVGElement} element Element to parse
   * @param {Object} [options] Options object
   * @return {fabric.Line} instance of fabric.Line
   */
  fabric.Line.fromElement = function(element, options) {
    var parsedAttributes = fabric.parseAttributes(element, fabric.Line.ATTRIBUTE_NAMES);
    var points = [
      parsedAttributes.x1 || 0,
      parsedAttributes.y1 || 0,
      parsedAttributes.x2 || 0,
      parsedAttributes.y2 || 0
    ];
    return new fabric.Line(points, extend(parsedAttributes, options));
  };
  
  /**
   * Returns fabric.Line instance from an object representation
   * @static
   * @method fabric.Line.fromObject
   * @param {Object} object Object to create an instance from
   * @return {fabric.Line} instance of fabric.Line
   */
  fabric.Line.fromObject = function(object) {
    var points = [object.x1, object.y1, object.x2, object.y2];
    return new fabric.Line(points, object);
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric  = global.fabric || (global.fabric = { }),
      piBy2   = Math.PI * 2,
      extend = fabric.util.object.extend;
  
  if (fabric.Circle) {
    fabric.warn('fabric.Circle is already defined.');
    return;
  }

  /** 
   * @class Circle
   * @extends fabric.Object
   */
  fabric.Circle = fabric.util.createClass(fabric.Object, /** @scope fabric.Circle.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'circle',
    
    /**
     * Constructor
     * @method initialize
     * @param {Object} [options] Options object
     * @return {fabric.Circle} thisArg
     */
    initialize: function(options) {
      options = options || { };
      
      this.set('radius', options.radius || 0);
      this.callSuper('initialize', options);
      
      var radiusBy2ByScale = this.get('radius') * 2 * this.get('scaleX');
      this.set('width', radiusBy2ByScale).set('height', radiusBy2ByScale);
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        radius: this.get('radius')
      });
    },
    
    /**
     * @private
     * @method _render
     * @param ctx {CanvasRenderingContext2D} context to render on
     */
    _render: function(ctx, noTransform) {
      ctx.beginPath();
      // multiply by currently set alpha (the one that was set by path group where this object is contained, for example)
      ctx.globalAlpha *= this.opacity;
      ctx.arc(noTransform ? this.left : 0, noTransform ? this.top : 0, this.radius, 0, piBy2, false);
      ctx.closePath();
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.stroke();
      }
    },
    
    /**
     * Returns horizontal radius of an object (according to how an object is scaled)
     * @method getRadiusX
     * @return {Number}
     */
    getRadiusX: function() {
      return this.get('radius') * this.get('scaleX');
    },
    
    /**
     * Returns vertical radius of an object (according to how an object is scaled)
     * @method getRadiusY
     * @return {Number}
     */
    getRadiusY: function() {
      return this.get('radius') * this.get('scaleY');
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity of this instance
     */
    complexity: function() {
      return 1;
    }
  });
  
  /**
   * List of attribute names to account for when parsing SVG element (used by {@link fabric.Circle.fromElement})
   * @static
   * @see: http://www.w3.org/TR/SVG/shapes.html#CircleElement
   */
  fabric.Circle.ATTRIBUTE_NAMES = 'cx cy r fill fill-opacity opacity stroke stroke-width transform'.split(' ');
  
  /**
   * Returns {@link fabric.Circle} instance from an SVG element
   * @static
   * @method fabric.Circle.fromElement
   * @param element {SVGElement} element to parse
   * @param options {Object} options object
   * @throws {Error} If value of `r` attribute is missing or invalid
   * @return {Object} instance of fabric.Circle
   */
  fabric.Circle.fromElement = function(element, options) {
    options || (options = { });
    var parsedAttributes = fabric.parseAttributes(element, fabric.Circle.ATTRIBUTE_NAMES);
    if (!isValidRadius(parsedAttributes)) {
      throw Error('value of `r` attribute is required and can not be negative');
    }
    if ('left' in parsedAttributes) {
      parsedAttributes.left -= (options.width / 2) || 0;
    }
    if ('top' in parsedAttributes) {
      parsedAttributes.top -= (options.height / 2) || 0;
    }
    return new fabric.Circle(extend(parsedAttributes, options));
  };
  
  /**
   * @private
   */
  function isValidRadius(attributes) {
    return (('radius' in attributes) &amp;&amp; (attributes.radius &gt; 0));
  }
  
  /**
   * Returns {@link fabric.Circle} instance from an object representation
   * @static
   * @method fabric.Circle.fromObject
   * @param {Object} object Object to create an instance from
   * @return {Object} Instance of fabric.Circle
   */
  fabric.Circle.fromObject = function(object) {
    return new fabric.Circle(object);
  };
  
})(typeof exports != 'undefined' ? exports : this);
(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { });
  
  if (fabric.Triangle) {
    fabric.warn('fabric.Triangle is already defined');
    return;
  }
  
  /** 
   * @class Triangle
   * @extends fabric.Object
   */
  fabric.Triangle = fabric.util.createClass(fabric.Object, /** @scope fabric.Triangle.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'triangle',
    
    /**
     * Constructor
     * @method initialize
     * @param options {Object} options object
     * @return {Object} thisArg
     */
    initialize: function(options) {
      options = options || { };
      
      this.callSuper('initialize', options);
      
      this.set('width', options.width || 100)
          .set('height', options.height || 100);
    },
    
    /**
     * @private
     * @method _render
     * @param ctx {CanvasRenderingContext2D} Context to render on
     */
    _render: function(ctx) {      
      var widthBy2 = this.width / 2,
          heightBy2 = this.height / 2;
      
      ctx.beginPath();
      ctx.moveTo(-widthBy2, heightBy2);
      ctx.lineTo(0, -heightBy2);
      ctx.lineTo(widthBy2, heightBy2);
      ctx.closePath();
      
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.stroke();
      }
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity of this instance
     */
    complexity: function() {
      return 1;
    }
  });
  
  /**
   * Returns fabric.Triangle instance from an object representation
   * @static
   * @method Canvas.Trangle.fromObject
   * @param object {Object} object to create an instance from
   * @return {Object} instance of Canvas.Triangle
   */
  fabric.Triangle.fromObject = function(object) {
    return new fabric.Triangle(object);
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global){
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      piBy2   = Math.PI * 2,
      extend = fabric.util.object.extend;
  
  if (fabric.Ellipse) {
    fabric.warn('fabric.Ellipse is already defined.');
    return;
  }
  
  /** 
   * @class Ellipse
   * @extends fabric.Object
   */
  fabric.Ellipse = fabric.util.createClass(fabric.Object, /** @scope fabric.Ellipse.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'ellipse',
    
    /**
     * Constructor
     * @method initialize
     * @param {Object} [options] Options object
     * @return {Object} thisArg
     */
    initialize: function(options) {
      options = options || { };
      
      this.callSuper('initialize', options);
      
      this.set('rx', options.rx || 0);
      this.set('ry', options.ry || 0);
      
      this.set('width', this.get('rx') * 2);
      this.set('height', this.get('ry') * 2);
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        rx: this.get('rx'),
        ry: this.get('ry')
      });
    },
    
    /**
     * Renders this instance on a given context
     * @method render
     * @param ctx {CanvasRenderingContext2D} context to render on
     * @param noTransform {Boolean} context is not transformed when set to true
     */
    render: function(ctx, noTransform) {
      // do not use `get` for perf. reasons
      if (this.rx === 0 || this.ry === 0) return;
      return this.callSuper('render', ctx, noTransform);
    },
    
    /**
     * @private
     * @method _render
     * @param ctx {CanvasRenderingContext2D} context to render on
     */
    _render: function(ctx, noTransform) {
      ctx.beginPath();
      ctx.save();
      ctx.globalAlpha *= this.opacity;
      ctx.transform(1, 0, 0, this.ry/this.rx, 0, 0);
      ctx.arc(noTransform ? this.left : 0, noTransform ? this.top : 0, this.rx, 0, piBy2, false);
      if (this.stroke) {
        ctx.stroke();
      }
      if (this.fill) {
        ctx.fill();
      }
      ctx.restore();
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return 1;
    }
  });
  
  /**
   * List of attribute names to account for when parsing SVG element (used by {@link fabric.Ellipse.fromElement})
   * @static
   * @see http://www.w3.org/TR/SVG/shapes.html#EllipseElement
   */
  fabric.Ellipse.ATTRIBUTE_NAMES = 'cx cy rx ry fill fill-opacity opacity stroke stroke-width transform'.split(' ');
  
  /**
   * Returns {@link fabric.Ellipse} instance from an SVG element
   * @static
   * @method fabric.Ellipse.fromElement
   * @param {SVGElement} element Element to parse
   * @param {Object} [options] Options object
   * @return {fabric.Ellipse}
   */
  fabric.Ellipse.fromElement = function(element, options) {
    options || (options = { });
    var parsedAttributes = fabric.parseAttributes(element, fabric.Ellipse.ATTRIBUTE_NAMES);
    if ('left' in parsedAttributes) {
      parsedAttributes.left -= (options.width / 2) || 0;
    }
    if ('top' in parsedAttributes) {
      parsedAttributes.top -= (options.height / 2) || 0;
    }
    return new fabric.Ellipse(extend(parsedAttributes, options));
  };
  
  /**
   * Returns fabric.Ellipse instance from an object representation
   * @static
   * @method fabric.Ellipse.fromObject
   * @param {Object} object Object to create an instance from
   * @return {fabric.Ellipse}
   */
  fabric.Ellipse.fromObject = function(object) {
    return new fabric.Ellipse(object);
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { });
  
  if (fabric.Rect) {
    console.warn('fabric.Rect is already defined');
    return;
  }
  
  /** 
   * @class Rect
   * @extends fabric.Object
   */
  fabric.Rect = fabric.util.createClass(fabric.Object, /** @scope fabric.Rect.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'rect',
    
    /**
     * @property
     * @type Object
     */
    options: {
      rx: 0,
      ry: 0
    },
    
    /**
     * Constructor
     * @method initialize
     * @param options {Object} options object
     * @return {Object} thisArg
     */
    initialize: function(options) {
      this._initStateProperties();
      this.callSuper('initialize', options);
      this._initRxRy();
    },
    
    /**
     * Creates `stateProperties` list on an instance, and adds `fabric.Rect` -specific ones to it 
     * (such as "rx", "ry", etc.)
     * @private
     * @method _initStateProperties
     */
    _initStateProperties: function() {
      this.stateProperties = this.stateProperties.concat(['rx', 'ry']);
    },
    
    /**
     * @private
     * @method _initRxRy
     */
    _initRxRy: function() {
      if (this.rx &amp;&amp; !this.ry) {
        this.ry = this.rx;
      }
      else if (this.ry &amp;&amp; !this.rx) {
        this.rx = this.ry;
      }
    },
    
    /**
     * @private
     * @method _render
     * @param ctx {CanvasRenderingContext2D} context to render on
     */
    _render: function(ctx) {   
      var rx = this.rx || 0,
          ry = this.ry || 0,
          x = -this.width / 2,
          y = -this.height / 2,
          w = this.width,
          h = this.height;
      
      ctx.beginPath();
      ctx.globalAlpha *= this.opacity;
      
      if (this.group) {
        ctx.translate(this.x, this.y);
      }
      
      ctx.moveTo(x+rx, y);
      ctx.lineTo(x+w-rx, y);
      ctx.bezierCurveTo(x+w, y, x+w, y+ry, x+w, y+ry);
      ctx.lineTo(x+w, y+h-ry);
      ctx.bezierCurveTo(x+w,y+h,x+w-rx,y+h,x+w-rx,y+h);
      ctx.lineTo(x+rx,y+h);
      ctx.bezierCurveTo(x,y+h,x,y+h-ry,x,y+h-ry);
      ctx.lineTo(x,y+ry);
      ctx.bezierCurveTo(x,y,x+rx,y,x+rx,y);
      ctx.closePath();
      
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.stroke();
      }
    },
    
    // since our coordinate system differs from that of SVG
    _normalizeLeftTopProperties: function(parsedAttributes) {
      if (parsedAttributes.left) {
        this.set('left', parsedAttributes.left + this.getWidth() / 2);
      }
      this.set('x', parsedAttributes.left || 0);
      if (parsedAttributes.top) {
        this.set('top', parsedAttributes.top + this.getHeight() / 2);
      }
      this.set('y', parsedAttributes.top || 0);
      return this;
    },
    
    /**
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return 1;
    }
  });
  
  // TODO (kangax): implement rounded rectangles (both parsing and rendering)
  
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Rect.fromElement`)
   * @static
   */
  fabric.Rect.ATTRIBUTE_NAMES = 'x y width height rx ry fill fill-opacity opacity stroke stroke-width transform'.split(' ');
  
  /**
   * @private
   */
  function _setDefaultLeftTopValues(attributes) {
    attributes.left = attributes.left || 0;
    attributes.top  = attributes.top  || 0;
    return attributes;
  }
  
  /**
   * Returns fabric.Rect instance from an SVG element
   * @static
   * @method fabric.Rect.fromElement
   * @param element {SVGElement} element to parse
   * @param options {Object} options object
   * @return {fabric.Rect} instance of fabric.Rect
   */
  fabric.Rect.fromElement = function(element, options) {
    if (!element) {
      return null;
    }
    
    var parsedAttributes = fabric.parseAttributes(element, fabric.Rect.ATTRIBUTE_NAMES);
    parsedAttributes = _setDefaultLeftTopValues(parsedAttributes);
    
    var rect = new fabric.Rect(fabric.util.object.extend((options ? fabric.util.object.clone(options) : { }), parsedAttributes));
    rect._normalizeLeftTopProperties(parsedAttributes);
    
    return rect;
  };
  
  /**
   * Returns fabric.Rect instance from an object representation
   * @static
   * @method fabric.Rect.fromObject
   * @param object {Object} object to create an instance from
   * @return {Object} instance of fabric.Rect
   */
  fabric.Rect.fromObject = function(object) {
    return new fabric.Rect(object);
  };
  
})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { });
  
  if (fabric.Polyline) {
    fabric.warn('fabric.Polyline is already defined');
    return;
  }
  
  /** 
   * @class Polyline
   * @extends fabric.Object
   */
  fabric.Polyline = fabric.util.createClass(fabric.Object, /** @scope fabric.Polyline.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'polyline',
    
    /**
     * Constructor
     * @method initialize
     * @param {Array} points array of points
     * @param {Object} [options] Options object
     * @return {Object} thisArg
     */
    initialize: function(points, options) {
      options = options || { };
      this.set('points', points);
      this.callSuper('initialize', options);
      this._calcDimensions();
    },
    
    /**
     * @private
     * @method _calcDimensions
     */
    _calcDimensions: function() {
      return fabric.Polygon.prototype._calcDimensions.call(this);
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} Object representation of an instance
     */
    toObject: function() {
      return fabric.Polygon.prototype.toObject.call(this);
    },
    
    /**
     * @private
     * @method _render
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      var point;
      ctx.beginPath();
      for (var i = 0, len = this.points.length; i &lt; len; i++) {
        point = this.points[i];
        ctx.lineTo(point.x, point.y);
      }
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.stroke();
      }
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return this.get('points').length;
    }
  });
  
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Polyline.fromElement`)
   * @static
   * @see: http://www.w3.org/TR/SVG/shapes.html#PolylineElement
   */
  fabric.Polyline.ATTRIBUTE_NAMES = 'fill fill-opacity opacity stroke stroke-width transform'.split(' ');
  
  /**
   * Returns fabric.Polyline instance from an SVG element
   * @static
   * @method fabric.Polyline.fromElement
   * @param {SVGElement} element Element to parse
   * @param {Object} [options] Options object
   * @return {Object} instance of fabric.Polyline
   */
  fabric.Polyline.fromElement = function(element, options) {
    if (!element) {
      return null;
    }
    options || (options = { });
    
    var points = fabric.parsePointsAttribute(element.getAttribute('points')),
        parsedAttributes = fabric.parseAttributes(element, fabric.Polyline.ATTRIBUTE_NAMES);
    
    for (var i = 0, len = points.length; i &lt; len; i++) {
      // normalize coordinates, according to containing box (dimensions of which are passed via `options`)
      points[i].x -= (options.width / 2) || 0;
      points[i].y -= (options.height / 2) || 0;
    }
            
    return new fabric.Polyline(points, fabric.util.object.extend(parsedAttributes, options));
  };
  
  /**
   * Returns fabric.Polyline instance from an object representation
   * @static
   * @method fabric.Polyline.fromObject
   * @param {Object} [object] Object to create an instance from
   * @return {fabric.Polyline}
   */
  fabric.Polyline.fromObject = function(object) {
    var points = object.points;
    return new fabric.Polyline(points, object);
  };
  
})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      min = fabric.util.array.min,
      max = fabric.util.array.max;
  
  if (fabric.Polygon) {
    fabric.warn('fabric.Polygon is already defined');
    return;
  }
  
  function byX(p) { return p.x; }
  function byY(p) { return p.y; }
  
  /** 
   * @class Polygon
   * @extends fabric.Object
   */
  fabric.Polygon = fabric.util.createClass(fabric.Object, /** @scope fabric.Polygon.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'polygon',
    
    /**
     * Constructor
     * @method initialize
     * @param {Array} points Array of points
     * @param {Object} options Options object
     * @return {fabric.Polygon} thisArg
     */
    initialize: function(points, options) {
      options = options || { };
      this.points = points;
      this.callSuper('initialize', options);
      this._calcDimensions();
    },
    
    /**
     * @private
     * @method _calcDimensions
     */
    _calcDimensions: function() {
      
      var points = this.points,
          minX = min(points, 'x'),
          minY = min(points, 'y'),
          maxX = max(points, 'x'),
          maxY = max(points, 'y');
      
      this.width = maxX - minX;
      this.height = maxY - minY;
      this.minX = minX;
      this.minY = minY;
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        points: this.points.concat()
      });
    },
    
    /**
     * @private
     * @method _render
     * @param ctx {CanvasRenderingContext2D} context to render on
     */
    _render: function(ctx) {
      var point;
      ctx.beginPath();
      for (var i = 0, len = this.points.length; i &lt; len; i++) {
        point = this.points[i];
        ctx.lineTo(point.x, point.y);
      }
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.closePath();
        ctx.stroke();
      }
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity of this instance
     */
    complexity: function() {
      return this.points.length;
    }
  });
  
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Polygon.fromElement`)
   * @static
   * @see: http://www.w3.org/TR/SVG/shapes.html#PolygonElement
   */
  fabric.Polygon.ATTRIBUTE_NAMES = 'fill fill-opacity opacity stroke stroke-width transform'.split(' ');
  
  /**
   * Returns fabric.Polygon instance from an SVG element
   * @static
   * @method fabric.Polygon.fromElement
   * @param {SVGElement} element Element to parse
   * @param {Object} options Options object
   * @return {fabric.Polygon}
   */
  fabric.Polygon.fromElement = function(element, options) {
    if (!element) {
      return null;
    }
    options || (options = { });
    
    var points = fabric.parsePointsAttribute(element.getAttribute('points')),
        parsedAttributes = fabric.parseAttributes(element, fabric.Polygon.ATTRIBUTE_NAMES);
    
    for (var i = 0, len = points.length; i &lt; len; i++) {
      // normalize coordinates, according to containing box (dimensions of which are passed via `options`)
      points[i].x -= (options.width / 2) || 0;
      points[i].y -= (options.height / 2) || 0;
    }
        
    return new fabric.Polygon(points, extend(parsedAttributes, options));
  };
  
  /**
   * Returns fabric.Polygon instance from an object representation
   * @static
   * @method fabric.Polygon.fromObject
   * @param {Object} object Object to create an instance from
   * @return {fabric.Polygon}
   */
  fabric.Polygon.fromObject = function(object) {
    return new fabric.Polygon(object.points, object);
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  var commandLengths = {
    m: 2,
    l: 2,
    h: 1,
    v: 1,
    c: 6,
    s: 4,
    q: 4,
    t: 2,
    a: 7
  };
  
  function drawArc(ctx, x, y, coords) {
    var rx = coords[0];
    var ry = coords[1];
    var rot = coords[2];
    var large = coords[3];
    var sweep = coords[4];
    var ex = coords[5];
    var ey = coords[6];
    var segs = arcToSegments(ex, ey, rx, ry, large, sweep, rot, x, y);
    for (var i=0; i&lt;segs.length; i++) {
     var bez = segmentToBezier.apply(this, segs[i]);
     ctx.bezierCurveTo.apply(ctx, bez);
    }
  }
  
  var arcToSegmentsCache = { }, 
      segmentToBezierCache = { }, 
      _join = Array.prototype.join, 
      argsString;
  
  // Copied from Inkscape svgtopdf, thanks!
  function arcToSegments(x, y, rx, ry, large, sweep, rotateX, ox, oy) {
    argsString = _join.call(arguments);
    if (arcToSegmentsCache[argsString]) {
      return arcToSegmentsCache[argsString];
    }
    
    var th = rotateX * (Math.PI/180);
    var sin_th = Math.sin(th);
    var cos_th = Math.cos(th);
    rx = Math.abs(rx);
    ry = Math.abs(ry);
    var px = cos_th * (ox - x) * 0.5 + sin_th * (oy - y) * 0.5;
    var py = cos_th * (oy - y) * 0.5 - sin_th * (ox - x) * 0.5;
    var pl = (px*px) / (rx*rx) + (py*py) / (ry*ry);
    if (pl &gt; 1) {
      pl = Math.sqrt(pl);
      rx *= pl;
      ry *= pl;
    }

    var a00 = cos_th / rx;
    var a01 = sin_th / rx;
    var a10 = (-sin_th) / ry;
    var a11 = (cos_th) / ry;
    var x0 = a00 * ox + a01 * oy;
    var y0 = a10 * ox + a11 * oy;
    var x1 = a00 * x + a01 * y;
    var y1 = a10 * x + a11 * y;

    var d = (x1-x0) * (x1-x0) + (y1-y0) * (y1-y0);
    var sfactor_sq = 1 / d - 0.25;
    if (sfactor_sq &lt; 0) sfactor_sq = 0;
    var sfactor = Math.sqrt(sfactor_sq);
    if (sweep == large) sfactor = -sfactor;
    var xc = 0.5 * (x0 + x1) - sfactor * (y1-y0);
    var yc = 0.5 * (y0 + y1) + sfactor * (x1-x0);

    var th0 = Math.atan2(y0-yc, x0-xc);
    var th1 = Math.atan2(y1-yc, x1-xc);

    var th_arc = th1-th0;
    if (th_arc &lt; 0 &amp;&amp; sweep == 1){
      th_arc += 2*Math.PI;
    } else if (th_arc &gt; 0 &amp;&amp; sweep == 0) {
      th_arc -= 2 * Math.PI;
    }

    var segments = Math.ceil(Math.abs(th_arc / (Math.PI * 0.5 + 0.001)));
    var result = [];
    for (var i=0; i&lt;segments; i++) {
      var th2 = th0 + i * th_arc / segments;
      var th3 = th0 + (i+1) * th_arc / segments;
      result[i] = [xc, yc, th2, th3, rx, ry, sin_th, cos_th];
    }

    return (arcToSegmentsCache[argsString] = result);
  }

  function segmentToBezier(cx, cy, th0, th1, rx, ry, sin_th, cos_th) {
    argsString = _join.call(arguments);
    if (segmentToBezierCache[argsString]) {
      return segmentToBezierCache[argsString];
    }
    
    var a00 = cos_th * rx;
    var a01 = -sin_th * ry;
    var a10 = sin_th * rx;
    var a11 = cos_th * ry;

    var th_half = 0.5 * (th1 - th0);
    var t = (8/3) * Math.sin(th_half * 0.5) * Math.sin(th_half * 0.5) / Math.sin(th_half);
    var x1 = cx + Math.cos(th0) - t * Math.sin(th0);
    var y1 = cy + Math.sin(th0) + t * Math.cos(th0);
    var x3 = cx + Math.cos(th1);
    var y3 = cy + Math.sin(th1);
    var x2 = x3 + t * Math.sin(th1);
    var y2 = y3 - t * Math.cos(th1);
    
    return (segmentToBezierCache[argsString] = [
      a00 * x1 + a01 * y1,      a10 * x1 + a11 * y1,
      a00 * x2 + a01 * y2,      a10 * x2 + a11 * y2,
      a00 * x3 + a01 * y3,      a10 * x3 + a11 * y3
    ]);
  }
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      min = fabric.util.array.min,
      max = fabric.util.array.max,
      extend = fabric.util.object.extend,
      _toString = Object.prototype.toString;
  
  if (fabric.Path) {
    fabric.warn('fabric.Path is already defined');
    return;
  }
  if (!fabric.Object) {
    fabric.warn('fabric.Path requires fabric.Object');
    return;
  }
  
  /**
   * @private
   */
  function getX(item) {
    if (item[0] === 'H') {
      return item[1];
    }
    return item[item.length - 2];
  }
  
  /**
   * @private
   */
  function getY(item) {
    if (item[0] === 'V') {
      return item[1];
    }
    return item[item.length - 1];
  }
  
  /** 
   * @class Path
   * @extends fabric.Object
   */
  fabric.Path = fabric.util.createClass(fabric.Object, /** @scope fabric.Path.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'path',
    
    /**
     * Constructor
     * @method initialize
     * @param {Array|String} path Path data (sequence of coordinates and corresponding "command" tokens)
     * @param {Object} [options] Options object
     */
    initialize: function(path, options) {
      options = options || { };
      
      this.setOptions(options);
      
      if (!path) {
        throw Error('`path` argument is required');
      }
      
      var fromArray = _toString.call(path) === '[object Array]';
      
      this.path = fromArray
        ? path
        : path.match &amp;&amp; path.match(/[a-zA-Z][^a-zA-Z]*/g);
        
      if (!this.path) return;
      
      // TODO (kangax): rewrite this idiocracy
      if (!fromArray) {
        this._initializeFromArray(options);
      }
      
      if (options.sourcePath) {
        this.setSourcePath(options.sourcePath);
      }
    },
    
    /**
     * @private
     * @method _initializeFromArray
     */
    _initializeFromArray: function(options) {
      var isWidthSet = 'width' in options,
          isHeightSet = 'height' in options;
          
      this.path = this._parsePath();
      
      if (!isWidthSet || !isHeightSet) {
        extend(this, this._parseDimensions());
        if (isWidthSet) {
          this.width = options.width;
        }
        if (isHeightSet) {
          this.height = options.height;
        }
      }
    },
    
    /**
     * @private
     * @method _render
     */
    _render: function(ctx) {
      var current, // current instruction 
          x = 0, // current x 
          y = 0, // current y
          controlX = 0, // current control point x
          controlY = 0, // current control point y
          tempX, 
          tempY,
          l = -(this.width / 2),
          t = -(this.height / 2);
          
      for (var i = 0, len = this.path.length; i &lt; len; ++i) {
        
        current = this.path[i];
        
        switch (current[0]) { // first letter
          
          case 'l': // lineto, relative
            x += current[1];
            y += current[2];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'L': // lineto, absolute
            x = current[1];
            y = current[2];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'h': // horizontal lineto, relative
            x += current[1];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'H': // horizontal lineto, absolute
            x = current[1];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'v': // vertical lineto, relative
            y += current[1];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'V': // verical lineto, absolute
            y = current[1];
            ctx.lineTo(x + l, y + t);
            break;
            
          case 'm': // moveTo, relative
            x += current[1];
            y += current[2];
            ctx.moveTo(x + l, y + t);
            break;
          
          case 'M': // moveTo, absolute
            x = current[1];
            y = current[2];
            ctx.moveTo(x + l, y + t);
            break;
            
          case 'c': // bezierCurveTo, relative
            tempX = x + current[5];
            tempY = y + current[6];
            controlX = x + current[3];
            controlY = y + current[4];
            ctx.bezierCurveTo(
              x + current[1] + l, // x1
              y + current[2] + t, // y1
              controlX + l, // x2
              controlY + t, // y2
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;
            
          case 'C': // bezierCurveTo, absolute
            x = current[5];
            y = current[6];
            controlX = current[3];
            controlY = current[4];
            ctx.bezierCurveTo(
              current[1] + l, 
              current[2] + t, 
              controlX + l, 
              controlY + t, 
              x + l, 
              y + t
            );
            break;
          
          case 's': // shorthand cubic bezierCurveTo, relative
            // transform to absolute x,y
            tempX = x + current[3];
            tempY = y + current[4];
            // calculate reflection of previous control points            
            controlX = 2 * x - controlX;
            controlY = 2 * y - controlY;
            ctx.bezierCurveTo(
              controlX + l,
              controlY + t,
              x + current[1] + l,
              y + current[2] + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;
            
          case 'S': // shorthand cubic bezierCurveTo, absolute
            tempX = current[3];
            tempY = current[4];
            // calculate reflection of previous control points            
            controlX = 2*x - controlX;
            controlY = 2*y - controlY;
            ctx.bezierCurveTo(
              controlX + l,
              controlY + t,
              current[1] + l,
              current[2] + t,
              tempX + l,
              tempY + t
            );
            x = tempX;
            y = tempY;
            break;
            
          case 'q': // quadraticCurveTo, relative
            x += current[3];
            y += current[4];
            ctx.quadraticCurveTo(
              current[1] + l, 
              current[2] + t, 
              x + l, 
              y + t
            );
            break;
            
          case 'Q': // quadraticCurveTo, absolute
            x = current[3];
            y = current[4];
            controlX = current[1];
            controlY = current[2];
            ctx.quadraticCurveTo(
              controlX + l,
              controlY + t,
              x + l,
              y + t
            );
            break;
          
          case 'T':
            tempX = x;
            tempY = y;
            x = current[1];
            y = current[2];
            // calculate reflection of previous control points
            controlX = -controlX + 2 * tempX;
            controlY = -controlY + 2 * tempY;
            ctx.quadraticCurveTo(
              controlX + l,
              controlY + t,
              x + l, 
              y + t
            );
            break;
            
          case 'a':
            // TODO: optimize this
            drawArc(ctx, x + l, y + t, [ 
              current[1], 
              current[2], 
              current[3], 
              current[4], 
              current[5], 
              current[6] + x + l,
              current[7] + y + t
            ]);
            x += current[6];
            y += current[7];
            break;
          
          case 'A':
            // TODO: optimize this
            drawArc(ctx, x + l, y + t, [ 
              current[1], 
              current[2], 
              current[3], 
              current[4], 
              current[5], 
              current[6] + l,
              current[7] + t
            ]);
            x = current[6];
            y = current[7];
            break;
          
          case 'z':
          case 'Z':
            ctx.closePath();
            break;
        }
      }
    },
    
    /**
     * Renders path on a specified context 
     * @method render
     * @param {CanvasRenderingContext2D} ctx context to render path on
     * @param {Boolean} noTransform When true, context is not transformed
     */
    render: function(ctx, noTransform) {
      ctx.save();
      var m = this.transformMatrix;
      if (m) {
        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
      }
      if (!noTransform) {
        this.transform(ctx);
      }
      // ctx.globalCompositeOperation = this.fillRule;

      if (this.overlayFill) {
        ctx.fillStyle = this.overlayFill;
      }
      else if (this.fill) {
        ctx.fillStyle = this.fill;
      }
      
      if (this.stroke) {
        ctx.strokeStyle = this.stroke;
      }
      ctx.beginPath();
      
      this._render(ctx);
      
      if (this.fill) {
        ctx.fill();
      }
      if (this.stroke) {
        ctx.strokeStyle = this.stroke;
        ctx.lineWidth = this.strokeWidth;
        ctx.lineCap = ctx.lineJoin = 'round';
        ctx.stroke();
      }
      if (!noTransform &amp;&amp; this.active) {
        this.drawBorders(ctx);
        this.hideCorners || this.drawCorners(ctx);
      }
      ctx.restore();
    },
    
    /**
     * Returns string representation of an instance
     * @method toString
     * @return {String} string representation of an instance
     */
    toString: function() {
      return '#&lt;fabric.Path (' + this.complexity() + 
        '): { "top": ' + this.top + ', "left": ' + this.left + ' }&gt;';
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object}
     */
    toObject: function() {
      var o = extend(this.callSuper('toObject'), {
        path: this.path
      });
      if (this.sourcePath) {
        o.sourcePath = this.sourcePath;
      }
      if (this.transformMatrix) {
        o.transformMatrix = this.transformMatrix;
      }
      return o;
    },
    
    /**
     * Returns dataless object representation of an instance
     * @method toDatalessObject
     * @return {Object}
     */
    toDatalessObject: function() {
      var o = this.toObject();
      if (this.sourcePath) {
        o.path = this.sourcePath;
      }
      delete o.sourcePath;
      return o;
    },
    
    /**
     * Returns number representation of an instance complexity
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return this.path.length;
    },
    
    /**
     * @private
     * @method _parsePath
     */
    _parsePath: function() {
      var result = [ ],
          currentPath, 
          chunks,
          parsed;

      for (var i = 0, j, chunksParsed, len = this.path.length; i &lt; len; i++) {
        currentPath = this.path[i];
        chunks = currentPath.slice(1).trim().replace(/(\d)-/g, '$1###-').split(/\s|,|###/);
        chunksParsed = [ currentPath.charAt(0) ];

        for (var j = 0, jlen = chunks.length; j &lt; jlen; j++) {
          parsed = parseFloat(chunks[j]);
          if (!isNaN(parsed)) {
            chunksParsed.push(parsed);
          }
        }

        var command = chunksParsed[0].toLowerCase(),
            commandLength = commandLengths[command];
            
        if (chunksParsed.length - 1 &gt; commandLength) {
          for (var k = 1, klen = chunksParsed.length; k &lt; klen; k += commandLength) {
            result.push([command].concat(chunksParsed.slice(k, k + commandLength)));
          }
        }
        else {
          result.push(chunksParsed);
        }
      }
      
      return result;
    },
    
    /**
     * @method _parseDimensions
     */
    _parseDimensions: function() {
      var aX = [], 
          aY = [], 
          previousX, 
          previousY, 
          isLowerCase = false, 
          x, 
          y;
      
      this.path.forEach(function(item, i) {
        if (item[0] !== 'H') {
          previousX = (i === 0) ? getX(item) : getX(this.path[i-1]);
        }
        if (item[0] !== 'V') {
          previousY = (i === 0) ? getY(item) : getY(this.path[i-1]);
        }
        
        // lowercased letter denotes relative position; 
        // transform to absolute
        if (item[0] === item[0].toLowerCase()) {
          isLowerCase = true;
        }
        
        // last 2 items in an array of coordinates are the actualy x/y (except H/V);
        // collect them
        
        // TODO (kangax): support relative h/v commands
            
        x = isLowerCase
          ? previousX + getX(item)
          : item[0] === 'V' 
            ? previousX 
            : getX(item);
            
        y = isLowerCase
          ? previousY + getY(item)
          : item[0] === 'H' 
            ? previousY 
            : getY(item);
        
        var val = parseInt(x, 10);
        if (!isNaN(val)) aX.push(val);
        
        val = parseInt(y, 10);
        if (!isNaN(val)) aY.push(val);
        
      }, this);
      
      var minX = min(aX), 
          minY = min(aY), 
          deltaX = 0,
          deltaY = 0;
      
      var o = {
        top: minY - deltaY,
        left: minX - deltaX,
        bottom: max(aY) - deltaY,
        right: max(aX) - deltaX
      };
      
      o.width = o.right - o.left;
      o.height = o.bottom - o.top;
      
      return o;
    }
  });
  
  /**
   * Creates an instance of fabric.Path from an object
   * @static
   * @method fabric.Path.fromObject
   * @return {fabric.Path} Instance of fabric.Path
   */
  fabric.Path.fromObject = function(object) {
    return new fabric.Path(object.path, object);
  };
  
  /**
   * List of attribute names to account for when parsing SVG element (used by `fabric.Path.fromElement`)
   * @static
   * @see http://www.w3.org/TR/SVG/paths.html#PathElement
   */
  fabric.Path.ATTRIBUTE_NAMES = 'd fill fill-opacity opacity fill-rule stroke stroke-width transform'.split(' ');
  
  /**
   * Creates an instance of fabric.Path from an SVG &lt;path&gt; element
   * @static
   * @method fabric.Path.fromElement
   * @param {SVGElement} element to parse
   * @param {Object} options object
   * @return {fabric.Path} Instance of fabric.Path
   */
  fabric.Path.fromElement = function(element, options) {
    var parsedAttributes = fabric.parseAttributes(element, fabric.Path.ATTRIBUTE_NAMES);
    return new fabric.Path(parsedAttributes.d, extend(parsedAttributes, options));
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "path.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      invoke = fabric.util.array.invoke,
      parentSet = fabric.Object.prototype.set,
      parentToObject = fabric.Object.prototype.toObject,
      camelize = fabric.util.string.camelize,
      capitalize = fabric.util.string.capitalize;
  
  if (fabric.PathGroup) {
    fabric.warn('fabric.PathGroup is already defined');
    return;
  }
  
  /** 
   * @class PathGroup
   * @extends fabric.Path
   */
  fabric.PathGroup = fabric.util.createClass(fabric.Path, /** @scope fabric.PathGroup.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'path-group',
    
    /**
     * @property
     * @type Boolean
     */
    forceFillOverwrite: false,
    
    /**
     * Constructor
     * @method initialize
     * @param {Array} paths
     * @param {Object} [options] Options object
     * @return {fabric.PathGroup} thisArg
     */
    initialize: function(paths, options) {
      
      options = options || { };
      this.paths = paths;
      
      for (var i = this.paths.length; i--; ) {
        this.paths[i].group = this;
      }
      
      this.setOptions(options);
      this.setCoords();
      
      if (options.sourcePath) {
        this.setSourcePath(options.sourcePath);
      }
    },
    
    /**
     * @private
     * @method _initProperties
     */
    // _initProperties: function() {
    //       this.stateProperties.forEach(function(prop) {
    //         if (prop === 'fill') {
    //           this.set(prop, this.options[prop]);
    //         }
    //         else if (prop === 'angle') {
    //           this.setAngle(this.options[prop]);
    //         }
    //         else {
    //           this[prop] = this.options[prop];
    //         }
    //       }, this);
    //     },
    
    /**
     * Renders this group on a specified context
     * @method render
     * @param {CanvasRenderingContext2D} ctx Context to render this instance on
     */
    render: function(ctx) {
      if (this.stub) {
        // fast-path, rendering image stub
        ctx.save();
        
        this.transform(ctx);
        this.stub.render(ctx, false /* no transform */);
        if (this.active) {
          this.drawBorders(ctx);
          this.drawCorners(ctx);
        }
        ctx.restore();
      }
      else {
        ctx.save();
        
        var m = this.transformMatrix;
        if (m) {
          ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
        }
        
        this.transform(ctx);
        for (var i = 0, l = this.paths.length; i &lt; l; ++i) {
          this.paths[i].render(ctx, true);
        }
        if (this.active) {
          this.drawBorders(ctx);
          this.hideCorners || this.drawCorners(ctx);
        }
        ctx.restore();
      }
    },
    
    /**
     * Sets certain property to a certain value
     * @method set
     * @param {String} prop
     * @param {Any} value
     * @return {fabric.PathGroup} thisArg
     */
    set: function(prop, value) {
      if ((prop === 'fill' || prop === 'overlayFill') &amp;&amp; this.isSameColor()) {
        this[prop] = value;
        var i = this.paths.length;
        while (i--) {
          this.paths[i].set(prop, value);
        }
      }
      else {
        // skipping parent "class" - fabric.Path
        parentSet.call(this, prop, value);
      }
      return this;
    },
    
    /**
     * Returns object representation of this path group
     * @method toObject
     * @return {Object} object representation of an instance
     */
    toObject: function() {
      return extend(parentToObject.call(this), {
        paths: invoke(this.getObjects(), 'clone'),
        sourcePath: this.sourcePath
      });
    },
    
    /**
     * Returns dataless object representation of this path group
     * @method toDatalessObject
     * @return {Object} dataless object representation of an instance
     */
    toDatalessObject: function() {
      var o = this.toObject();
      if (this.sourcePath) {
        o.paths = this.sourcePath;
      }
      return o;
    },
    
     /**
      * Returns a string representation of this path group
      * @method toString
      * @return {String} string representation of an object
      */
    toString: function() {
      return '#&lt;fabric.PathGroup (' + this.complexity() + 
        '): { top: ' + this.top + ', left: ' + this.left + ' }&gt;';
    },
    
    /**
     * Returns true if all paths in this group are of same color
     * @method isSameColor
     * @return {Boolean} true if all paths are of the same color (`fill`)
     */
    isSameColor: function() {
      var firstPathFill = this.getObjects()[0].get('fill');
      return this.getObjects().every(function(path) {
        return path.get('fill') === firstPathFill;
      });
    },
    
    /**
      * Returns number representation of object's complexity
      * @method complexity
      * @return {Number} complexity
      */
    complexity: function() {
      return this.paths.reduce(function(total, path) {
        return total + ((path &amp;&amp; path.complexity) ? path.complexity() : 0);
      }, 0);
    },
    
    /**
      * Makes path group grayscale
      * @method toGrayscale
      * @return {fabric.PathGroup} thisArg
      */
    toGrayscale: function() {
      var i = this.paths.length;
      while (i--) {
        this.paths[i].toGrayscale();
      }
      return this;
    },
    
    /**
     * Returns all paths in this path group
     * @method getObjects
     * @return {Array} array of path objects included in this path group
     */
    getObjects: function() {
      return this.paths;
    }
  });
  
  /**
   * @private
   * @method instantiatePaths
   */
  function instantiatePaths(paths) {
    for (var i = 0, len = paths.length; i &lt; len; i++) {
      if (!(paths[i] instanceof fabric.Object)) {
        var klassName = camelize(capitalize(paths[i].type));
        paths[i] = fabric[klassName].fromObject(paths[i]);
      }
    }
    return paths;
  }
  
  /**
   * Creates fabric.Triangle instance from an object representation
   * @static
   * @method fabric.PathGroup.fromObject
   * @param {Object} object
   * @return {fabric.PathGroup}
   */
  fabric.PathGroup.fromObject = function(object) {
    var paths = instantiatePaths(object.paths);
    return new fabric.PathGroup(paths, object);
  };

})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global){
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      min = fabric.util.array.min,
      max = fabric.util.array.max,
      invoke = fabric.util.array.invoke,
      removeFromArray = fabric.util.removeFromArray;
      
  if (fabric.Group) {
    return;
  }
  
  /** 
   * @class Group
   * @extends fabric.Object
   */
  fabric.Group = fabric.util.createClass(fabric.Object, /** @scope fabric.Group.prototype */ {
    
    /**
     * @property
     * @type String
     */
    type: 'group',
    
    /**
     * Constructor
     * @method initialized
     * @param {Object} objects Group objects
     * @param {Object} [options] Options object
     * @return {Object} thisArg
     */
    initialize: function(objects, options) {
      this.objects = objects || [];
      this.originalState = { };
      
      this.callSuper('initialize');
      
      this._calcBounds();
      this._updateObjectsCoords();
      
      if (options) {
        extend(this, options);
      }
      this._setOpacityIfSame();
      
      // group is active by default
      this.setCoords(true);
      this.saveCoords();
      
      this.activateAllObjects();
    },
    
    /**
     * @private
     * @method _updateObjectsCoords
     */
    _updateObjectsCoords: function() {
      var groupDeltaX = this.left,
          groupDeltaY = this.top;
      
      this.forEachObject(function(object) {
        
        var objectLeft = object.get('left'),
            objectTop = object.get('top');
        
        object.set('originalLeft', objectLeft);
        object.set('originalTop', objectTop);
        
        object.set('left', objectLeft - groupDeltaX);
        object.set('top', objectTop - groupDeltaY);
        
        object.setCoords();
        
        // do not display corners of objects enclosed in a group
        object.hideCorners = true;
      }, this);
    },
    
    /**
     * Returns string represenation of a group
     * @method toString
     * @return {String}
     */
    toString: function() {
      return '#&lt;fabric.Group: (' + this.complexity() + ')&gt;';
    },
    
    /**
     * Returns an array of all objects in this group
     * @method getObjects
     * @return {Array} group objects
     */
    getObjects: function() {
      return this.objects;
    },
    
    /**
     * Adds an object to a group; Then recalculates group's dimension, position.
     * @method add
     * @param {Object} object
     * @return {fabric.Group} thisArg
     * @chainable
     */
    add: function(object) {
      this._restoreObjectsState();
      this.objects.push(object);
      object.setActive(true);
      this._calcBounds();
      this._updateObjectsCoords();
      return this;
    },
    
    /**
     * Removes an object from a group; Then recalculates group's dimension, position.
     * @param {Object} object
     * @return {fabric.Group} thisArg
     * @chainable
     */
    remove: function(object) {
      this._restoreObjectsState();
      removeFromArray(this.objects, object);
      object.setActive(false);
      this._calcBounds();
      this._updateObjectsCoords();
      return this;
    },
    
    /**
     * Returns a size of a group (i.e: length of an array containing its objects)
     * @return {Number} Group size
     */
    size: function() {
      return this.getObjects().length;
    },
  
    /**
     * Sets property to a given value
     * @method set
     * @param {String} name
     * @param {Object|Function} value
     * @return {fabric.Group} thisArg
     * @chainable
     */
    set: function(name, value) {
      if (typeof value == 'function') {
        // recurse
        this.set(name, value(this[name]));
      }
      else {
        if (name === 'fill' || name === 'opacity') {
          var i = this.objects.length;
          this[name] = value;
          while (i--) {
            this.objects[i].set(name, value);
          }
        }
        else {
          this[name] = value;
        }
      }
      return this;
    },
  
    /**
     * Returns true if a group contains an object
     * @method contains
     * @param {Object} object Object to check against
     * @return {Boolean} `true` if group contains an object
     */
    contains: function(object) {
      return this.objects.indexOf(object) &gt; -1;
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        objects: invoke(this.objects, 'clone')
      });
    },
    
    /**
     * Renders instance on a given context
     * @method render
     * @param {CanvasRenderingContext2D} ctx context to render instance on
     */
    render: function(ctx) {
      ctx.save();
      this.transform(ctx);
      
      var groupScaleFactor = Math.max(this.scaleX, this.scaleY);
      
      for (var i = 0, len = this.objects.length, object; object = this.objects[i]; i++) {
        var originalScaleFactor = object.borderScaleFactor;
        object.borderScaleFactor = groupScaleFactor;
        object.render(ctx);
        object.borderScaleFactor = originalScaleFactor;
      }
      this.hideBorders || this.drawBorders(ctx);
      this.hideCorners || this.drawCorners(ctx);
      ctx.restore();
      this.setCoords();
    },
    
    /**
     * Returns object from the group at the specified index
     * @method item
     * @param index {Number} index of item to get
     * @return {fabric.Object}
     */
    item: function(index) {
      return this.getObjects()[index];
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return this.getObjects().reduce(function(total, object) {
        total += (typeof object.complexity == 'function') ? object.complexity() : 0;
        return total;
      }, 0);
    },
    
    /**
     * Retores original state of each of group objects (original state is that which was before group was created).
     * @private
     * @method _restoreObjectsState
     * @return {fabric.Group} thisArg
     * @chainable
     */
    _restoreObjectsState: function() {
      this.objects.forEach(this._restoreObjectState, this);
      return this;
    },
    
    /**
     * Restores original state of a specified object in group
     * @private
     * @method _restoreObjectState
     * @param {fabric.Object} object
     * @return {fabric.Group} thisArg
     */
    _restoreObjectState: function(object) {
      
      var groupLeft = this.get('left'),
          groupTop = this.get('top'),
          groupAngle = this.getAngle() * (Math.PI / 180),
          objectLeft = object.get('originalLeft'),
          objectTop = object.get('originalTop'),
          rotatedTop = Math.cos(groupAngle) * object.get('top') + Math.sin(groupAngle) * object.get('left'),
          rotatedLeft = -Math.sin(groupAngle) * object.get('top') + Math.cos(groupAngle) * object.get('left');
      
      object.setAngle(object.getAngle() + this.getAngle());
      
      object.set('left', groupLeft + rotatedLeft * this.get('scaleX'));
      object.set('top', groupTop + rotatedTop * this.get('scaleY'));
      
      object.set('scaleX', object.get('scaleX') * this.get('scaleX'));
      object.set('scaleY', object.get('scaleY') * this.get('scaleY'));
      
      object.setCoords();
      object.hideCorners = false;
      object.setActive(false);
      object.setCoords();
      
      return this;
    },
    
    /**
     * Destroys a group (restoring state of its objects)
     * @method destroy
     * @return {fabric.Group} thisArg
     * @chainable
     */
    destroy: function() {
      return this._restoreObjectsState();
    },
    
    /**
     * Saves coordinates of this instance (to be used together with `hasMoved`)
     * @saveCoords
     * @return {fabric.Group} thisArg
     * @chainable
     */
    saveCoords: function() {
      this._originalLeft = this.get('left');
      this._originalTop = this.get('top');
      return this;
    },
    
    /**
     * Checks whether this group was moved (since `saveCoords` was called last)
     * @method hasMoved
     * @return {Boolean} true if an object was moved (since fabric.Group#saveCoords was called)
     */
    hasMoved: function() {
      return this._originalLeft !== this.get('left') ||
             this._originalTop !== this.get('top');
    },
    
    /**
     * Sets coordinates of all group objects
     * @method setObjectsCoords
     * @return {fabric.Group} thisArg
     * @chainable
     */
    setObjectsCoords: function() {
      this.forEachObject(function(object) {
        object.setCoords();
      });
      return this;
    },
    
    /**
     * Activates (makes active) all group objects
     * @method activateAllObjects
     * @return {fabric.Group} thisArg
     * @chainable
     */
    activateAllObjects: function() {
      return this.setActive(true);
    },
    
    /**
     * Activates (makes active) all group objects
     * @method setActive
     * @param {Boolean} value `true` to activate object, `false` otherwise
     * @return {fabric.Group} thisArg
     * @chainable
     */
    setActive: function(value) {
      this.forEachObject(function(object) {
        object.setActive(value);
      });
      return this;
    },
    
    /**
     * Executes given function for each object in this group
     * @method forEachObject
     * @param {Function} callback 
     *                   Callback invoked with current object as first argument, 
     *                   index - as second and an array of all objects - as third.
     *                   Iteration happens in reverse order (for performance reasons).
     *                   Callback is invoked in a context of Global Object (e.g. `window`) 
     *                   when no `context` argument is given
     *
     * @param {Object} context Context (aka thisObject)
     *
     * @return {fabric.Group} thisArg
     * @chainable
     */
    forEachObject: fabric.Canvas.prototype.forEachObject,
    
    /**
     * @private
     * @method _setOpacityIfSame
     */
    _setOpacityIfSame: function() {
      var objects = this.getObjects(),
          firstValue = objects[0] ? objects[0].get('opacity') : 1;
          
      var isSameOpacity = objects.every(function(o) {
        return o.get('opacity') === firstValue;
      });
      
      if (isSameOpacity) {
        this.opacity = firstValue;
      }
    },
    
    /**
     * @private
     * @method _calcBounds
     */
    _calcBounds: function() {
      var aX = [], 
          aY = [], 
          minX, minY, maxX, maxY, o, width, height, 
          i = 0,
          len = this.objects.length;

      for (; i &lt; len; ++i) {
        o = this.objects[i];
        o.setCoords();
        for (var prop in o.oCoords) {
          aX.push(o.oCoords[prop].x);
          aY.push(o.oCoords[prop].y);
        }
      };
      
      minX = min(aX);
      maxX = max(aX);
      minY = min(aY);
      maxY = max(aY);
      
      width = maxX - minX;
      height = maxY - minY;
      
      this.width = width;
      this.height = height;
      
      this.left = minX + width / 2;
      this.top = minY + height / 2;
    },
    
    /**
     * Checks if point is contained within the group
     * @method containsPoint
     * @param {fabric.Point} point point with `x` and `y` properties
     * @return {Boolean} true if point is contained within group
     */
    containsPoint: function(point) {
      
      var halfWidth = this.get('width') / 2,
          halfHeight = this.get('height') / 2,
          centerX = this.get('left'),
          centerY = this.get('top');
          
      return  centerX - halfWidth &lt; point.x &amp;&amp; 
              centerX + halfWidth &gt; point.x &amp;&amp;
              centerY - halfHeight &lt; point.y &amp;&amp;
              centerY + halfHeight &gt; point.y;
    },
    
    /**
     * Makes all of this group's objects grayscale (i.e. calling `toGrayscale` on them)
     * @method toGrayscale
     */
    toGrayscale: function() {
      var i = this.objects.length;
      while (i--) {
        this.objects[i].toGrayscale();
      }
    }
  });
  
  /**
   * Returns fabric.Group instance from an object representation
   * @static
   * @method fabric.Group.fromObject
   * @param object {Object} object to create a group from
   * @param options {Object} options object
   * @return {fabric.Group} an instance of fabric.Group
   */
  fabric.Group.fromObject = function(object) {
    return new fabric.Group(object.objects, object);
  };
  
})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var extend = fabric.util.object.extend;
  
  if (!global.fabric) {
    global.fabric = { };
  }
  
  if (global.fabric.Image) {
    fabric.warn('fabric.Image is already defined.');
    return;
  };
  
  if (!fabric.Object) {
    fabric.warn('fabric.Object is required for fabric.Image initialization');
    return;
  }
  
  /** 
   * @class Image
   * @extends fabric.Object
   */
  fabric.Image = fabric.util.createClass(fabric.Object, /** @scope fabric.Image.prototype */ {
    
    /**
     * @property
     * @type Number
     */
    maxwidth: null,
    
    /**
     * @property
     * @type Number
     */
    maxheight: null,
    
    /**
     * @property
     * @type Boolean
     */
    active: false,
    
    /**
     * @property
     * @type Boolean
     */
    bordervisibility: false,
    
    /**
     * @property
     * @type Boolean
     */
    cornervisibility: false,
    
    /**
     * @property
     * @type String
     */
    type: 'image',
    
    __isGrayscaled: false,
    
    /**
     * Constructor
     * @param {HTMLImageElement | String} element Image element
     * @param {Object} options optional
     */
    initialize: function(element, options) {
      this.callSuper('initialize', options);
      this._initElement(element);
      this._initConfig(options || { });
    },
    
    /**
     * Returns image element which this instance if based on
     * @method getElement
     * @return {HTMLImageElement} image element
     */
    getElement: function() {
      return this._element;
    },
    
    /**
     * Sets image element for this instance to a specified one
     * @method setElement
     * @param {HTMLImageElement} element
     * @return {fabric.Image} thisArg
     * @chainable
     */
    setElement: function(element) {
      this._element = element;
      return this;
    },
    
    /**
     * Resizes an image depending on whether maxwidth and maxheight are set up;
     * Width and height have to mantain the same proportion in the final image as it was in the initial one.
     * @method getNormalizedSize
     * @param {Object} oImg
     * @param {Number} maxwidth maximum width of the image (in px)
     * @param {Number} maxheight maximum height of the image (in px)
     */ 
    getNormalizedSize: function(oImg, maxwidth, maxheight) {
      if (maxheight &amp;&amp; maxwidth &amp;&amp; (oImg.width &gt; oImg.height &amp;&amp; (oImg.width / oImg.height) &lt; (maxwidth / maxheight))) {
        // height is the constraining dimension.
        normalizedWidth = ~~((oImg.width * maxheight) / oImg.height);
        normalizedHeight = maxheight;
      }
      else if (maxheight &amp;&amp; ((oImg.height == oImg.width) || (oImg.height &gt; oImg.width) || (oImg.height &gt; maxheight))) {
        // height is the constraining dimension.
        normalizedWidth = ~~((oImg.width * maxheight) / oImg.height);
        normalizedHeight = maxheight;
      }
      else if (maxwidth &amp;&amp; (maxwidth &lt; oImg.width)) {
        // width is the constraining dimension.
        normalizedHeight = ~~((oImg.height * maxwidth) / oImg.width);
        normalizedWidth = maxwidth;
      }
      else {
        normalizedWidth = oImg.width;
        normalizedHeight = oImg.height;
      }
      
      return { 
        width: normalizedWidth, 
        height: normalizedHeight 
      };
    },
    
    /**
     * Returns original size of an image
     * @method getOriginalSize
     * @return {Object} object with "width" and "height" properties
     */
    getOriginalSize: function() {
      var element = this.getElement();
      return { 
        width: element.width, 
        height: element.height
      };
    },
    
    /**
     * Sets border visibility
     * @method setBorderVisibility
     * @param {Boolean} visible When true, border is set to be visible
     */
    setBorderVisibility: function(visible) {
      this._resetWidthHeight();
      this._adjustWidthHeightToBorders(showBorder);
      this.setCoords();
    },
    
    /**
     * Sets corner visibility
     * @method setCornersVisibility
     * @param {Boolean} visible When true, corners are set to be visible
     */
    setCornersVisibility: function(visible) {
      this.cornervisibility = !!visible;
    },
    
    /**
     * Renders image on a specified context
     * @method render
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    render: function(ctx, noTransform) {
      ctx.save();
      if (!noTransform) {
        this.transform(ctx);
      }
      this._render(ctx);
      if (this.active &amp;&amp; !noTransform) {
        this.drawBorders(ctx);
        this.hideCorners || this.drawCorners(ctx);
      }
      ctx.restore();
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} Object representation of an instance
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        src: this.getSrc()
      });
    },
    
    /**
     * Returns source of an image
     * @method getSrc
     * @return {String} Source of an image
     */
    getSrc: function() {
      return this.getElement().src;
    },
    
    /**
     * Returns string representation of an instance
     * @method toString
     * @return {String} String representation of an instance
     */
    toString: function() {        
      return '#&lt;fabric.Image: { src: "' + this.getSrc() + '" }&gt;';
    },
    
    /**
     * Returns a clone of an instance
     * @mthod clone
     * @param {Function} callback Callback is invoked with a clone as a first argument
     */
    clone: function(callback) {
      this.constructor.fromObject(this.toObject(), callback);
    },
    
    /**
     * Makes image grayscale
     * @mthod toGrayscale
     * @param {Function} callback
     */
    toGrayscale: function(callback) {
      
      if (this.__isGrayscaled) {
        return;
      }
      
      var imgEl = this.getElement(),
          canvasEl = fabric.document.createElement('canvas'),
          replacement = fabric.document.createElement('img'),
          _this = this;

      canvasEl.width = imgEl.width;
      canvasEl.height = imgEl.height;

      canvasEl.getContext('2d').drawImage(imgEl, 0, 0);
      fabric.Canvas.toGrayscale(canvasEl);
      
      /** @ignore */
      replacement.onload = function() {
        _this.setElement(replacement);
        callback &amp;&amp; callback();
        replacement.onload = canvasEl = imgEl = imageData = null;
      };
      replacement.width = imgEl.width;
      replacement.height = imgEl.height;
      
      replacement.src = canvasEl.toDataURL('image/png');
      
      this.__isGrayscaled = true;
      
      return this;
    },
    
    /**
     * @private
     */
    _render: function(ctx) {
      var originalImgSize = this.getOriginalSize();
      ctx.drawImage(
        this.getElement(),
        - originalImgSize.width / 2,
        - originalImgSize.height / 2,
        originalImgSize.width,
        originalImgSize.height
      );
    },
    
    /**
     * @private
     */
    _adjustWidthHeightToBorders: function(showBorder) {
      if (showBorder) {
        this.currentBorder = this.borderwidth;
        this.width += (2 * this.currentBorder);
        this.height += (2 * this.currentBorder);
      }
      else {
        this.currentBorder = 0;
      }
    },
    
    /**
     * @private
     */
    _resetWidthHeight: function() {
      var element = this.getElement();
      
      this.set('width', element.width);
      this.set('height', element.height);
    },
    
    /**
     * The Image class's initialization method. This method is automatically 
     * called by the constructor.
     * @method _initElement
     * @param {HTMLImageElement|String} el The element representing the image
     */
    _initElement: function(element) {
      this.setElement(fabric.util.getById(element));
      fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS);
    },
    
    /**
     * @method _initConfig
     * @param {Object} options Options object
     */
    _initConfig: function(options) {
      this.setOptions(options);
      this._setBorder();
      this._setWidthHeight(options);
    },
    
    /**
     * @private
     */
    _setBorder: function() {
      if (this.bordervisibility) {
        this.currentBorder = this.borderwidth;
      }
      else {
        this.currentBorder = 0;
      }
    },
    
    /**
     * @private
     */
    _setWidthHeight: function(options) {
      var sidesBorderWidth = 2 * this.currentBorder;
      this.width = (this.getElement().width || 0) + sidesBorderWidth;
      this.height = (this.getElement().height || 0) + sidesBorderWidth;
    },
    
    /**
     * Returns complexity of an instance
     * @method complexity
     * @return {Number} complexity
     */
    complexity: function() {
      return 1;
    }
  });
  
  /**
   * Default CSS class name for canvas
   * @static
   * @type String
   */
  fabric.Image.CSS_CANVAS = "canvas-img";
  
  /**
   * Creates an instance of fabric.Image from its object representation
   * @static
   * @method fromObject
   * @param object {Object}
   * @param callback {Function} optional
   */
  fabric.Image.fromObject = function(object, callback) {
    var img = fabric.document.createElement('img'),
        src = object.src;
        
    if (object.width) {
      img.width = object.width;
    }
    if (object.height) {
      img.height = object.height;
    }
    
    /** @ignore */
    img.onload = function() {
      if (callback) {
        callback(new fabric.Image(img, object));
      }
      img = img.onload = null;
    };
    img.src = src;
  };
  
  /**
   * Creates an instance of fabric.Image from an URL string
   * @static
   * @method fromURL
   * @param {String} url URL to create an image from
   * @param {Function} [callback] Callback to invoke when image is created (newly created image is passed as a first argument)
   * @param {Object} [imgOptions] Options object
   */
  fabric.Image.fromURL = function(url, callback, imgOptions) {
    var img = fabric.document.createElement('img');
    
    /** @ignore */
    img.onload = function() {
      if (callback) {
        callback(new fabric.Image(img, imgOptions));
      }
      img = img.onload = null;
    };
    img.src = url;
  };
  
  /**
   * List of attribute names to account for when parsing SVG element (used by {@link fabric.Image.fromElement})
   * @static
   * @see http://www.w3.org/TR/SVG/struct.html#ImageElement
   */
  fabric.Image.ATTRIBUTE_NAMES = 'x y width height fill fill-opacity opacity stroke stroke-width transform xlink:href'.split(' ');
  
  /**
   * Returns {@link fabric.Image} instance from an SVG element
   * @static
   * @method fabric.Image.fromElement
   * @param {SVGElement} element Element to parse
   * @param {Function} callback Callback to execute when fabric.Image object is created
   * @param {Object} [options] Options object
   * @return {fabric.Image}
   */
  fabric.Image.fromElement = function(element, callback, options) {
    options || (options = { });
    
    var parsedAttributes = fabric.parseAttributes(element, fabric.Image.ATTRIBUTE_NAMES);
    
    fabric.Image.fromURL(parsedAttributes['xlink:href'], callback, extend(parsedAttributes, options));
  };
  
  fabric.Image.fromElement.async = true;
  
})(typeof exports != 'undefined' ? exports : this);
//= require "object.class"

(function(global) {
  
  "use strict";
  
  var fabric = global.fabric || (global.fabric = { }),
      extend = fabric.util.object.extend,
      clone = fabric.util.object.clone;

  if (fabric.Text) {    
    fabric.warn('fabric.Text is already defined');
    return;
  }
  if (!fabric.Object) {
    fabric.warn('fabric.Text requires fabric.Object');
    return;
  }
  
  /** 
   * @class Text
   * @extends fabric.Object
   */
  fabric.Text = fabric.util.createClass(fabric.Object, /** @scope fabric.Text.prototype */ {
    
    /**
     * @property
     * @type Number
     */
    fontSize:         20,
    
    /**
     * @property
     * @type Number
     */
    fontWeight:       100,
    
    /**
     * @property
     * @type String
     */
    fontFamily:       'Times_New_Roman',
    
    /**
     * @property
     * @type String
     */
    textDecoration:   '',
    
    /**
     * @property
     * @type String | null
     */
    textShadow:       null,
    
    /**
     * Determines text alignment. Possible values: "left", "center", or "right".
     * @property
     * @type String
     */
    textAlign:        'left',
    
    /**
     * @property
     * @type String
     */
    fontStyle:        '',
    
    /**
     * @property
     * @type Number
     */
    lineHeight:       1.6,
    
    /**
     * @property
     * @type String
     */
    strokeStyle:      '',
    
    /**
     * @property
     * @type Number
     */
    strokeWidth:      1,
    
    /**
     * @property
     * @type String
     */
    backgroundColor:  '',
    
    
    /**
     * @property
     * @type String | null
     */
    path:             null,
    
    /**
     * @property
     * @type String
     */
    type:             'text',
    
    /**
     * Constructor
     * @method initialize
     * @param {String} text
     * @param {Object} [options]
     * @return {fabric.Text} thisArg
     */
    initialize: function(text, options) {
      this._initStateProperties();
      this.text = text;
      this.setOptions(options);
      this.theta = this.angle * Math.PI / 180;
      this.width = this.getWidth();
      this.setCoords();
    },
    
    /**
     * Creates `stateProperties` list on an instance, and adds `fabric.Text` -specific ones to it 
     * (such as "fontFamily", "fontWeight", etc.)
     * @private
     * @method _initStateProperties
     */
    _initStateProperties: function() {
      this.stateProperties = this.stateProperties.concat();
      this.stateProperties.push(
        'fontFamily', 
        'fontWeight', 
        'path', 
        'text', 
        'textDecoration', 
        'textShadow', 
        'textAlign',
        'fontStyle',
        'lineHeight',
        'strokeStyle',
        'strokeWidth',
        'backgroundColor'
      );
      fabric.util.removeFromArray(this.stateProperties, 'width');
    },
    
    /**
     * Returns string representation of an instance
     * @method toString
     * @return {String} String representation of text object
     */
    toString: function() {
      return '#&lt;fabric.Text (' + this.complexity() +
        '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }&gt;';
    },
    
    /**
     * @private
     * @method _render
     * @param {CanvasRenderingContext2D} ctx Context to render on
     */
    _render: function(ctx) {
      var o = Cufon.textOptions || (Cufon.textOptions = { });
      
      // export options to be used by cufon.js
      o.left = this.left;
      o.top = this.top;
      o.context = ctx;
      o.color = this.fill;
      
      var el = this._initDummyElement();
      
      // set "cursor" to top/left corner
      this.transform(ctx);
      
      // draw text
      Cufon.replaceElement(el, {
        separate: 'none', 
        fontFamily: this.fontFamily,
        enableTextDecoration: true,
        textDecoration: this.textDecoration,
        textShadow: this.textShadow,
        textAlign: this.textAlign,
        fontStyle: this.fontStyle,
        lineHeight: this.lineHeight,
        strokeStyle: this.strokeStyle,
        strokeWidth: this.strokeWidth,
        backgroundColor: this.backgroundColor
      });
      
      // update width, height
      this.width = o.width;
      this.height = o.height;
      
      // need to set coords _after_ the width/height was retreived from Cufon
      this.setCoords();
    },
    
    // _render: function(context) {
    //       context.fillStyle = this.fill;
    //       context.font = this.fontSize + 'px ' + this.fontFamily;
    //       this.transform(context);
    //       this.width = context.measureText(this.text).width;
    //       this.height = this.fontSize;
    //       context.fillText(this.text, -this.width / 2, 0);
    //       this.setCoords();
    //     },
    
    /**
     * @private
     * @method _initDummyElement
     */
    _initDummyElement: function() {
      var el = fabric.document.createElement('div'),
          container = fabric.document.createElement('div');
      
      // Cufon doesn't play nice with textDecoration=underline if element doesn't have a parent
      container.appendChild(el);
      el.innerHTML = this.text;
      
      // need to specify these manually, since Jaxer doesn't support retrieving computed style
      el.style.fontSize = '40px';
      el.style.fontWeight = '400';
      el.style.letterSpacing = 'normal';
      el.style.color = '#000000';
      el.style.fontWeight = '600';
      el.style.fontFamily = 'Verdana';
      
      return el;
    },
    
    /**
     * Renders text instance on a specified context
     * @method render
     * @param ctx {CanvasRenderingContext2D} context to render on
     */
    render: function(ctx, noTransform) {
      ctx.save();
      this._render(ctx);
      if (!noTransform &amp;&amp; this.active) {
        this.drawBorders(ctx);
        this.hideCorners || this.drawCorners(ctx);
      }
      ctx.restore();
    },
    
    /**
     * Returns object representation of an instance
     * @method toObject
     * @return {Object} Object representation of text object
     */
    toObject: function() {
      return extend(this.callSuper('toObject'), {
        text:           this.text,
        fontSize:       this.fontSize,
        fontWeight:     this.fontWeight,
        fontFamily:     this.fontFamily,
        fontStyle:      this.fontStyle,
        lineHeight:     this.lineHeight,
        textDecoration: this.textDecoration,
        textShadow:     this.textShadow,
        textAlign:      this.textAlign,
        path:           this.path,
        strokeStyle:    this.strokeStyle,
        strokeWidth:    this.strokeWidth,
        backgroundColor: this.backgroundColor
      });
    },
    
    /**
     * Sets "color" of an instance (alias of `set('fill', &amp;hellip;)`)
     * @method setColor
     * @param {String} value
     * @return {fabric.Text} thisArg
     * @chainable
     */
    setColor: function(value) {
      this.set('fill', value);
      return this;
    },
    
    /**
     * Sets fontSize of an instance and updates its coordinates
     * @method setFontsize
     * @param {Number} value
     * @return {fabric.Text} thisArg
     * @chainable
     */
    setFontsize: function(value) {
      this.set('fontSize', value);
      this.setCoords();
      return this;
    },
    
    /**
     * Returns actual text value of an instance
     * @method getText
     * @return {String}
     */
    getText: function() {
      return this.text;
    },
    
    /**
     * Sets text of an instance, and updates its coordinates
     * @method setText
     * @param {String} value
     * @return {fabric.Text} thisArg
     * @chainable
     */
    setText: function(value) {
      this.set('text', value);
      this.setCoords();
      return this;
    },
    
    /**
     * Sets specified property to a specified value
     * @method set
     * @param {String} name
     * @param {Any} value
     * @return {fabric.Text} thisArg
     * @chainable
     */
    set: function(name, value) {
      if (typeof name == 'object') {
        for (var prop in name) {
          this.set(prop, name[prop]);
        }
      }
      else {
        this[name] = value;
        if (name === 'fontFamily' &amp;&amp; this.path) {
          this.path = this.path.replace(/(.*?)([^\/]*)(\.font\.js)/, '$1' + value + '$3');
        }
      }
      return this;
    }
  });
  
  /**
   * Returns fabric.Text instance from an object representation
   * @static
   * @method fromObject
   * @param {Object} object to create an instance from
   * @return {fabric.Text} an instance
   */
  fabric.Text.fromObject = function(object) {
    return new fabric.Text(object.text, clone(object));
  };
  
  /**
   * Returns fabric.Text instance from an SVG element (&lt;b&gt;not yet implemented&lt;/b&gt;)
   * @static
   * @method fabric.Text.fromElement
   * @return {fabric.Text} an instance
   */
  fabric.Text.fromElement = function(element) {
    // TODO (kangax): implement this
  };
  
})(typeof exports != 'undefined' ? exports : this);
(function() {
  
  if (typeof document != 'undefined' &amp;&amp; typeof window != 'undefined') {
    return;
  }
  
  var XML = require('o3-xml'),
      URL = require('url'),
      HTTP = require('http'),
      
      Canvas = require('canvas'),
      Image = require('canvas').Image;

  function request(url, encoding, callback) {
    var oURL = URL.parse(url),
        client = HTTP.createClient(80, oURL.hostname),
        request = client.request('GET', oURL.pathname, { 'host': oURL.hostname });

    client.addListener('error', function(err) {
      if (err.errno === process.ECONNREFUSED) {
        fabric.log('ECONNREFUSED: connection refused to ' + client.host + ':' + client.port);
      }
      else {
        fabric.log(err.message);
      }
    });

    request.end();
    request.on('response', function (response) {
      var body = "";
      if (encoding) {
        response.setEncoding(encoding);
      }
      response.on('end', function () {
        callback(body);
      });
      response.on('data', function (chunk) {
        if (response.statusCode == 200) {
          body += chunk;
        }
      });
    });
  }

  fabric.Canvas.prototype.loadImageFromURL = function(url, callback) {
    request(url, 'binary', function(body) {
      var img = new Image();
      img.src = new Buffer(body, 'binary');
      callback(new fabric.Image(img));
    });
  };

  fabric.loadSVGFromURL = function(url, callback) {
    url = url.replace(/^\n\s*/, '').replace(/\?.*$/, '').trim();
    request(url, '', function(body) {
      var doc = XML.parseFromString(body);
      fabric.parseSVGDocument(doc.documentElement, function(results, options) {
        callback(results, options);
      });
    });
  };
  
  fabric.util.getScript = function(url, callback) {
    request(url, '', function(body) {
      eval(body);
      callback &amp;&amp; callback();
    });
  };

  fabric.Image.fromObject = function(object, callback) {
    fabric.Canvas.prototype.loadImageFromURL(object.src, function(oImg) {
      oImg._initConfig(object);
      callback(oImg);
    });
  };

  fabric.createCanvasForNode = function(width, height) {
    
    var canvasEl = fabric.document.createElement('canvas'),
        nodeCanvas = new Canvas(width || 600, height || 600);

    // jsdom doesn't create style on canvas element, so here be temp. workaround 
    canvasEl.style = { };

    canvasEl.width = nodeCanvas.width;
    canvasEl.height = nodeCanvas.height;

    var fabricCanvas = new fabric.Canvas(canvasEl);
    fabricCanvas.contextContainer = nodeCanvas.getContext('2d');
    fabricCanvas.nodeCanvas = nodeCanvas;

    return fabricCanvas;
  };
  
  fabric.Canvas.prototype.createPNGStream = function() {
    return this.nodeCanvas.createPNGStream();
  };
  
  var origSetWidth = fabric.Canvas.prototype.setWidth;
  fabric.Canvas.prototype.setWidth = function(width) {
    origSetWidth.call(this);
    this.nodeCanvas.width = width;
    return this;
  };
  
  var origSetHeight = fabric.Canvas.prototype.setHeight;
  fabric.Canvas.prototype.setHeight = function(height) {
    origSetHeight.call(this);
    this.nodeCanvas.height = height;
    return this;
  };
  
})();
</pre></body><style type="text/css" style="display: none !important; ">/*This block of style rules is inserted by AdBlock*/#RadAd_Skyscraper,#bbccom_leaderboard,#center_banner,#footer_adcode,#hbBHeaderSpon,#hiddenHeaderSpon,#navbar_adcode,#rightAds,#rightcolumn_adcode,#top-advertising,#topMPU,#tracker_advertorial,.ad-now,.dfpad,.prWrap,[id^="ad_block"],[id^="adbrite"],[id^="dclkAds"],[id^="ew"][id$="_bannerDiv"],[id^="konaLayer"],[src*="sixsigmatraffic.com"],a.kLink span[id^="preLoadWrap"].preLoadWrap,a[href^="http://ad."][href*=".doubleclick.net/"],a[href^="http://adserver.adpredictive.com"],div#adxLeaderboard,div#dir_ads_site,div#FFN_Banner_Holder,div#FFN_imBox_Container,div#p360-format-box,div#rhs div#rhs_block table#mbEnd,div#rm_container,div#tads table[align="center"][width="100%"],div#tooltipbox[class^="itxt"],div[class^="dms_ad_IDS"],div[id^="adKontekst_"],div[id^="google_ads_div"],div[id^="kona_"][id$="_wrapper"],div[id^="sponsorads"],div[id^="y5_direct"],embed[flashvars*="AdID"],iframe.chitikaAdBlock,iframe[id^="dapIfM"],iframe[id^="etarget"][id$="banner"],iframe[name^="AdBrite"],iframe[name^="google_ads_"],img[src^="http://cdn.adnxs.com"],ispan#ab_pointer,object#flashad,object#ve_threesixty_swf[name="ve_threesixty_swf"],script[src="//pagead2.googleadservices.com/pagead/show_ads.js"] + ins > ins > iframe,script[src="http://pagead2.googlesyndication.com/pagead/show_ads.js"] + ins > ins > iframe,table[cellpadding="0"][width="100%"] > * > * > * > div[id^="tpa"],#A9AdsMiddleBoxTop,#A9AdsOutOfStockWidgetTop,#A9AdsServicesWidgetTop,#ADSLOT_1,#ADSLOT_2,#ADSLOT_3,#ADSLOT_4,#ADSLOT_SKYSCRAPER,#ADVERTISE_HERE_ROW,#AD_CONTROL_22,#AD_ROW,#AD_newsblock,#ADgoogle_newsblock,#ADsmallWrapper,#Ad1,#Ad160x600,#Ad2,#Ad300x250,#Ad3Left,#Ad3Right,#Ad3TextAd,#AdA,#AdArea,#AdBanner_F1,#AdBar,#AdBar1,#AdBox2,#AdC,#AdContainer,#AdContainerTop,#AdContentModule_F,#AdDetails_GoogleLinksBottom,#AdDetails_InsureWith,#AdE,#AdF,#AdFrame4,#AdG,#AdH,#AdHeader,#AdI,#AdJ,#AdLeaderboardBottom,#AdLeaderboardTop,#AdMiddle,#AdMobileLink,#AdPopUp,#AdRectangle,#AdSenseDiv,#AdServer,#AdShowcase_F1,#AdSky23,#AdSkyscraper,#AdSpacing,#AdSponsor_SF,#AdSubsectionShowcase_F1,#AdTargetControl1_iframe,#AdText,#AdTop,#AdTopLeader,#Ad_BelowContent,#Ad_Block,#Ad_Center1,#Ad_Right1,#Ad_RightBottom,#Ad_RightTop,#Ad_Top,#Adbanner,#Adrectangle,#Ads,#AdsContent,#AdsRight,#AdsWrap,#Ads_BA_CAD,#Ads_BA_CAD2,#Ads_BA_CAD_box,#Ads_BA_SKY,#Ads_CAD,#Ads_OV_BS,#Ads_Special,#AdvertMPU23b,#AdvertPanel,#AdvertiseFrame,#Advertisement,#Advertisements,#Advertorial,#Advertorials,#AdvertsBottom,#AdvertsBottomR,#BANNER_160x600,#BANNER_300x250,#BANNER_728x90,#BannerAd,#BannerAdvert,#BigBoxAd,#BodyAd,#BotAd,#Bottom468x60AD,#ButtonAd,#CompanyDetailsNarrowGoogleAdsPresentationControl,#CompanyDetailsWideGoogleAdsPresentationControl,#ContentAd,#ContentAd1,#ContentAd2,#ContentAdPlaceHolder1,#ContentAdPlaceHolder2,#ContentAdXXL,#ContentPolepositionAds_Result,#DartAd300x250,#DivAdEggHeadCafeTopBanner,#FIN_videoplayer_300x250ad,#FooterAd,#FooterAdContainer,#GoogleAd1,#GoogleAd2,#GoogleAd3,#GoogleAdsPlaceHolder,#GoogleAdsPresentationControl,#GoogleAdsense,#Google_Adsense_Main,#HEADERAD,#HOME_TOP_RIGHT_BOXAD,#HeaderAD,#HeaderAdsBlock,#HeaderAdsBlockFront,#HeaderBannerAdSpacer,#HeaderTextAd,#HeroAd,#HomeAd1,#HouseAd,#ID_Ad_Sky,#JobsearchResultsAds,#Journal_Ad_125,#Journal_Ad_300,#JuxtapozAds,#KH-contentAd,#LargeRectangleAd,#LeftAd,#LeftAd1,#LeftAdF1,#LeftAdF2,#LftAd,#LoungeAdsDiv,#LowerContentAd,#MainSponsoredLinks,#Nightly_adContainer,#NormalAdModule,#OpenXAds,#OverrideAdArea,#PREFOOTER_LEFT_BOXAD,#PREFOOTER_RIGHT_BOXAD,#PageLeaderAd,#RelevantAds,#RgtAd1,#RightAd,#RightBottom300x250AD,#RightNavTopAdSpot,#RightSponsoredAd,#SectionAd300-250,#SectionSponsorAd,#SideAdMpu,#SidebarAdContainer,#SkyAd,#SpecialAds,#SponsoredAd,#SponsoredLinks,#TL_footer_advertisement,#TOP_ADROW,#TOP_RIGHT_BOXAD,#Tadspacefoot,#Tadspacehead,#Tadspacemrec,#TextLinkAds,#ThreadAd,#Top468x60AD,#TopAd,#TopAdBox,#TopAdContainer,#TopAdDiv,#TopAdPos,#VM-MPU-adspace,#VM-footer-adspace,#VM-header-adspace,#VM-header-adwrap,#XEadLeaderboard,#XEadSkyscraper,#YahooAdParentContainer,#_ads,#abHeaderAdStreamer,#about_adsbottom,#abovepostads,#ad-120x600-sidebar,#ad-120x60Div,#ad-160x600,#ad-160x600-sidebar,#ad-250,#ad-250x300,#ad-300,#ad-300x250,#ad-300x250-sidebar,#ad-300x250Div,#ad-300x60-1,#ad-376x280,#ad-728,#ad-728x90,#ad-728x90-leaderboard-top,#ad-728x90-top0,#ad-ads,#ad-article,#ad-banner,#ad-banner-1,#ad-bigbox,#ad-billboard-bottom,#ad-block-125,#ad-bottom,#ad-bottom-wrapper,#ad-box,#ad-box-first,#ad-box-second,#ad-boxes,#ad-bs,#ad-buttons,#ad-colB-1,#ad-column,#ad-container,#ad-content,#ad-contentad,#ad-first-post,#ad-flex-first,#ad-footer,#ad-footprint-160x600,#ad-frame,#ad-front-footer,#ad-front-sponsoredlinks,#ad-fullbanner2,#ad-globalleaderboard,#ad-halfpage,#ad-header,#ad-header-728x90,#ad-horizontal-header,#ad-img,#ad-inner,#ad-label,#ad-leaderboard,#ad-leaderboard-bottom,#ad-leaderboard-container,#ad-leaderboard-spot,#ad-leaderboard-top,#ad-left,#ad-left-sidebar-ad-1,#ad-left-sidebar-ad-2,#ad-left-sidebar-ad-3,#ad-links-content,#ad-list-row,#ad-lrec,#ad-medium,#ad-medium-rectangle,#ad-medrec,#ad-middlethree,#ad-middletwo,#ad-module,#ad-mpu,#ad-mpu1-spot,#ad-mpu2,#ad-mpu2-spot,#ad-north,#ad-one,#ad-placard,#ad-placeholder,#ad-rectangle,#ad-right,#ad-right-sidebar-ad-1,#ad-right-sidebar-ad-2,#ad-righttop,#ad-row,#ad-side,#ad-side-text,#ad-sidebar,#ad-sky,#ad-skyscraper,#ad-slug-wrapper,#ad-small-banner,#ad-space,#ad-special,#ad-splash,#ad-sponsors,#ad-spot,#ad-squares,#ad-target,#ad-target-Leaderbord,#ad-teaser,#ad-text,#ad-top,#ad-top-banner,#ad-top-text-low,#ad-top-wrap,#ad-tower,#ad-trailerboard-spot,#ad-two,#ad-typ1,#ad-unit,#ad-west,#ad-wrap,#ad-wrap-right,#ad-wrapper,#ad-wrapper1,#ad-yahoo-simple,#ad-zone-1,#ad-zone-2,#ad-zone-inline,#ad01,#ad02,#ad1006,#ad11,#ad125BL,#ad125BR,#ad125TL,#ad125TR,#ad125x125,#ad160x600,#ad160x600right,#ad1Sp,#ad2,#ad2Sp,#ad3,#ad300,#ad300-250,#ad300X250,#ad300_x_250,#ad300x100Middle,#ad300x150,#ad300x250,#ad300x250Module,#ad300x60,#ad300x600,#ad300x600_callout,#ad336,#ad336x280,#ad375x85,#ad4,#ad468,#ad468x60,#ad468x60_top,#ad526x250,#ad600,#ad7,#ad728,#ad728Mid,#ad728Top,#ad728Wrapper,#ad728top,#ad728x90,#ad728x90_1,#ad90,#adBadges,#adBanner,#adBanner10,#adBanner120x600,#adBanner160x600,#adBanner2,#adBanner3,#adBanner336x280,#adBanner4,#adBanner728,#adBanner9,#adBannerTable,#adBannerTop,#adBar,#adBelt,#adBlock125,#adBlockTop,#adBlocks,#adBottbanner,#adBox,#adBox11,#adBox16,#adBox350,#adBox390,#adCirc300X200,#adCirc_620_100,#adCol,#adColumn,#adCompanionSubstitute,#adComponentWrapper,#adContainer,#adContainer_1,#adContainer_2,#adContainer_3,#adDiv,#adDiv300,#adDiv728,#adFiller,#adFps,#adFtofrs,#adGallery,#adGoogleText,#adGroup1,#adHeader,#adHeaderTop,#adIsland,#adL,#adLB,#adLabel,#adLayer,#adLeader,#adLeaderTop,#adLeaderboard,#adMPU,#adMediumRectangle,#adMiddle0Frontpage,#adMiniPremiere,#adMonster1,#adOuter,#adP,#adPlaceHolderRight,#adPlacer,#adPosOne,#adRight,#adRight2,#adSPLITCOLUMNTOPRIGHT,#adSenseModule,#adSenseWrapper,#adServer_marginal,#adSidebar,#adSidebarSq,#adSky,#adSkyscraper,#adSlider,#adSpace,#adSpace0,#adSpace1,#adSpace10,#adSpace11,#adSpace12,#adSpace13,#adSpace14,#adSpace15,#adSpace16,#adSpace17,#adSpace18,#adSpace19,#adSpace2,#adSpace20,#adSpace21,#adSpace22,#adSpace23,#adSpace24,#adSpace25,#adSpace3,#adSpace300_ifrMain,#adSpace4,#adSpace5,#adSpace6,#adSpace7,#adSpace8,#adSpace9,#adSpace_footer,#adSpace_right,#adSpace_top,#adSpacer,#adSpecial,#adSplotlightEm,#adSpot-Leader,#adSpot-banner,#adSpot-island,#adSpot-mrec1,#adSpot-sponsoredlinks,#adSpot-textbox1,#adSpot-widestrip,#adSpotAdvertorial,#adSpotIsland,#adSpotSponsoredLinks,#adSquare,#adStaticA,#adStrip,#adSuperAd,#adSuperPremiere,#adSuperSkyscraper,#adSuperbanner,#adTableCell,#adTag1,#adTag2,#adText,#adTextCustom,#adTextLink,#adText_container,#adTile,#adTop,#adTopContent,#adTopbanner,#adTopboxright,#adTower,#adUnit,#adWrapper,#adZoneTop,#ad_1,#ad_130x250_inhouse,#ad_160x160,#ad_160x600,#ad_190x90,#ad_2,#ad_3,#ad_300,#ad_300_250,#ad_300_250_1,#ad_300a,#ad_300b,#ad_300c,#ad_300x100_m_c,#ad_300x250,#ad_300x250_content_column,#ad_300x250_m_c,#ad_300x250m,#ad_300x90,#ad_4,#ad_468_60,#ad_468x60,#ad_5,#ad_728_foot,#ad_728x90,#ad_728x90_container,#ad_940,#ad_984,#ad_A,#ad_B,#ad_Banner,#ad_C,#ad_C2,#ad_D,#ad_E,#ad_F,#ad_G,#ad_H,#ad_I,#ad_J,#ad_K,#ad_L,#ad_M,#ad_N,#ad_O,#ad_P,#ad_YieldManager-300x250,#ad_YieldManager-728x90,#ad_after_navbar,#ad_anchor,#ad_area,#ad_banner,#ad_banner_top,#ad_banners,#ad_bar,#ad_bellow_post,#ad_bigsize_wrapper,#ad_block_1,#ad_block_2,#ad_bottom,#ad_box,#ad_box_colspan,#ad_box_top,#ad_branding,#ad_bs_area,#ad_buttons,#ad_center_monster,#ad_circ300x250,#ad_cna2,#ad_cont,#ad_container,#ad_container_marginal,#ad_container_side,#ad_container_sidebar,#ad_container_top,#ad_content_top,#ad_content_wrap,#ad_feature,#ad_firstpost,#ad_footer,#ad_front_three,#ad_fullbanner,#ad_gallery,#ad_global_header,#ad_h3,#ad_haha_1,#ad_haha_4,#ad_halfpage,#ad_head,#ad_header,#ad_holder,#ad_horizontal,#ad_horseshoe_left,#ad_horseshoe_right,#ad_horseshoe_spacer,#ad_horseshoe_top,#ad_hotpots,#ad_in_arti,#ad_island,#ad_label,#ad_large_rectangular,#ad_lastpost,#ad_layer2,#ad_leader,#ad_leaderBoard,#ad_leaderboard,#ad_leaderboard728x90,#ad_leaderboard_top,#ad_left,#ad_lnk,#ad_lrec,#ad_lwr_square,#ad_main,#ad_medium_rectangle,#ad_medium_rectangular,#ad_mediumrectangle,#ad_menu_header,#ad_message,#ad_middle,#ad_most_pop_234x60_req_wrapper,#ad_mpu,#ad_mpu300x250,#ad_mpuav,#ad_mrcontent,#ad_newsletter,#ad_overlay,#ad_play_300,#ad_rect,#ad_rect_body,#ad_rect_bottom,#ad_rectangle,#ad_rectangle_medium,#ad_related_links_div,#ad_related_links_div_program,#ad_replace_div_0,#ad_replace_div_1,#ad_report_leaderboard,#ad_report_rectangle,#ad_results,#ad_right,#ad_right_main,#ad_ros_tower,#ad_rr_1,#ad_sec,#ad_sec_div,#ad_sgd,#ad_sidebar,#ad_sidebar1,#ad_sidebar2,#ad_sidebar3,#ad_sky,#ad_skyscraper,#ad_skyscraper160x600,#ad_skyscraper_text,#ad_slot_leaderboard,#ad_slot_livesky,#ad_slot_sky_top,#ad_space,#ad_square,#ad_ss,#ad_table,#ad_term_bottom_place,#ad_text:not(textarea),#ad_thread_first_post_content,#ad_top,#ad_top_holder,#ad_tp_banner_1,#ad_tp_banner_2,#ad_txt,#ad_unit,#ad_vertical,#ad_wide,#ad_wide_box,#ad_widget,#ad_window,#ad_wrap,#ad_wrapper,#adaptvcompanion,#adbForum,#adbanner,#adbar,#adbig,#adbnr,#adboard,#adbody,#adbottom,#adbox,#adbox1,#adbox2,#adbutton,#adclear,#adcode,#adcode1,#adcode2,#adcode3,#adcode4,#adcolumnwrapper,#adcontainer,#adcontainer1,#adcontainerRight,#adcontainsm,#adcontent,#adcontent1,#adcontrolPushSite,#add_ciao2,#addbottomleft,#addiv-bottom,#addiv-top,#adfooter,#adfooter_728x90,#adframe:not(frameset),#adhead,#adhead_g,#adheader,#adhome,#adiframe1_iframe,#adiframe2_iframe,#adiframe3_iframe,#adimg,#adition_content_ad,#adlabel,#adlabelFooter,#adlayerContainer,#adlayerad,#adleaderboard,#adleaderboard_flex,#adleaderboardb,#adleaderboardb_flex,#adleft,#adlinks,#adlinkws,#adlrec,#admanager_leaderboard,#admid,#admiddle3center,#admiddle3left,#adposition,#adposition-C,#adposition-FPMM,#adposition1,#adposition2,#adposition3,#adposition4,#adrectangle,#adrectanglea,#adrectanglea_flex,#adrectangleb,#adrectangleb_flex,#adrig,#adright,#adright2,#adrighthome,#ads-468,#ads-area,#ads-block,#ads-bot,#ads-bottom,#ads-col,#ads-dell,#ads-horizontal,#ads-indextext,#ads-leaderboard1,#ads-lrec,#ads-menu,#ads-middle,#ads-prices,#ads-rhs,#ads-right,#ads-sponsored-boxes,#ads-top,#ads-vers7,#ads-wrapper,#ads120,#ads160left,#ads2,#ads300,#ads300-250,#ads300Bottom,#ads300Top,#ads315,#ads336x280,#ads7,#ads728bottom,#ads728top,#ads790,#adsDisplay,#adsID,#ads_160,#ads_300,#ads_728,#ads_banner,#ads_belowforumlist,#ads_belownav,#ads_bottom,#ads_bottom_inner,#ads_bottom_outer,#ads_box,#ads_button,#ads_catDiv,#ads_container,#ads_footer,#ads_fullsize,#ads_header,#ads_html1,#ads_html2,#ads_inner,#ads_lb,#ads_medrect,#ads_notice,#ads_right,#ads_right_sidebar,#ads_sidebar_roadblock,#ads_space,#ads_text,#ads_top,#ads_watch_top_square,#ads_zone27,#adsbottom,#adsbox,#adsbox-left,#adsbox-right,#adscolumn,#adsd_contentad_r1,#adsd_contentad_r2,#adsd_contentad_r3,#adsd_topbanner,#adsd_txt_sky,#adsdiv,#adsense,#adsense-2,#adsense-header,#adsense-tag,#adsense-text,#adsense03,#adsense04,#adsense05,#adsense1,#adsenseLeft,#adsenseOne,#adsenseWrap,#adsense_article_left,#adsense_block,#adsense_box,#adsense_box_video,#adsense_inline,#adsense_leaderboard,#adsense_overlay,#adsense_placeholder_2,#adsenseheader,#adsensetopplay,#adsensewidget-3,#adserv,#adshometop,#adsimage,#adskinlink,#adsky,#adskyscraper,#adslider,#adslot,#adsmiddle,#adsonar,#adspace,#adspace-1,#adspace-300x250,#adspace300x250,#adspaceBox,#adspaceBox300,#adspace_header,#adspace_leaderboard,#adspacer,#adsponsorImg,#adspot,#adspot-1,#adspot-149x170,#adspot-1x4,#adspot-2,#adspot-295x60,#adspot-2a,#adspot-2b,#adspot-300x110-pos-1,#adspot-300x125,#adspot-300x250-pos-1,#adspot-300x250-pos-2,#adspot-468x60-pos-2,#adspot-a,#adspot300x250,#adspot_220x90,#adspot_300x250,#adspot_468x60,#adspot_728x90,#adsquare,#adsright,#adst,#adstop,#adt,#adtab,#adtag_right_side,#adtagfooter,#adtagheader,#adtagrightcol,#adtaily-widget-light,#adtech_googleslot_03c,#adtech_takeover,#adtext,#adtop,#adtophp,#adtxt,#adv-masthead,#adv_google_300,#adv_google_728,#adv_top_banner_wrapper,#adver1,#adver2,#adver3,#adver4,#adver5,#adver6,#adver7,#advert-1,#advert-120,#advert-boomer,#advert-display,#advert-header,#advert-leaderboard,#advert-links-bottom,#advert-skyscraper,#advert-top,#advert1,#advertBanner,#advertContainer,#advertDB,#advertRight,#advertSection,#advert_125x125,#advert_250x250,#advert_box,#advert_home01,#advert_leaderboard,#advert_lrec_format,#advert_mid,#advert_mpu,#advert_mpu_1,#advert_right_skyscraper,#advert_sky,#advertbox,#advertbox2,#advertbox3,#advertbox4,#adverthome,#advertise,#advertise-here-sidebar,#advertise-now,#advertise1,#advertiseHere { display:none !important; } #advertisement160x600,#advertisement728x90,#advertisementLigatus,#advertisementPrio2,#advertisementRight,#advertisementRightcolumn0,#advertisementRightcolumn1,#advertisementsarticle,#advertiser-container,#advertiserLinks,#advertisers,#advertising,#advertising-banner,#advertising-caption,#advertising-container,#advertising-control,#advertising-skyscraper,#advertising-top,#advertising2,#advertisingModule160x600,#advertisingModule728x90,#advertisingTopWrapper,#advertising_btm,#advertising_contentad,#advertising_horiz_cont,#advertisment,#advertismentElementInUniversalbox,#advertorial,#advertorial_red_listblock,#adverts,#adverts-top-container,#adverts-top-left,#adverts-top-middle,#adverts-top-right,#advertsingle,#advertspace,#advt,#adwhitepaperwidget,#adwin_rec,#adwith,#adwords-4-container,#adwrapper,#adxBigAd,#adxMiddle5,#adxSponLink,#adxSponLinkA,#adxtop,#adz,#adzbanner,#adzerk,#adzerk1,#adzone,#adzoneBANNER,#adzoneheader,#affinityBannerAd,#after-content-ads,#after-header-ad-left,#after-header-ad-right,#after-header-ads,#agi-ad300x250,#agi-ad300x250overlay,#agi-sponsored,#alert_ads,#anchorAd,#annoying_ad,#ap_adframe,#ap_cu_overlay,#ap_cu_wrapper,#apiBackgroundAd,#apiTopAdWrap,#apmNADiv,#apolload,#araHealthSponsorAd,#area-adcenter,#area1ads,#article-ad,#article-ad-container,#article-box-ad,#articleAdReplacement,#articleLeftAdColumn,#articleSideAd,#article_ad,#article_ad_container,#article_box_ad,#articlead1,#articlead2,#asinglead,#atlasAdDivGame,#awds-nt1-ad,#babAdTop,#banner-300x250,#banner-ad,#banner-ad-container,#banner-ads,#banner250x250,#banner300x250,#banner468x60,#banner728x90,#bannerAd,#bannerAdTop,#bannerAdWrapper,#bannerAd_ctr,#banner_300_250,#banner_ad,#banner_ad_footer,#banner_ad_module,#banner_admicro,#banner_ads,#banner_content_ad,#banner_topad,#bannerad,#bannerad2,#baseAdvertising,#basket-adContainer,#bbccom_mpu,#bbo_ad1,#bg-footer-ads,#bg-footer-ads2,#bg_YieldManager-160x600,#bg_YieldManager-300x250,#bg_YieldManager-728x90,#bigAd,#bigBoxAd,#bigad300outer,#bigadbox,#bigadframe,#bigadspot,#billboard_ad,#block-ad_cube-1,#block-openads-0,#block-openads-1,#block-openads-2,#block-openads-3,#block-openads-4,#block-openads-5,#block-thewrap_ads_250x300-0,#block_advert,#blog-ad,#blog_ad_content,#blog_ad_opa,#blog_ad_right,#blog_ad_top,#blox-big-ad,#blox-big-ad-bottom,#blox-big-ad-top,#blox-halfpage-ad,#blox-tile-ad,#blox-tower-ad,#body_728_ad,#book-ad,#botad,#bott_ad2,#bott_ad2_300,#bottom-ad,#bottom-ad-container,#bottom-ad-wrapper,#bottom-ads,#bottomAd,#bottomAdCCBucket,#bottomAdContainer,#bottomAdSense,#bottomAdSenseDiv,#bottomAds,#bottomContentAd,#bottomRightAd,#bottomRightAdSpace,#bottom_ad,#bottom_ad_area,#bottom_ad_unit,#bottom_ads,#bottom_banner_ad,#bottom_overture,#bottom_sponsor_ads,#bottom_sponsored_links,#bottom_text_ad,#bottomad,#bottomads,#bottomadsense,#bottomadwrapper,#bottomleaderboardad,#box-ad-section,#box-content-ad,#box-googleadsense-1,#box-googleadsense-r,#box1ad,#boxAd300,#boxAdContainer,#boxAdvert,#box_ad,#box_advertisment,#box_mod_googleadsense,#boxad1,#boxad2,#boxad3,#boxad4,#boxad5,#bpAd,#bps-header-ad-container,#btnAds,#btnads,#btr_horiz_ad,#burn_header_ad,#button-ads-horizontal,#button-ads-vertical,#buttonAdWrapper1,#buttonAdWrapper2,#buttonAds,#buttonAdsContainer,#button_ad_container,#button_ad_wrap,#button_ads,#buttonad,#buy-sell-ads,#c4ad-Middle1,#c_ad_sb,#c_ad_sky,#caAdLarger,#catad,#category-ad,#cellAd,#channel_ad,#channel_ads,#ciHomeRHSAdslot,#circ_ad,#closeable-ad,#cmn_ad_box,#cmn_toolbar_ad,#cnnAboveFoldBelowAd,#cnnRR336ad,#cnnSponsoredPods,#cnnTopAd,#cnnVPAd,#col3_advertising,#colAd,#colRightAd,#collapseobj_adsection,#column4-google-ads,#comments-ad-container,#commercial_ads,#common_right_ad_wrapper,#common_right_lower_ad_wrapper,#common_right_lower_adspace,#common_right_lower_player_ad_wrapper,#common_right_lower_player_adspace,#common_right_player_ad_wrapper,#common_right_player_adspace,#common_right_right_adspace,#common_top_adspace,#comp_AdsLeaderboardTop,#companion-ad,#companionAdDiv,#companionad,#container-righttopads,#container-topleftads,#containerLocalAds,#containerLocalAdsInner,#containerMrecAd,#containerSqAd,#content-ad-header,#content-header-ad,#content-left-ad,#content-right-ad,#contentAd,#contentBoxad,#contentTopAds2,#content_ad,#content_ad_square,#content_ad_top,#content_ads_content,#content_box_300body_sponsoredoffers,#content_box_adright300_google,#content_lower_center_right_ad,#content_mpu,#contentad,#contentad_imtext,#contentad_right,#contentads,#contentinlineAd,#contents_post_ad,#contextad,#contextual-ads,#contextual-ads-block,#contextualad,#coverADS,#coverads,#ctl00_Adspace_Top_Height,#ctl00_BottomAd,#ctl00_ContentMain_BanManAd468_BanManAd,#ctl00_ContentPlaceHolder1_blockAdd_divAdvert,#ctl00_ContentRightColumn_RightColumn_Ad1_BanManAd,#ctl00_ContentRightColumn_RightColumn_Ad2_BanManAd,#ctl00_ContentRightColumn_RightColumn_PremiumAd1_ucBanMan_BanManAd,#ctl00_LHTowerAd,#ctl00_LeftHandAd,#ctl00_MasterHolder_IBanner_adHolder,#ctl00_TopAd,#ctl00_TowerAd,#ctl00_VBanner_adHolder,#ctl00__Content__RepeaterReplies_ctl03__AdReply,#ctl00_abot_bb,#ctl00_adFooter,#ctl00_advert_LargeMPU_div_AdPlaceHolder,#ctl00_atop_bt,#ctl00_cphMain_hlAd1,#ctl00_cphMain_hlAd2,#ctl00_cphMain_hlAd3,#ctl00_ctl00_MainPlaceHolder_itvAdSkyscraper,#ctl00_ctl00_ctl00_Main_Main_PlaceHolderGoogleTopBanner_MPTopBannerAd,#ctl00_ctl00_ctl00_Main_Main_SideBar_MPSideAd,#ctl00_dlTilesAds,#ctl00_m_skinTracker_m_adLBL,#ctl00_phCrackerMain_ucAffiliateAdvertDisplayMiddle_pnlAffiliateAdvert,#ctl00_phCrackerMain_ucAffiliateAdvertDisplayRight_pnlAffiliateAdvert,#ctl00_topAd,#ctrlsponsored,#cubeAd,#cube_ads,#cube_ads_inner,#cubead,#cubead-2,#currencies-sponsored-by,#dAdverts,#dItemBox_ads,#dart_160x600,#dc-display-right-ad-1,#dcadSpot-Leader,#dcadSpot-LeaderFooter,#dcol-sponsored,#defer-adright,#detail_page_vid_topads,#div-gpt-ad-1,#div-gpt-ad-2,#div-gpt-ad-3,#div-gpt-ad-4,#divAd,#divAdBox,#divAdWrapper,#divAdvertisement,#divBottomad1,#divBottomad2,#divDoubleAd,#divLeftAd12,#divLeftRecAd,#divMenuAds,#divWNAdHeader,#divWrapper_Ad,#div_ad_leaderboard,#div_video_ads,#dlads,#dni-header-ad,#dnn_adLeaderBoard2008,#dnn_ad_banner,#download_ads,#dp_ads1,#ds-mpu,#ds_ad_north_leaderboard,#editorsmpu,#em_ad_superbanner,#embedded-ad,#evotopTen_advert,#ex-ligatus,#exads,#extra-search-ads,#fb_adbox,#fb_rightadpanel,#featAds,#featuread,#featured-advertisements,#featuredAdContainer2,#featuredAds,#featured_ad_links,#feed_links_ad_container,#file_sponsored_link,#first-300-ad,#first-adlayer,#first_ad_unit,#firstad,#fl_hdrAd,#flash_ads_1,#flexiad,#floatingAd,#floating_ad_container,#foot-ad-1,#footad,#footer-ad,#footer-ads,#footer-advert,#footer-adverts,#footer-sponsored,#footerAd,#footerAdDiv,#footerAds,#footerAdvertisement,#footerAdverts,#footer_ad,#footer_ad_01,#footer_ad_block,#footer_ad_container,#footer_ad_modules,#footer_ads,#footer_adspace,#footer_text_ad,#footerad,#footerads,#footeradsbox,#forum_top_ad,#four_ads,#fpad1,#fpad2,#fpv_companionad,#fr_ad_center,#frame_admain,#frnAdSky,#frnBannerAd,#frnContentAd,#front_advert,#front_mpu,#ft-ad,#ft-ad-1,#ft-ad-container,#ft_mpu,#fullsizebanner_468x60,#fusionad,#fw-advertisement,#g_ad,#g_adsense,#ga_300x250,#gad,#gad2,#gad3,#gad5,#galleries-tower-ad,#gallery-ad,#gallery-ad-m0,#gallery-random-ad,#gallery_ads,#game-info-ad,#gamead,#gameads,#gasense,#gglads,#global_header_ad_area,#gm-ad-lrec,#gmi-ResourcePageAd,#gmi-ResourcePageLowerAd,#goad1,#goads,#gooadtop,#google-ad,#google-ad-art,#google-ad-table-right,#google-ad-tower,#google-ads,#google-ads-bottom,#google-ads-header,#google-ads-left-side,#google-adsense-mpusize,#googleAd,#googleAdArea,#googleAds,#googleAdsSml,#googleAdsense,#googleAdsenseBanner,#googleAdsenseBannerBlog,#googleAdwordsModule,#googleAfcContainer,#googleSearchAds,#googleShoppingAdsRight,#googleShoppingAdsTop,#googleSubAds,#google_ad,#google_ad_container,#google_ad_inline,#google_ad_test,#google_ads,#google_ads_aCol,#google_ads_frame1,#google_ads_frame1_anchor,#google_ads_frame2,#google_ads_frame2_anchor,#google_ads_frame3,#google_ads_frame3_anchor,#google_ads_test,#google_ads_top,#google_adsense_home_468x60_1,#googlead,#googlead-sidebar-middle,#googlead-sidebar-top,#googlead2,#googleadbox,#googleads,#googleads_mpu_injection,#googleadsense,#googlesponsor,#gpt-ad-halfpage,#gpt-ad-rectangle1,#gpt-ad-rectangle2,#gpt-ad-skyscraper,#gpt-ad-story_rectangle3,#grid_ad,#gsyadrectangleload,#gsyadrightload,#gsyadtop,#gsyadtopload,#gtopadvts,#half-page-ad,#halfPageAd,#halfe-page-ad-box,#hd-ads,#hd-banner-ad,#hdtv_ad_ss,#head-ad,#head-ad-1,#headAd,#head_ad,#head_advert,#headad,#header-ad,#header-ad-left,#header-ad-rectangle-container,#header-ad-right,#header-ad2010,#header-ads,#header-adspace,#header-advert,#header-advertisement,#header-advertising,#header-adverts,#headerAd,#headerAdBackground,#headerAdContainer,#headerAdWrap,#headerAds,#headerAdsWrapper,#headerTopAd,#header_ad,#header_ad_728_90,#header_ad_container,#header_adcode,#header_ads,#header_advertisement_top,#header_leaderboard_ad_container,#header_publicidad,#headerad,#headeradbox,#headerads,#headeradsbox,#headeradvertholder,#headeradwrap,#headline_ad,#headlinesAdBlock,#hiddenadAC,#hideads,#hl-sponsored-results,#hly_ad_side_bar_tower_left,#hly_inner_page_google_ad,#home-advert-module,#home-rectangle-ad,#home-top-ads,#homeMPU,#homeTopRightAd,#home_ad,#home_bottom_ad,#home_contentad,#home_feature_ad,#home_lower_center_right_ad,#home_mpu,#home_spensoredlinks,#homead,#homepage-ad,#homepageAdsTop,#homepageFooterAd,#homepage_right_ad,#homepage_right_ad_container,#homepage_top_ads,#hometop_234x60ad,#hor_ad,#horizad,#horizontal-banner-ad,#horizontal_ad,#horizontal_ad_top,#horizontalads,#hot-deals-ad,#houseAd,#hp-header-ad,#hp-mpu,#hp-right-ad,#hp-store-ad,#hpV2_300x250Ad,#hpV2_googAds,#hp_ad300x250,#ibt_local_ad728,#icePage_SearchLinks_AdRightDiv,#icePage_SearchLinks_DownloadToolbarAdRightDiv,#icePage_SearchResults_ads0_SponsoredLink,#icePage_SearchResults_ads1_SponsoredLink,#icePage_SearchResults_ads2_SponsoredLink,#icePage_SearchResults_ads3_SponsoredLink,#icePage_SearchResults_ads4_SponsoredLink,#idSponsoredresultend,#idSponsoredresultstart,#imu_ad_module,#in_serp_ad,#inadspace,#indexad,#inline-story-ad,#inlineAd,#inlinead,#inlinegoogleads,#inlist-ad-block,#inner-advert-row,#inner-top-ads,#innerpage-ad,#inside-page-ad,#insider_ad_wrapper,#instoryad,#instoryadtext,#instoryadwrap,#int-ad,#interstitial_ad_wrapper,#iqadtile8,#islandAd,#j_ad,#ji_medShowAdBox,#jmp-ad-buttons,#joead,#joead2,#ka_adRightSkyscraperWide,#kaufDA-widget,#kdz_ad1,#kdz_ad2,#keyadvertcontainer,#landing-adserver,#lapho-top-ad-1,#largead,#lateAd,#layerAds_layerDiv,#layerTLDADSERV,#layer_ad_content,#layer_ad_main,#layerad,#leader-board-ad,#leaderAd,#leaderAdContainer,#leader_ad,#leader_board_ad,#leaderad,#leaderad_section,#leaderboard-ad,#leaderboard-bottom-ad,#leaderboard_ad,#left-ad-1,#left-ad-2,#left-ad-col,#left-ad-skin,#left-bottom-ad,#left-lower-adverts,#left-lower-adverts-container,#leftAdContainer,#leftAd_rdr,#leftAdvert,#leftSectionAd300-100,#left_ad,#left_adspace,#leftad,#leftads,#leftcolAd,#lg-banner-ad,#ligatus,#linkAds,#linkads,#live-ad,#logoAd,#longAdSpace,#long_advertisement,#lowerAdvertisementImg,#lowerads,#lowerthirdad,#lowertop-adverts,#lowertop-adverts-container,#lpAdPanel,#lrecad,#lsadvert-left_menu_1,#lsadvert-left_menu_2,#lsadvert-top,#mBannerAd,#main-ad,#main-ad160x600,#main-ad160x600-img,#main-ad728x90,#main-advert1,#main-advert2,#main-advert3,#main-bottom-ad,#main-tj-ad,#mainAd,#mainAdUnit,#mainAdvert,#main_ad,#main_rec_ad,#main_top_ad_container,#marketing-promo,#mastAd,#mastAdvert,#mastad,#mastercardAd,#masthead_ad,#masthead_topad,#medRecAd,#media_ad,#mediaplayer_adburner,#mediumAdvertisement,#medrectad,#menuAds,#mi_story_assets_ad,#mid-ad300x250,#mid-table-ad,#midRightTextAds,#mid_ad_div,#mid_ad_title,#mid_mpu,#midadd,#midadspace,#middle-ad,#middle_ad,#middle_body_advertising,#middlead,#middleads,#midrect_ad,#midstrip_ad,#mini-ad,#mochila-column-right-ad-300x250,#mochila-column-right-ad-300x250-1,#module-google_ads,#module_ad,#module_box_ad,#module_sky_scraper,#monsterAd,#moogleAd,#moreads,#most_popular_ad,#motionAd,#mpu,#mpu-advert,#mpu-cont,#mpu300250,#mpuAd,#mpuDiv,#mpuSlot,#mpuWrapper,#mpuWrapperAd,#mpu_banner,#mpu_firstpost,#mpu_holder,#mpu_text_ad,#mpuad,#mpubox,#mr_banner_topad,#mrecAdContainer,#msAds,#ms_ad,#msad,#multiLinkAdContainer,#multi_ad,#my-ads,#myads_HeaderButton,#n_sponsor_ads,#namecom_ad_hosting_main,#narrow_ad_unit,#natadad300x250,#national_microlink_ads,#nationalad,#navi_banner_ad_780,#nba160PromoAd,#nba300Ad,#nbaGI300ad,#nbaHouseAnd600Ad,#nbaLeft600Ad,#nbaMidAds,#nbaVid300Ad,#nbcAd300x250,#new_topad,#newads,#news_advertorial_content,#news_advertorial_top,#ng_rtcol_ad,#noresults_ad_container,#noresultsads,#northad,#northbanner-advert,#northbanner-advert-container,#ns_ad1,#ns_ad2,#ns_ad3,#oanda_ads,#onespot-ads,#online_ad,#ovadsense,#p-googleadsense,#page-header-ad,#page-top-ad,#pageAds,#pageAdsDiv,#pageBannerAd,#page_ad,#page_content_top_ad,#pagelet_adbox,#pagelet_netego_ads,#pagelet_search_ads2,#panelAd,#pb_report_ad,#pcworldAdBottom,#pcworldAdTop,#pinball_ad,#player-below-advert,#player_ad,#player_ads,#pmad-in1,#pod-ad-video-page,#populate_ad_bottom,#populate_ad_left,#portlet-advertisement-left,#portlet-advertisement-right,#post-promo-ad,#post5_adbox,#post_ad,#premium_ad,#priceGrabberAd,#prime-ad-space,#print_ads,#printads,#product-adsense,#promo-ad,#promoAds,#ps-vertical-ads,#pub468x60,#publicidad,#pushdown_ad,#qm-ad-big-box,#qm-ad-sky,#qm-dvdad,#quigo_ad,#r1SoftAd,#rail_ad1,#rail_ad2,#realEstateAds,#rectAd,#rect_ad,#rectangle-ad,#rectangleAd,#rectangle_ad,#refine-300-ad,#region-node-advert,#region-top-ad,#relocation_ad_container,#rh-ad-container,#rh_tower_ad,#rhapsodyAd,#rhs_ads,#rhsadvert,#right-ad,#right-ad-col,#right-ad-skin,#right-ad-title,#right-ad1,#right-ads-3,#right-advert,#right-box-ad,#right-featured-ad,#right-mpu-1-ad-container,#right-uppder-adverts,#right-uppder-adverts-container,#rightAd,#rightAd300x250,#rightAd300x250Lower,#rightAdBar,#rightAdColumn,#rightAd_rdr,#rightAdsDiv,#rightColAd,#rightColumnMpuAd,#rightColumnSkyAd,#right_ad,#right_ad_wrapper,#right_ads,#right_advertisement,#right_advertising,#right_column_ad_container,#right_column_ads,#right_column_adverts,#right_column_internal_ad_container,#right_column_top_ad_unit,#rightad,#rightadContainer,#rightads,#rightadvertbar-doubleclickads,#rightbar-ad,#rightcolhouseads,#rightcolumn_300x250ad,#rightgoogleads,#rightinfoad,#rightside-ads,#rightside_ad,#righttop-adverts,#righttop-adverts-container,#rm_ad_text,#ros_ad,#rotatingads,#row2AdContainer,#rprightHeaderAd,#rr_MSads,#rt-ad,#rt-ad-top,#rt-ad468,#rtMod_ad,#rtmod_ad,#sAdsBox,#sb-ad-sq,#sb_ad_links,#sb_advert,#search-google-ads,#search-sponsored-links,#search-sponsored-links-top,#searchAdSenseBox,#searchAdSenseBoxAd,#searchAdSkyscraperBox,#search_ads,#search_result_ad,#sec_adspace,#second-adlayer,#secondBoxAdContainer,#secondrowads,#sect-ad-300x100,#sect-ad-300x250-2,#section-ad-1-728,#section-ad-300-250,#section-ad-4-160,#section-blog-ad,#section-container-ddc_ads,#section_advertisements,#section_advertorial_feature,#servfail-ads,#sew-ad1,#shoppingads,#show-ad,#showAd,#showad,#side-ad,#side-ad-container,#side-ads,#sideAd,#sideAd1,#sideAd2,#sideAdSub,#sideBarAd,#side_ad,#side_ad_wrapper,#side_ads_by_google,#side_sky_ad,#sidead,#sideads,#sideadtop-to,#sidebar-125x125-ads,#sidebar-125x125-ads-below-index,#sidebar-ad,#sidebar-ad-boxes,#sidebar-ad-space,#sidebar-ad-wrap,#sidebar-ad3,#sidebar-ads,#sidebar2ads,#sidebar_ad,#sidebar_ad_widget,#sidebar_ads,#sidebar_ads_180,#sidebar_sponsoredresult_body,#sidebar_txt_ad_links,#sidebarad,#sidebaradpane,#sidebarads,#sidebaradver_advertistxt,#sideline-ad,#single-mpu,#singlead,#site-ad-container,#site-leaderboard-ads,#site_top_ad,#sitead,#sky-ad,#skyAd,#skyAdContainer,#skyScrapperAd,#skyWrapperAds,#sky_ad,#sky_advert,#skyads,#skyadwrap,#skyline_ad,#skyscrapeAd,#skyscraper-ad { display:none !important; } #skyscraperAd,#skyscraperAdContainer,#skyscraper_ad,#skyscraper_advert,#skyscraperad,#slide_ad,#sliderAdHolder,#slideshow_ad_300x250,#sm-banner-ad,#small_ad,#small_ad_banners_vertical,#small_ads,#smallerAd,#some-ads,#some-more-ads,#specialAd_one,#specialAd_two,#specialadvertisingreport_container,#specials_ads,#speeds_ads,#speeds_ads_fstitem,#speedtest_mrec_ad,#sphereAd,#sponlink,#sponlinks,#sponsAds,#sponsLinks,#sponseredlinks,#sponsorAd1,#sponsorAd2,#sponsorAdDiv,#sponsorLinks,#sponsorTextLink,#sponsor_banderole,#sponsor_deals,#sponsored,#sponsored-ads,#sponsored-features,#sponsored-links,#sponsored-listings,#sponsored-resources,#sponsored1,#sponsoredBox1,#sponsoredBox2,#sponsoredLinks,#sponsoredList,#sponsoredResults,#sponsoredResultsWide,#sponsoredSiteMainline,#sponsoredSiteSidebar,#sponsored_ads_v4,#sponsored_container,#sponsored_content,#sponsored_game_row_listing,#sponsored_head,#sponsored_links,#sponsored_v12,#sponsoredads,#sponsoredlinks,#sponsoredlinks_cntr,#sponsoredlinkslabel,#sponsoredresults_top,#sponsoredwellcontainerbottom,#sponsoredwellcontainertop,#sponsorlink,#spotlightAds,#spotlightad,#sqAd,#squareAd,#squareAdSpace,#squareAds,#square_ad,#start_middle_container_advertisment,#sticky-ad,#stickyBottomAd,#story-90-728-area,#story-ad-a,#story-ad-b,#story-leaderboard-ad,#story-sponsoredlinks,#storyAd,#storyAdWrap,#storyad2,#subpage-ad-right,#subpage-ad-top,#swads,#synch-ad,#systemad_background,#tabAdvertising,#takeoverad,#tblAd,#tbl_googlead,#tcwAd,#td-GblHdrAds,#template_ad_leaderboard,#tertiary_advertising,#test_adunit_160_article,#text-ad,#text-ads,#text-link-ads,#textAd,#textAds,#text_ad,#text_ads,#text_advert,#textad,#textad3,#textad_block,#the-last-ad-standing,#thefooterad,#themis-ads,#tile-ad,#tmglBannerAd,#tmp2_promo_ad,#toolbarSlideUpAd,#top-ad,#top-ad-container,#top-ad-menu,#top-ads,#top-ads-tabs,#top-advertisement,#top-banner-ad,#top-search-ad-wrapper,#topAd,#topAd728x90,#topAdBanner,#topAdBox,#topAdContainer,#topAdSenseDiv,#topAdcontainer,#topAds,#topAdsContainer,#topAdvert,#topBannerAd,#topBannerAdContainer,#topContentAdTeaser,#topNavLeaderboardAdHolder,#topOverallAdArea,#topRightBlockAdSense,#topSponsoredLinks,#top_ad,#top_ad_area,#top_ad_banner,#top_ad_game,#top_ad_unit,#top_ad_wrapper,#top_ad_zone,#top_ads,#top_advertise,#top_advertising,#top_rectangle_ad,#top_right_ad,#top_wide_ad,#topad,#topad1,#topad2,#topad_left,#topad_right,#topadbar,#topadblock,#topaddwide,#topads,#topadsense,#topadspace,#topadwrap,#topadzone,#topbanner_ad,#topbannerad,#topbar-ad,#topcustomad,#topleaderboardad,#topnav-ad-shell,#topnavad,#toprightAdvert,#toprightad,#topsponsored,#toptextad,#tour300Ad,#tour728Ad,#tourSponsoredLinksContainer,#towerad,#ts-ad_module,#ttp_ad_slot1,#ttp_ad_slot2,#twogamesAd,#txfPageMediaAdvertVideo,#txt_link_ads,#txtads,#undergameAd,#upperAdvertisementImg,#upperMpu,#upper_small_ad,#upperad,#urban_contentad_1,#urban_contentad_2,#urban_contentad_article,#v_ad,#vert-ads,#vert_ad,#vert_ad_placeholder,#vertical_ad,#vertical_ads,#videoAd,#videoAdvert,#video_ads_overdiv,#video_advert2,#video_advert3,#video_cnv_ad,#video_overlay_ad,#videoadlogo,#viewads,#viewportAds,#viewvid_ad300x250,#wXcds12-ad,#wall_advert,#wallpaper-ad-link,#wallpaperAd_left,#wallpaperAd_right,#walltopad,#weblink_ads_container,#welcomeAdsContainer,#welcome_ad_mrec,#welcome_advertisement,#wf_ContentAd,#wf_FrontSingleAd,#wf_SingleAd,#wf_bottomContentAd,#wgtAd,#whatsnews_top_ad,#whitepaper-ad,#whoisRightAdContainer,#wide_ad_unit_top,#wideskyscraper_160x600_left,#wideskyscraper_160x600_right,#widget_Adverts,#widget_advertisement,#widgetwidget_adserve2,#wrapAdRight,#wrapAdTop,#wrapperAdsTopLeft,#wrapperAdsTopRight,#xColAds,#y-ad-units,#y708-ad-expedia,#y708-ad-lrec,#y708-ad-partners,#y708-ad-ysm,#y708-advertorial-marketplace,#yahoo-ads,#yahoo-sponsors,#yahooSponsored,#yahoo_ads,#yahoo_ads_2010,#yahoo_text_ad,#yahooad-tbl,#yan-sponsored,#yatadsky,#ybf-ads,#yfi_fp_ad_mort,#yfi_fp_ad_nns,#yfi_pf_ad_mort,#ygrp-sponsored-links,#ymap_adbanner,#yn-gmy-ad-lrec,#yreSponsoredLinks,#ysm_ad_iframe,#zoneAdserverMrec,#zoneAdserverSuper,.ADBAR,.ADPod,.AD_ALBUM_ITEMLIST,.AD_MOVIE_ITEM,.AD_MOVIE_ITEMLIST,.AD_MOVIE_ITEMROW,.Ad-300x100,.Ad-Container-976x166,.Ad-Header,.Ad-MPU,.Ad-Wrapper-300x100,.Ad1,.Ad120x600,.Ad160x600,.Ad160x600left,.Ad160x600right,.Ad2,.Ad247x90,.Ad300x,.Ad300x250,.Ad300x250L,.Ad728x90,.AdBorder,.AdBox,.AdBox7,.AdContainerBox308,.AdContainerModule,.AdHeader,.AdHere,.AdInfo,.AdInline,.AdMedium,.AdPlaceHolder,.AdProS728x90Container,.AdProduct,.AdRingtone,.AdSense,.AdSenseLeft,.AdSlot,.AdSpace,.AdTextSmallFont,.AdTitle,.AdUnit,.AdUnit300,.Ad_C,.Ad_D_Wrapper,.Ad_E_Wrapper,.Ad_Right,.Ads,.AdsBottom,.AdsBoxBottom,.AdsBoxSection,.AdsBoxTop,.AdsLinks1,.AdsLinks2,.AdsRec,.Advert,.Advert300x250,.AdvertMidPage,.AdvertiseWithUs,.Advertisement,.AdvertisementTextTag,.Advman_Widget,.ArticleAd,.ArticleInlineAd,.BCA_Advertisement,.BannerAd,.BigBoxAd,.BlockAd,.BlueTxtAdvert,.BottomAdContainer,.BottomAffiliate,.BoxAd,.CG_adkit_leaderboard,.CG_details_ad_dropzone,.CWReviewsProdInfoAd,.ComAread,.CommentAd,.ContentAd,.ContentAds,.DAWRadvertisement,.DeptAd,.DisplayAd,.FT_Ad,.FeaturedAdIndexAd,.FlatAds,.GOOGLE_AD,.GoogleAd,.GoogleAdSenseBottomModule,.GoogleAdSenseRightModule,.HPG_Ad_B,.HPNewAdsBannerDiv,.HPRoundedAd,.HomeContentAd,.IABAdSpace,.InArticleAd,.IndexRightAd,.LazyLoadAd,.LeftAd,.LeftButtonAdSlot,.LeftTowerAd,.M2Advertisement,.MD_adZone,.MOS-ad-hack,.MPU,.MPUHolder,.MPUTitleWrapperClass,.MREC_ads,.MiddleAd,.MiddleAdContainer,.MiddleAdvert,.NewsAds,.OAS,.OpaqueAdBanner,.OpenXad,.PU_DoubleClickAdsContent,.Post5ad,.Post8ad,.Post9ad,.RBboxAd,.RW_ad300,.RectangleAd,.RelatedAds,.Right300x250AD,.RightAd1,.RightAdvertiseArea,.RightAdvertisement,.RightGoogleAFC,.RightRailAd,.RightRailTop300x250Ad,.RightSponsoredAdTitle,.RightTowerAd,.STR_AdBlock,.SectionSponsor,.SideAdCol,.SidebarAd,.SidebarAdvert,.SitesGoogleAdsModule,.SkyAdContainer,.SponsoredAdTitle,.SponsoredContent,.SponsoredLinkItemTD,.SponsoredLinks,.SponsoredLinksGrayBox,.SponsoredLinksModule,.SponsoredLinksPadding,.SponsoredLinksPanel,.Sponsored_link,.SquareAd,.StandardAdLeft,.StandardAdRight,.TRU-onsite-ads-leaderboard,.TextAd,.TheEagleGoogleAdSense300x250,.TopAd,.TopAdContainer,.TopAdL,.TopAdR,.TopBannerAd,.UIWashFrame_SidebarAds,.UnderAd,.VerticalAd,.Video-Ad,.VideoAd,.WidgetAdvertiser,.a160x600,.a728x90,.ad-120x60,.ad-120x600,.ad-160,.ad-160x600,.ad-160x600x1,.ad-160x600x2,.ad-160x600x3,.ad-250,.ad-300,.ad-300-block,.ad-300-blog,.ad-300x100,.ad-300x250,.ad-300x250-first,.ad-300x250-right0,.ad-300x600,.ad-350,.ad-355x75,.ad-600,.ad-635x40,.ad-728,.ad-728x90,.ad-728x90-1,.ad-728x90-top0,.ad-728x90_forum,.ad-90x600,.ad-above-header,.ad-adlink-bottom,.ad-adlink-side,.ad-area,.ad-background,.ad-banner,.ad-banner-smaller,.ad-bigsize,.ad-block,.ad-block-square,.ad-blog2biz,.ad-body,.ad-bottom,.ad-box,.ad-break,.ad-btn,.ad-btn-heading,.ad-button,.ad-cell,.ad-column,.ad-container,.ad-container-300x250,.ad-container-728x90,.ad-container-994x282,.ad-content,.ad-context,.ad-disclaimer,.ad-display,.ad-div,.ad-enabled,.ad-feedback,.ad-filler,.ad-flex,.ad-footer,.ad-footer-leaderboard,.ad-forum,.ad-google,.ad-graphic-large,.ad-gray,.ad-hdr,.ad-head,.ad-header,.ad-heading,.ad-holder,.ad-homeleaderboard,.ad-img,.ad-in-post,.ad-index-main,.ad-inline,.ad-island,.ad-label,.ad-leaderboard,.ad-links,.ad-lrec,.ad-medium,.ad-medium-two,.ad-mpl,.ad-mpu,.ad-msn,.ad-note,.ad-notice,.ad-other,.ad-permalink,.ad-place-active,.ad-placeholder,.ad-postText,.ad-poster,.ad-priority,.ad-rect,.ad-rectangle,.ad-rectangle-text,.ad-related,.ad-rh,.ad-ri,.ad-right,.ad-right-header,.ad-right-txt,.ad-row,.ad-section,.ad-show-label,.ad-side,.ad-sidebar,.ad-sidebar-outer,.ad-sidebar300,.ad-sky,.ad-skyscr,.ad-skyscraper,.ad-slot,.ad-slot-234-60,.ad-slot-300-250,.ad-slot-728-90,.ad-source,.ad-space,.ad-space-mpu-box,.ad-space-topbanner,.ad-spot,.ad-square,.ad-square300,.ad-squares,.ad-statement,.ad-story-inject,.ad-tabs,.ad-text,.ad-text-links,.ad-tile,.ad-title,.ad-top,.ad-top-left,.ad-unit,.ad-unit-300,.ad-unit-300-wrapper,.ad-unit-anchor,.ad-unit-top,.ad-vert,.ad-vertical-container,.ad-vtu,.ad-widget-list,.ad-with-us,.ad-wrap,.ad-wrapper,.ad-zone,.ad-zone-s-q-l,.ad.super,.ad0,.ad08,.ad08sky,.ad1,.ad10,.ad100,.ad120,.ad120x240backgroundGray,.ad120x600,.ad125,.ad140,.ad160,.ad160600,.ad160x600,.ad160x600GrayBorder,.ad18,.ad19,.ad2,.ad21,.ad230,.ad250,.ad250c,.ad3,.ad300,.ad300250,.ad300_250,.ad300x100,.ad300x250,.ad300x250-hp-features,.ad300x250Module,.ad300x250Top,.ad300x250_container,.ad300x250box,.ad300x50-right,.ad300x600,.ad310,.ad315,.ad336x280,.ad343x290,.ad4,.ad400right,.ad450,.ad468,.ad468_60,.ad468x60,.ad540x90,.ad6,.ad600,.ad620x70,.ad626X35,.ad7,.ad728,.ad728_90,.ad728x90,.ad728x90_container,.ad8,.ad90x780,.adAgate,.adArea674x60,.adBanner,.adBanner300x250,.adBanner728x90,.adBannerTyp1,.adBannerTypSortableList,.adBannerTypW300,.adBar,.adBgBottom,.adBgMId,.adBgTop,.adBlock,.adBottomLink,.adBottomboxright,.adBox,.adBox1,.adBox230X96,.adBox728X90,.adBoxBody,.adBoxBorder,.adBoxContainer,.adBoxContent,.adBoxInBignews,.adBoxSidebar,.adBoxSingle,.adBwrap,.adCMRight,.adCell,.adColumn,.adCont,.adContTop,.adContainer,.adContour,.adCreative,.adCube,.adDiv,.adElement,.adFender3,.adFrame,.adFtr,.adFullWidthMiddle,.adGoogle,.adHeader,.adHeadline,.adHolder,.adHome300x250,.adHorisontal,.adInNews,.adIsland,.adLabel,.adLeader,.adLeaderForum,.adLeaderboard,.adLeft,.adLoaded,.adLocal,.adMPU,.adMarker,.adMastheadLeft,.adMastheadRight,.adMegaBoard,.adMinisLR,.adMkt2Colw,.adModule,.adModuleAd,.adMpu,.adNewsChannel,.adNoOutline,.adNotice,.adNoticeOut,.adObj,.adPageBorderL,.adPageBorderR,.adPanel,.adPod,.adRect,.adResult,.adRight,.adSKY,.adSelfServiceAdvertiseLink,.adServer,.adSky,.adSky600,.adSkyscaper,.adSkyscraperHolder,.adSlot,.adSpBelow,.adSpace,.adSpacer,.adSplash,.adSponsor,.adSpot,.adSpot-brought,.adSpot-searchAd,.adSpot-textBox,.adSpot-twin,.adSpotIsland,.adSquare,.adSubColPod,.adSummary,.adSuperboard,.adSupertower,.adTD,.adTab,.adTag,.adText,.adTileWrap,.adTiler,.adTitle,.adTopLink,.adTopboxright,.adTout,.adTxt,.adUnit,.adUnitHorz,.adUnitVert,.adUnitVert_noImage,.adWebBoard,.adWidget,.adWithTab,.adWord,.adWrap,.adWrapper,.ad_0,.ad_1,.ad_120x90,.ad_125,.ad_130x90,.ad_160,.ad_160x600,.ad_2,.ad_200,.ad_200x200,.ad_250x250,.ad_250x250_w,.ad_3,.ad_300,.ad_300_250,.ad_300x250,.ad_300x250_box_right,.ad_336,.ad_336x280,.ad_350x100,.ad_350x250,.ad_400x200,.ad_468,.ad_468x60,.ad_600,.ad_728,.ad_728_90b,.ad_728x90,.ad_925x90,.ad_Left,.ad_Right,.ad_ad_300,.ad_amazon,.ad_banner,.ad_banner_border,.ad_bar,.ad_bg,.ad_bigbox,.ad_biz,.ad_block,.ad_block_338,.ad_body,.ad_border,.ad_botbanner,.ad_bottom,.ad_bottom_leaderboard,.ad_bottom_left,.ad_box,.ad_box2,.ad_box_ad,.ad_box_div,.ad_callout,.ad_caption,.ad_column,.ad_column_box,.ad_column_hl,.ad_contain,.ad_container,.ad_content,.ad_content_wide,.ad_contents,.ad_descriptor,.ad_disclaimer,.ad_eyebrow,.ad_footer,.ad_frame,.ad_framed,.ad_front_promo,.ad_gutter_top,.ad_head,.ad_header,.ad_heading,.ad_headline,.ad_holder,.ad_hpm,.ad_info_block,.ad_inline,.ad_island,.ad_jnaught,.ad_label,.ad_launchpad,.ad_leader,.ad_leaderboard,.ad_left,.ad_line,.ad_link,.ad_links,.ad_linkunit,.ad_loc,.ad_lrec,.ad_main,.ad_medrec,.ad_medrect,.ad_middle,.ad_mod,.ad_mpu,.ad_mr,.ad_mrec,.ad_mrec_title_article,.ad_mrect,.ad_news,.ad_note,.ad_notice,.ad_one,.ad_p360,.ad_partner,.ad_partners,.ad_plus,.ad_post,.ad_power,.ad_promo,.ad_rec,.ad_rectangle,.ad_right,.ad_right_col,.ad_row,.ad_row_bottom_item,.ad_side,.ad_sidebar,.ad_skyscraper,.ad_slug,.ad_slug_table,.ad_space,.ad_space_300_250,.ad_spacer,.ad_sponsor,.ad_sponsoredsection,.ad_spot_b,.ad_spot_c,.ad_square_r,.ad_square_top,.ad_sub,.ad_tag_middle,.ad_text,.ad_text_w,.ad_title,.ad_top,.ad_top_leaderboard,.ad_top_left,.ad_topright,.ad_tower,.ad_unit,.ad_unit_rail,.ad_url,.ad_warning,.ad_wid300,.ad_wide,.ad_wrap,.ad_wrapper,.ad_wrapper_fixed,.ad_wrapper_top,.ad_wrp,.ad_zone,.adarea,.adarea-long,.adbanner,.adbannerbox,.adbannerright,.adbar,.adboard,.adborder,.adbot,.adbottom,.adbottomright,.adbox-outer,.adbox-wrapper,.adbox_300x600,.adbox_366x280,.adbox_468X60,.adbox_bottom,.adbox_br,.adboxclass,.adbreak,.adbug,.adbutton,.adbuttons,.adcode,.adcol1,.adcol2,.adcolumn,.adcolumn_wrapper,.adcont,.adcopy,.add_300x250,.addiv,.adenquire,.adfieldbg,.adfoot,.adfootbox,.adframe,.adhead,.adhead_h,.adhead_h_wide,.adheader,.adheader100,.adhi,.adhint,.adholder,.adhoriz,.adi,.adiframe,.adinfo,.adinside,.adintro,.adits,.adjlink,.adkicker,.adkit,.adkit-advert,.adkit-lb-footer,.adlabel-horz,.adlabel-vert,.adlabelleft,.adleader,.adleaderboard,.adleft1,.adline,.adlink,.adlinks,.adlist,.adlnklst,.admarker,.admediumred,.admedrec,.admessage,.admodule,.admpu,.admpu-small,.adnation-banner,.adnotice,.adops,.adp-AdPrefix,.adpadding,.adpane,.adpic { display:none !important; } .adprice,.adproxy,.adrec,.adright,.adroot,.adrotate_widget,.adrow,.adrow-post,.adrow1box1,.adrow1box3,.adrow1box4,.adrule,.ads-125,.ads-300,.ads-728x90-wrap,.ads-ads-top,.ads-banner,.ads-below-content,.ads-categories-bsa,.ads-custom,.ads-favicon,.ads-item,.ads-links-general,.ads-mpu,.ads-outer,.ads-profile,.ads-right,.ads-section,.ads-sidebar,.ads-sky,.ads-small,.ads-sponsors,.ads-stripe,.ads-text,.ads-top,.ads-wide,.ads-widget,.ads-widget-partner-gallery,.ads03,.ads160,.ads1_250,.ads2,.ads24Block,.ads3,.ads300,.ads460,.ads460_home,.ads468,.ads728,.ads728x90,.adsArea,.adsBelowHeadingNormal,.adsBlock,.adsBottom,.adsBox,.adsCell,.adsCont,.adsDiv,.adsFull,.adsImages,.adsInsideResults_v3,.adsMPU,.adsMiddle,.adsRight,.adsTextHouse,.adsTop,.adsTower2,.adsTowerWrap,.adsWithUs,.ads_125_square,.ads_180,.ads_300,.ads_300x250,.ads_320,.ads_337x280,.ads_728x90,.ads_big,.ads_big-half,.ads_box,.ads_box_headline,.ads_brace,.ads_catDiv,.ads_container,.ads_disc_anchor,.ads_disc_leader,.ads_disc_lwr_square,.ads_disc_skyscraper,.ads_disc_square,.ads_div,.ads_footer,.ads_header,.ads_holder,.ads_horizontal,.ads_leaderboard,.ads_lr_wrapper,.ads_medrect,.ads_mpu,.ads_outer,.ads_rectangle,.ads_remove,.ads_right,.ads_rightbar_top,.ads_sc_bl_i,.ads_sc_tb,.ads_sc_tl_i,.ads_show_if,.ads_side,.ads_sidebar,.ads_singlepost,.ads_spacer,.ads_takeover,.ads_title,.ads_top,.ads_top_promo,.ads_tr,.ads_verticalSpace,.ads_vtlLink,.ads_widesky,.ads_wrapperads_top,.adsafp,.adsbg300,.adsblockvert,.adsborder,.adsbottom,.adsbox,.adsboxitem,.adsbyyahoo,.adsc,.adscaleAdvert,.adsclick,.adscontainer,.adscreen,.adsd_shift100,.adsection_a2,.adsection_c2,.adsense-468,.adsense-ad,.adsense-category,.adsense-category-bottom,.adsense-googleAds,.adsense-heading,.adsense-overlay,.adsense-post,.adsense-right,.adsense-title,.adsense3,.adsense300,.adsenseAds,.adsenseBlock,.adsenseContainer,.adsenseGreenBox,.adsenseInPost,.adsenseList,.adsense_bdc_v2,.adsense_mpu,.adsensebig,.adsenseblock,.adsenseblock_bottom,.adsenseblock_top,.adsenselr,.adsensem_widget,.adsensesq,.adsenvelope,.adset,.adsforums,.adsghori,.adsgvert,.adshome,.adside,.adsidebox,.adsider,.adsingle,.adsleft,.adsleftblock,.adslink,.adslogan,.adsmalltext,.adsmessage,.adsnippet_widget,.adsp,.adspace,.adspace-MR,.adspace-widget,.adspace180,.adspace_bottom,.adspace_buysell,.adspace_rotate,.adspace_skyscraper,.adspacer,.adspot,.adspot728x90,.adstextpad,.adstitle,.adstop,.adstory,.adstrip,.adtab,.adtable,.adtag,.adtech,.adtext,.adtext_gray,.adtext_horizontal,.adtext_onwhite,.adtext_vertical,.adtile,.adtips,.adtips1,.adtop,.adtravel,.adtxt,.adtxtlinks,.adunit,.adv-mpu,.adver,.adverTag,.adverTxt,.adver_cont_below,.advert-300-side,.advert-300x100-side,.advert-728x90,.advert-article-bottom,.advert-bannerad,.advert-bg-250,.advert-bloggrey,.advert-box,.advert-btm,.advert-head,.advert-horizontal,.advert-iab-300-250,.advert-iab-468-60,.advert-mpu,.advert-skyscraper,.advert-text,.advert-title,.advert-txt,.advert120,.advert300,.advert300x250,.advert300x300,.advert300x440,.advert4,.advert5,.advert8,.advertColumn,.advertCont,.advertContainer,.advertContent,.advertHeadline,.advertIslandWrapper,.advertRight,.advertSuperBanner,.advertText,.advertTitleSky,.advert_336,.advert_468x60,.advert_box,.advert_cont,.advert_container,.advert_djad,.advert_google_content,.advert_google_title,.advert_home_300,.advert_label,.advert_leaderboard,.advert_list,.advert_note,.advert_surr,.advert_top,.advertheader-red,.advertise,.advertise-here,.advertise-homestrip,.advertise-horz,.advertise-inquiry,.advertise-leaderboard,.advertise-list,.advertise-top,.advertise-vert,.advertiseContainer,.advertiseText,.advertise_ads,.advertise_here,.advertise_link,.advertise_link_sidebar,.advertisement,.advertisement-728x90,.advertisement-block,.advertisement-sidebar,.advertisement-space,.advertisement-sponsor,.advertisement-swimlane,.advertisement-text,.advertisement-top,.advertisement300x250,.advertisement468,.advertisementBox,.advertisementColumnGroup,.advertisementContainer,.advertisementHeader,.advertisementLabel,.advertisementPanel,.advertisementText,.advertisement_300x250,.advertisement_btm,.advertisement_caption,.advertisement_g,.advertisement_header,.advertisement_horizontal,.advertisement_top,.advertiser,.advertiser-links,.advertisespace_div,.advertising-banner,.advertising-header,.advertising-leaderboard,.advertising-local-links,.advertising2,.advertisingTable,.advertising_block,.advertising_images,.advertisment,.advertisment_bar,.advertisment_caption,.advertisment_two,.advertize,.advertize_here,.advertorial,.advertorial-2,.advertorial-promo-box,.advertorial_red,.advertorialtitle,.adverts,.adverts-125,.adverts_RHS,.advt,.advt-banner-3,.advt-block,.advt-sec,.advt300,.advt720,.adwhitespace,.adwordListings,.adwords,.adwordsHeader,.adwrap,.adwrapper,.adwrapper-lrec,.adwrapper948,.adzone-footer,.adzone-sidebar,.affiliate-link,.affiliate-sidebar,.affiliateAdvertText,.affinityAdHeader,.afsAdvertising,.after_ad,.agi-adsaleslinks,.alb-content-ad,.alignads,.alt_ad,.anchorAd,.another_text_ad,.answer_ad_content,.aolSponsoredLinks,.aopsadvert,.apiAdMarkerAbove,.apiAds,.app_advertising_skyscraper,.archive-ads,.art_ads,.article-ad-box,.article-ads,.article-content-adwrap,.articleAd,.articleAd300x250,.articleAds,.articleAdsL,.articleEmbeddedAdBox,.article_ad,.article_adbox,.article_mpu_box,.article_page_ads_bottom,.articleads,.aseadn,.aux-ad-widget-1,.aux-ad-widget-2,.b-astro-sponsored-links_horizontal,.b-astro-sponsored-links_vertical,.b_ads_cont,.b_ads_top,.banmanad,.banner-468x60,.banner-ad,.banner-ads,.banner-advert,.banner-adverts,.banner-buysellads,.banner160x600,.banner300by250,.banner300x100,.banner300x250,.banner468,.banner468by60,.banner728x90,.bannerAd,.bannerAdWrapper300x250,.bannerAdWrapper730x86,.bannerAdvert,.bannerRightAd,.banner_300x250,.banner_728x90,.banner_ad,.banner_ad_footer,.banner_ad_leaderboard,.bannerad,.bannerad-125tower,.bannerad-468x60,.barkerAd,.base-ad-mpu,.base_ad,.base_printer_widgets_AdBreak,.bg-ad-link,.bgnavad,.big-ads,.bigAd,.big_ad,.big_ads,.bigad,.bigad2,.bigbox_ad,.bigboxad,.billboard300x250,.billboard_ad,.biz-ad,.biz-ads,.biz-adtext,.blk_advert,.block-ad,.block-ad300,.block-admanager,.block-ads-bottom,.block-ads-top,.block-adsense,.block-adsense-managed,.block-adspace-full,.block-deca_advertising,.block-google_admanager,.block-openads,.block-openadstream,.block-openx,.block-thirdage-ads,.block-wtg_adtech,.blockAd,.blockAds,.block_ad,.block_ad_sb_text,.block_ad_sponsored_links,.block_ad_sponsored_links-wrapper,.block_ad_sponsored_links_localized,.blockad,.blocked-ads,.blog-ad-leader-inner,.blog-ads-container,.blogAd,.blogAdvertisement,.blogArtAd,.blogBigAd,.blog_ad,.blogads,.blox3featuredAd,.body_ad,.body_sponsoredresults_bottom,.body_sponsoredresults_middle,.body_sponsoredresults_top,.bodyads,.bodyads2,.bookseller-header-advt,.bottom-ad,.bottom-ad-fr,.bottomAd,.bottomAds,.bottom_ad,.bottom_ad_block,.bottom_ads,.bottom_adsense,.bottomad,.bottomads,.bottomadvert,.bottombarad,.bottomrightrailAd,.bottomvidad,.box-ad,.box-ad-grey,.box-ads,.box-adsense,.boxAd,.boxAds,.boxAdsInclude,.box_ad,.box_ad_container,.box_ad_content,.box_ad_spacer,.box_ad_wrap,.box_ads,.box_advertising,.box_advertisment_62_border,.box_content_ad,.box_content_ads,.box_textads,.boxad,.boxads,.boxyads,.bps-ad-wrapper,.bps-advertisement,.bps-advertisement-inline-ads,.br-ad,.breakad_container,.brokerad,.bsa_ads,.btm_ad,.btn-ad,.bullet-sponsored-links,.bullet-sponsored-links-gray,.burstContentAdIndex,.busrep_poll_and_ad_container,.buttonAd,.buttonAds,.button_ads,.button_advert,.buttonadbox,.buttonads,.bx_ad,.bx_ad_right,.cA-adStrap,.cColumn-TextAdsBox,.cLeftTextAdUnit,.c_ligatus_nxn,.calloutAd,.carbonad,.carbonad-tag,.care2_adspace,.catalog_ads,.category-ad,.categorySponsorAd,.category__big_game_container_body_games_advertising,.cb-ad-banner,.cb-ad-container,.cb_ads,.cb_navigation_ad,.cbstv_ad_label,.cbzadvert,.cbzadvert_block,.cdAdTitle,.cdmainlineSearchAdParent,.cdsidebarSearchAdParent,.centerAd,.center_ad,.centerad,.centered-ad,.chitikaAdCopy,.cinemabotad,.classifiedAdThree,.clearerad,.cmAdFind,.cm_ads,.cms-Advert,.cnbc_badge_banner_ad_area,.cnbc_banner_ad_area,.cnbc_leaderboard_ad,.cnn160AdFooter,.cnnAd,.cnnMosaic160Container,.cnnStoreAd,.cnnStoryElementBoxAd,.cnnWCAdBox,.cnnWireAdLtgBox,.cnn_728adbin,.cnn_adcntr300x100,.cnn_adcntr728x90,.cnn_adspc336cntr,.cnn_adtitle,.cntrad,.column2-ad,.columnBoxAd,.columnRightAdvert,.com-ad-server,.comment-ad,.comment-ad-wrap,.comment-advertisement,.comment_ad_box,.common_advertisement_title,.communityAd,.conTSponsored,.conductor_ad,.confirm_ad_left,.confirm_ad_right,.confirm_leader_ad,.consoleAd,.container-adwords,.containerSqAd,.container_serendipity_plugin_google_adsense,.content-ad,.content-ads,.content-advert,.contentAd,.contentAdFoot,.contentAdsWrapper,.content_ad,.content_ad_728,.content_adsense,.content_adsq,.content_tagsAdTech,.contentad,.contentad-home,.contentad300x250,.contentad_right_col,.contentadcontainer,.contentadfloatl,.contentadleft,.contentads,.contentadstartpage,.contenttextad,.contest_ad,.cp_ad,.cpmstarHeadline,.cpmstarText,.create_ad,.cs-mpu,.cscTextAd,.cse_ads,.cspAd,.ct_ad,.ctnAdSkyscraper,.ctnAdSquare300,.cube-ad,.cubeAd,.cube_ads,.currency_ad,.custom_ads,.cwAdvert,.cxAdvertisement,.darla_ad,.dart-ad,.dartAdImage,.dart_ad,.dart_tag,.dartadvert,.dartiframe,.dc-ad,.dcAdvertHeader,.deckAd,.deckads,.detail-ads,.detailMpu,.detail_ad,.detail_top_advert,.dfrads,.displayAdSlot,.divAd,.divAdright,.divad1,.divad2,.divad3,.divads,.divider_ad,.dlSponsoredLinks,.dmco_advert_iabrighttitle,.downloadAds,.download_ad,.downloadad,.dsq_ad,.dualAds,.dynamic-ads,.dynamic_ad,.e-ad,.ec-ads,.ec-ads-remove-if-empty,.em-ad,.em_ads_box_dynamic_remove,.embed-ad,.embeddedAd,.entry-body-ad,.entry-injected-ad,.entry_sidebar_ads,.entryad,.ez-clientAd,.f_Ads,.feature_ad,.featuredAds,.featured_ad,.featuredadvertising,.fireplaceadleft,.fireplaceadright,.fireplaceadtop,.firstpost_advert_container,.flagads,.flash-advertisement,.flash_ad,.flash_advert,.flashad,.flexiad,.flipbook_v2_sponsor_ad,.floatad,.floated_right_ad,.floatingAds,.fm-badge-ad,.fns_td_wrap,.fold-ads,.footad,.footer-ad,.footerAd,.footerAdModule,.footerAds,.footerAdslot,.footerAdverts,.footerTextAd,.footer_ad,.footer_ad336,.footer_ads,.footer_block_ad,.footer_bottomad,.footer_line_ad,.footer_text_ad,.footerad,.forumtopad,.freedownload_ads,.frn_adbox,.frn_cont_adbox,.frontads,.frontpage-google-ad,.ft-ad,.ftdAdBar,.ftdContentAd,.full_ad_box,.fullbannerad,.g3rtn-ad-site,.gAdRows,.gAdSky,.gAdvertising,.g_ggl_ad,.ga-ads,.ga-textads-bottom,.ga-textads-top,.gaTeaserAds,.gaTeaserAdsBox,.gads,.gads_cb,.gads_container,.gallery_ad,.gam_ad_slot,.gameAd,.gamesPage_ad_content,.gbl_advertisement,.gen_side_ad,.gglAds,.global_banner_ad,.googad,.googads,.google-ad,.google-ad-container,.google-ads,.google-ads-boxout,.google-ads-slim,.google-adsense,.google-right-ad,.google-sponsored-ads,.google-sponsored-link,.google468,.google468_60,.googleAd,.googleAd-content,.googleAd-list,.googleAd300x250_wrapper,.googleAdBox,.googleAdSense,.googleAdSenseModule,.googleAd_body,.googleAds,.googleAds_article_page_above_comments,.googleAdsense,.googleContentAds,.googleProfileAd,.googleSearchAd_content,.googleSearchAd_sidebar,.google_ad,.google_ad_wide,.google_add_container,.google_ads,.google_ads_bom_title,.google_ads_content,.google_adsense_footer,.googlead,.googleaddiv,.googleaddiv2,.googleads,.googleads_300x250,.googleads_title,.googleadsense,.googleafc,.googley_ads,.gpAdBox,.gpAds,.gradientAd,.grey-ad-line,.group_ad,.gsAd,.gsfAd,.gt_ad,.gt_ad_300x250,.gt_ad_728x90,.gt_adlabel,.gutter-ad-left,.gutter-ad-right,.gx_ad,.h-ad-728x90-bottom,.h_Ads,.h_ad,.half-ad,.half_ad_box,.hcf-ad-rectangle,.hcf-cms-ad,.hd_advert,.hdr-ads,.header-ad,.header-advert,.header-taxonomy-image-sponsor,.headerAd,.headerAdCode,.headerAds,.headerAdvert,.headerTextAd,.header_ad,.header_ad_center,.header_ad_div,.header_ads,.header_advertisement,.header_advertisment,.headerad,.headerad-720,.hi5-ad,.highlightsAd,.hm_advertisment,.hn-ads,.home-ad-links,.homeAd,.homeAd1,.homeAd2,.homeAdBoxA,.homeAdBoxBetweenBlocks,.homeAdBoxInBignews,.homeAdSection,.homeMediumAdGroup,.home_ad_bottom,.home_advertisement,.home_mrec_ad,.homead,.homepage-ad,.homepage300ad,.homepageFlexAdOuter,.homepageMPU,.homepage_middle_right_ad,.homepageinline_adverts,.hor_ad,.horiz_adspace,.horizontalAd,.horizontal_ad,.horizontal_ads,.horizontaltextadbox,.horizsponsoredlinks,.hortad,.houseAd1,.houseAdsStyle,.housead,.hoverad,.hp-col4-ads,.hp2-adtag,.hp_ad_cont,.hp_ad_text,.hp_t_ad,.hp_w_ad,.hpa-ad1,.html-advertisement,.ic-ads,.ico-adv,.idMultiAd,.image-advertisement,.imageAd,.imageads,.imgad,.in-page-ad,.in-story-ads,.in-story-text-ad,.inStoryAd-news2,.indEntrySquareAd,.indie-sidead,.indy_googleads,.inhousead,.inline-ad,.inline-mpu,.inline-mpu-left,.inlineSideAd,.inline_ad,.inline_ad_title,.inlinead,.inlineadsense,.inlineadtitle,.inlist-ad,.inlistAd,.inner-advt-banner-3,.innerAds,.innerad,.inpostad,.insert_advertisement,.insertad,.insideStoryAd,.inteliusAd_image,.interest-based-ad,.internalAdsContainer,.iprom-ad,.is24-adplace,.isAd,.islandAd,.islandAdvert,.islandad,.itemAdvertise,.jimdoAdDisclaimer,.jp-advertisment-promotional,.js-advert,.kdads-empty,.kdads-link,.kw_advert,.kw_advert_pair,.l_ad_sub,.label-ad,.labelads,.largeRecAdNewsContainerRight,.largeRectangleAd,.largeUnitAd,.large_ad,.lastRowAd,.lcontentbox_ad,.leadAd,.leaderAdSlot,.leaderAdTop,.leaderAdvert,.leaderBoardAdHolder,.leaderOverallAdArea,.leader_ad,.leaderboardAd,.leaderboardAdContainer,.leaderboardAdContainerInner,.leaderboard_ad,.leaderboardad,.leaderboardadtop,.left-ad,.leftAd,.leftAdColumn,.leftAds,.left_ad,.left_ad_box,.left_adlink,.left_ads,.left_adsense,.leftad,.leftadtag,.leftbar_ad_160_600,.leftbarads,.leftbottomads,.leftnavad,.lgRecAd,.lg_ad,.ligatus,.linead,.link_adslider,.link_advertise,.live-search-list-ad-container,.ljad,.local-ads,.log_ads,.logoAds,.logoad,.logoutAd,.longAd,.longAdBox,.lowerAds,.lr-ad,.m-ad-tvguide-box,.m4-adsbygoogle,.m_banner_ads,.macAd,.macad,.main-ad,.main-advert,.main-tabs-ad-block,.mainAd,.mainLinkAd,.main_ad,.main_ad_bg_div,.main_adbox { display:none !important; } .main_ads,.main_intro_ad,.map_media_banner_ad,.marginadsthin,.marketing-ad,.masthead_topad,.matador_sidebar_ad_600,.mdl-ad,.media-advert,.mediaAd,.mediaAdContainer,.mediaResult_sponsoredSearch,.medium-rectangle-ad,.mediumRectangleAdvert,.medium_ad,.medrect_ad,.member-ads,.menuItemBannerAd,.menueadimg,.messageBoardAd,.mf-ad300-container,.micro_ad,.mid_ad,.mid_page_ad,.midad,.middleAds,.middleads,.min_navi_ad,.mini-ad,.miniad,.mmc-ad,.mmcAd_Iframe,.mod-ad-lrec,.mod-ad-n,.mod-adopenx,.mod-vertical-ad,.mod_admodule,.module-ad,.module-ad-small,.module-ads,.module-sponsored-ads,.moduleAd,.moduleAdvertContent,.module_ad,.module_box_ad,.modulegad,.moduletable-advert,.moduletable-googleads,.moduletablesquaread,.mpu,.mpu-ad,.mpu-ad-con,.mpu-advert,.mpu-footer,.mpu-fp,.mpu-title,.mpu-top-left,.mpu-top-left-banner,.mpu-top-right,.mpu01,.mpuAd,.mpuAdSlot,.mpuAdvert,.mpuArea,.mpuBox,.mpuContainer,.mpuHolder,.mpuTextAd,.mpu_ad,.mpu_advert,.mpu_container,.mpu_gold,.mpu_holder,.mpu_platinum,.mpu_side,.mpu_text_ad,.mpuad,.mpuholderportalpage,.mrec_advert,.ms-ads-link,.msfg-shopping-mpu,.mvw_onPageAd1,.mwaads,.my-ad250x300,.nSponsoredLcContent,.nSponsoredLcTopic,.nadvt300,.narrow_ad_unit,.narrow_ads,.navAdsBanner,.navBads,.nav_ad,.navadbox,.navcommercial,.navi_ad300,.naviad,.nba300Ad,.nbaT3Ad160,.nbaTVPodAd,.nbaTwo130Ads,.nbc_ad_carousel_wrp,.newPex_forumads,.newTopAdContainer,.newad,.newsAd,.news_article_ad_google,.newsviewAdBoxInNews,.nf-adbox,.nn-mpu,.noAdForLead,.normalAds,.nrAds,.nsAdRow,.nu2ad,.oas-ad,.oas-bottom-ads,.oas_ad,.oas_advertisement,.offer_sponsoredlinks,.oio-banner-zone,.oio-link-sidebar,.oio-zone-position,.on_single_ad_box,.onethirdadholder,.openads,.openadstext_after,.openx,.openx-ad,.openx_ad,.osan-ads,.other_adv2,.outermainadtd1,.ovAdPromo,.ovAdSky,.ovAdartikel,.ov_spns,.ovadsenselabel,.pageAds,.pageBottomGoogleAd,.pageGoogleAd,.pageGoogleAdFlat,.pageGoogleAdSubcontent,.pageGoogleAds,.pageGoogleAdsContainer,.pageLeaderAd,.page_content_right_ad,.pagead,.pageads,.pagenavindexcontentad,.paneladvert,.partner-ad,.partner-ads-container,.partnersTextLinks,.pencil_ad,.player_ad_box,.player_hover_ad,.player_page_ad_box,.plista_inimg_box,.pm-ad,.pmad-in2,.pnp_ad,.pod-ad-300,.podRelatedAdLinksWidget,.podSponsoredLink,.portalCenterContentAdBottom,.portalCenterContentAdMiddle,.portalCenterContentAdTop,.portal_searchresultssponsoredlist,.portalcontentad,.post-ad,.postAd,.post_ad,.post_ads,.post_sponsor_unit,.postbit_adbit_register,.postbit_adcode,.postgroup-ads,.postgroup-ads-middle,.prebodyads,.premium_ad_container,.promoAd,.promoAds,.promo_ad,.ps-ligatus_placeholder,.pub_300x250,.pub_300x250m,.pub_728x90,.publication-ad,.publicidad,.puff-advertorials,.qa_ad_left,.qm-ad-content,.qm-ad-content-news,.quigo-ad,.qzvAdDiv,.r_ad_1,.r_ad_box,.r_ads,.rad_container,.rect_ad_module,.rectad,.rectangle-ad,.rectangleAd,.rectanglead,.redads_cont,.regular_728_ad,.regularad,.relatedAds,.related_post_google_ad,.remads,.resourceImagetAd,.result_ad,.reviewMidAdvertAlign,.rght300x250,.rhads,.rhs-ad,.rhs-ads-panel,.rhs-advert-container,.rhs-advert-link,.rhs-advert-title,.right-ad,.right-ad-holder,.right-ad2,.right-ads,.right-ads2,.right-sidebar-box-ad,.rightAd,.rightAdBox,.rightAdverts,.rightColAd,.rightColumnRectAd,.rightRailAd,.right_ad,.right_ad_160,.right_ad_box,.right_ad_common_block,.right_ad_text,.right_ad_top,.right_ads,.right_ads_column,.right_box_ad_rotating_container,.right_col_ad,.right_hand_advert_column,.right_side-partyad,.rightad,.rightad_1,.rightad_2,.rightadbox1,.rightads,.rightadunit,.rightcol_boxad,.rightcoladvert,.rightcoltowerad,.rightmenu_ad,.rnav_ad,.rngtAd,.rot_ads,.roundedCornersAd,.roundingrayboxads,.rt_ad1_300x90,.rt_ad_300x250,.rt_ad_call,.s2k_ad,.savvyad_unit,.sb-ad-sq-bg,.sbAd,.sbAdUnitContainer,.sb_ad_holder,.sb_adsN,.sb_adsNv2,.sb_adsW,.sb_adsWv2,.scanAd,.scc_advert,.sci-ad-main,.sci-ad-sub,.search-ad,.search-results-ad,.search-sponsor,.search-sponsored,.searchAd,.searchAdTop,.searchAds,.searchSponsoredResultsBox,.searchSponsoredResultsList,.search_column_results_sponsored,.search_results_sponsored_top,.section-ad2,.section_mpu_wrapper,.section_mpu_wrapper_wrapper,.selfServeAds,.sepContentAd,.serp_sponsored,.servsponserLinks,.shoppingGoogleAdSense,.showAd_No,.showAd_Yes,.showcaseAd,.sidbaread,.side-ad,.side-ads,.side-sky-banner-160,.sideAd,.sideBoxAd,.side_ad,.side_ad2,.side_ad_1,.side_ad_2,.side_ad_3,.sidead,.sideads,.sideadsbox,.sideadvert,.sidebar-ad,.sidebar-ads,.sidebar-content-ad,.sidebar-text-ad,.sidebarAd,.sidebarAdUnit,.sidebarAdvert,.sidebar_ad,.sidebar_ad_300_250,.sidebar_ads,.sidebar_ads_336,.sidebar_adsense,.sidebar_box_ad,.sidebarad,.sidebarad_bottom,.sidebaradbox,.sidebarads,.sidebarboxad,.sideheadnarrowad,.sideheadsponsorsad,.single-google-ad,.singleAd,.singleAdsContainer,.single_ad,.singlead,.singleadstopcstm2,.site_ad_120_600,.site_ad_300x250,.sitesponsor,.skinAd,.skin_ad_638,.sky-ad,.skyAd,.skyAdd,.skyAdvert,.skyAdvert2,.sky_ad,.sky_scraper_ad,.skyad,.skyjobsadtext,.skyscraper-ad,.skyscraper_ad,.skyscraper_bannerAdHome,.sleekadbubble,.slideshow-ad,.slpBigSlimAdUnit,.slpSquareAdUnit,.sm_ad,.smallSkyAd1,.smallSkyAd2,.small_ad,.small_ads,.smallad-left,.smallads,.smallsponsorad,.smart_ads_bom_title,.spLinks,.specialAd175x90,.speedyads,.sphereAdContainer,.spl-ads,.spl_ad,.spl_ad2,.spl_ad_plus,.splitAd,.splitAdResultsPane,.sponlinkbox,.spons-link,.spons_links,.sponslink,.sponsor-ad,.sponsor-link,.sponsor-links,.sponsor-services,.sponsorPanel,.sponsorPost,.sponsorPostWrap,.sponsorStrip,.sponsor_ad_area,.sponsor_area,.sponsor_columns,.sponsor_footer,.sponsor_line,.sponsor_links,.sponsor_logo,.sponsoradtitle,.sponsored-ads,.sponsored-chunk,.sponsored-editorial,.sponsored-features,.sponsored-links,.sponsored-links-alt-b,.sponsored-links-holder,.sponsored-links-right,.sponsored-post,.sponsored-post_ad,.sponsored-results,.sponsored-right-border,.sponsored-text,.sponsoredBox,.sponsoredInfo,.sponsoredInner,.sponsoredLabel,.sponsoredLink,.sponsoredLinks,.sponsoredLinks2,.sponsoredLinksHeader,.sponsoredProduct,.sponsoredResults,.sponsoredSideInner,.sponsored_ads,.sponsored_box,.sponsored_box_search,.sponsored_by,.sponsored_link,.sponsored_links,.sponsored_links_title_container,.sponsored_links_title_container_top,.sponsored_links_top,.sponsored_result,.sponsored_results,.sponsored_well,.sponsoredibbox,.sponsoredlink,.sponsoredlinks,.sponsoredlinkscontainer,.sponsoredresults,.sponsoredtextlink_container_ovt,.sponsoring_link,.sponsorlink,.sponsorlink2,.sponsormsg,.sport-mpu-box,.spotlightAd,.squareAd,.square_ad,.square_banner_ad,.squared_ad,.ss-ad-mpu,.standard-ad,.start__newest__big_game_container_body_games_advertising,.staticAd,.stickyAdLink,.stock-ticker-ad-tag,.stocks-ad-tag,.store-ads,.story_AD,.story_ad_div,.story_right_adv,.storyad,.subad,.subadimg,.subcontent-ad,.subtitle-ad-container,.sugarad,.super-ad,.supercommentad_left,.supercommentad_right,.supp-ads,.supportAdItem,.surveyad,.t10ad,.tab_ad,.tab_ad_area,.tablebordersponsor,.tadsanzeige,.tadsbanner,.tadselement,.tallad,.tblTopAds,.tbl_ad,.tbox_ad,.td-Adholder,.td-TrafficWeatherWidgetAdGreyBrd,.teaser-sponsor,.teaserAdContainer,.teaser_adtiles,.text-ad,.text-ad-links,.text-ads,.text-advertisement,.text-g-advertisement,.text-g-group-short-rec-ad,.text-g-net-grp-google-ads-article-page,.textAd,.textAdBox,.textAds,.text_ad,.text_ads,.textad,.textadContainer,.textad_headline,.textadbox,.textadheadline,.textadlink,.textads,.textads_left,.textads_right,.textadsds,.textadsfoot,.textadtext,.textlink-ads,.textlinkads,.tf_page_ad_search,.thirdage_ads_300x250,.thirdage_ads_728x90,.thisIsAd,.thisIsAnAd,.ticket-ad,.tileAds,.tips_advertisement,.title-ad,.title_adbig,.tncms-region-ads,.toolad,.toolbar-ad,.top-ad,.top-ad-space,.top-ads,.top-banner-ad,.top-menu-ads,.topAd,.topAdWrap,.topAds,.topAdvertisement,.topAdverts,.topBannerAd,.topLeaderboardAd,.top_Ad,.top_ad,.top_ad_728,.top_ad_728_90,.top_ad_disclaimer,.top_ad_div,.top_ad_post,.top_ad_wrapper,.top_ads,.top_advert,.top_advertisement,.top_advertising_lb,.top_bar_ad,.top_container_ad,.topad,.topad-bar,.topadbox,.topads,.topadspot,.topadvertisementsegment,.topboardads,.topcontentadvertisement,.topic_inad,.topstoriesad,.toptenAdBoxA,.tourFeatureAd,.tower-ad,.towerAd,.towerAdLeft,.towerAds,.tower_ad,.tower_ad_disclaimer,.towerad,.tr-ad-adtech-placement,.tribal-ad,.ts-ad_unit_bigbox,.ts-banner_ad,.ttlAdsensel,.tto-sponsored-element,.tucadtext,.tvs-mpu,.twoColumnAd,.twoadcoll,.twoadcolr,.tx_smartadserver_pi1,.txt-ads,.txtAd,.txtAds,.txt_ads,.txtadvertise,.type_adscontainer,.type_miniad,.type_promoads,.ukAds,.ukn-banner-ads,.under_ads,.undertimyads,.unit-ad,.universalboxADVBOX01,.universalboxADVBOX03,.universalboxADVBOX04a,.usenext,.v5rc_336x280ad,.vert-ads,.vert-adsBlock,.vertad,.vertical-adsense,.vidadtext,.videoAd,.videoBoxAd,.video_ad,.view-promo-mpu-right,.view_rig_ad,.virgin-mpu,.wa_adsbottom,.wantads,.weather_ad,.wide-ad,.wide-skyscraper-ad,.wideAd,.wideAdTable,.wide_ad,.wide_ad_unit_top,.wide_ads,.wide_google_ads,.widget-ad,.widget-ad-codes,.widget-ad300x250,.widget-entry-ads-160,.widgetYahooAds,.widget_ad,.widget_ad_boxes_widget,.widget_ad_rotator,.widget_adrotate_widgets,.widget_advert_widget,.widget_econaabachoadswidget,.widget_island_ad,.widget_maxbannerads,.widget_sdac_bottom_ad_widget,.widget_sdac_footer_ads_widget,.widget_sdac_skyscraper_ad_widget,.wikia-ad,.wikia_ad_placeholder,.wingadblock,.withAds,.wl-ad,.wnMultiAd,.wp125_write_ads_widget,.wp125ad,.wp125ad_2,.wpn_ad_content,.wrap-ads,.wrapper-ad,.wrapper-ad-sidecol,.wsSponsoredLinksRight,.wsTopSposoredLinks,.x03-adunit,.x04-adunit,.x81_ad_detail,.xads-blk-top-hld,.xads-blk2,.xads-ojedn,.y-ads,.y-ads-wide,.y7-advertisement,.yahoo-sponsored,.yahoo-sponsored-links,.yahooAds,.yahoo_ads,.yahooad,.yahooad-image,.yahooad-urlline,.yan-sponsored,.ygrp-ad,.yom-ad,.youradhere,.yrail_ad_wrap,.yrail_ads,.ysmsponsor,.ysponsor,.yw-ad,.zRightAdNote,a[href^="http://ad-apac.doubleclick.net/"],a[href^="http://ad-emea.doubleclick.net/"],a[href^="http://ad.doubleclick.net/"],a[href^="http://adserving.liveuniversenetwork.com/"],a[href^="http://galleries.pinballpublishernetwork.com/"],a[href^="http://galleries.securewebsiteaccess.com/"],a[href^="http://install.securewebsiteaccess.com/"],a[href^="http://latestdownloads.net/download.php?"],a[href^="http://secure.signup-page.com/"],a[href^="http://secure.signup-way.com/"],a[href^="http://www.FriendlyDuck.com/AF_"],a[href^="http://www.adbrite.com/mb/commerce/purchase_form.php?"],a[href^="http://www.firstload.de/affiliate/"],a[href^="http://www.friendlyduck.com/AF_"],a[href^="http://www.google.com/aclk?"],a[href^="http://www.liutilities.com/aff"],a[href^="http://www.liutilities.com/products/campaigns/adv/"],a[href^="http://www.my-dirty-hobby.com/?sub="],a[href^="http://www.ringtonematcher.com/"],#mbEnd[cellspacing="0"][style],#mclip_container:last-child,#rtpl.c[style="margin-top: 11px; padding: 5px 5px 5px 2px;"],#ssmiwdiv[jsdisplay],#tads.c,#tadsb.c,.ch[onclick="ga(this,event)"],.ra[align="left"][width="30%"],.ra[align="right"][width="30%"],a[href^="http://NowDownloadAll.com"],a[href^="http://www.downloadnow.net/"],a[href^="http://www.downloadweb.org/"],a[href^="http://www.FriendlyDuck.com/"],a[href^="http://www.mydownloader.net/"],a[href^="http://www.myvpn.pro/"],a[href^="http://www.quick-torrent.com/download.html?aff"],#AFF_popup,#contener_pginfopop1,#dhm-bar,#FFN_imBox_Container,#floatyContent,#IM_AD,#im_box,#im_popupDiv,#im_popupFixed,#imPopup,#isliveContainer,#PPX_imBox_Container,#psmpopup,.credited_ad,[alt^="Fuckbook"],[href^=" http://www.drowle.com/"],[href^="http://www.drowle.com/"],[href^="http://www.myfreepaysite.com/sfw.php?aid"],[href^="http://www.myfreepaysite.com/sfw_int.php?aid"],[href^="http://www.seekbang.com/cs/"],[href^="http://www.yourfuckbook.com/?"],[id^="YFBMSN"],[onclick^="window.open('http://adultfriendfinder.com/search/"],[src^="http://groovybus.com/gbbanner"],[src^="http://www.groovybus.com/gbbanner"],a[href^="http://c.actiondesk.com/"],a[href^="http://cinema.friendscout24.de?"],a[href^="http://www.adxpansion.com"],[href^="http://www.fbooksluts.com/"],a[href^="http://www.fleshlight.com/"],#header_ad,#aboveAd,#acAdContainer,#ad-1,#ad-120x600-other,#ad-2,#ad-2-160x600,#ad-230x100-1,#ad-3,#ad-3-300x250,#ad-300a,#ad-300b,#ad-300x250-1,#ad-300x250-right0,#ad-300x40-5,#ad-4-300x90,#ad-635x40-1,#ad-7,#ad-728-90,#ad-728x90-top,#ad-advertorial,#ad-area,#ad-banner-top,#ad-banner-wrap,#ad-bg,#ad-big,#ad-block-bottom,#ad-bottom-300x250,#ad-btm,#ad-circfooter,#ad-col,#ad-container,#ad-ear,#ad-five-75x50s,#ad-front-btf,#ad-fullwidth,#ad-giftext,#ad-googleAdSense,#ad-header-left,#ad-header-right,#ad-holder,#ad-lb,#ad-lb-secondary,#ad-leaderboard-1,#ad-leaderboard-1-container,#ad-leaderboard-2,#ad-leaderboard-2-container,#ad-leadertop,#ad-main,#ad-main-bottom,#ad-main-top,#ad-medrec_premium,#ad-mrec2,#ad-new,#ad-other,#ad-placement,#ad-position-a,#ad-post,#ad-rbkua,#ad-recommend,#ad-rian,#ad-right-skyscraper-container,#ad-right2,#ad-right3,#ad-s1,#ad-safe,#ad-sidebar1,#ad-skyscraper-feedback,#ad-sla-sidebar300x250,#ad-spot-one,#ad-stripe,#ad-top-300x250,#ad-tower1,#ad-uprrail1,#ad-wrapper,#ad-wrapper-728x90,#Ad1,#ad1-home,#ad120x600,#ad120x600container,#ad120x60_override,#ad125B,#ad160,#ad160-2,#ad160Container,#ad160Wrapper,#Ad160x600_0_adchoice,#ad180,#AD1line,#ad2,#ad250,#ad2_footer,#ad2_inline,#AD2line,#ad300-title,#ad300text,#Ad300x250_0,#ad300x250_callout,#ad300x250box,#ad300x50,#Ad300x600_0_adchoice,#ad468_hidden,#ad470,#ad520x85,#ad6,#ad728Bottom,#ad728Box,#ad728BoxBtm,#ad728Header,#Ad728x90,#ad728x90,#ad728x90asme,#ad728x90box,#ad76890topContainer,#ad8,#ad_02,#ad_03,#ad_04,#ad_120x600,#ad_160_600,#ad_160_600_2,#ad_250,#ad_250x250,#ad_300_250_inline,#ad_300misc,#ad_300x100,#ad_300x250_container,#ad_728,#ad_8,#ad_88x31,#Ad_976x105,#ad_area,#ad_article_btm,#ad_banner_1,#ad_banner_120x600,#ad_banner_125x300,#ad_banner_468x60,#ad_banner_728x90,#ad_banner_728x90_bot,#ad_banner_bot,#AD_banner_bottom,#ad_bg,#ad_bigbox,#ad_block,#ad_body,#ad_Bottom,#ad_box160a,#ad_box_2,#ad_bucket_med_rectangle_1,#ad_bucket_med_rectangle_2,#ad_cell,#ad_channel,#ad_chitikabanner_120x600LH,#ad_circ_300x300,#ad_container,#ad_creative_2,#ad_creative_3,#ad_creative_5,#ad_div_bottom,#ad_div_top,#ad_feedback,#ad_foot,#ad_footerAd,#ad_global_above_footer,#AD_google,#ad_googlebanner_160x600LH,#ad_grp1,#ad_grp2,#ad_help_link_new,#ad_iframe_300,#ad_img_banner,#ad_infoboard_box,#ad_interestmatch,#ad_interestmatch400,#ad_keywrods,#ad_large,#ad_layer,#ad_layer1,#ad_leader,#ad_leaderboard_1,#ad_left_top,#ad_mast,#ad_messageboard_x10,#ad_new,#ad_NorthBanner,#ad_overture,#ad_ph_1,#ad_placeholder,#ad_plugs,#ad_Position1,#ad_publicidad,#ad_R1,#ad_rail,#AD_rectangle,#ad_Rectangle,#ad_rectangular,#ad_region1,#ad_region2,#ad_region3,#ad_region5,#ad_Right,#ad_right3,#ad_right_rail_flex,#ad_right_skyscraper,#ad_right_top,#ad_rotator-3,#ad_rside,#ad_rside_link,#ad_short,#Ad_Sidebar,#ad_silo,#ad_skyscraper_1,#ad_small,#ad_space_728,#ad_sponsored,#ad_stck,#ad_strip,#ad_text,#AD_Top,#ad_Top,#ad_Top2,#ad_top_728x90,#Ad_TopLeaderboard,#ad_topnav,#ad_video_large,#ad_widget_1,#ad_Wrap,#ad_x10,#ad_YieldManager-160x600,#adA,#adArea,#AdAreaH,#AdBanner,#adbanner1,#adBanner160x610,#AdBanner_S,#adbannerleft,#adbannerright,#adbarbox,#adbard,#AdBlock,#adBlock,#adblock-big,#adblock-small,#adblock1,#adblock2,#adblock4,#adblockbottom,#AdBlockBottomSponsor,#adblockerwarnung,#adblockrighta,#adblocktop { display:none !important; } #AdBottom,#adbottomgao,#AdBox160,#AdBox300,#AdBox728,#adbox728,#adbrite,#adbrite_inline_div,#adButton,#adcenter,#adChoices,#Adcode,#adcode10,#AdColumn,#adcolumn,#adCompanionBanner,#adcontainer125px,#adContainerCC,#adContext,#adcontextlinks,#adControl1,#adcontrolisland,#add720,#add_720bottom,#add_space_google,#add_space_sidebar,#addDiv,#AdDetails_SeeMoreLink,#AdDiv,#adDiv,#ADEXPERT_PUSHDOWN,#ADEXPERT_RECTANGLE,#adfooter_hidden,#AdFoxDiv,#adFrame,#adframe,#AdFrame2,#adframetop,#adfreead,#AdHeader,#adHeader,#adheadhubs,#adHolder,#adholder,#adHolder300x250,#adhomepage,#adIframe,#AdImage,#adInBetweenPosts,#ADInterest,#adlanding,#adlayer,#adLContain,#adlink,#adlove,#adLrec,#adMarketplace,#adMediaWidget,#adMid1,#adMid2,#admiddle3,#admod2,#admon-728x90,#admpu,#AdMPUHome,#adnet,#adnews,#adNshareWrap,#adPanelAjaxUpdate,#AdPanelBigBox,#AdPanelLogo,#adposition-inner-REM1,#adposition-inner-REM3,#adposition-REM2,#adposition-SHADE,#adposition-TVSP,#adposition10,#adPosition14,#adPosition5,#adPosition9,#adpostloader,#adpromo,#adRContain,#adRectangle,#adRight1,#adRight4,#adRight5,#adrightrail,#ads-200x200-a,#ads-300,#ads-by-google,#ads-category,#ads-right-twobottom,#ads-slot,#ads-text,#ads1,#ads300x250,#ads336Box,#Ads470by50,#ads728,#ads72890top,#ads_banner_header,#ads_banner_right1,#ads_big,#ads_by_google,#ads_dynamicShowcase,#ads_horizontal,#ads_insert_container,#ads_lb_frame,#ads_leaderbottom,#ads_mads_r1,#ads_mads_r2,#ads_postdownload,#ads_right,#ads_section_textlinks,#ads_sidebar_bgnd,#ads_space_header,#ads_title,#ads_top2,#ads_wide,#adsBannerFrame,#adsBar,#adsContent,#adsDiv0,#adsDiv1,#adsDiv2,#AdSection,#AdSense,#adsense-468x60,#adsense-area,#AdSense2,#adsense2,#adsense2pos,#adsense_300x250,#adsense_article_bottom,#adsense_inline,#adsense_item_detail,#adsense_testa,#adSenseBottomDiv,#adsensepo,#adsensepos,#adshowbtm,#AdShowcase,#AdShowcase_F,#adsider,#adsIframe,#adSite,#adSkinBackdrop,#adSkyPosition,#adskyscraper_flex,#adSlot,#adSlot3,#adSlug,#adsNarrow,#adspace-2,#adspace-one,#adspace-panorama,#Adspace_Top,#adspace_top,#adspaceRow,#adspecial_offer_box,#adsplace1,#adsplace2,#adsplace4,#adSponsor,#adsponsored_links_box,#adspot-620x45-pos-1,#adspot-620x45-pos-2,#adspot-c,#adspot-d,#adSpot-promobox1,#adSpot-promobox2,#adSpot-twin,#adSpot300x250,#adSpotlightSquare1,#adsProdHighlight_wrap,#adSqb,#adsSPRBlock,#adstext2,#adsTop,#adstripbottom,#adstripnew,#adswidget2-quick-adsense,#adtag,#adTag-genre,#Adtag300x250Bottom,#Adtag300x250Top,#AdTaily_Widget_Container,#adText,#adTop,#adTOPBANNER,#adTopBanner1,#adunit,#adunitl,#adv-box,#adv-container,#adv130x195,#adv160x600,#adv300x250,#Adv8,#Adv9,#adv_box_a,#adv_top,#adver,#advert-ahead,#advert-banner,#advert-banner-wrap,#advert-block,#advert-column,#advert-footer,#advert-footer-hidden,#advert-island,#advert-mpu,#advert-sky,#advert-stickysky,#advert-text,#advert-wrapper,#advert1hp,#advert2,#advert234_container,#advert_01,#advert_04,#advert_05,#advert_07,#advert_561_01,#advert_561_02,#advert_561_03,#advert_561_04_container,#advert_561_04_left_end,#advert_561_04_right_end,#advert_561_05,#advert_561_07,#advert_header,#advert_home02,#advert_home03,#advert_home04,#advert_top,#advert_yell,#advertblock,#advertborder,#advertBoxRight,#advertise_top,#advertiseheretop,#advertiseLink,#advertisement_label,#advertisement_notice,#advertisements,#advertising_header,#advertising_iab,#advertisingLink,#advertisingRightColumn,#advertisment-block-1,#advertleft,#adverts,#AdvertText,#adverttext,#advertTower,#advframe,#advRectangle,#advt-right-skyscraper,#advWrapper,#adwidget,#adwidget1,#adwidget2,#adwidget2_hidden,#adwidget3_hidden,#adwidget_hidden,#adwin,#adwin_re,#adwrapper,#adx_ad,#adzerk2,#adzonebanner,#aetn_3tier_ad_bar,#af_adblock,#affiliate_ad,#agencies_ad,#analytics_banner,#ap_adtext,#apt-homebox-ads,#area13ads,#article-island-ad,#article-sponspred-content,#article_ad_bottom,#article_ad_top,#article_adholder,#article_bottom_ad01,#article_left_ad01,#articleAd,#articleBottomAd,#articleview_ad,#aside_ad,#autos_banner_ad,#awesome-ad,#b5-skyscraper-ad-3,#b5_ad_footer,#b5_ad_sidebar1,#b5_ad_top,#banner01,#banner300-top-right,#banner468,#banner600,#banner975_container,#banner_280_240,#banner_ad_div_fw,#banner_ad_Sponsored,#banner_slot,#banner_spacer,#banner_wrapper_top,#bannerad-bottom,#bannerad-top,#bannerAd2,#bannerAd_rdr,#bannerAdLInk,#bannerads,#banneradspace,#bannerAdWrapper,#bannerGoogle,#bannerhead,#baseboard-ad,#bbccom_leaderboard_container,#bbContentAds,#belowad,#belowheaderad,#big-box-ad,#big_ad,#big_ad_label,#bigad,#bigadspace,#block-ad_cube-0,#block-adsense-0,#block-adsense-2,#block-adsense_managed-0,#block-ex_dart-ex_dart_sidebar_ad_block_bottom,#block-ex_dart-ex_dart_sidebar_ad_block_top,#block-localcom-localcom-ads,#block-openads-13,#block-openads-14,#block-openads-brand,#block-openx-0,#block-openx-1,#block-thewrap_ads_250x300-1,#block-thewrap_ads_250x300-2,#block-thewrap_ads_250x300-3,#block-thewrap_ads_250x300-4,#block-thewrap_ads_250x300-5,#block-thewrap_ads_250x300-6,#block-thewrap_ads_250x300-7,#block_ad,#block_ad2,#block_timeout_sponsored_0,#blog-header-ad,#blog_ad_area,#blogads,#blogImgSponsor,#bn_ad,#bnrAd,#body_ad,#bottom-728-ad,#bottom-banner-spc,#bottom-boxad,#bottom-sky,#bottom-sponsor-add,#BottomAd,#bottomAd300,#bottomadbanner,#bottom-ad-tray,#BottomAdWrapper,#bottomMPU,#bottomsponad,#box-ad,#box2ad,#box_ad_container,#box_ad_middle,#box_advertisement,#box_articlead,#boxAd,#boxad,#boxads,#btmad,#buysellads-4x1,#c4_ad,#c4ad-Top-parent,#cb-ad,#cb_medrect1_div,#center-ads-72980,#central-ads,#chatAdv2,#city_House_Ad_300x137,#clickforad,#clientAds,#closeAdsDiv,#cnnCMAd,#cnnTowerAd,#column-ads-bg,#column2-145x145-ad,#columnAd,#CommonHeaderAd,#companion_Ad,#container-ad-topright,#content-ad,#content_ad_block,#contentAd,#contentAds300x200,#contentarea-ad,#contentarea-ad-widget-area,#ctl00_AdWords,#ctl00_ContentPlaceHolder1_TextAd_Pulse360AdPanel,#ctl00_ctl00_ctl00_tableAdsTop,#ctl00_ctl01_ctl00_tdBannerAd,#ctl00_ctl08_ctl00_tableAdsTop,#ctl00_fc_ctl04_AdControl,#ctl00_fc_ctl06_AdControl,#ctl00_Footer1_v5footerad,#ctl00_FooterHome1_AdFooter1_AdRotatorFooter,#ctl00_Header1_AdHeader1_LabelHeaderScript,#ctl00_mainContent_lblSponsor,#ctl00_tc_ctl04_AdControl,#ctl00_tc_ctl14_AdControl,#ctl00_tc_ctl19_AdControl,#cubead2,#customAd,#d4_ad_google02,#d_AdLink,#dap300x250,#dart_ad_block,#dartad11,#dartad13,#dartad16,#dartad17,#dartad19,#dartad25,#dartad28,#dartad8,#dartad9,#dartIslandAd_2009,#DealsPageSideAd,#devil-ad,#div_ad_holder,#div_content_mid_lft_ads,#div_googlead,#divAd,#divAD1,#DivAdA,#DivAdB,#divAdSpecial,#divupperrightad,#dni-advertising-skyscraper-wrapper,#dnn_ad_skyscraper,#dnn_ad_sponsored_links,#dnn_adSky,#dnn_adTop,#dnn_dnn_dartBanner,#dnn_googleAdsense_a,#dnn_playerAd,#dnn_sponsoredLinks,#dogear_promo,#doubleclick-island,#doubleClickAds3,#dynamicAdWinDiv,#ear_ad,#embedAD,#eshopad-728x90,#feature_gad,#featuread,#featured_sponsor_cnt,#featuredAdWidget,#featuredSponsors,#ffsponsors,#flex_sponsored_links,#flipbookAd,#footAds,#footer-ad-col,#footer-affl,#footer-banner-ad,#footer_ad,#footer_AdArea,#footer_add,#FooterAdBlock,#footerAdContainer,#footerleaderboard,#forumlist-ad,#free_ad,#frmRightnavAd,#frontlowerad,#g-adblock2,#gallery-advert,#gallery_ad,#gallery_header_ad,#galleryad1,#game_header_ad,#game_profile_ad_300_250,#gbl_topmost_ad,#gBnrAd,#genad,#gglads213A,#gglads213B,#ggogle_AD,#gl_ad_300,#glamads,#glinkswrapper,#global_header_ad,#globalLeftNavAd,#globalTopNavAd,#goads,#google-ads-container,#google-adsense,#google-adwords,#google-afc,#google336x280,#google468x60,#GOOGLE_ADS_15,#GOOGLE_ADS_197,#GOOGLE_ADS_2,#GOOGLE_ADS_21,#GOOGLE_ADS_294,#GOOGLE_ADS_339,#GOOGLE_ADS_365,#GOOGLE_ADS_44,#GOOGLE_ADS_48,#google_ads_div_Blog_300,#google_ads_div_Front-160x600,#google_ads_div_Raw_Override,#google_ads_div_Second_160,#google_ads_frame4,#google_ads_frame4_anchor,#google_ads_frame5,#google_ads_frame5_anchor,#google_ads_frame6,#google_ads_frame6_anchor,#google_ads_frame7,#google_adsense,#google_textlinks,#GoogleAd,#googleAD,#googlead01,#googleAd_words,#GoogleAdExploreMF,#googleads1,#GOOGLEADS_BOT,#googleadsrc,#googleAdView,#googlebanner,#googleblock300,#GoogleSponsored,#gpt_unit_videoAdSlot1_0,#H_Ad_728x90,#hd_ad,#hdr-banner-ad,#hdrAdBanner,#head-banner468,#header-ad-block,#header-adsense,#header-banner-spc,#header-google,#header_ad_167,#header_ad_728,#header_ad_leaderboard,#header_adbox,#header_ads_2,#header_advertising,#header_bottom_ad,#header_right_ad,#HeaderAdSidebar,#headeradspace,#headergooglead,#headerTopAdWide,#headingAd,#hi5-ad-1,#hl-top-ad,#hldhdAds,#holder-storyad,#home-ad,#home-ad-block,#home-side-ad,#home_sidebar_ad,#homeArticlesAd,#homeheaderad,#homepage_ad,#homepagead_300x250,#HomepageAdSpace,#homepageadvert,#horadslot,#horizads728,#horizontal-ad,#horizontal-adspace,#horizontal-banner-ad-container,#horizontal_ad2,#HorizontalAd,#hpV2_newsletterAd2,#idRightAdArea,#iframe-ad-container-Top3,#iframe_ad_2,#iframe_ad_300,#iframe_ad_728,#iframe_container300x250,#ignad_medrec,#imu,#in-story-ad-wrapper,#in_post_ad_middle_1,#inc-ads-bigbox,#influads_block,#inlineads,#inlineAdtop,#internalAdvert,#interruptor,#interstitial_ad,#ip-ad-leaderboard,#ip-ad-skyscraper,#ir-sidebar-ad,#island_ad_top,#IslandAd_DeferredAdSpacediv,#islandAdPan,#islandAdPane,#islandAdPane2,#islandAdPaneGoogle,#islandAdSponsored,#item-detail-feature-ad,#itemGroupAd2,#j_special_ad,#ka_adFullBanner,#ka_adMediumRectangle,#landing-adserve,#largeAd,#launchpad-ads-2,#layeradsense,#lb-ad,#lb-sponsor-left,#lb-sponsor-right,#LB_Row_Ad,#lbAdBar,#lbAdBarBtm,#leaderadvert,#leaderboard-sticky,#leaderboard_728x90,#leaderboardAd,#leaderboardad,#leaderboardAdArea,#leaderboardAdSibling,#leaderboardAdTop,#leaderboardn,#LeaderboardNav_ad_placeholder,#left_ads,#leftAd,#leftAd_fmt,#leftAdCol,#leftAdMessage,#leftcolumnad,#leftframeAD,#link_ads,#listing-ad,#LittleAdvert,#load-adslargerect,#logo_ad,#logoAd2,#long-ad-space,#lowerAdvertisement,#lrec,#lrec_ad,#m_top_adblock,#madison_ad_248_100,#main_AD,#main_top_ad,#MainAd,#mainAd,#mainad,#maker-rect-ad,#masthead-ad,#MastheadAd,#mediaAdLeaderboard,#medium-ad,#MediumRectangleAD,#mediumRectangleAd,#medrectangle_banner,#menuad,#mhheader_ad,#microsoft_ad,#midbarad,#middle-story-ad-container,#middle_bannerad,#middle_bannerad_section,#middleads,#middleads2,#midpost_ad,#midRightAds,#miniAdsAd,#mod_ad,#Module-From_Advertisers,#mpu-content,#mpuholder,#mta_bar,#mtSponsor,#multibar-ads,#national_ad,#nationalAd_secondary_top,#nav_ad_728_mid,#navAdBanner,#nbcShowcaseAds,#network_header_ad_1,#newadmpu,#news_left_ad,#news_right_ad,#newTopAds,#nrAds,#nrcAd_Top,#OAS2,#oas_Right2,#OAS_Top,#ofie_ad,#onpageads,#onpageadstext,#openx_iframe,#outerAd300,#outerTwrAd,#outsideAds,#ovAd,#p360_ad_unit,#page_top_ad,#pageAdDiv,#pageOwnershipAd_side,#paidlistingAds,#PanelAd,#parade_300ad,#parade_300ad2,#partner-ad,#partnerMedRec,#pg-ad-item-160x600,#photo_ad_google,#PhotoAd1,#phxcms_top_leaderboard,#player_middle_ad,#pof_ads_Wrapper,#pop_ad,#populate_ad_textupper,#populate_ad_textupper_textlink,#post-ad-layer,#post_adspace,#post_id_ad_bot,#pr_ad,#premier-ad-space,#premium_ad_inside,#premSpons,#preroll_compainion_ad,#PreRollAd,#proj-bottom-ad,#promo_ads,#pulse360_1,#qaSideAd,#quigo,#quigo-ad,#quinAdLeaderboard,#r_ad3_ad,#r_adver,#RadAdSkyscraper,#rail_ad,#recommendedAdContainer,#rectangle_ad_smallgame,#refine-ad,#refreshable_ad5,#reklama_left_body,#reklama_left_up,#reklama_right_up,#related_ads_box,#remove_ads_button1,#remove_ads_button2,#resultsAdsSB,#resultsAdsTop,#rh-ad,#rhsads,#RhsIsland_DeferredAdSpacediv,#right-ad-block,#right-adds,#right-ads,#Right-Skyscraper,#right-wide-skyscraper,#right160x600ads_part,#right_ad,.ad300top,#right_ads_box,#right_adv1-v2,#right_column_ad,#right_top_gad,#rightAd160x600,#rightAd160x600two,#rightAd_Iframe,#rightAdContainer,#rightadd300,#RightAdvertisement,#rightbar_ad,#rightcollongad,#rightColumnAds,#rightDoubleClick,#rightMortgageAd,#rightrail-ad,#RightRailSponsor,#rightskyad,#rotating-ads-wrap,#rr_gallery_ad,#rtm_div_562,#rtm_html_226,#rtm_html_274,#rtm_html_920,#rubicsTextAd,#scrollingads,#sdac_bottom_ad_widget-3,#sdac_footer_ads_widget-3,#sdac_skyscraper_ad_widget-3,#sdac_top_ad_widget-3,#SE20-ad-container,#search-ad,#search-sponsor,#secondBoxAd,#sect-ad-300x250,#section_ad,#self-ad,#self_serve_ads,#sensis_island_ad_1,#sensis_island_ad_1_column,#sensis_island_ad_2,#sensis_island_ad_2_column,#sensis_island_ad_3,#sensis_island_ad_3_column,#show-player-right-ad,#ShowAD,#showcaseAd,#side-ads-box,#side-boxad,#side_ad_call,#side_ads,#side_adverts,#side_longads,#side_skyscraper_ad,#side_sponsors,#sidead1,#sideAds,#sidebar-ad1,#sidebar-ads,#sidebar2-ads,#sidebar_box_add,#sidebar_topad,#sidebarAd,#SidebarAds,#sidebargooglead,#sidebargoogleads,#single-ad,#single_ad_above_content,#singleAdsContainer,#skcolAdSky,#sky-left,#sky-right,#skyScraper,#skyscraperAds,#SkyscraperAnzeige,#skyscraperWrapperAd,#smallad,#source_ad,#spec_offer_ad2,#speed_ads,#sphereAd-wrap,#spon_links,#sponBox,#SponLink,#sponLinkDiv_1,#spons_links,#SponseredLinks,#sponsor-flyout-wrap,#sponsor-links,#sponsor_300x250,#sponsor_ads,#sponsor_bar,#sponsor_div,#sponsor_header,#sponsor_partner_single,#sponsorBanners32,#sponsored-links-list,#sponsored-not,#sponsored_ads,#sponsoredAds,#sponsoredLinksBox,#sponsoredresultsBottom_body,#sponsorLinkDiv,#sponsorResults,#SponsorsAds,#sponsorship-box,#sponsorshipBadge,#sponsorSpot,#sponsorTab,#sponsorText,#sporsored-results,#spotlight-ads,#spotlight_ad,#spotlightAd,#SpotlightAds,#sprint_ad,#sq_ads,#square-ad,#square-ad-space,#square-ads,#square-sponsors,#squaread,#squared_ad,#stickyads,#story-ad,#story-ad-wrap,#style_ad_bottom,#subpage_234x60ad,#svp-ad,#tbo_headerads,#text-linkAD,#textads,#textads_right_container,#textsponsor,#tgAD_imu_2,#tgAD_imu_3,#tgAD_imu_4,#tippytop-ad,#TipTopAdSpace,#title-sponsor-banner,#title-wide-sponsored-by,#TitleAD,#tmcomp_ad,#tnt_ad_column,#tobsideAd,#today_ad_bottom,#top-adds,#top-advert,#top-advertisements,#top-leaderboard,#top-leaderboard-ad,#top-sky,#top_ad_parent,#top_ad_td,#top_adblock_fix,#top_add,#top_adspace,#top_adv-v2,#top_advert,#top_google_ads,#top_span_ad,#top_sponsor_ads,#TopAd,#topAD,#topAd,#topadbanner,#topAdBar,#topAdBlock,#topads,#topAdShow,#TopAdTable,#topadtable,#topadvert,#topAdvert-09,#topbanner_sponsor,#topbarAd,#topheader_ads,#topleader,#toppannonse,#topright-ad,#TopSideAd,#topsponad,#towerAdContainer,#turnAD,#tut_ads,#ugly-ad,#ui-about-these-ads-img,#upper_adbox,#upper_advertising,#upperRightAds,#vdiAd,#vertad1,#videoAd,#view-photo-ad,#viewAd1,#VM-footer-adwrap,#wg_ads,#wh_ad_4,#wide_ad_unit_2,#wideAdd,#widget-ads-3,#widget-ads-4,#widget-box-ad-1,#widget-box-ad-2,#widget_ad,#WindowAdHolder,#WNAd1,#WNAd20,#WNAd41,#WNAd43,#WNAd52,#WNAd63,#wp-insert-ad-widget-1,#wrapper_banner,#wrapper_sponsoredlinks,#wrapperRightAds,#yahoo-ads-content,#yahoo-contentmatch,#yahoo_sponsor_links,#yahoo_sponsor_links_title,#YahooAdsContainer,#YahooAdsContainerPowerSearch { display:none !important; } #YahooContentAdsContainerForBrowse,#yan-advert-nt1,#yieldaddiv,#ylf-lrec,#ylf-lrec2,#yrail_ads,#zMSplacement1,#zMSplacement2,#zMSplacement3,#zMSplacement4,#zMSplacement5,#zMSplacement6,#zztextad,._ad,._bannerAds,.aa_ad-160x600,.aa_AdAnnouncement,.abAdArea,.abAdPositionBoxB,.abovead,.aboveCommentAds,.aboveCommentAdsWrapper,.ad-1,.ad-120-600-inner,.ad-160x600-gallery,.ad-160x600-home,.ad-160x600-wrap,#ads-1,.ad-2,.ad-300x,.ad-300x200,.ad-300x250-home,.ad-768,.ad-bar,.ad-belowarticle,.ad-bigbox,.ad-bigboxSub,.ad-bline,.ad-blogads,.ad-boombox,.ad-border,.ad-bottom,.ad-box,.ad-box-container,.ad-box1,.ad-box2,.ad-box3,.ad-boxes,.ad-bug-300w,.ad-button,.ad-call-300x250,.ad-caption,.ad-comment,.ad-container,.ad-details,.ad-display,.ad-e,.ad-flag,.ad-footer-empty,.ad-fullbanner,.ad-here,.ad-holder,.ad-home-right,.ad-homepage,.ad-iframe,.ad-index,.ad-interruptor,.ad-lable,.ad-links,.ad-MediumRectangle,.ad-medrect,.ad-national-1,.ad-noline,.ad-pagehead,.ad-r,.ad-rail,.ad-rect-top-right,.ad-region-delay-load,.ad-rotation,.ad-sitewide,.ad-sp,.ad-square2-container,.ad-stack,.ad-story-top,.ad-SuperBanner,.ad-text,.ad-text-blockA01,.ad-text-blockB01,.ad-textG01,.ad-top,.ad-top-300x250,.ad-unit-mpu,.ad-vertical,.ad-wide,.ad01,.ad1,.ad120_600,.ad120x240GrayBorder,.ad120x60,.ad125x125a,.ad125x125b,.ad160,.ad160x600box,.ad170x30,.ad1b,.ad1left,.ad233x224,.ad234x60,.ad300Block,.ad300x150,.ad300x250-home,.ad300x250-stacked,.ad300x250_box,.ad300x250a,.ad300x250b,.ad300x40,.ad320x250,.ad336x362,.AD355125,.ad360,.ad468x60Wrap,.ad5,.ad590,.ad728x90,.ad728x90box,.ad728x90WithLabel,.ad768x90,.ad954x60,.ad960,.ad980x50box,.Ad_120x600,.Ad_120x600_holder,.ad_160_600,.Ad_160x600_holder,.adboxo,.Ad_160x600_inner,.ad_180x150,.ad_1day9,.ad_240,.ad_300_120,.Ad_300_250,.ad_300_250_wrapper,.ad_300Home,.ad_300s,.ad_300Side,.ad_300x100,.Ad_300x250,.Ad_300x250_holder,.AD_300x265,.ad_300x600,.ad_336x90,.ad_640x90,.ad_728_90,.ad_728_top,.Ad_728x90,.Ad_728x90_holder,.ad_728x90_top,.ad_adblade,.ad_adInfo,.AD_area,.ad_area,.ad_article_top_left,.ad_banner2,.ad_block_300x250,.ad_bottomline,.Ad_box,.ad_box1,.ad_box_2,.ad_box_new,.ad_box_righ,.ad_box_right_120,.ad_box_spacer,.ad_center,.ad_cheat,.ad_cont,.Ad_D,.ad_eniro,.ad_entrylists_end,.ad_flash,.ad_float,.ad_hat_banner_300,.ad_hat_top,.ad_help_link,.ad_hyper_wrap,.ad_identifier,.ad_index02,.ad_info,.ad_island_feedback,.ad_keywords_bot,.ad_keywords_bot_r,.Ad_Label,.Ad_Label_foursquare,.ad_large,.ad_leaderboard_top,.ad_line2,.ad_link_label_vert,.ad_med,.ad_medium_rectangle,.ad_module,.ad_pagebody,.ad_panel,.ad_perma-panorama,.ad_pic,.ad_placeholder,.ad_placement,.ad_policy_link_br,.ad_position,.ad_primary,.ad_regular1,.ad_regular2,.ad_regular3,.ad_right,.ad_rightside,.ad_section_300x250,.ad_section_728x90,.ad_skyscrapper,.ad_slug_font,.ad_special_badge,.ad_square,.ad_square_r_top,.ad_story_island,.ad_text_links,.ad_textlink_box,.ad_thumbnail_header,.ad_top_banner,.ad_top_right,.ad_trailer_header,.ad_ttl,.ad_w_us_a300,.ad_word,.adArea,.adAreaLC,.adArticleBody,.webads336x280,.adArticleRecommend,.adArticleSidetile,.adArticleTopText,.adban-hold-narrow,.adbanner1,.adbanneriframe,.adbannertop,.adbbox,.adbckgrnd,.adBillboard,.adBlock160x600Spot1,.adblock300x250Spot1,.adBlockBottom,.adBlockNext,.adblocks-topright,.adBlockSpacer,.adBottom,.ADBox,.ADbox,.adbox-box,.adBox-mr,.adbox1,.adboxlong,.adboxVert,.adBrandpanel,.adbrite2,.adbrite_post,.adbucks,.adCall,.adcenter,.adCentertile,.adChoice,.adClose,.adColBgBottom,.AdContainer,.adcontainer,.adContainer1,.AdContainer160x600,.adContainer_125x125,.adContainer_728x90,.AdContainerBottom,.adContent,.adCopy,.add-wrapper,.add_300_250,.addContainer,.adDialog,.adds,.adds2,.addtitle,.adEmployment,.adfbox,.adflag,.adframe2,.adFrameContainer,.AdFrameLB,.adgoogle,.AdGraph,.adHeader,.adheader416,.adHeaderAdbanner,.adHeadlineSummary,.adhere,.adHolder,.adHorisontalNoBorder,.adhref_box_ads,.adIMm,.adinfo,.adlabel,.adLabelLine,.AdLeftbarBorderStyle,.adLine,.adlist,.adlist1,.adlist2,.adListB,.admain,.adman,.adMeldGuts,.admiddle,.adModule300,.AdModule_Content,.AdModule_ContentLarge,.AdModule_Hdr,.adModule_square2,.admoduleB,.AdMultiPage,.adNone,.AdNotice,.adNotice90,.adops.textlinks,.adOverlay,.adpad300,.adpad300spacer,.adPanel,.adplace,.adplace_center,.adPlaceholder_foot,.adposition,.adpost,.adRecommend,.adRecommendRight,.adrect,.adrectangle,.adRectangleUnit,.adrectwrapper,.adRegionSelector,.adRemove,.adReportsLink,.adResults,.adrow1,.adrow2,.ads-160-head,.ads-250,.ads-300-250,.ads-300x300,.ads-336-197-qu,.ads-468x60-bordered,.ads-beforecontent,.ads-block-marketplace-container,.ads-box-header,.ads-box-header-marketplace-right,.ads-box-header-wsl,.ads-btm,.ads-by-google-0,.ads-col,.ads-google,.ads-holder,.ads-horizontal-banner,.ads-item,.ads-left,.ads-margin,.ads-middle,.ads-rotate,.ads-scroller-box,.ads-section,.ads-sponsors-125-left,.ads-sponsors-125-right,.ads-top-spacer,.ads1,.ads123,.ads125,.Ads160,.ads300x250,.ads315,.ads468x60,.ads728_90,.ads_120x60_index,.ads_330,.ads_468,.ads_672,.ads_block,.ads_catDivRight,.ads_entrymore,.ads_folat_left,.Ads_forum,.ads_h,.ads_inside2,.ads_obrazek,.ads_sc_bl,.ads_sc_ls_i,.ads_sideba,.ads_top_both,.ads_topleft,.ads_topright,.ads_wide,.AdScriptBox,.AdSectionHeader,.AdSense,.adSense,.adsense-afterpost,.adsense-attribution,.adsense-float,.adsense-image-detail,.adsense-reviews-float,.adsense-topics-detail,.adsense-wide-background,.adsense_block,.adsense_box01,.adsense_full_width,.adsense_left_lu,.adsense_mainbox01,.adsense_menu,.adsense_top_ad,.adsense_top_lu,.adsense_x88,.adsenseBox,.adsensecontainer,.AdsenseDownload,.AdsenseForum,.adsensemainpage,.adsenseSky,.adSepDiv,.adSeven,.adsHeader,.adsHeaderFlog,.adside,.adSidetileplus,.adsize728,.adSize_MedRec,.adSkyscraper,.adsleaderboard,.adsleaderboardbox,.adSlice,.adslot,.adslothead,.adSlug,.adsmedrect,.adsmedrectright,.adsmiddle,.adspace-300x600,.adspace728x90,.adSpace950x90,.adspace_2,.adsplash,.adsplat,.adspost,.AdsPot,.adSpot-textBoxGraphicRight,.adspot.mrec,.adssquare2,.adsrecnode,.adsskyscraper,.adssmall,.adssquare,.adsTopBanner,.adStyle1,.adswidget,.adsYN,.adsystem_ad,.AdTag,.adtech-boxad,.adtext_white,.adTextPmpt,#adsplash,.adtitle,.AdTop,.adTopLeft,.adTopRight,.adtops,.adTXTnew,.adunit_210x509,.adunit_300x100,.adunit_300x250,.adunit_300x600,.adunit_607x110,.adunit_728x90,.AdUnitBox,.adv-label,.adv-search-ad,.adv2,.adv_1,.adv_2,.adv_box_narrow,.adv_flash,.adv_right,.adv_side1,.adv_side2,.adv_top,.advBottomHome,.advbox,.adverdown,.adverstisement_right,.advert-100,.advert-160x600,.advert-300,.advert-728,.advert-760,.advert-banner-holder,.advert-center_468x60,.advert-group,.advert-lower-right,.advert-wide,.advert-words,.advert728x90,.advert_banner,.advert_block,.advert_line,.advert_txt,.advert_wrapper,.advertbox,.advertCaption,.advertContainer,.adVertical,.advertise-info,.advertise_txt,.advertiseBlack,.advertisedBy,.advertisement-2,.advertisement-banner,.advertisement-header,.advertisement-label,.advertisement-label-up-white,.advertisement-txt,.advertisement_flag,.advertisement_flag_sky,.advertisement_post,.advertisement_sky,.advertisementBackground,.advertisementBannerVertical,.advertisementCenterer,.advertisementGif,.advertisementonblue,.advertisementonwhite,.advertising,.advertising_block,.Advertisment,.advertisment_full,.advertismentBox,.advertismentText,.advertorial,.adverts,.advertSign,.advfrm,.advhere,.adzone,.adZoneRight,.AffAD,.affiliate_header_ads,.affiliate_header_ads_container,.afs_ads,.agi-adtop,.aisle-ad,.aisoad,.amAdvert,.annonce_textads,.annonstext,.ap_str_ad,.apiButtonAd,.apxContentAd,.area1_2_ad1,.area5_ad,.areaAd,.aroundAdUnit,.artAdInner,.article_ad,.article_bottom_ad,.article_tower_ad,.articlead,.articleflex-container,.b-ads728,.b5-ad-pushdown,.b5_widget_skyscraper_ad,.b5ad_skyscraper,.b_ads,.b_ads_r,.ban-720-container,.banner-300,.banner-leaderboard,.banner-rectangleMedium,.banner1-728x90,.banner300,.Banner468X60,.banner468x60,.banner_728x90,.banner_ad_728x90,.bannerAd3,.bannerAd300x250,.bannerAd_rdr,.bannerAdTower,.bannerGAd,.bannergoogle,.banneritem_ad,.bannerTopAdLeft,.bannerTopAdRight,.bb-adv-160x600,.bb-adv-300x250,.bbccom-advert,.belt_ad,.between_page_ads,.bex_ad,.bgAdBlue,.bgadgray10px,.bigad1,.bigadleft,.bigadright,.bigBoxAdArea,.bizCardAd,.bizDetailAds,.block-ad_injector,.block-eg_adproxy,.block-google_admanager,.block-sponsored-links,.block-zagat_ads,.block_ad,.blocsponsor,.blog-ad,.blog-ads,.blog_ad_continue,.blogs_2_square_ad,.blox-leaderboard-container,.blxAdopsPlacement,.bnr_ad,.bodaciousad,.body_width_ad,.bodybannerad,.bodyrectanglead,.bot_ads,.bot_banner,.bottom-ad2,.bottom-ads,.bottom_ad_block,.bottom_bar_ads,.bottom_sponsor,.bottomArticleAds,.bottomleader,.box-ad-a,.box-advert-sponsored,.box-adverts,.box_ads728x90_holder,.box_title_ad,.boxad120,.boxadv,.boxadvertisement,.BoxSponsorBottom,.bps-advertisement-placeholder,.bps-search-chitika-ad,.breakingNewsModuleSponsor,.breakthrough-ad,.browser_boot_ad,.bs-ad,.btm_ad_container,.btn_ad,.buysellAdsSmall,.buysellAds,.gAds,.button_ad,.buzz_ad_wrap,.buzzAd,.bxad,.cA-adStack,.canoeAdvertorial,.cat_context_ad,.cdAdContainer,.center_ads,.centerads,.cg_ad_slug,.ch_advertisement,.change_AdContainer,.classifiedAdSplit,.cmAd,.cnn_adbygbin,.cnn_adcntr728x90t,.cnn_adspc300x100,.cnn_fabcatad,.cnn_grpnadclk,.cnn_pt_ad,.cnn_sectprtnrbox_cb,.cnn_sectprtnrbox_grpn336,.cnnSearchSponsorBox,.cnt_ad,.column_3_ad,.CommentGoogleAd,.content_ads,.content_bottom_adsense,.contentAd,.contentad,.contentAds,.contentAdsCommon,.contentleftad,.contentwellad,.contextual_ad_unit,.cornerBoxInnerWhiteAd,.ctn-advertising,.cubead-widget,.custom-ad-container,.custom_ads,.dartAd491,.dartadbanner,.DetachedAd,.devil-ad-spot,.dfp_ad,.diggable-ad-sponsored,.displayAd,.displayAdUnit,.div_advertisement,.div_banner468,.divAdvTopRight,.divGoogleAdsTop,.divRepAd,.divSponsoredBox,.dod_ad,.double-ad,.DoubleClickRefreshable,.eb_ad280,.editor_ad,.eniro_ad,.exec-advert-flash,.ez-ad,.fc_splash_ad,.featureAd,.fiveMinCompanionBanner,.fixedAds,.flashadd,.flex-ad,.foot-advertisement,.footer-ads,.footer-advert,.footer_advertisement,.four_button_threeone_ad,.fp_ad_text,.frame_adv,.fs-ad-block,.full_width_ad,.fullSizeAd,.g-adblock3,.gAds1,.gallery_ads_box,.game-ads,.game_right_ad,.gamesPage_ad_container,.gamezebo_ad,.gamezebo_ad_info,.gbl_adstruct,.generic_300x250_ad,.GetRightAds,.gl_ad,.glamsquaread,.gm-ad-lrec,.go-ads-widget-ads-wrap,.google-ads-obj,.google-ads-rodape,.google-indiv-box2,.google-user-ad,.google300x250BoxFooter,.google300x250TextDetailMiddle,.google300x250TextFooter,.google728x90TextDetailTop,.google_ad336,.google_ad_right,.google_adsense,.googlead-sidebar,.googlead_iframe,.googleAdd,.googleAdFoot,.googleadiframe,.GoogleAdInfo,.googleads-container,.lightad,.googleAdTopTipDetails,.googleAdWrapper,.googleBannerWrapper,.googlebanwide,.googleLgRect,.googleSideAd,.googleSkyWrapper,.gr-adcast,.graphic_ad,.grev-ad,.gridAd,.halfPageAd,.hbPostAd,.head_ad,.headAd,.header-ad,.header-ad-banner,.header-ads,.header_ad_2,.header_adsense_banner,.header_advertisement_text,.header_right_ad,.headerAdWrapper,.HeaderLeaderAd,.HeadingAdSpace,.highlights-ad,.hl-post-center-ad,.home-sticky-ad,.home_ad,.home_advert,.homeAdBox,.homeadnews,.homepage-advertisement,.homepage-footer-ads,.homepage-sponsoredlinks-container,.homepageAd,.house-ads,.hover_300ad,.ibm_ad_bottom,.ibm_ad_text,.ibt-top-ad,.iframe-ad,.im-topAds,.imgur-ad,.imuBox,.in-between-ad,.inArticleAdInner,.indexad,.industrybrains,.inlineAd,.inlinead-tagtop,.inlineAd_content,.inlineAdNotice,.inner-ad,.inPageAd,.insert-advert-ver01,.insert_ad,.insertAd_AdSlice,.insertAd_Rectangle,.internalAdSection,.interstitial-ad600,.interstitial_ad_wrapper,.isad_box,.island_ad,.IslandAd,.item-ad,.item-ad-leaderboard,.item-container-ad,.job_ad,.jobs-ad-box,.jobs-ad-marker,.kd_ads_block,.l-bottom-ads,.l300x250ad,.labeled_ad,.large-btn-ad,.LargeRightAd,.largesideadpane,.lastAdvertorial,.layer_text_ad,.lazyload_ad,.leader_aol,.leaderAd,.leaderboard-ad-main,.leaderboard-container,.leaderboard-container-top,.leaderboard2,.leaderboard_banner_ad,.leaderboardbottom_wrapper,.left-ads,.left-advert,.left-sidebar-box-ads,.left_advertisement_block,.left_col_ad,.left_google_add,.leftAd_bottom_fmt,.leftAd_top_fmt,.llsAdContainer,.localad,.Loge_AD,.logo-ad,.longad,.LoungeAdsBottomLinks,.lt_ad_call,.m-sponsored,.madison_ad,.main-ads,.main-column-ad,.main_ad_bg,.main_right_ad,.mainad,.marketplaceAd,.marketplaceAdShell,.md-adv,.mdl-quigo,.media-ad-rect,.medRecContainer,.medRect,.medrect,.medrectadv4,.meta_ad,.mid-ad-wrapper,.mid_ad,.middle-ad,.middleAdLeft,.middleAdMid,.middleAdRight,.miniAd,.miniads,.mlaAd,.mod-adblock,.mod-adcpc,.mod-horizontal-ad,.mod_ad,.module_ad_disclaimer,.module_header_sponsored,.moduleAdSpot,.moduletable_ad-right,.moreAdBlock,.mosaicAd,.mostpop_sponsored_ad,.mpu-c,.mpu-wrapper,.mpuads,.msnChannelAd,.mvAd,.mvAdHdr,.myplate_ad,.n_ad,.navad,.navAd,.ndmadkit,.newHeaderAd,.news_ad_box,.news_footer_ad_container,.newsletter_ad,.northad,.note-advertisement,.nrcAd,.nscr300Ad,.nscrMidAdBlock,.nscrT1AdBlock,.oad-ad,.oasInAds,.ocp-sponsor,.ody-sponsor,.oi_horz_ad_container,.openx_frame,.OSOasAdModule,.otj_adspot,.outbrain_ul_ad_top,.outside_ad,.p_topad,.paddingBotAd,.page_ad,.pane-tw-ad-master-ad-300x250a,.panel_ad,.PencilAd,.performancingads_region,.pg-ad-block,.pgAdSection_Home_MasterSponsers,.photo-ad,.plainAd,.player_ad,.playerAd,.pmg-sponsoredlinks,.pod-ad-box,.popadtext,.popupAd,.popupAdWrapper,.post-ad,.post-load-ad,.pricead-border,.promo-ad,.promo_border,.promoad,.promoboxAd,.publicidade-dotted,.pulse360ad,.pushdownAd,.pxz-taskbar-anchor,.quigo,.quigoAdCenter,.quigoAdRight,.quigoads,.quigoMod,.r_adbx_top,.r_col_add,.rail_ad,.recentAds,.rectangle-ad-container,.referrerDetailAd,.refreshable_ad,.reklam728,.reklama,.reklama1,.related-ad,.rev_square_side_door,.reviewpage_ad2,.rgt_ad,.right-col-ad,.right-navAdBox,.right-rail-ad,.right-sidebar-box-ads,.right-top-ad,.right_adv,.right_advertisement { display:none !important; } .right_box_ad,#adss,.right_content_ad,.right_content_ad_16,.right_image_ad,.right_picAd,.right_side_ads,.rightAD,.rightAd,.RightAd2,.rightad250,.rightAd_bottom_fmt,.rightAd_top_fmt,.rightadblock,.rightAdvert,.rightboxad,.rightboxads,.rightcol-adbox,.rightcolad,.rightColAdBox,.rightrail_ads,.rotatingAdvertisement,.round_box_advert,.roundedboxesgoogle,.rowgoogleads,.RR_ad,.rr_ads,.rside_adbox,.rt_advert_name,.rtAdFtr,.runner-ad,.s_ad_300x250,.sa_AdAnnouncement,.sb_ad,.sbTopadWrapper,.sc_iframe_ad,.scad,.scoopads,.search_ad_box,.search_results_ad,.searchads,.searchSponsorItem,.sec-ad,.section-ad,.section-ad-related,.section_ad_left,.series-ad,.sfsp_adadvert,.shortads,.ShowAdDisplay,.side-ad-120-bottom,.side-ad-120-middle,.side-ad-120-top,.side-ad-160-bottom,.side-ad-160-middle,.side-ad-160-top,.side-ad-300,.side-ad-300-bottom,.side-ad-300-middle,.side-ad-300-top,.side-ad-big,.side-ad-blocks,.side-ads-wide,.side-bar-ad-position1,.side-bar-ad-position2,.SideAds,.sideAdTall,.hide_ad,.sideAdWide,.sidebar-ad-rect,.sidebar_ad_300,.sidebar_ad_580,.sidebar_ad_holder,.sidebar_advertising,.sidebarAdNotice,.sidebarAds,.sidebarBanner,.sideBarCubeAd,.sideBlockAd,.sideBySideAds,.single-ads,.singleAdBox,.singleads,.singlepageleftad,.singlepostad,.singlepostadsense,.site-ads,.site_ad,.skyCraper_bannerLong,.skyCraper_bannerShort,.skyscraperAd,.slide-ad,.slide_ad,.slideshow-advertisement-note,.smallad,.smallAd,.smallAdContainer,.smallsideadpane,.southad,.spaceAdds,.specials_ads,.spn_links_box,.spnsrCntnr,.spon-links,.spon125,.spon_link,.spons-wrap,.spons_link_header,.sponsBox,.sponser-link,.sponserLink,.sponserlink,.sponsor-ad-wrapper,.sponsor-box,.sponsor-btns,.sponsor-text,.sponsor_block,.sponsor_div,.sponsor_div_title,.sponsor_units,.sponsorad,.sponsoradlabel,.sponsorAds,.sponsorads,.sponsorArea,.sponsored-ad-ob,.sponsored-b,.sponsored-header,.sponsored-links-col,.sponsored-links-tbl,.sponsored-rule,.sponsored_ad,.sponsored_links_box,.sponsored_links_container,.sponsored_ss,.sponsoredFeature,.sponsoredShowcasePanel,.sponsorheader,.SponsorIsland,.sponsorLabel,.sponsorLinks,.sponsors,.sponsors_fieldset,.sponsorsBanners,.sponsorsbig,.sponsorship_ad,.sponsorshipContainer,.SponsorshipText,.sponsorText,.sponsWrap,.sqAd2,.square-ad-1,.squaread,.squareAdd,.squareAddtwo,.stock_ad,.story-ad,.storyad300,.storyAdvert,.stpro_ads,.strip-ad,.subheadAdPanel,.tabAd,.tabAds,.table_ad_bg,.tallAd,.td_ad,.td_reklama_bottom,.td_reklama_top,.td_topads,.text_ads_2,.textAd3,.textAdBG,.textAdBlwPgnGrey,.TextAdds,.textads,.textadscontainer,.textSponsor,.theleftad,.thirdAd160Cont,.thirdAdBot,.thirdAdHead,.tibu_ad,.tileAdWrap,.tmnAdsenseContainer,.toolsAd,.top-ad,.top-ad-right,.top-ad-sidebar,.top-banner-468,.top-banner-ad-wrapper,.top-banner-add,.top_ad1,.top_ad_holder,.top_ad_list,.top_ad_long,.top_ad_short,.top_adbox1,.top_adbox2,.top_rightad,.top_sponsor,.topad2,.topadblock,.topAdCenter,.topAdd,.topAdL,.topAdLeft,.topAdR,.topAdRight,.topADs,.topAds,.topads,.topAdvBox,.topArticleAds,.topbannerad,.topleader,.topRightAd,.TowerAds,.trueads,.ts-featured_ad,.txt_ad,.tz_ad_widget,.uniAds,.unSponsored,.us-advertisement,.vAd_160x600,.ve2_post_adsense,.vert-ad,.verticalAd,.video_ads_overdiv,.video_ads_overdiv2,.video_advertisement_box,.vs-advert-300x250,.vt_h1_ad,.wdp_adDiv,.weatherad,.webad-cnt,.wide_grey_ad_box,.widget-ad-zone,.widget-adsense,.widget-advertisement,.widget-text-ad,.widget_ads,.widget_sdac_top_ad_widget,.widget_sponsored_content,.width-ad-slug,.wnIframeAd,.wsSearchResultsRightSponsoredLinks,.x01-ad,.XEad,.y5_ads,.y5_ads2,.y7s-lrec,.yahoo-banner-ad-container,.yahoo_ad,.yahooAd,.yahooads,.yahooContentMatch,.yahootextads_content_bottom,.yellow_ad,[alt="Sponsored ad"],[href^="http://www.adbrite.com/mb/commerce/purchase_form.php?"],[id="336x280Ad"],a.ad_policy,a[href^="/liutilities.php?id"],a[href^="http://affiliate.glbtracker.com/"],a[href^="http://bonusfapturbo.nmvsite.com/"],a[href^="http://buysellads.com/"],a[href^="http://fusionads.net"],a[href^="http://greensmoke.com/"],a[href^="http://www.constantcontact.com/"],a[href^="http://www.greensmoke.com/"],a[href^="http://www.ireel.com/signup?ref"],a[href^="http://www.pheedo.com/"],a[href^="http://www.sfippa.com/"],a[href^="http://www.text-link-ads.com/"],a[href^="https://adwords.google.co"],a[href^="https://secure.eveonline.com/ft/?aid="],a[href^="https://store.uniblue.com/"],a[href^="http://marketgid.com"],a[href^="http://mgid.com/"],a[href^="http://us.marketgid.com"],a[href^="http://www.incredimail.com/?id="],a[href^="http://adsrv.keycaptcha.com"],#ads,#adblock,.adBottomBoard,.leaderboard-ads,#banner-ad,#skybox-ad,.adsbottombox,#ad_wrapper,.advertisement,.advertisment,.adtext,#ad-header,.UIStandardFrame_SidebarAds,.ad_728Home,#adspace,.bannerBox,#ad-top-wrapper,.ad_text,.advert,#dart-container-728x90,.adText,.adbox,#topad,.ad-image,.adItem,#adhead,.rectangle_ad,#adposition3,.adElement,.top_ad_div,.leaderboard,.ad_160x600,#head-ad,.right_ads_column,#adbox,#adBox,.ad-content,.ad-wrapper,.sponsor,.ad2,.ads_catDiv,.adwrapper,#ad468,#ad_leaderboard,.leaderboard-ad,#sidebar_ads,.category-ad,#advert,#adheader,.topAd,#ad-bar,.sponsored,.sponsoredLinks,#ad-top,#adtop,a[href^="http://www.liutilities.com/"],#advertising_wrapper,#adbanner,.container_row_ad,.header_advert,.ad-inner,.adImg,.adBox,.ad_head_rectangle,.adspace,#banner_topad,.Ad,#adLeader,#google_ads_frame1_anchor,#adPosition0,#bannerad,.adleft,.adblock,#AD,#adv_bg,.adContainer,#google_ads_frame,#leaderboard,#leaderBoardAd,.ad_header,.ad,#BottomAdContainer,.ad_item,.adholder,.adbanner,.adModule,.topad,#topAdSpace,.headerad,#adbar,.adRight,#adsense,#Ad,.gAd,#topAdSpace_div,.sponsoredtextlink_container,.adMiddle,#adcode,#companionAd,#ad_space,.AdBody:not(body),.adDiv,.adHoldert,.header_ad,#ad_unit,#ad_content,.ads,.ad_160,.rightad,.Ads,#AD_banner,.module-ad,#adWrapper,.adsense,#ad1,.ad_728x90,#ad_728_90,#adBelt,.content-ads,.type_ads,#sponsorAdDiv { display:none !important; }</style></html>