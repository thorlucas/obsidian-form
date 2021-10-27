import { App, MarkdownPostProcessorContext, parseYaml, Plugin, PluginSettingTab, Setting, TFile } from 'obsidian';
import { Form, FormElement, isForm, isFormElement } from './form';
import type { IMetaEditApi } from './metaedit';
import FormEl from './UI/Form.svelte';
import './styles.scss';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	private _metaedit: IMetaEditApi = null;

	private get metaedit(): IMetaEditApi {
		if (this._metaedit === null) {
			if (!this.app.plugins.plugins['metaedit']) {
				throw new Error("This plugin requires MetaEdit!");
			}

			this._metaedit = this.app.plugins.plugins.metaedit.api as IMetaEditApi;
		}

		return this._metaedit;
	}

	async onload() {
		console.log('loading plugin');
		

		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor(
			'form',
			this.postProcessor.bind(this),
		);

		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {
		console.log('unloading plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async postProcessor(source: string, el: HTMLElement, ctx: MarkdownPostProcessorContext) {
		const form: Form = this.parseFormDefinition(source);

		el.empty();

		new FormEl({
			target: el,
			props: {
				form: form,
				update: (property: string, value: string) => {
					this.updateProperty(ctx.sourcePath, property, value);
				},
			},
		});
	}

	async updateProperty(file: string | TFile, property: string, value: string) {
		this.metaedit.update(property, value, file);
	}

	/**
	 * @throws YAMLParseError
	 * @throws SyntaxError
	 */
	parseFormDefinition(source: string): Form {
		const parsed: any = parseYaml(source);
		if (isForm(parsed)) {
			return parsed;
		} else {
			throw new SyntaxError("Could not parse form syntax.");
		}
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		let {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for my awesome plugin.'});

		new Setting(containerEl)
			.setName('Setting #1')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue('')
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
