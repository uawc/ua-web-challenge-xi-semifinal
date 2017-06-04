import { Component, OnInit, Input } from '@angular/core';
import { RemindersStoreService } from '../../services/reminder.store.service';
import { NavigationService } from '../../services/navigation.service';
import { DateService } from '../../services/date.service';
import { NAVIGATION_TABS } from '../../data/navigation.data';

@Component({
	selector: 'monthReminderComponent',
	templateUrl: './templates/reminder/month.reminder.component.html',
	styleUrls: ['./css/reminder/month.reminder.component.css']
})

export class MonthReminderComponent implements OnInit {
	@Input() currentDayDate: Date;

	protected todayDate = new Date();
	protected remindersAmount: number;

	constructor(private dateService: DateService,
	            private navigationService: NavigationService,
	            private remindersStoreService: RemindersStoreService) {}

	public ngOnInit(): void {
		if (this.currentDayDate.toDateString) {
			this.updateRemindersAmount();
		}
	}
	
	protected updateRemindersAmount(): void {
		let startDateString = this.dateService.getFormattedDate(this.currentDayDate);
		let reminders = this.remindersStoreService.getRemindersByStartDate(startDateString.split('T')[0]);

		this.remindersAmount = reminders.length;
	}

	protected onReminderClick(): void {
		this.dateService.goToSpecificDate(this.currentDayDate);
		this.navigationService.navigateToTab(NAVIGATION_TABS[0]);
	}
}
