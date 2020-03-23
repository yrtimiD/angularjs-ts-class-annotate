# angularjs-ts-class-annotate
Adds AngularJS dependency annotations for typescript classes

## Important notes
* Supports typescript classes only.
* Adds AngularJS $inject statement for constructors in all classes regardless if they are registered in the angular injector or not.
* Existing $inject statements are totally ignored.

## Usage example
```sh
npm install angularjs-ts-class-annotate
```
[typescript](https://www.npmjs.com/package/typescript) is a peer dependency, make sure to install it (tested with v3 only):
```sh
npm install typescript@3
```

and run:
```js
const fs = require("fs");
const annotateTs = require("angularjs-ts-class-annotate");

var fileContent = fs.readFileSync("some-class.ts", "utf8");
fileContent = annotateTs(fileContent);
fs.writeFileSync("some-class.annotated.ts", fileContent, "utf8");
```

### Before: original some-class.ts
```typescript
class Class1 {
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
```
### After: annotated some-class.annotated.ts
```typescript
class Class1 {
static $inject = ["$log","$window"];
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
```

## Building
```
npm i
npm run build
npm run demo
```
