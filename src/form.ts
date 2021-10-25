export interface Form {
	title?: string,
	elements: FormElement[],
}

export interface TextInputField {
	type: 'input.text',
	label?: string,
	binds?: string,
}

export type FormElement = 
	TextInputField;

export function isFormElement(obj: any): obj is FormElement {
	return (
		(typeof obj === 'object') &&
		(typeof obj['type'] === 'string')
	);
}

export function isForm(obj: any): obj is Form {
	return (
		(obj['title'] === undefined || typeof obj['title'] === 'string') && 
		(typeof obj['elements'] === 'object') &&
		(Object.values(obj['elements']).reduce((acc: boolean, el: any) => {
			return acc && isFormElement(el);
		}, true) as boolean)
	);
}

