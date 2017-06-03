import { Component, OnInit, Input } from '@angular/core';
import { HalfHourModel } from '../../models/half.hour.model'
import { DayReminderComponent } from '../reminder/day.reminder.component'

@Component({
	selector: 'content-day',
	templateUrl: './templates/content/content.day.component.html',
	styleUrls: ['./css/content/content.day.component.css'],
	directives: [[DayReminderComponent]]
})

export class ContentDayComponent implements OnInit {
	@Input() currentDayDateString: string;
	@Input() isShowHours: string;
	
	protected halfHourModels = [] as HalfHourModel[];
	
	public ngOnInit(): void {
		this.createModels();
	}
	
	protected createModels(): void {
		for (let i = 0; i <= 47; i++) {
			this.halfHourModels.push(new HalfHourModel(i));
		}
	}
}
