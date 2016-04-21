'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeForRegExp = escapeForRegExp;
exports.getChildrenAsFragment = getChildrenAsFragment;
exports.getPlaceholders = getPlaceholders;
exports.getPlaceholderData = getPlaceholderData;
/**
 * Escapes all special character in the string for use in RegExp.
 * @param {string} content
 * @returns {string}
 * @ignore
 */
function escapeForRegExp(content) {
  return content.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

/**
 * Returns all children of an element wrapped in document fragment.
 * @param {Element} element
 * @returns {DocumentFragment}
 * @ignore
 */
function getChildrenAsFragment(element) {
  var fragment = document.createDocumentFragment();

  var child_element = void 0;
  while (child_element = element.firstChild) {
    fragment.appendChild(child_element);
  }

  return fragment;
}

/**
 * Returns all instances of a template placeholder.
 * @param {string} content
 * @param {Object} config
 * @param {string} config.delimiter_start
 * @param {string} config.delimiter_end
 * @returns {Array}
 * @ignore
 */
function getPlaceholders(content, _ref) {
  var start = _ref.delimiter_start;
  var end = _ref.delimiter_end;

  var match_re_content = start + '[^' + end + ']+' + end;
  var match_re = new RegExp(match_re_content, 'g');
  return content.match(match_re) || [];
}

/**
 * Returns key and default value (if defined) of the template placeholder.
 * @param {string} placeholder
 * @param {Object} config
 * @param {string} config.delimiter_start
 * @param {string} config.delimiter_end
 * @param {string} config.delimiter_separator
 * @returns {{key: string, value: [string]}}
 * @ignore
 */
function getPlaceholderData(placeholder, _ref2) {
  var start = _ref2.delimiter_start;
  var end = _ref2.delimiter_end;
  var separator = _ref2.delimiter_separator;

  var item_re_content = [start, '([^' + separator + ']+)', '(' + separator + ')*', '(.+)*', end].join('');

  var item_re = new RegExp(item_re_content);
  var item_matches = placeholder.match(item_re);

  return {
    key: item_matches[1],
    value: item_matches[3]
  };
}