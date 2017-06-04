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
		if (!localStorage.getItem('reminders')) {
			localStorage.setItem('reminders', JSON.stringify(this.test()));
		}

		this.restoreReminders();
	}
	
	public getRemindersPerDay(date: string): ReminderModel[] {
		let allReminders = this.allReminders.map((model) => new ReminderModel(model));

		let dayReminders = _.filter(allReminders, (el: ReminderModel) => {
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

		dayReminders = dayReminders.map((el) => {
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

	public getReminderByStartDate(startDateString: string): ReminderModel {
		return _.findWhere(this.allReminders, { startDateString });
	}

	public getRemindersByStartDate(startDate: string): ReminderModel[] {
		return _.where(this.allReminders, { startDate });
	}
	
	public getReminderById(id: number): ReminderModel {
		return _.findWhere(this.allReminders, { id });
	}
	
	public saveReminders(): void {
		localStorage.setItem('reminders', JSON.stringify(this.allReminders));
	}

	public addNewReminder(reminder: ReminderModel): void {
		this.allReminders.push(reminder);
		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}

	public updateExistingReminder(id: number, data: any): void {
		let activeReminder = this.getReminderById(id);

		_.extend(activeReminder, data);

		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}

	public removeReminderById(id: number): void {
		this.allReminders = _.reject(this.allReminders, (reminder) => reminder.id === id);
		this.allReminders = this.getResetModels(this.allReminders);
		this.announceRemindersUpdated();
		this.saveReminders();
	}
	
	public setActiveReminder(reminder: ReminderModel): void {
		this.announceActiveReminderUpdated(reminder)
	}

	protected announceRemindersUpdated(): void {
		this.remindersUpdated.next(this.allReminders);
	}

	protected announceActiveReminderUpdated(reminder: ReminderModel): void {
		this.activeReminderUpdated.next(reminder);
	}

	protected restoreReminders(): void {
		let reminders = localStorage.getItem('reminders');

		try {
			this.allReminders = this.getResetModels(JSON.parse(reminders));
		} catch (error) {
			console.log(`Cant parse reminders data from LocalStorage`);
		}
	}

	protected getResetModels(models: ReminderModel[]): ReminderModel[] {
		return models.map((model, id) => new ReminderModel({...model, id}));
	}

	test() {
		let remindersCollection = [];

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T01:00',
			endDateString: '2017-06-04T03:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T02:00',
			endDateString: '2017-06-04T03:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T05:00',
			endDateString: '2017-06-04T08:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T05:00',
			endDateString: '2017-06-04T12:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-03T05:00',
			endDateString: '2017-06-03T12:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T06:00',
			endDateString: '2017-06-04T08:00'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T07:30',
			endDateString: '2017-06-04T09:30'
		}));

		remindersCollection.push(new ReminderModel({
			startDateString: '2017-06-04T09:30',
			endDateString: '2017-06-04T12:00'
		}));

		return remindersCollection;
	}
}
