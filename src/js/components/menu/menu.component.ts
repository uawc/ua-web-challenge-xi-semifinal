import { ITab } from '../../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { Component, Input } from '@angular/core';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { NavigationService } from '../../services/navigation.service';
import { DateService } from '../../services/date.service';

@Component({
	selector: 'menu',
	templateUrl: './templates/menu/menu.component.html',
	styleUrls: ['./css/menu/menu.component.css']
})

export class MenuComponent {
	protected tabs: ITab[] = NAVIGATION_TABS;

	@Input() currentTab: string;

	constructor(private dateService: DateService,
	            private navigationService: NavigationService, 
	            private reminderEditService: ReminderEditService) {}

	/**
	 * Emitting to parent that navigation tab has been changed
	 */
	protected onTabChange(tab: ITab): void {
		this.navigationService.navigateToTab(tab);
		this.reminderEditService.hideReminderEditMenu();
		this.dateService.resetDatesToCurrent();
	}

	protected onAddReminderClick(): void {
		this.reminderEditService.showReminderEditMenu();
	}
	
	protected onNextDateClick(): void {
		this.dateService.goToNextDate();
	}

	protected onPrevDateClick(): void {
		this.dateService.goToPrevDate();
	}

	protected onDefaultDateClick(): void {
		this.dateService.goToDefaultDate();
	}
}
