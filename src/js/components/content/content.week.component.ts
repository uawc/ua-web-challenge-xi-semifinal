import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ContentDayComponent } from './content.day.component';

@Component({
	selector: 'content-week',
	templateUrl: './templates/content/content.week.component.html',
	styleUrls: ['./css/content/content.week.component.css'],
	directives: [[ContentDayComponent]]
})

export class ContentWeekComponent implements OnInit {
	protected currentWeekDateStrings: string[] = this.dateService.currentWeekDateStrings;

	constructor(private dateService: DateService) {}

	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentWeekDateStrings.bind(this));
	}

	protected updateCurrentWeekDateStrings(): void {
		this.currentWeekDateStrings = this.dateService.currentWeekDateStrings;
	}
}
