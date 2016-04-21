import {
  escapeForRegExp,
  getChildrenAsFragment,
  getPlaceholders,
  getPlaceholderData
} from './utilities';

/**
 * @typedef {{delimiter_start: string, delimiter_end: string, delimiter_separator: string}} TemplateOptions
 */
const default_options = {
  delimiter_start: '%',
  delimiter_end: '%',
  delimiter_separator: '|'
};

/**
 * Class representing a template object.
 */
export default class Template {

  /**
   * Create template object.
   * @param {string} content - Content of the template. Variable names wrapped in delimiters will be replaced with values from `data`.
   * @param {Object} data - Keys wrapped in delimiters will be replaced by values.
   * @param {TemplateOptions} custom_options - Properties defined here will replace default options.
   */
  constructor (content = '', data = {}, custom_options = {}) {
    this.default_data = {};
    this.data = {};
    this.setData(data);

    this.content = '';
    this.setContent(content);

    this.options = {};
    this.setOptions(Object.assign({}, default_options, custom_options));
  }

  /**
   * Set content of the template. Will completely replace existing content.
   * @param {string} content
   * @returns {Template}
   */
  setContent (content = '') {
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
  setData (data = {}) {
    Object.assign(this.data, data);
    return this;
  }

  /**
   * Set options of the template.
   * @param {Object} options
   * @returns {Template}
   */
  setOptions (options = {}) {
    const re_options = ['delimiter_start', 'delimiter_end', 'delimiter_separator'];
    re_options.forEach((item) => {
      if (typeof options[item] !== 'undefined') {
        options[item] = escapeForRegExp(options[item]);
      }
    });
    Object.assign(this.options, options);
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
  getHtml () {
    let result = this.content;
    const placeholders = getPlaceholders(this.content, this.options);

    placeholders.forEach((placeholder) => {
      let {key, value} = getPlaceholderData(placeholder, this.options);

      // use provided value if it was defined, otherwise use default one
      if (typeof this.data[key] !== 'undefined') {
        value = this.data[key];
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
  getDom () {
    const elm = document.createElement('div');

    elm.innerHTML = this.getHtml();

    return (elm.childNodes.length > 1)
      ? getChildrenAsFragment(elm)
      : elm.childNodes[0];
  }

}
