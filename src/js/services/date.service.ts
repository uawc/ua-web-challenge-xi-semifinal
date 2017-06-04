import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	protected dateUpdated = new Subject<any>();

	public currentDate: Date;
	public currentMonthDate: Date;
	public currentDayDateString: string;
	public currentWeekDates: Date[] = [];
	public currentMonthDates: Date[] = [];
	public currentWeekDateStrings: string[] = [];
	
	public dateUpdated$ = this.dateUpdated.asObservable();

	constructor() {
		this.resetDatesToCurrent();
	}

	public goToNextDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() + 7));
		this.updateMonthMonthDates();
		this.updateDateStrings();
	}

	public goToPrevDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() - 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() - 7));
		//this.currentMonthDates.forEach((date: Date, i: number) => date.setMonth(date.getMonth() - 1));

		this.updateDateStrings();
	}

	public goToCurrentDate(): void {
		this.resetDatesToCurrent();
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

	public resetDatesToCurrent(): void {
		this.currentDate = new Date();
		this.setDefaultMonthDates();
		this.setDefaultWeekDates();
		this.updateDateStrings();
	}

	protected updateDateStrings(): void {
		this.currentWeekDateStrings = this.currentWeekDates.map((date: Date) => this.getFormattedDate(date).split('T')[0]);

		[this.currentDayDateString] = this.getFormattedDate(this.currentDate).split('T');

		this.announceDateUpdated();
	}

	protected announceDateUpdated(): void {
		this.dateUpdated.next({});
	}

	protected setDefaultWeekDates(): void {
		let date = new Date();
		let result = [];

		while (date.getDay() !== 0) {
			date.setDate(date.getDate() -1);
		}

		for (let i = 0; i < 7; i++) {
			let newDate = new Date(date.toString());

			newDate.setDate(date.getDate() + i);

			result.push(newDate);
		}

		this.currentWeekDates = result;
	}

	protected setDefaultMonthDates() {
		this.currentMonthDate = new Date();
		this.updateMonthMonthDates();
	}

	protected updateMonthMonthDates(): void {
		let date = new Date(this.currentMonthDate.toString());
		let result = [];

		date.setDate(1);

		while (date.getDay() !== 0) {
			date.setDate(date.getDate() - 1);
		}

		while (this.currentMonthDate.getMonth() !== date.getMonth()) {
			result.push({});
			date.setDate(date.getDate() + 1);
		}

		while (this.currentMonthDate.getMonth() === date.getMonth()) {
			result.push(new Date(date.toString()));
			date.setDate(date.getDate() + 1);
		}

		this.currentMonthDates = result;
	}
}
