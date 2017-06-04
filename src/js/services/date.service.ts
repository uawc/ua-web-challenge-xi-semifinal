import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
	protected dateUpdated = new Subject<any>();

	public currentDate: Date;
	public currentYearDates: any;
	public currentYearDate: Date;
	public currentMonthDate: Date;
	public currentDayDateString: string;
	public currentWeekDates: Date[] = [];
	public currentMonthDates: Date[] = [];
	public currentWeekDateStrings: string[] = [];
	public dateUpdated$ = this.dateUpdated.asObservable();

	constructor() {
		this.resetDatesToCurrent();
	}

	/**
	 * Changing dates to be match to default Date
	 */
	public goToDefaultDate(): void {
		this.resetDatesToCurrent();
	}

	/**
	 * Changing dates to be match to specific Date
	 */
	public goToSpecificDate(date: Date): void {
		this.currentDate = date;
		this.updateDateStrings();
	}

	/**
	 * Changing dates to be match to next Date
	 */
	public goToNextDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() + 1);
		this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + 1);
		this.currentYearDate.setFullYear(this.currentYearDate.getFullYear() + 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() + 7));
		this.updateMonthDates();
		this.updateYearDates();
		this.updateDateStrings();
	}

	/**
	 * Changing dates to be match to previous Date
	 */
	public goToPrevDate(): void {
		this.currentDate.setDate(this.currentDate.getDate() - 1);
		this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() - 1);
		this.currentYearDate.setFullYear(this.currentYearDate.getFullYear() - 1);
		this.currentWeekDates.forEach((date: Date, i: number) => date.setDate(date.getDate() - 7));
		this.updateMonthDates();
		this.updateYearDates();
		this.updateDateStrings();
	}

	/**
	 * Formatting start and end dates with diff of 1 hour for "add new reminder" menu
	 */
	public getDefaultsDates(): string[] {
		let startDate = new Date();
		let endDate = new Date();

		endDate.setHours(startDate.getHours() + 1);

		let startDateString = this.getFormattedDate(startDate);
		let endDateString = this.getFormattedDate(endDate);
		
		return [startDateString, endDateString];
	}

	/**
	 * Formatting date to Zulu timestamp for reminder exporting
	 */
	public getZuluTimeStamp(dateString?: string): string {
		let date = dateString ? new Date(dateString) : new Date();

		return date.toISOString().split('.')[0].replace(/:|-/g,'') + 'Z'
	}

	/**
	 * Formatting date stamp to be match to datetime-local inputs values
	 */
	public getFormattedDate(date: Date = new Date()): string {
		let localeDateArr = date.toLocaleDateString().split('-');
		let localeTime = date.toLocaleTimeString().slice(0,-3);

		localeDateArr = localeDateArr.map((date) => date.length === 1 ? '0' + date : date);

		let localeDate = localeDateArr.join('-');

		return `${localeDate}T${localeTime}`;
	}

	/**
	 * Resetting all dates to default state
	 */
	public resetDatesToCurrent(): void {
		this.setDefaultDayDate();
		this.setDefaultMonthDates();
		this.setDefaultWeekDates();
		this.setDefaultYearDates();
		this.updateDateStrings();
	}

	/**
	 * Notify subscribers that date was updated
	 */
	protected announceDateUpdated(): void {
		this.dateUpdated.next({});
	}

	/**
	 * Updating all date strings
	 */
	protected updateDateStrings(): void {
		this.currentDayDateString = this.getFormattedDate(this.currentDate).split('T')[0];
		this.currentWeekDateStrings = this.currentWeekDates.map((date: Date) => this.getFormattedDate(date).split('T')[0]);
		this.announceDateUpdated();
	}

	/**
	 * Updating month dates
	 */
	protected updateMonthDates(): void {
		this.currentMonthDates = this.getMonthDates(this.currentMonthDate);
	}

	/**
	 * Updating year dates
	 */
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

	/**
	 * Setting day date to current date
	 */
	protected setDefaultDayDate(): void {
		this.currentDate = new Date();
	}

	/**
	 * Setting month dates to current month
	 */
	protected setDefaultMonthDates() {
		this.currentMonthDate = new Date();
		this.updateMonthDates();
	}

	/**
	 * Setting year dates to current year
	 */
	protected setDefaultYearDates() {
		this.currentYearDate = new Date();
		this.updateYearDates();
	}

	/**
	 * Finding nearest sunday and creating week dates array
	 */
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

	/**
	 * Finding nearest sunday and creating month dates array
	 */
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
