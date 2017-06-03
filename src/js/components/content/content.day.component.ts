import { Component, OnInit } from '@angular/core';
import { HalfHourModel } from '../../models/half.hour.model'
import { DayReminderComponent } from '../reminder/day.reminder.component'

@Component({
	selector: 'content-day',
	templateUrl: './templates/content/content.day.component.html',
	styleUrls: ['./css/content/content.day.component.css'],
	directives: [[DayReminderComponent]]
})

export class ContentDayComponent implements OnInit {
	protected halfHourModels = [] as HalfHourModel[];
	protected isShowHours = true;
	
	public ngOnInit(): void {
		this.createModels();
	}
	
	protected createModels(): void {
		for (let i = 0; i <= 48; i++) {
			this.halfHourModels.push(new HalfHourModel(i));
		}
	}
}
