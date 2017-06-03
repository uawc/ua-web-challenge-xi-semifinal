import * as _ from 'underscore';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { RemindersStoreService } from '../../services/reminder.store.service';
import { DateService } from '../../services/date.service';
import { ReminderModel } from '../../models/reminder.model';
import { ICS_TEMPLATE } from '../../data/export.data';

@Component({
	selector: 'editReminderComponent',
	templateUrl: './templates/reminder/edit.reminder.component.html',
	styleUrls: ['./css/reminder/edit.reminder.component.css']
})

export class EditReminderComponent implements OnInit {
	@Input() activeReminder: ReminderModel;
	
	protected reminder = {} as ReminderModel;
	protected isTitleValid = true;
	protected isEndDateValid = true;
	protected isStartDateValid = true;

	constructor(private dateService: DateService,
	            private reminderEditService: ReminderEditService,
	            private remindersStoreService: RemindersStoreService) {}

	public ngOnInit(): void {
		this.updateReminderData(this.activeReminder);

		this.reminderEditService.showReminderEditMenu$.subscribe(this.updateReminderData.bind(this));
	}

	protected onCreateReminderClick(): void {
		if (!this.validate()) {
			return;
		}

		this.remindersStoreService.addNewReminder(new ReminderModel(this.reminder));
		this.reminderEditService.hideReminderEditMenu();
	}

	protected onEditReminderClick(): void {
		if (!this.validate()) {
			return;
		}

		this.remindersStoreService.updateExistingReminder(this.activeReminder.id, this.reminder);
		this.reminderEditService.hideReminderEditMenu();
	}

	protected onDeleteReminderClick(): void {
		this.remindersStoreService.removeReminderById(this.reminder.id);
		this.reminderEditService.hideReminderEditMenu();
	}
	
	protected onCancelClick(): void {
		this.reminderEditService.hideReminderEditMenu();
	}

	protected onExportReminderClick(event: Event): void {
		event.currentTarget['href'] = this.generateReminderUrl();
	}

	protected generateReminderUrl(): string {
		let template = ICS_TEMPLATE;

		template = template.replace('{3}', this.reminder.title);
		template = template.replace('{0}', this.dateService.getZuluTimeStamp());
		template = template.replace('{2}', this.dateService.getZuluTimeStamp(this.reminder.endDateString));
		template = template.replace('{1}', this.dateService.getZuluTimeStamp(this.reminder.startDateString));
		
		return `data:text/calendar;base64,${window.btoa(template)}`;
	}

	protected validate(): boolean {
		this.isTitleValid = !!this.reminder.title;
		this.isEndDateValid = !!this.reminder.endDateString;
		this.isStartDateValid = !!this.reminder.startDateString;

		return !!this.reminder.title && !!this.reminder.endDateString && !!this.reminder.startDateString;
	}

	protected updateReminderData(activeReminder: ReminderModel): void {
		activeReminder ? this.setReminderData(activeReminder) : this.setDefaultData();
	}

	protected setDefaultData(): void {
		let [startDateString, endDateString] = this.dateService.getDefaultsDates();

		_.extend(this.reminder, { startDateString, endDateString, title: 'New reminder' });
	}

	protected setReminderData(activeReminder: ReminderModel = this.activeReminder): void {
		_.extend(this.reminder, activeReminder);
	}
}
