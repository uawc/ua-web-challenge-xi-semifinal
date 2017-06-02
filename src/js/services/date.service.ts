import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	protected dateUpdated = new Subject<any>();

	public currentDateString: string;
	public currentDate = new Date();
	public dateUpdated$ = this.dateUpdated.asObservable();

	constructor() {
		this.updateCurrentDateString();
	}

	public goToNextDay(): void {
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.updateCurrentDateString();
		this.announceDateUpdated();
	}

	public goToPrevDay(): void {
		this.currentDate.setDate(this.currentDate.getDate() - 1);
		this.updateCurrentDateString();
		this.announceDateUpdated();
	}

	public goToCurrentDay(): void {
		this.currentDate = new Date();
		this.updateCurrentDateString();
		this.announceDateUpdated();
	}

	protected announceDateUpdated(): void {
		this.dateUpdated.next({});
	}

	protected updateCurrentDateString(): void {
		[this.currentDateString] = this.currentDate.toJSON().split('T');
	}
}
