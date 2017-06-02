import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '../../services/date.service';

@Component({
	selector: 'title',
	templateUrl: './templates/title/title.component.html',
	styleUrls: ['./css/title/title.component.css']
})

export class TitleComponent implements OnInit {
	protected currentDate: Date;

	constructor(private dateService: DateService) {}

	public ngOnInit(): void {
		this.updateDateString();

		this.dateService.dateUpdated$.subscribe(this.updateDateString.bind(this));
	}

	protected updateDateString() {
		this.currentDate = this.dateService.currentDate;
	}
}
