import { ITab } from '../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../data/navigation.data';
import { MenuComponent } from './menu/menu.component';
import { TitleComponent } from './title/title.component';
import { ContentComponent } from './content/content.component';
import { EditReminderComponent } from './reminder/edit.reminder.component';
import { ReminderEditService } from '../services/reminder.edit.service';
import { NotificationService } from '../services/notification.service';
import { NavigationService } from '../services/navigation.service';
import { Component, OnInit } from '@angular/core';
import { ReminderModel } from '../models/reminder.model';

@Component({
	selector: 'app',
	templateUrl: './templates/app.component.html',
	styleUrls: ['./css/app.component.css'],
	directives: [[MenuComponent], [ContentComponent], [TitleComponent], [EditReminderComponent]]
})

export class AppComponent implements OnInit  {
	protected currentTab: ITab = NAVIGATION_TABS[0];
	protected activeReminder: ReminderModel;
	protected isShowEditReminderMenu = false;

	constructor(private reminderEditService: ReminderEditService, 
	            private notificationService: NotificationService, 
	            private navigationService: NavigationService) {}

	public ngOnInit(): void {
		this.navigationService.navigationUpdated$.subscribe(this.onTabChange.bind(this));
		this.reminderEditService.showReminderEditMenu$.subscribe(this.showReminderEditMenu.bind(this));
		this.reminderEditService.hideReminderEditMenu$.subscribe(this.hideReminderEditMenu.bind(this));
	}

	protected showReminderEditMenu(reminder: ReminderModel): void {
		this.isShowEditReminderMenu = true;
		this.activeReminder = reminder;
	}
	
	protected hideReminderEditMenu(): void {
		this.isShowEditReminderMenu = false;
		this.activeReminder = null;
	}

	/**
	 * Handling tabChange event
	 */
	protected onTabChange(tab: ITab): void {
		this.currentTab = tab;
	}
}
