import { Component, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { ContentMonthComponent } from './content.month.component';
import { NavigationService } from '../../services/navigation.service';

@Component({
	selector: 'content-year',
	styleUrls: ['./css/content/content.year.component.css'],
	templateUrl: './templates/content/content.year.component.html',
	directives: [[ContentMonthComponent]]
})

export class ContentYearComponent  implements OnInit {
	protected todayDate = new Date();
	protected weekDayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
	protected currentYearDates = this.dateService.currentYearDates;

	constructor(private dateService: DateService, 
	            private navigationService: NavigationService) {}

	/**
	 * Subscribing on date updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentYearDates.bind(this));
	}

	/**
	 * Updating current year dates
	 */
	protected updateCurrentYearDates() {
		this.currentYearDates = this.dateService.currentYearDates;
	}

	/**
	 * navigate to "Day" tab on date clicking
	 */
	protected onDateClick(date: Date): void {
		this.dateService.goToSpecificDate(date);
		this.navigationService.navigateToTab(NAVIGATION_TABS[0]);
	}
}
