import { Component, Input, OnInit, HostListener } from '@angular/core';
import { ContentAgendaComponent } from './content.agenda.component';
import { ContentDayComponent } from './content.day.component';
import { ContentMonthComponent } from './content.month.component';
import { ContentWeekComponent } from './content.week.component';
import { ContentYearComponent } from './content.year.component';
import { ReminderEditService } from '../../services/reminder.edit.service';
import { DateService } from '../../services/date.service';
import { ITab } from '../../interfaces/tab.interface';

@Component({
	selector: 'content',
	templateUrl: './templates/content/content.component.html',
	styleUrls: ['./css/content/content.component.css'],
	directives: [[ContentAgendaComponent], [ContentDayComponent], [ContentMonthComponent], [ContentWeekComponent], [ContentYearComponent]]
})

export class ContentComponent implements OnInit {
	@Input()  currentTab: ITab;
	
	protected currentDayDateString = this.dateService.currentDayDateString;

	constructor(private dateService: DateService, 
	            private reminderEditService: ReminderEditService) {}

	public ngOnInit(): void {
		this.dateService.dateUpdated$.subscribe(this.updateCurrentDayDate.bind(this));
	}

	@HostListener('click', ['$event'])

	protected onComponentClick($event) {
		if ($event.target.className.indexOf('reminder') === -1) {
			this.reminderEditService.hideReminderEditMenu();
		}
	}
	
	protected updateCurrentDayDate(): void {
		this.currentDayDateString = this.dateService.currentDayDateString;
	}
}
