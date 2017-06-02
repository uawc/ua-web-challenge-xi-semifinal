import { Component, OnInit } from '@angular/core';
import { EventModel } from '../../models/event.model';
import { DateService } from '../../services/date.service';
import { EventsStoreService } from '../../services/events.store.service';
import { EventsAlignmentService } from '../../services/events.alignment.service';

@Component({
	selector: 'dayEventsComponent',
	templateUrl: './templates/event/day.events.component.html',
	styleUrls: ['./css/event/day.events.component.css']
})

export class DayEventsComponent implements OnInit {
	activeEvent: EventModel;
	
	protected calendarEventsCollection: EventModel[];
	
	constructor(private dateService: DateService,
	            private eventStoreService: EventsStoreService,
				private eventsAlignmentService: EventsAlignmentService) {}

	public ngOnInit(): void {
		this.updateCalendarEventsCollection();

		this.dateService.dateUpdated$.subscribe(this.updateCalendarEventsCollection.bind(this));
		this.eventStoreService.activeEventUpdated$.subscribe(this.updateActiveEvent.bind(this));
		this.eventStoreService.eventsUpdated$.subscribe(this.updateCalendarEventsCollection.bind(this));
	}

	protected updateCalendarEventsCollection(): void {
		let eventsPerDay = this.eventStoreService.getEventsPerDay(this.dateService.currentDateString);
		
		this.calendarEventsCollection = this.eventsAlignmentService.calculateEventsAlignment(eventsPerDay);
	}
	
	protected updateActiveEvent(event: EventModel): void {
		this.activeEvent = event;
	}

	protected onEventClick(event: EventModel): void {
		this.eventStoreService.setActiveEvent(event);
	}
}
