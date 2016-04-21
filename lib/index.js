'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utilities = require('./utilities');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @typedef {{delimiter_start: string, delimiter_end: string, delimiter_separator: string}} TemplateOptions
 */
var default_options = {
  delimiter_start: '%',
  delimiter_end: '%',
  delimiter_separator: '|'
};

/**
 * Class representing a template object.
 */

var Template = function () {

  /**
   * Create template object.
   * @param {string} content - Content of the template. Variable names wrapped in delimiters will be replaced with values from `data`.
   * @param {Object} data - Keys wrapped in delimiters will be replaced by values.
   * @param {TemplateOptions} custom_options - Properties defined here will replace default options.
   */

  function Template() {
    var content = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var data = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var custom_options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    _classCallCheck(this, Template);

    this.default_data = {};
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
     * Set options of the template.
     * @param {Object} options
     * @returns {Template}
     */

  }, {
    key: 'setOptions',
    value: function setOptions() {
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var re_options = ['delimiter_start', 'delimiter_end', 'delimiter_separator'];
      re_options.forEach(function (item) {
        if (typeof options[item] !== 'undefined') {
          options[item] = (0, _utilities.escapeForRegExp)(options[item]);
        }
      });
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
      var placeholders = (0, _utilities.getPlaceholders)(this.content, this.options);

      placeholders.forEach(function (placeholder) {
        var _getPlaceholderData = (0, _utilities.getPlaceholderData)(placeholder, _this.options);

        var key = _getPlaceholderData.key;
        var value = _getPlaceholderData.value;

        // use provided value if it was defined, otherwise use default one

        if (typeof _this.data[key] !== 'undefined') {
          value = _this.data[key];
        }

        if (typeof value !== 'undefined') {
          result = result.replace(placeholder, value);
        }
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
      var elm = document.createElement('div');

      elm.innerHTML = this.getHtml();

      return elm.childNodes.length > 1 ? (0, _utilities.getChildrenAsFragment)(elm) : elm.childNodes[0];
    }
  }]);

  return Template;
}();

exports.default = Template;