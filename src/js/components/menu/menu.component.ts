import { Component, Input } from '@angular/core';
import { ITab } from '../../interfaces/tab.interface';
import { DateService } from '../../services/date.service';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { NavigationService } from '../../services/navigation.service';
import { ReminderEditService } from '../../services/reminder.edit.service';

@Component({
	selector: 'menu',
	styleUrls: ['./css/menu/menu.component.css'],
	templateUrl: './templates/menu/menu.component.html'
})

export class MenuComponent {
	@Input() currentTab: string;

	protected tabs: ITab[] = NAVIGATION_TABS;

	constructor(private dateService: DateService,
	            private navigationService: NavigationService, 
	            private reminderEditService: ReminderEditService) {}

	/**
	 * Handling tab clicking
	 */
	protected onTabClick(tab: ITab): void {
		this.navigationService.navigateToTab(tab);
		this.reminderEditService.hideReminderEditMenu();
		this.dateService.resetDatesToCurrent();
	}

	/**
	 * Handling add new reminder button clicking
	 */
	protected onAddReminderClick(): void {
		this.reminderEditService.showReminderEditMenu();
	}

	/**
	 * Handling next date button clicking
	 */
	protected onNextDateClick(): void {
		this.dateService.goToNextDate();
	}

	/**
	 * Handling prev date button clicking
	 */
	protected onPrevDateClick(): void {
		this.dateService.goToPrevDate();
	}

	/**
	 * Handling default date button clicking
	 */
	protected onDefaultDateClick(): void {
		this.dateService.goToDefaultDate();
	}
}
