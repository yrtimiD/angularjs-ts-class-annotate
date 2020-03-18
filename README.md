# angularjs-ts-class-annotate
AngularJS Typescript class-only annotation library

## Important notes
* Supports typescript Classes only.
* Adds AngularJS $inject statement for constructors in all classes regardless if they are registered in the angular injector or not.
* Existing $inject statements are totally ignored.

## Usage example
```js
const fs = require("fs");
const annotateTs = require("angularjs-ts-class-annotate");

var fileContent = fs.readFileSync("some-class.ts", "utf8");
fileContent = annotateTs(fileContent);
fs.writeFileSync("some-class.annotated.ts", fileContent, "utf8");
```

### Original some-class.ts
```typescript
class Class1 {
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
```
### Annotated some-class.annotated.ts
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
