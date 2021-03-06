import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ReminderModel } from '../models/reminder.model';

@Injectable()
export class ReminderEditService {
	protected showReminderMenu = new Subject<any>();
	protected hideReminderMenu = new Subject<any>();

	public showReminderEditMenu$ = this.showReminderMenu.asObservable();
	public hideReminderEditMenu$ = this.hideReminderMenu.asObservable();

	/**
	 * Notifying subscribers that edit menu is shown
	 */
	public showReminderEditMenu(reminder?: ReminderModel): void {
		this.showReminderMenu.next(reminder || null);
	}

	/**
	 * Notifying subscribers that edit menu is hidden
	 */
	public hideReminderEditMenu(): void {
		this.hideReminderMenu.next(null);
	}
}
