import { ITab } from '../../interfaces/tab.interface';
import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
	selector: 'title',
	styleUrls: ['./css/title/title.component.css'],
	templateUrl: './templates/title/title.component.html'
})

export class TitleComponent implements OnInit {
	@Input() currentTab: ITab;

	protected currentDate: Date;
	protected currentYearDate: Date;
	protected todayDate = new Date();
	protected currentWeekDates: Date[];
	protected weekDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	constructor(private dateService: DateService) {}

	/**
	 * Updating dates and subscribing on dates updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.updateDates();

		this.dateService.dateUpdated$.subscribe(this.updateDates.bind(this));
	}

	/**
	 * Updating component's dates
	 */
	protected updateDates(): void {
		this.currentDate = this.dateService.currentDate;
		this.currentYearDate = this.dateService.currentYearDate;
		this.currentWeekDates = this.dateService.currentWeekDates;
	}
}
