import * as _ from 'underscore';
import { ICS_TEMPLATE } from '../../data/export.data';
import { Component, OnInit, Input } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ReminderModel } from '../../models/reminder.model';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { RemindersStoreService } from '../../services/reminder.store.service';

@Component({
	selector: 'edit-reminder',
	styleUrls: ['./css/reminder/edit.reminder.component.css'],
	templateUrl: './templates/reminder/edit.reminder.component.html'
})

export class EditReminderComponent implements OnInit {
	@Input() activeReminder: ReminderModel;

	protected isTitleValid = true;
	protected isEndDateValid = true;
	protected isStartDateValid = true;
	protected reminder = {} as ReminderModel;

	constructor(private dateService: DateService,
	            private reminderEditService: ReminderEditService,
	            private remindersStoreService: RemindersStoreService) {}

	/**
	 * Updating component's data and subscribing on show edit menu event on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.updateReminderData(this.activeReminder);

		this.reminderEditService.showReminderEditMenu$.subscribe(this.updateReminderData.bind(this));
	}

	/**
	 * Validating fields and add new reminder on create reminder button clicking
	 */
	protected onCreateReminderClick(): void {
		if (!this.validate()) {
			return;
		}

		this.remindersStoreService.addNewReminder(new ReminderModel(this.reminder));
		this.reminderEditService.hideReminderEditMenu();
	}

	/**
	 * Validating fields and edit current reminder on edit reminder button clicking
	 */
	protected onEditReminderClick(): void {
		if (!this.validate()) {
			return;
		}

		this.remindersStoreService.updateExistingReminder(this.activeReminder.id, this.reminder);
		this.reminderEditService.hideReminderEditMenu();
	}

	/**
	 * Deleting reminder on delete reminder button clicking
	 */
	protected onDeleteReminderClick(): void {
		this.remindersStoreService.removeReminderById(this.reminder.id);
		this.reminderEditService.hideReminderEditMenu();
	}

	/**
	 * Closing edit menu on cancel button clicking
	 */
	protected onCancelClick(): void {
		this.reminderEditService.hideReminderEditMenu();
	}

	/**
	 * Exporting reminder into .ics on export button clicking
	 */
	protected onExportReminderClick(event: Event): void {
		event.currentTarget['href'] = this.generateReminderUrl();
	}

	/**
	 * Updating component's reminder with data
	 */
	protected updateReminderData(activeReminder: ReminderModel): void {
		activeReminder ? this.setReminderData(activeReminder) : this.setDefaultData();
	}

	/**
	 * Updating component's reminder with default data
	 */
	protected setDefaultData(): void {
		let [startDateString, endDateString] = this.dateService.getDefaultsDates();

		_.extend(this.reminder, { startDateString, endDateString, title: 'New reminder' });
	}

	/**
	 * Updating component's reminder with active reminder data
	 */
	protected setReminderData(activeReminder: ReminderModel = this.activeReminder): void {
		_.extend(this.reminder, activeReminder);
	}

	/**
	 * Generating .ics template
	 */
	protected generateReminderUrl(): string {
		let template = ICS_TEMPLATE;

		template = template.replace('{3}', this.reminder.title);
		template = template.replace('{0}', this.dateService.getZuluTimeStamp());
		template = template.replace('{2}', this.dateService.getZuluTimeStamp(this.reminder.endDateString));
		template = template.replace('{1}', this.dateService.getZuluTimeStamp(this.reminder.startDateString));
		
		return `data:text/calendar;base64,${window.btoa(template)}`;
	}

	/**
	 * Validating fields
	 */
	protected validate(): boolean {
		this.isTitleValid = !!this.reminder.title;
		this.isEndDateValid = !!this.reminder.endDateString;
		this.isStartDateValid = !!this.reminder.startDateString;

		if (this.isEndDateValid && this.isStartDateValid) {
			this.isEndDateValid = this.reminder.endDateString > this.reminder.startDateString;
		}

		return !!this.reminder.title && !!this.reminder.endDateString && !!this.reminder.startDateString;
	}
}
