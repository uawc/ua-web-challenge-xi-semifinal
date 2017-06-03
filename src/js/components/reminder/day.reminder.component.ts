import { Component, OnInit } from '@angular/core';
import { ReminderModel } from '../../models/reminder.model';
import { DateService } from '../../services/date.service';
import { RemindersStoreService } from '../../services/reminder.store.service';
import { RemindersAlignmentService } from '../../services/reminder.alignment.service';
import { ReminderEditService } from '../../services/reminder.edit.service';

@Component({
	selector: 'dayReminderComponent',
	templateUrl: './templates/reminder/day.reminder.component.html',
	styleUrls: ['./css/reminder/day.reminder.component.css']
})

export class DayReminderComponent implements OnInit {
	protected activeReminder: ReminderModel;
	protected remindersCollection: ReminderModel[];
	
	constructor(private dateService: DateService,
	            private reminderEditService: ReminderEditService,
	            private remindersStoreService: RemindersStoreService,
				private remindersAlignmentService: RemindersAlignmentService) {}

	public ngOnInit(): void {
		this.updateRemindersCollection();

		this.dateService.dateUpdated$.subscribe(this.updateRemindersCollection.bind(this));
		this.reminderEditService.showReminderEditMenu$.subscribe(this.updateActiveReminder.bind(this));
		this.reminderEditService.hideReminderEditMenu$.subscribe(this.updateActiveReminder.bind(this));
		this.remindersStoreService.remindersUpdated$.subscribe(this.updateRemindersCollection.bind(this));
	}

	protected updateRemindersCollection(): void {
		let eventsPerDay = this.remindersStoreService.getRemindersPerDay(this.dateService.currentDateString);
		
		this.remindersCollection = this.remindersAlignmentService.calculateRemindersAlignment(eventsPerDay);
	}
	
	protected updateActiveReminder(reminder: ReminderModel): void {
		this.activeReminder = reminder;
	}

	protected onReminderClick(reminder: ReminderModel): void {
		this.reminderEditService.showReminderEditMenu(reminder);
	}
}
