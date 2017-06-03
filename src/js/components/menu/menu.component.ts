import { ITab } from '../../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { DateService } from '../../services/date.service';

@Component({
	selector: 'menu',
	templateUrl: './templates/menu/menu.component.html',
	styleUrls: ['./css/menu/menu.component.css']
})

export class MenuComponent {
	protected tabs: ITab[] = NAVIGATION_TABS;

	@Input()  currentTab: string;
	@Output() tabChange = new EventEmitter();
	@Output() toggleEditReminderMenu = new EventEmitter();

	constructor(private reminderEditService: ReminderEditService, private dateService: DateService) {}

	/**
	 * Emitting to parent that navigation tab has been changed
	 */
	protected onTabChange(tab: ITab): void {
		this.tabChange.emit(tab);
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

	protected onCurrentDateClick(): void {
		this.dateService.goToCurrentDate();
	}
}
