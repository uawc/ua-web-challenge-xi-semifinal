import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { DateService } from './date.service';
import { RemindersStoreService } from './reminder.store.service';

/**
 * Instead of Notification API d.ts
 */
declare var Notification: any;

@Injectable()
export class NotificationService {

	constructor(private dateService: DateService,
	            private remindersStoreService: RemindersStoreService) {

		switch (Notification.permission.toLowerCase()) {
			case 'default':
				this.requestPermission();
				break;
			case 'granted':
				this.startReminderChecker();
				break;
			case 'denied':
				console.error('Notification is not allowed! Hence, notification feature is disabled.');
				break;
			default:
				break;
		}
	}

	/**
	 * Requesting permission for notification
	 */
	protected requestPermission(): void {
		Notification.requestPermission((permission: string) => {
			if (permission === 'granted') {
				this.startReminderChecker();
			}
		});
	}

	/**
	 * Sending notification to browser
	 */
	protected notify(title, body): void {
		new Notification(title, { body });
	}

	/**
	 * Checking each second for minute changing and in case of true checking whether reminder exists for this date or not
	 */
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
