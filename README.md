> ### Sigma UI Framework
> A bespoke UI Framework for building desktop business applications

----

##### Getting Started

> Before staring setup a project using the [ui-skeleton](//github.com/sigmaframeworks/sigma-ui-skeleton).


* `src/main.ts` Main aurelia entry point

```ts
aurelia.use
  .plugin('aurelia-validation')
  .plugin('aurelia-validatejs')
  .plugin('sigma-ui-framework', function(config) {
    config
      .title(string)
      .version(string)
      .appKey(string)

      .apiUrl(url)
      .apiHeaders(object)
      // Send authorization header with every request
      .addAuthHeader(bool)

      .loadCharts()
      .languages(array<{id, name}>)
  });

aurelia.start()
	.then(() => aurelia.setRoot())
	.then(() => {
		var splash = window.document.querySelector('.ui-splash');
		splash.classList.add('animate');
		setTimeout(() => {
			splash.parentElement.removeChild(splash);
		}, 1000);
	})
	.catch(e => {
		console.log(e);
	});
```
