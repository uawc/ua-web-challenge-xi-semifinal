import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { MonthReminderComponent } from '../reminder/month.reminder.component'

@Component({
	selector: 'content-month',
	styleUrls: ['./css/content/content.month.component.css'],
	templateUrl: './templates/content/content.month.component.html',
	directives: [[MonthReminderComponent]]
})

export class ContentMonthComponent implements OnInit {
	protected todayDate = new Date();
	protected currentMonthDates: Date[] = this.dateService.currentMonthDates;

	constructor(private dateService: DateService) {}

	/**
	 * Subscribing on date updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentMonthDates.bind(this));
	}

	/**
	 * Updating current month dates
	 */
	protected updateCurrentMonthDates(): void {
		this.currentMonthDates = this.dateService.currentMonthDates;
	}
}
