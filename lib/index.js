'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var default_options = {
  delimiter_start: '%',
  delimiter_end: '%'
};

/**
 * Class representing a template object.
 */

var Template = function () {

  /**
   * Create template object.
   * @param {string} content - Content of the template. Variable names wrapped in delimiters will be replaced with values from `data`.
   * @param {Object} data - Keys wrapped in delimiters will be replaced by values.
   * @param {Object} custom_options - Properties defined here will replace default options.
   */

  function Template() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var custom_options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Template);

    this.data = {};
    this.setData(data);

    this.content = '';
    this.setContent(content);

    this.options = {};
    this.setOptions(_extends({}, default_options, custom_options));
  }

  /**
   * Set content of the template. Will completely replace existing content.
   * @param {string} content
   * @returns {Template}
   */


  _createClass(Template, [{
    key: 'setContent',
    value: function setContent() {
      var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

      this.content = content;
      return this;
    }

    /**
     * Set data of the template. New data will be added to the existing ones.
     * @param {Object} data
     * @returns {Template}
     *
     * @example
     * var my_template = new Template();
     * my_template.setData({aaa: 'bbb', ccc: 'ddd'});
     * my_template.setData({ccc: 'xxx', eee: 'fff'});
     * // returns {aaa: 'bbb', ccc: 'xxx', eee: 'fff'}
     * my_template.data;
     */

  }, {
    key: 'setData',
    value: function setData() {
      var data = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _extends(this.data, data);
      return this;
    }

    /**
     * Set options of the template. So far the only options are `delimiter_start` and `delimiter_end`.
     * @param {Object} options
     * @returns {Template}
     */

  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      _extends(this.options, options);
      return this;
    }

    /**
     * Applies the data on the template and returns result as a string.
     * @returns {string}
     *
     * @example
     * var my_template = new Template('aaa %bbb% ccc', {bbb: 'xxx'});
     * // returns 'aaa xxx ccc'
     * my_template.getHtml();
     */

  }, {
    key: 'getHtml',
    value: function getHtml() {
      var _this = this;

      var result = this.content;

      Object.keys(this.data).forEach(function (key) {
        var re_content = [_this.options.delimiter_start, key, _this.options.delimiter_end].join('');
        var re = new RegExp(re_content, 'g');
        result = result.replace(re, _this.data[key]);
      });

      return result;
    }

    /**
     * Applies the data on the template and returns result as DOM Node.
     * @returns {Element|DocumentFragment}
     */

  }, {
    key: 'getDom',
    value: function getDom() {
      var result = void 0;

      var elm = document.createElement('div');
      elm.innerHTML = this.getHtml();

      if (elm.childNodes.length > 1) {
        // multiple elements are returned as document fragment
        result = document.createDocumentFragment();
        var child_elm = void 0;
        while (child_elm = elm.firstChild) {
          result.appendChild(child_elm);
        }
      } else {
        // single element is returned as is
        result = elm.childNodes[0];
      }

      return result;
    }
  }]);

  return Template;
}();

exports.default = Template;