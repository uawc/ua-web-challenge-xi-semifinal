import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ReminderModel } from '../../models/reminder.model';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { NavigationService } from '../../services/navigation.service';
import { RemindersStoreService } from '../../services/reminder.store.service';

@Component({
	selector: 'content-agenda',
	styleUrls: ['./css/content/content.agenda.component.css'],
	templateUrl: './templates/content/content.agenda.component.html'
})

export class ContentAgendaComponent implements OnInit {
	protected currentWeekDates: Date[] = this.dateService.currentWeekDates;
	protected weekReminders = [] as ReminderModel[];

	constructor(private dateService: DateService,
	            private navigationService: NavigationService,
	            private remindersStoreService: RemindersStoreService) {}

	/**
	 * Updating week reminders and subscribing on date updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.updateWeekReminders();

		this.dateService.dateUpdated$.subscribe(this.updateWeekReminders.bind(this));
		this.remindersStoreService.remindersUpdated$.subscribe(this.updateWeekReminders.bind(this));
	}

	/**
	 * Updating week reminders and week dates
	 */
	updateWeekReminders(): void {
		this.weekReminders = [];
		this.currentWeekDates = this.dateService.currentWeekDates;

		this.currentWeekDates.forEach((date: Date) => {
			let startDateString = this.dateService.getFormattedDate(date);
			let reminders = this.remindersStoreService.getRemindersByStartDate(startDateString.split('T')[0]);

			this.weekReminders = this.weekReminders.concat(reminders);
		});
	}

	onReminderClick(reminder: ReminderModel): void {
		this.dateService.goToSpecificDate(new Date(reminder.startDate));
		this.navigationService.navigateToTab(NAVIGATION_TABS[0]);
	}
}
