import { Component, OnInit, Input } from '@angular/core';
import { HalfHourModel } from '../../models/half.hour.model'
import { DayReminderComponent } from '../reminder/day.reminder.component'

@Component({
	selector: 'content-day',
	styleUrls: ['./css/content/content.day.component.css'],
	templateUrl: './templates/content/content.day.component.html',
	directives: [[DayReminderComponent]]
})

export class ContentDayComponent implements OnInit {
	@Input() isShowHours: string;
	@Input() currentDayDateString: string;
	
	protected halfHourModels = [] as HalfHourModel[];

	/**
	 * Creating default models on component's ngOnInit
	 */
	public ngOnInit(): void {
		this.createModels();
	}

	/**
	 * Creating default models
	 */
	protected createModels(): void {
		for (let i = 0; i <= 47; i++) {
			this.halfHourModels.push(new HalfHourModel(i));
		}
	}
}
