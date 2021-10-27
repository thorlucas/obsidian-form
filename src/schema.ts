export type FormDef = {
	title?: string,
	root?: string,
	types?: { [key: string]: SchemaProp },
	props: { [key: string]: SchemaProp },
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
	type?: 'object',
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