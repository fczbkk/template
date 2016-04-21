/**
 * Escapes all special character in the string for use in RegExp.
 * @param {string} content
 * @returns {string}
 * @ignore
 */
export function escapeForRegExp (content) {
  return content.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


/**
 * Returns all children of an element wrapped in document fragment.
 * @param {Element} element
 * @returns {DocumentFragment}
 * @ignore
 */
export function getChildrenAsFragment (element) {
  const fragment = document.createDocumentFragment();

  let child_element;
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
export function getPlaceholders (content, {
  delimiter_start: start,
  delimiter_end: end
}) {
  const match_re_content = `${start}[^${end}]+${end}`;
  const match_re = new RegExp(match_re_content, 'g');
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
export function getPlaceholderData (placeholder, {
  delimiter_start: start,
  delimiter_end: end,
  delimiter_separator: separator
}) {
  const item_re_content = [
    start,
    '([^' + separator + ']+)',
    '(' + separator + ')*',
    '(.+)*',
    end
  ].join('');

  const item_re = new RegExp(item_re_content);
  const item_matches = placeholder.match(item_re);

  return {
    key: item_matches[1],
    value: item_matches[3]
  };
}