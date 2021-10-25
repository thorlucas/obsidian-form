import { App, MarkdownPostProcessorContext, parseYaml, Plugin, PluginSettingTab, Setting } from 'obsidian';
import { Form, FormElement, isForm, isFormElement } from './form';
import './styles.scss';

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

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
		console.log(source);
		console.log(ctx);

		const form: Form = this.parseFormDefinition(source);
		console.log(form);

		el.empty();

		el.createDiv({
			cls: 'obsidian-form',
		}, (el: HTMLElement) => {
			if (form.title) {
				el.createEl('h2', {
					cls: 'form-title',
					text: form.title,
				});
			}

			form.elements.forEach((formEl: FormElement) => {
				if (formEl.type == 'input.text') {
					el.createDiv({ cls: 'form-group' }, (el) => {
						if (formEl.label) {
							el.createEl('label', {
								text: formEl.label,
							});
						}
						el.createEl('input', {
							type: 'text',
						});
					});
				}
			});
		});
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
