# Episode 6 – Serving Content in Koajs with Jade
### Source files used in the [Serving Content in Koajs with Jade screencast](http://knowthen.com/episode-6-serving-content-in-koajs-with-jade)

In this episode we will **learn** how to **serve** _static_ and _dynamic_ _content_ in [Koajs](http://koajs.com/ "koajs") with a **deep dive** into [Jade's](http://jade-lang.com/ "Jade Templating Language") features and functions.

Koajs _requires_ the node `'--harmony'` flag which _enables_ the ES6 feature [_Generators_](http://knowthen.com/episode-2-understanding-javascript-generators/ "Episode 2 – Understanding JavaScript Generators"), the foundational building block in Koajs.  There are many _other_ [features](http://kangax.github.io/compat-table/es6/ "ES6 Features") that are **enabled** when we use the `'--harmony'` flag such as the new **variable** keyword `let`. We'll _use_ `let` in place of `var` through out the episode.

First we'll **review** the different _types_ of [_responses_](http://koajs.com/#response-body- "Koajs Response Types") that can be sent from Koajs and their **default** _content types_.

Then we will look at _serving_ **static** content using the [koa-static](https://github.com/koajs/static "koa-static") middleware.

Next we'll take a look at _how to_ **render** _dynamic content_ using [co-views](https://github.com/tj/co-views).

Co-views **supports** over **_2 dozen_** templating engines by leveraging the node [consolidate.js](https://github.com/tj/consolidate.js "consolidate.js") package.

I'll narrow down the list of templating engines to 3 unique and interesting choices:

*   [Jade](http://jade-lang.com/ "Jade Templating Language")
*   [Swig](http://paularmstrong.github.io/swig/ "Swig Templating")
*   [Marko](http://raptorjs.org/marko/try-online/ "Marko Templating")


We'll **focus** _on_ the features and functionality of **Jade** in this episode, and we'll look at _Swig_ and _Marko_ in the _next_ couple _episodes_.



