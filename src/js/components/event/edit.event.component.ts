import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { EventsStoreService } from '../../services/events.store.service';
import { EventModel } from '../../models/event.model';

@Component({
	selector: 'editEventComponent',
	templateUrl: './templates/event/edit.event.component.html',
	styleUrls: ['./css/event/edit.event.component.css']
})

export class EditEventComponent implements OnInit {
	@Output() toggleEditEventMenu = new EventEmitter();
	
	protected activeEvent: EventModel;

	title: string;
	endDate: string;
	startDate: string;

	isTitleValid = true;
	isEndDateValid = true;
	isStartDateValid = true;

	constructor(private eventStoreService: EventsStoreService) {}

	public ngOnInit(): void {
		this.setDefaultDates();

		this.eventStoreService.activeEventUpdated$.subscribe(this.updateActiveEvent.bind(this));
	}

	onCreateEventClick(): void {
		this.isTitleValid = !!this.title;
		this.isEndDateValid = !!this.endDate;
		this.isStartDateValid = !!this.startDate;

		if (!this.title || !this.endDate || !this.startDate) {
			return;
		}

		this.eventStoreService.addNewEvent(new EventModel({
			title: this.title,
			endDateString: this.endDate,
			startDateString: this.startDate
		}));

		this.toggleEditEventMenu.emit();
	}

	protected onEditEventClick(event: EventModel) {

	}

	protected updateActiveEvent(event: EventModel): void {
		if (event) {
			this.activeEvent = event;
		}

	}
	
	protected onCancelClick(): void {
		this.toggleEditEventMenu.emit();
	}

	protected setDefaultDates() {
		let startDate = new Date();
		let endDate = new Date();

		endDate.setHours(startDate.getHours() + 1);

		this.startDate = startDate.toJSON().slice(0,-8);
		this.endDate = endDate.toJSON().slice(0,-8);
	}
}
