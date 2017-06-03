import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ITab } from '../../interfaces/tab.interface';

@Component({
	selector: 'title',
	templateUrl: './templates/title/title.component.html',
	styleUrls: ['./css/title/title.component.css']
})

export class TitleComponent implements OnInit {
	@Input() currentTab: ITab;
	
	protected todayDate = new Date();
	protected currentDate: Date;
	protected currentWeekDates: Date[];

	constructor(private dateService: DateService) {}

	public ngOnInit(): void {
		this.updateDates();

		this.dateService.dateUpdated$.subscribe(this.updateDates.bind(this));
	}

	protected updateDates(): void {
		this.currentDate = this.dateService.currentDate;
		this.currentWeekDates = this.dateService.currentWeekDates;
	}
}
