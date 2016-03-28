const default_options = {
  delimiter_start: '%',
  delimiter_end: '%'
};

/**
 * Class representing a template object.
 */
export default class Template {

  /**
   * Create template object.
   * @param {string} content - Content of the template. Variable names wrapped in delimiters will be replaced with values from `data`.
   * @param {Object} data - Keys wrapped in delimiters will be replaced by values.
   * @param {Object} custom_options - Properties defined here will replace default options.
   */
  constructor (content = '', data = {}, custom_options = {}) {
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
   * Set options of the template. So far the only options are `delimiter_start` and `delimiter_end`.
   * @param {Object} options
   * @returns {Template}
   */
  setOptions (options = {}) {
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

    Object.keys(this.data).forEach((key) => {
      const re_content = [
        this.options.delimiter_start,
        key,
        this.options.delimiter_end
      ].join('');
      const re = new RegExp(re_content, 'g');
      result = result.replace(re, this.data[key]);
    });

    return result;
  }

  /**
   * Applies the data on the template and returns result as DOM Node.
   * @returns {Element|DocumentFragment}
   */
  getDom () {
    let result;

    const elm = document.createElement('div');
    elm.innerHTML = this.getHtml();

    if (elm.childNodes.length > 1) {
      // multiple elements are returned as document fragment
      result = document.createDocumentFragment();
      let child_elm;
      while (child_elm = elm.firstChild) {
        result.appendChild(child_elm);
      }
    } else {
      // single element is returned as is
      result = elm.childNodes[0];
    }

    return result;
  }

}
