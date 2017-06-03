import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	protected dateUpdated = new Subject<any>();

	public currentDate: Date;
	public currentDayDateString: string;
	public currentWeekDates: Date[] = [];
	public currentWeekDateStrings: string[] = [];
	
	public dateUpdated$ = this.dateUpdated.asObservable();

	constructor() {
		this.resetDatesToCurrent();
		this.updateCurrentDateString();
		this.updateCurrentWeekDateStrings();
	}

	public goToNextDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() + 7));

		this.updateCurrentDateString();
		this.updateCurrentWeekDateStrings();
		this.announceDateUpdated();
	}

	public goToPrevDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() - 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() - 7));

		this.updateCurrentDateString();
		this.updateCurrentWeekDateStrings();
		this.announceDateUpdated();
	}

	public goToCurrentDate(): void {
		this.resetDatesToCurrent();
		this.updateCurrentDateString();
		this.updateCurrentWeekDateStrings();
		this.announceDateUpdated();
	}
	
	public getDefaultsDates(): string[] {
		let startDate = new Date();
		let endDate = new Date();

		endDate.setHours(startDate.getHours() + 1);

		let startDateString = this.getFormattedDate(startDate);
		let endDateString = this.getFormattedDate(endDate);
		
		return [startDateString, endDateString];
	}

	public getZuluTimeStamp(dateString?: string): string {
		let date = dateString ? new Date(dateString) : new Date();

		return date.toISOString().split('.')[0].replace(/:|-/g,'') + 'Z'
	}

	public getFormattedDate(date: Date = new Date()): string {
		let localeDateArr = date.toLocaleDateString().split('-');
		let localeTime = date.toLocaleTimeString().slice(0,-3);

		localeDateArr = localeDateArr.map((date) => date.length === 1 ? '0' + date : date);

		let localeDate = localeDateArr.join('-');

		return `${localeDate}T${localeTime}`;
	}

	protected resetDatesToCurrent(): void {
		this.currentDate = new Date();
		this.createDefaultWeekDates();
	}

	protected announceDateUpdated(): void {
		this.dateUpdated.next({});
	}

	protected updateCurrentDateString(): void {
		[this.currentDayDateString] = this.getFormattedDate(this.currentDate).split('T');
	}

	protected createDefaultWeekDates(): void {
		let date = new Date();
		let day = date.getDay();
		let weekDates = [];

		weekDates.push(date);

		for (let i = day, k = 1; i < 7; i++, k++) {
			let nextDate = new Date();

			nextDate.setDate(nextDate.getDate() + k);

			weekDates.push(nextDate);
		}

		for (let i = day, k = 1; i > 1; i--, k++) {
			let prevDate = new Date();

			prevDate.setDate(prevDate.getDate() - k);

			weekDates.push(prevDate);
		}
		
		this.currentWeekDates = _.sortBy(weekDates, (date: Date) => date.getDay());
	}

	protected updateCurrentWeekDateStrings(): void {
		this.currentWeekDateStrings = this.currentWeekDates.map((date: Date) => this.getFormattedDate(date).split('T')[0]);
	}
}
