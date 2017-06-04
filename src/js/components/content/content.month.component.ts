import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { MonthReminderComponent } from '../reminder/month.reminder.component'

@Component({
	selector: 'content-month',
	templateUrl: './templates/content/content.month.component.html',
	styleUrls: ['./css/content/content.month.component.css'],
	directives: [[MonthReminderComponent]]
})

export class ContentMonthComponent implements OnInit {
	protected todayDate = new Date();
	protected currentMonthDates: Date[] = this.dateService.currentMonthDates;

	constructor(private dateService: DateService) {}

	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentMonthDates.bind(this));
	}

	protected updateCurrentMonthDates(): void {
		this.currentMonthDates = this.dateService.currentMonthDates;
	}
}
