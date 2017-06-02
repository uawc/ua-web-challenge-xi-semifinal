import { ITab } from '../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../data/navigation.data';
import { MenuComponent } from './menu/menu.component';
import { TitleComponent } from './title/title.component';
import { ContentComponent } from './content/content.component';
import { EditEventComponent } from './event/edit.event.component';
import { Component } from '@angular/core';

@Component({
	selector: 'app',
	templateUrl: './templates/app.component.html',
	styleUrls: ['./css/app.component.css'],
	directives: [[MenuComponent], [ContentComponent], [TitleComponent], [EditEventComponent]]
})

export class AppComponent {
	protected currentTab: ITab = NAVIGATION_TABS[0];
	protected showEditEventMenu = false;

	/**
	 * Handling tabChange event
	 */
	protected onTabChange(tab: ITab): void {
		this.currentTab = tab;
	}

	protected onToggleEditEventMenu(): void {
		this.showEditEventMenu = !this.showEditEventMenu;
	}
}
