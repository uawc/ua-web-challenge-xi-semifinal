import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	protected dateUpdated = new Subject<any>();

	public currentDate: Date;
	public currentMonthDate: Date;
	public currentYearDate: Date;
	public currentDayDateString: string;
	public currentWeekDates: Date[] = [];
	public currentMonthDates: Date[] = [];
	public currentYearDates: any;
	public currentWeekDateStrings: string[] = [];
	
	public dateUpdated$ = this.dateUpdated.asObservable();

	constructor() {
		this.resetDatesToCurrent();
	}

	public goToNextDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + 1);
		this.currentYearDate.setFullYear(this.currentYearDate.getFullYear() + 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() + 7));
		this.updateMonthDates();
		this.updateYearDates();
		this.updateDateStrings();
	}

	public goToPrevDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() - 1);
		this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() - 1);
		this.currentYearDate.setFullYear(this.currentYearDate.getFullYear() - 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() - 7));
		this.updateMonthDates();
		this.updateYearDates();
		this.updateDateStrings();
	}

	public goToDefaultDate(): void {
		this.resetDatesToCurrent();
	}

	public goToSpecificDate(date: Date): void {
		this.currentDate = date;
		this.updateDateStrings();
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
		this.setDefaultYearDates();
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
		this.updateMonthDates();
	}

	protected setDefaultYearDates() {
		this.currentYearDate = new Date();
		this.updateYearDates();
	}

	protected updateMonthDates(): void {
		this.currentMonthDates = this.getMonthDates(this.currentMonthDate);
	}

	protected updateYearDates(): void {
		this.currentYearDates = [];

		for (let i = 0; i < 12; i++) {
			let date = new Date(this.currentYearDate.getFullYear(), i, 1);

			this.currentYearDates.push({
				name: date.toString().slice(4, -32),
				dates: this.getMonthDates(date)
			});
		}
	}

	protected getMonthDates(monthDate: Date): Date[] {
		let date = new Date(monthDate.toString());
		let result = [];

		date.setDate(1);

		while (date.getDay() !== 0) {
			date.setDate(date.getDate() - 1);
		}

		while (monthDate.getMonth() !== date.getMonth()) {
			result.push({});
			date.setDate(date.getDate() + 1);
		}

		while (monthDate.getMonth() === date.getMonth()) {
			result.push(new Date(date.toString()));
			date.setDate(date.getDate() + 1);
		}

		return result;
	}
}
