import * as debug from "debug";

export interface ILogger {
	debug(formatter: any, ...args: any[]): void;
	info(formatter: any, ...args: any[]): void;
	error(formatter: any, ...args: any[]): void;
}

export const defaultLog: ILogger = {
	debug: debug.debug("app:debug"),
	info: debug.debug("app:info"),
	error: debug.debug("app:error")
}

export const noLog: ILogger = {
	debug: () => { },
	info: () => { },
	error: () => { }
}
