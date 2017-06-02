import * as _ from 'underscore';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model';

@Injectable()
export class EventsStoreService {
	protected eventsUpdated = new Subject<any>();
	protected activeEventUpdated = new Subject<any>();
	
	public allEvents: EventModel[] = [];
	public eventsUpdated$ = this.eventsUpdated.asObservable();
	public activeEventUpdated$ = this.activeEventUpdated.asObservable();
	
	constructor() {
		if (!localStorage.getItem('events')) {
			localStorage.setItem('events', JSON.stringify(this.test()));
		}

		this.restoreEvents();
	}
	
	public getEventsPerDay(date: string): EventModel[] {
		let allEvents = this.getResetModels(this.allEvents);

		let dayEvents = _.filter(allEvents, (el: EventModel) => {
			if (el.startDate === el.endDate) {
				return el.startDate === date;
			}

			if (el.startDate < date && date < el.endDate) {
				return true;
			}

			if (el.startDate < date && date === el.endDate) {
				return true;
			}

			if (el.startDate === date && date < el.endDate) {
				return true;
			}
			
			return el.endDate === date;
		});

		dayEvents = dayEvents.map((el) => {
			if (el.startDate < date && date < el.endDate) {
				return new EventModel({
					startDateString: `${date}T00:00`,
					endDateString: `${date}T23:59`
				});
			}

			if (el.startDate < date && date === el.endDate) {
				return new EventModel({
					startDateString: `${date}T00:00`,
					endDateString: el.endDateString
				});
			}

			if (el.startDate === date && date < el.endDate) {
				return new EventModel({
					startDateString: el.startDateString,
					endDateString: `${date}T23:59`
				});
			}

			return el;
		});

		return dayEvents;
	}
	
	public saveEvents(): void {
		localStorage.setItem('events', JSON.stringify(this.allEvents));
	}

	public addNewEvent(event: EventModel): void {
		this.allEvents.push(event);
		this.allEvents = this.getResetModels(this.allEvents);
		this.announceEventsUpdated();
		this.saveEvents();
	}
	
	public setActiveEvent(event: EventModel): void {
		this.announceActiveEventUpdated(event)
	}

	protected announceEventsUpdated(): void {
		this.eventsUpdated.next(this.allEvents);
	}

	protected announceActiveEventUpdated(event): void {
		this.activeEventUpdated.next(event);
	}

	protected restoreEvents(): void {
		let allEvents: EventModel[];
		
		try {
			let eventsString = localStorage.getItem('events') || '[]';

			allEvents = JSON.parse(eventsString);
		} catch (error) {
			console.log(`Cant parse events data from LocalStorage`);
		}

		this.allEvents = this.getResetModels(allEvents);
	}

	protected getResetModels(models: EventModel[]): EventModel[] {
		return models.map((model, id) => new EventModel({...model, id}));
	}

	test() {
		let eventsCollection = [];

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T01:00',
			endDateString: '2017-06-02T03:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T02:00',
			endDateString: '2017-06-02T03:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T05:00',
			endDateString: '2017-06-02T08:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T05:00',
			endDateString: '2017-06-02T12:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T05:00',
			endDateString: '2017-06-02T12:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T06:00',
			endDateString: '2017-06-02T8:00'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T07:30',
			endDateString: '2017-06-02T9:30'
		}));

		eventsCollection.push(new EventModel({
			startDateString: '2017-06-02T09:30',
			endDateString: '2017-06-02T12:00'
		}));

		return eventsCollection;
	}
}
