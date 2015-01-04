'use strict';
let assert  = require('assert'),
    request = require('co-supertest'),
    app     = require('./fixtures/app'),
    escape  = require('escape-html');

require('co-mocha');

let server = app.listen();

function testHelper(jadeFile, contains, doLog, data){
  data = data || {};
  return request(server)
    .post('/')
    .set('jadeFile', jadeFile)
    .set('doLog', doLog)
    .send(data)
    .expect(200)
    .expect(contains)
    .end();
}

describe('Jade', function(){

  it('should contain href="knowthen.com" in response', function *(){
    yield testHelper('attr', /href="knowthen.com"/, false);
    
  });
  it('should render a passed variable', function *(){

    let name;
    name = 'James';
    yield testHelper('vars', new RegExp(name), false, {name: name});
    
  });

  it('should escape unsafe content', function *(){
    let userContent, escapedUserContent;
    userContent = '<script>dangerousStuff;</script>';
    escapedUserContent = escape(userContent);
    yield testHelper('vars', new RegExp(escapedUserContent), 
      false, {name: userContent});
  });
  
  it('should render a list of websites', function *(){
    let sites = ['knowthen.com', 'google.com', 'twitter.com'];
    yield testHelper('loop', new RegExp(sites[0]), false, {sites: sites});
    yield testHelper('loop', new RegExp(sites[1]), false, {sites: sites});
    yield testHelper('loop', new RegExp(sites[2]), false, {sites: sites});
    
  });

  it('should be ok to drive', function *(){

    yield testHelper('case', /able to drive/, false, {drinksConsumed: 0});

  });
  
  it('should wait for a bit before driving', function *(){
    
    yield testHelper('case', /chill for a bit/, false, {drinksConsumed: 1});

  });

  it('should not drive for a while', function *(){
    
    yield testHelper('case', /not for a while/, false, {drinksConsumed: 3});

  });

  it('better not puke on me', function *(){
    
    yield testHelper('case', /do not puke on me/, false, {drinksConsumed: 10});

  });

  it('should show login link', function *(){
    
    yield testHelper('conditional', /login/, false);

  });

  it('should show logout link', function *(){
  
    yield testHelper('conditional', /logout/, false, {user: 'James'});

  });

  it('should show the regular comment', function *(){
    
    yield testHelper('comment', /should show/, false);

  });

  it('should not show the unbuffered comment', function *(){
    
    let message;
    try{
      yield testHelper('comment', /should not show/, false);
    }
    catch(err){
      message = err.message;
    }
    assert.equal(
      message,
      "expected body '<!-- this comment should show-->'" +
      " to match /should not show/"
      );

  });

  it('should render a block of comments', function *(){
    
    yield testHelper('blockcomment', /a comment that\nspans two lines/, false);

  });
  it('parent should show default content when rendered', function *(){
    
    yield testHelper('parent', /default content/, false);

  });

  it('child should show its overridden content', function *(){
    
    yield testHelper('child', /child content/, false);

  });

  it('should include the header from a seperate file', function *(){
    
    yield testHelper('include', /Valid HTML/, false);

  });

  it('should render an html5 doctype', function *(){
    
    yield testHelper('doctype', /<!DOCTYPE html>/, false);

  });

  it('should render a anchor from a custom mixin', function *(){
    
    yield testHelper('mixin', /<a href="google.com" class="favorite">/, false);

  });

  it('should render plain text without a html tag', function *(){
    
    yield testHelper('text', /plain text/, false);

  });

  it('should render a block of text in a html tag', function *(){
    
    yield testHelper('blocktext', /<p>a block of text\nacross two lines<\/p>/, 
      false);

  });

  it('should render a more comprehensive example', function *(){
    
    yield testHelper('index', /Pros and Cons of using Jade/, true, {
        title: 'Pros and Cons',
        pros: [
          'terse syntax',
          'inheritance', 
          'mixins',
          'validated html',
        ],
        cons: [
          'learning curve',
          'not the fastest',
          'no streaming'
        ]
      });

  });

});












