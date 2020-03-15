class Class1 {
	static $inject = ["$log", "$window"];
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService) {
	}
}
