import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { HalfHourModel } from '../../models/half.hour.model'
import { DayEventsComponent } from '../event/day.events.component'

@Component({
	selector: 'content-day',
	templateUrl: './templates/content/content.day.component.html',
	styleUrls: ['./css/content/content.day.component.css'],
	directives: [[DayEventsComponent]]
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
