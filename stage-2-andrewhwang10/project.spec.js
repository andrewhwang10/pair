const fs = require('fs');
const cheerio = require('cheerio') //for html testing
const inlineCss = require('inline-css'); //for css testing

//include custom matchers
const styleMatchers = require('jest-style-matchers');
expect.extend(styleMatchers);

const htmlPath = __dirname + '/index.html';
const html = fs.readFileSync(htmlPath, 'utf-8'); //load the HTML file once

//absolute path for relative loading (if needed)
const baseDir = 'file://'+__dirname+'/';

describe('Used test-driven development', () => {
  test('Used Jest to pre-test code, saved in `pretest.txt`', () => {
    const path = __dirname + '/pretest.txt'
    const pretest = fs.readFileSync(path, 'utf-8');
    expect(pretest);
  })
})

describe('Source code is valid', () => {
  test('HTML validates without errors', async () => {
    const lintOpts = {
      'attr-bans':['align', 'background', 'bgcolor', 'border', 'frameborder', 'marginwidth', 'marginheight', 'scrolling', 'style', 'width', 'height'], //adding height, allow longdesc
      'doctype-first':true,
      'doctype-html5':true,
      'html-req-lang':true,
      'attr-name-style': false, //for meta tags
      'line-end-style':false, //either way
      'indent-style':false, //can mix/match
      'indent-width':false, //don't need to beautify
      'class-style':'none', //I like dashes in classnames
      'img-req-alt':false, //for this test; captured later!
    }

    await expect(htmlPath).toHaveNoHtmlLintErrorsAsync(lintOpts);
  })  

  test('CSS validates without errors', async () => {
    await expect('css/*.css').toHaveNoCssLintErrorsAsync();
  })
});

describe('Has required HTML', () => {
  let $; //cheerio instance

  beforeAll(() => {
    $ = cheerio.load(html);
  })

  test('Specifies charset', () => {
    expect($('head > meta[charset]').length).toBe(1); //has 1 tag
  })
  
  test('Includes page title', () => {
    let title = $('head > title');
    expect(title.length).toEqual(1); //has 1 tag
    expect(title.text().length).toBeGreaterThan(0); //has content
    expect(title.text()).not.toEqual("My Page Title");
  })

  test('Includes author metadata', () => {
    let author = $('head > meta[name="author"]')
    expect(author.length).toEqual(1); //has 1 tag
    expect(author.attr('content').length).toBeGreaterThan(0); //has content
    expect(author.attr('content')).not.toEqual("your name");
  })

  test('Has a top-level heading', () => {
    let h1 = $('h1');
    expect(h1.length).toEqual(1); //has 1 tag
    expect(h1.text()).toBeTruthy(); //contains text
  })
})
