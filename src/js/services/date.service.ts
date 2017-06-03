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

	protected announceDateUpdated(): void {
		this.dateUpdated.next({});
	}

	protected updateCurrentDateString(): void {
		[this.currentDateString] = this.getFormattedDate(this.currentDate).split('T');
	}
}
