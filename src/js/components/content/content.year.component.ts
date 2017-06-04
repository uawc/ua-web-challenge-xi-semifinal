import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { ContentMonthComponent } from './content.month.component';
import { NavigationService } from '../../services/navigation.service';
import { NAVIGATION_TABS } from '../../data/navigation.data';

@Component({
	selector: 'content-year',
	templateUrl: './templates/content/content.year.component.html',
	styleUrls: ['./css/content/content.year.component.css'],
	directives: [[ContentMonthComponent]]
})

export class ContentYearComponent  implements OnInit {
	protected todayDate = new Date();
	protected currentYearDates: any = this.dateService.currentYearDates;
	protected weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

	constructor(private dateService: DateService, 
	            private navigationService: NavigationService) {}

	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentYearDates.bind(this));
	}

	protected updateCurrentYearDates() {
		this.currentYearDates = this.dateService.currentYearDates;
	}
	
	protected onDateClick(date: Date): void {
		this.dateService.goToSpecificDate(date);
		this.navigationService.navigateToTab(NAVIGATION_TABS[0]);
	}
}
