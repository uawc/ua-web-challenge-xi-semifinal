import { Component, OnInit } from '@angular/core';
import { ITab } from '../interfaces/tab.interface';
import { MenuComponent } from './menu/menu.component';
import { ReminderModel } from '../models/reminder.model';
import { TitleComponent } from './title/title.component';
import { NAVIGATION_TABS } from '../data/navigation.data';
import { ContentComponent } from './content/content.component';
import { NavigationService } from '../services/navigation.service';
import { NotificationService } from '../services/notification.service';
import { ReminderEditService } from '../services/reminder.edit.service';
import { EditReminderComponent } from './reminder/edit.reminder.component';

@Component({
	selector: 'app',
	styleUrls: ['./css/app.component.css'],
	templateUrl: './templates/app.component.html',
	directives: [[MenuComponent], [ContentComponent], [TitleComponent], [EditReminderComponent]]
})

export class AppComponent implements OnInit  {
	protected currentTab: ITab = NAVIGATION_TABS[0];
	protected activeReminder: ReminderModel;
	protected isShowEditReminderMenu = false;

	constructor(private reminderEditService: ReminderEditService, 
	            private notificationService: NotificationService, 
	            private navigationService: NavigationService) {}

	/**
	 * Subscribing on events on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.navigationService.navigationUpdated$.subscribe(this.onTabChange.bind(this));
		this.reminderEditService.showReminderEditMenu$.subscribe(this.showReminderEditMenu.bind(this));
		this.reminderEditService.hideReminderEditMenu$.subscribe(this.hideReminderEditMenu.bind(this));
	}

	/**
	 * Showing edit menu
	 */
	protected showReminderEditMenu(reminder: ReminderModel): void {
		this.isShowEditReminderMenu = true;
		this.activeReminder = reminder;
	}

	/**
	 * Hiding edit menu
	 */
	protected hideReminderEditMenu(): void {
		this.isShowEditReminderMenu = false;
		this.activeReminder = null;
	}

	/**
	 * Changing current tab on tab clicking
	 */
	protected onTabChange(tab: ITab): void {
		this.currentTab = tab;
	}
}
