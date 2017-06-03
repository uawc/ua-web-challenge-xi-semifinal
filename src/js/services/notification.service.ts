import 'rxjs/add/operator/toPromise';
import { RemindersStoreService } from './reminder.store.service'
import { DateService } from './date.service'
import { Injectable } from '@angular/core';

declare var Notification: any;

@Injectable()
export class NotificationService {

	constructor(protected remindersStoreService: RemindersStoreService, private dateService: DateService) {
		switch (Notification.permission.toLowerCase()) {
			case 'granted':
				this.requestPermission();
				break;
			case 'denied':
				console.error('Notification is not allowed! Hence, notification feature is disabled.');
				break;
			case 'granted':
				this.startReminderChecker();
				break;
			default:
				break;
		}
	}

	protected requestPermission(): void {
		Notification.requestPermission((permission: string) => {
			if (permission === 'granted') {
				this.startReminderChecker();
			}
		});
	}

	protected notify(title, body): void {
		new Notification(title, { body });
	}

	protected startReminderChecker(): void {
		let initialDate = new Date();

		setInterval(() => {
			let currentDate = new Date();

			if (initialDate.getMinutes() !== currentDate.getMinutes()) {
				initialDate = new Date();

				let startDateString = this.dateService.getFormattedDate(currentDate);
				let reminder = this.remindersStoreService.getReminderByStartDate(startDateString);

				if (reminder) {
					this.notify(reminder.title, `${reminder.startTime} - ${reminder.endTime}`);
				}
			}
		}, 1000);
	}
}
