# Template

Simple template object that outputs DOM node.

## Documentation

### Template

Class representing a template object.

#### constructor

Create template object.

**Parameters**

-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=(default '')** Content of the template. Variable names wrapped in delimiters will be replaced with values from `data`.
-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Keys wrapped in delimiters will be replaced by values.
-   `custom_options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** Properties defined here will replace default options.

#### getDom

Applies the data on the template and returns result as DOM Node.

Returns **([Element](https://developer.mozilla.org/en-US/docs/Web/API/Element)\|[DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment))** 

#### getHtml

Applies the data on the template and returns result as a string.

**Examples**

```javascript
var my_template = new Template('aaa %bbb% ccc', {bbb: 'xxx'});
// returns 'aaa xxx ccc'
my_template.getHtml();
```

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** 

#### setContent

Set content of the template. Will completely replace existing content.

**Parameters**

-   `content` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)=(default '')** 

Returns **Template** 

#### setData

Set data of the template. New data will be added to the existing ones.

**Parameters**

-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** 

**Examples**

```javascript
var my_template = new Template();
my_template.setData({aaa: 'bbb', ccc: 'ddd'});
my_template.setData({ccc: 'xxx', eee: 'fff'});
// returns {aaa: 'bbb', ccc: 'xxx', eee: 'fff'}
my_template.data;
```

Returns **Template** 

#### setOptions

Set options of the template. So far the only options are `delimiter_start` and `delimiter_end`.

**Parameters**

-   `options` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)=(default {})** 

Returns **Template** 

## Bug reports, feature requests and contact

If you found any bugs, if you have feature requests or any questions, please, either [file an issue at GitHub](https://github.com/fczbkk/template/issues) or send me an e-mail at <a href="mailto:riki@fczbkk.com">riki@fczbkk.com</a>.

## License

Template is published under the [MIT license](https://github.com/fczbkk/template/blob/master/LICENSE).
