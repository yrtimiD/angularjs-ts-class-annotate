class ClassWithManyParamCtor {
	messageKey: string;
	//static $inject = ["$log", "$window", "$translate"];
	/*@ngInject*/
	constructor(private $log: ng.ILogService, private $window: ng.IWindowService, private $translate: angular.translate.ITranslateService) {
		this.messageKey = "HELLO";
	}

	public method1() { }
	private method2() { }
}
