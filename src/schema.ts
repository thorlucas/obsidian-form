export type FormDef = {
	title?: string,
	root?: string,
	types?: { [key: string]: SchemaProp },
	props: { [key: string]: SchemaProp },
}

export function isFormDef(obj: any): obj is FormDef {
	return (
		(typeof obj === 'object') &&
		(obj['title'] === undefined || typeof obj['title'] === 'string') &&
		(obj['root']  === undefined || typeof obj['root']  === 'string') &&
		(obj['types'] === undefined || isPropsMap(obj['types'])) &&
		(isPropsMap(obj['props']))
	);
}

function isPropsMap(obj: any): obj is { [key: string]: SchemaProp } {
	return (
		(typeof obj === 'object') &&
		(Object.keys(obj).every(key => (
			(typeof key === 'string') &&
			(isSchemaProp(obj[key]))
		) === true))
	);
}

function isSchemaProp<T extends SchemaProp['type']>(obj: any, type: T): obj is SchemaPropOfType<T>;
function isSchemaProp(obj: any): obj is SchemaProp;
function isSchemaProp(obj: any, type?: string) {
	// TODO: Validate types
	return (
		(typeof obj === 'object') && 
		(type === undefined || obj['type'] === type)
	);
}

type LabeledProp = {
	label?: string,
	description?: string,
}

/**
 * An object that will contain child properties.
 *
 * @prop [required] - An array of the names of the child props which are required.
 * @prop props - An object mapping child property keys to schema props.
 */
export type ObjectProp = LabeledProp & {
	type: 'object',
	required?: string[],
	props: { [key: string]: SchemaProp },
}

export type NumberProp = LabeledProp & {
	type: 'number',
	min?: number,
	max?: number,
	ui?: 'updown' | 'range',
}

export type IntegerProp = LabeledProp & {
	type: 'integer',
	min?: number,
	max?: number,
	ui?: 'updown' | 'range',
}

/**
 * A string property.
 *
 * @prop [options] - A list of options that are allowed if `ui` is `'dropdown'`.
 */
export type StringProp = LabeledProp & {
	type: 'string',
	options?: string[],
	ui?: 'text' | 'textarea' | 'dropdown',
}

export type BooleanProp = LabeledProp & {
	type: 'boolean',
}

export type SchemaProp =
	  ObjectProp
	| NumberProp
	| IntegerProp
	| StringProp
	| BooleanProp;

export type SchemaPropOfType<T extends SchemaProp['type']> = Extract<SchemaProp, SchemaProp & { type: T }>;
