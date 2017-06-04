import * as _ from 'underscore';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReminderModel } from '../models/reminder.model';

@Injectable()
export class RemindersStoreService {
	protected remindersUpdated = new Subject<any>();
	protected activeReminderUpdated = new Subject<any>();
	
	public allReminders: ReminderModel[] = [];
	public remindersUpdated$ = this.remindersUpdated.asObservable();
	public activeReminderUpdated$ = this.activeReminderUpdated.asObservable();
	
	constructor() {
		this.restoreReminders();
	}

	/**
	 * Getting reminder for specific day
	 */
	public getRemindersPerDay(date: string): ReminderModel[] {
		let dayReminders: ReminderModel[];
		let allReminders: ReminderModel[];

		allReminders = this.allReminders.map((model) => new ReminderModel(model));
		dayReminders = this.getRemindersForDate(allReminders, date);
		dayReminders = this.getRemindersWithBigDate(dayReminders, date);

		return dayReminders;
	}

	/**
	 * Finding reminder by specific date
	 */
	public getReminderByStartDate(startDateString: string): ReminderModel {
		return _.findWhere(this.allReminders, { startDateString });
	}

	/**
	 * Finding reminders array by specific date
	 */
	public getRemindersByStartDate(startDate: string): ReminderModel[] {
		return _.where(this.allReminders, { startDate });
	}

	/**
	 * Finding reminder by id
	 */
	public getReminderById(id: number): ReminderModel {
		return _.findWhere(this.allReminders, { id });
	}

	/**
	 * Save reminders to localStorage
	 */
	public saveReminders(): void {
		localStorage.setItem('reminders', JSON.stringify(this.allReminders));
	}

	/**
	 * Adding new reminder
	 */
	public addNewReminder(reminder: ReminderModel): void {
		this.allReminders.push(reminder);
		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}

	/**
	 * Updating existing reminder
	 */
	public updateExistingReminder(id: number, data: any): void {
		let activeReminder = this.getReminderById(id);

		_.extend(activeReminder, data);

		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}

	/**
	 * Remove existing reminder by id
	 */
	public removeReminderById(id: number): void {
		this.allReminders = _.reject(this.allReminders, (reminder) => reminder.id === id);
		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}

	/**
	 * Notify subscribers that active reminder has been changed
	 */
	public setActiveReminder(reminder: ReminderModel): void {
		this.announceActiveReminderUpdated(reminder)
	}

	/**
	 * Notify subscribers that reminders amount was changed
	 */
	protected announceRemindersUpdated(): void {
		this.remindersUpdated.next(this.allReminders);
	}

	/**
	 * Notify subscribers that active reminder was changed
	 */
	protected announceActiveReminderUpdated(reminder: ReminderModel): void {
		this.activeReminderUpdated.next(reminder);
	}

	/**
	 * Restoring reminders from localStorage
	 */
	protected restoreReminders(): void {
		let reminders = localStorage.getItem('reminders') || '[]';

		try {
			this.allReminders = this.getResetModels(JSON.parse(reminders));
		} catch (error) {
			console.log(`Cant parse reminders data from LocalStorage`);
		}
	}

	/**
	 * Resetting models
	 */
	protected getResetModels(models: ReminderModel[]): ReminderModel[] {
		return models.map((model, id) => new ReminderModel({...model, id}));
	}

	/**
	 * Getting reminders for day date including reminders with more than one day date
	 */
	protected getRemindersForDate(reminders: ReminderModel[], date: string): ReminderModel[] {
		let dayReminders = _.filter(reminders, (el: ReminderModel) => {
			if (el.startDate === el.endDate) {
				return el.startDate === date;
			}

			if (el.startDate < date && date < el.endDate) {
				return true;
			}

			if (el.startDate < date && date === el.endDate) {
				return true;
			}

			if (el.startDate === date && date < el.endDate) {
				return true;
			}

			return el.endDate === date;
		});

		return dayReminders;
	}

	/**
	 * Getting reminders with split reminders which are larger than one day long
	 */
	protected getRemindersWithBigDate(reminders: ReminderModel[], date: string): ReminderModel[] {
		let dayReminders = reminders.map((el) => {
			if (el.startDate < date && date < el.endDate) {
				return new ReminderModel(_.extend(el, {
					initialStartTime: el.startTime,
					initialEndTime: el.endTime,
					startDateString: `${date}T00:00`,
					endDateString: `${date}T23:59`
				}));
			}

			if (el.startDate < date && date === el.endDate) {
				return new ReminderModel(_.extend(el, {
					initialStartTime: el.startTime,
					initialEndTime: el.endTime,
					startDateString: `${date}T00:00`,
					endDateString: el.endDateString
				}));
			}

			if (el.startDate === date && date < el.endDate) {
				return new ReminderModel(_.extend(el, {
					initialStartTime: el.startTime,
					initialEndTime: el.endTime,
					startDateString: el.startDateString,
					endDateString: `${date}T23:59`
				}));
			}

			return el;
		});

		return dayReminders;
	}
}
