class Class1 {
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}

class Class2 {
	constructor(private $window: ng.IWindowService, $log: ng.ILogService) {
	}
}
