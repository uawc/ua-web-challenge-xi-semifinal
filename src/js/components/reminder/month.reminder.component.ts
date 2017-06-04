import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../../services/date.service';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { NavigationService } from '../../services/navigation.service';
import { RemindersStoreService } from '../../services/reminder.store.service';

@Component({
	selector: 'month-reminder',
	styleUrls: ['./css/reminder/month.reminder.component.css'],
	templateUrl: './templates/reminder/month.reminder.component.html'
})

export class MonthReminderComponent implements OnInit {
	@Input() currentDayDate: Date;

	protected todayDate = new Date();
	protected remindersAmount: number;

	constructor(private dateService: DateService,
	            private navigationService: NavigationService,
	            private remindersStoreService: RemindersStoreService) {}

	/**
	 * Updating amount of reminders on component's ngOnInit
	 */
	public ngOnInit(): void {
		if (this.currentDayDate.toDateString) {
			this.updateRemindersAmount();
		}
	}

	/**
	 * Updating amount of reminders for current date
	 */
	protected updateRemindersAmount(): void {
		let startDateString = this.dateService.getFormattedDate(this.currentDayDate);
		let reminders = this.remindersStoreService.getRemindersByStartDate(startDateString.split('T')[0]);

		this.remindersAmount = reminders.length;
	}

	/**
	 * navigate to "Day" date clicking
	 */
	protected onReminderClick(): void {
		this.dateService.goToSpecificDate(this.currentDayDate);
		this.navigationService.navigateToTab(NAVIGATION_TABS[0]);
	}
}
