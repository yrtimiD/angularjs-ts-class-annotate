import { ILogger, noLog } from "./logger";
import { tsquery } from "@phenomnomnominal/tsquery";
import { ParameterDeclaration, SyntaxKind, ConstructorDeclaration, ClassDeclaration } from "typescript";


interface IAnnotatableClass {
	classDeclaration: ClassDeclaration;
	constructorDeclaration: ConstructorDeclaration;
	parameterDeclarations: ParameterDeclaration[];
}

function findConstructorsWithParameters(fileContent: string, log: ILogger): IAnnotatableClass[] {
	let result: IAnnotatableClass[] = [];

	const ast = tsquery.ast(fileContent);
	const classes = tsquery(ast, "ClassDeclaration");
	for (let classNode of classes) {
		let annotatableClass = <IAnnotatableClass>{};
		if (classNode.kind !== SyntaxKind.ClassDeclaration) continue;

		annotatableClass.classDeclaration = classNode as ClassDeclaration;
		if (!annotatableClass.classDeclaration.name) continue;
		log.debug(`Class: ${annotatableClass.classDeclaration.name.getText()}`);

		for (let member of annotatableClass.classDeclaration.members) {
			if (member.kind !== SyntaxKind.Constructor) continue;
			annotatableClass.constructorDeclaration = member as ConstructorDeclaration;
			annotatableClass.parameterDeclarations = annotatableClass.constructorDeclaration.parameters.map(param => param);

			if (annotatableClass.parameterDeclarations.length > 0) {
				result.push(annotatableClass);
				log.debug(`\tctor args: ${annotatableClass.parameterDeclarations.map(p => p.name.getText())}`);
			} else {
				log.debug(`\tctor without args`);
			}
		}
	}

	return result;
}

function annotate(fileContent: string, classToAnnotate: IAnnotatableClass, log: ILogger): string {
	let ctorParamsList = classToAnnotate.parameterDeclarations.map(p => `"${p.name.getText()}"`);
	let injectStatement = `\nstatic $inject = [${ctorParamsList.join(",")}];\n`;
	log.debug(`Inject statement: ${injectStatement}`);
	let newFileContent = insertAt(fileContent, classToAnnotate.constructorDeclaration.pos, injectStatement);
	return newFileContent;
}

function insertAt(source: string, index: number, str: string) {
	return source.slice(0, index) + str + source.slice(index)
}

/**
 * Accepts content of typescript file and returns it with added $inject annotations in each class.
 * @param tsFileContent 
 * @param log 
 */
function annotateTs(tsFileContent: string, log: ILogger = noLog): string {
	const annotatableClasses = findConstructorsWithParameters(tsFileContent, log);
	for (let i = annotatableClasses.length - 1; i >= 0; i--) {
		const annotatableClass = annotatableClasses[i];
		tsFileContent = annotate(tsFileContent, annotatableClass, log);
	}

	return tsFileContent;
}

export = annotateTs;
