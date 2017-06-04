import { Component, OnInit, Input } from '@angular/core';
import { ReminderModel } from '../../models/reminder.model';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { RemindersStoreService } from '../../services/reminder.store.service';
import { RemindersAlignmentService } from '../../services/reminder.alignment.service';

@Component({
	selector: 'day-reminder',
	styleUrls: ['./css/reminder/day.reminder.component.css'],
	templateUrl: './templates/reminder/day.reminder.component.html'
})

export class DayReminderComponent implements OnInit {
	@Input() currentDayDateString: string;

	protected activeReminder: ReminderModel;
	protected remindersCollection: ReminderModel[];
	
	constructor(private reminderEditService: ReminderEditService,
	            private remindersStoreService: RemindersStoreService,
				private remindersAlignmentService: RemindersAlignmentService) {}

	/**
	 * Updating reminder collection and subscribing on events on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.updateRemindersCollection();

		this.reminderEditService.showReminderEditMenu$.subscribe(this.updateActiveReminder.bind(this));
		this.reminderEditService.hideReminderEditMenu$.subscribe(this.updateActiveReminder.bind(this));
		this.remindersStoreService.remindersUpdated$.subscribe(this.updateRemindersCollection.bind(this));
	}

	/**
	 * Updating reminder collection on currentDayDateString changing
	 */
	public ngOnChanges(): void {
		this.updateRemindersCollection();
	}

	/**
	 * Updating reminder collection and calculation reminders alignment
	 */
	protected updateRemindersCollection(): void {
		let eventsPerDay = this.remindersStoreService.getRemindersPerDay(this.currentDayDateString);
		
		this.remindersCollection = this.remindersAlignmentService.calculateRemindersAlignment(eventsPerDay);
	}

	/**
	 * Updating active reminder
	 */
	protected updateActiveReminder(reminder: ReminderModel): void {
		this.activeReminder = reminder;
	}

	/**
	 * show edit menu on reminder clicking
	 */
	protected onReminderClick(reminder: ReminderModel): void {
		let activeReminder = this.remindersStoreService.getReminderById(reminder.id);

		this.reminderEditService.showReminderEditMenu(activeReminder);
	}
}
