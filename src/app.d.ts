import { App } from 'obsidian';
import { IMetaEditApi } from './metaedit';

declare module 'obsidian' {
	interface App {
		plugins: {
			plugins: {
				metaedit: {
					api: IMetaEditApi,
				}
			}
		}
	}
}
