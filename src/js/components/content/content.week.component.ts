import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ContentDayComponent } from './content.day.component';

@Component({
	selector: 'content-week',
	styleUrls: ['./css/content/content.week.component.css'],
	templateUrl: './templates/content/content.week.component.html',
	directives: [[ContentDayComponent]]
})

export class ContentWeekComponent implements OnInit {
	protected currentWeekDateStrings: string[] = this.dateService.currentWeekDateStrings;

	constructor(private dateService: DateService) {}

	/**
	 * Subscribing on date updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentWeekDateStrings.bind(this));
	}

	/**
	 * Updating current week dates
	 */
	protected updateCurrentWeekDateStrings(): void {
		this.currentWeekDateStrings = this.dateService.currentWeekDateStrings;
	}
}
