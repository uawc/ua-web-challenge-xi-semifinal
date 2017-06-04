import { ITab } from '../../interfaces/tab.interface';
import { DateService } from '../../services/date.service';
import { ContentDayComponent } from './content.day.component';
import { ContentWeekComponent } from './content.week.component';
import { ContentYearComponent } from './content.year.component';
import { ContentMonthComponent } from './content.month.component';
import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ReminderEditService } from '../../services/reminder.edit.service';

@Component({
	selector: 'content',
	styleUrls: ['./css/content/content.component.css'],
	templateUrl: './templates/content/content.component.html',
	directives: [[ContentDayComponent], [ContentMonthComponent], [ContentWeekComponent], [ContentYearComponent]]
})

export class ContentComponent implements OnInit {
	@Input()  currentTab: ITab;
	
	protected currentDayDateString = this.dateService.currentDayDateString;

	constructor(private dateService: DateService, 
	            private reminderEditService: ReminderEditService) {}

	/**
	 * Subscribing on date updating on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentDayDate.bind(this));
	}
	
	@HostListener('click', ['$event'])

	/**
	 * Hiding reminder edit mode on non reminder element clicking
	 */
	protected onComponentClick($event): void {
		if ($event.target.className.indexOf('reminder') === -1) {
			this.reminderEditService.hideReminderEditMenu();
		}
	}

	/**
	 * Updating current Date
	 */
	protected updateCurrentDayDate(): void {
		this.currentDayDateString = this.dateService.currentDayDateString;
	}
}
