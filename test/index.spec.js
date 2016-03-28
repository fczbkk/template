import Template from './../src';


describe('Template', function() {

  it('should exist', function() {
    expect(Template).toBeDefined();
  });

  describe('content', function () {

    it('should set content at init', function() {
      const x = new Template('aaa');
      expect(x.content).toEqual('aaa');
    });

    it('should set content', function() {
      const x = new Template();
      x.setContent('aaa');
      expect(x.content).toEqual('aaa');
    });

  });

  describe('data', function () {

    it('should set data at init', function() {
      const x = new Template('aaa', {bbb: 'ccc'});
      expect(x.data).toEqual({bbb: 'ccc'});
    });

    it('should set data', function() {
      const x = new Template();
      x.setData({bbb: 'ccc'});
      expect(x.data).toEqual({bbb: 'ccc'});
    });

    it('should update data', function() {
      const x = new Template();
      x.setData({aaa: 'bbb'});
      x.setData({ccc: 'ddd'});
      expect(x.data.aaa).toEqual('bbb');
      expect(x.data.ccc).toEqual('ddd');
    });

  });

  describe('options', function () {

    it('should set data at init', function() {
      const x = new Template('aaa', {bbb: 'ccc'}, {ddd: 'eee'});
      expect(x.options.ddd).toEqual('eee');
    });

    it('should use % as delimiters by default', function () {
      const x = new Template();
      expect(x.options.delimiter_start).toEqual('%');
      expect(x.options.delimiter_end).toEqual('%');
    });

    it('should set data', function() {
      const x = new Template();
      x.setData({bbb: 'ccc'});
      expect(x.data).toEqual({bbb: 'ccc'});
    });

  });

  describe('render', function () {

    it('should get HTML', function() {
      const x = new Template();
      x.setContent('aaa %bbb% %ccc%');
      x.setData({bbb: 'xxx', ccc: 'yyy'});
      expect(x.getHtml()).toEqual('aaa xxx yyy');
    });

    it('should replace all instances when rendering', function() {
      const x = new Template();
      x.setContent('%aaa% %aaa%');
      x.setData({aaa: 'bbb'});
      expect(x.getHtml()).toEqual('bbb bbb');
    });

    it('should use customizable delimiters', function () {
      const x = new Template();
      x.setContent('aaabbbccc');
      x.setData({bbb: 'xxx'});
      x.setOptions({
        delimiter_start: 'aaa',
        delimiter_end: 'ccc'
      });
      expect(x.getHtml()).toEqual('xxx');
    });

  });

  describe('DOM', function () {

    it('should get DOM representation if contains single element', function() {
      const x = new Template();
      x.setContent('<div></div>');
      expect(x.getDom().tagName).toEqual('DIV');
    });

    it('should get document fragment if contains multiple elements', function() {
      const x = new Template();
      x.setContent('<div></div><div></div>');
      expect(x.getDom().querySelectorAll('div').length).toEqual(2);
    });

  });

});
