import * as _ from 'underscore';

export class ReminderModel {
	id: number;
	title: string;
	endDate: string;
	startDateString: string;
	endDateString: string;
	startDate: string;
	startTime: string;
	endTime: string;
	positionTop: number;
	initialStartTime: string;
	initialEndTime: string;

	height: number;
	offset: number;
	width: number;

	ITEM_HEIGHT = 31;

	constructor(options: any) {
		_.extend(this, options);

		this.splitDate();
		this.resetToDefault();
		this.updatePosition();
		this.updateHeight();
	}
	
	splitDate(): void {
		[this.startDate, this.startTime] = this.startDateString.split('T');
		[this.endDate, this.endTime] = this.endDateString.split('T');
	}

	updatePosition(): void {
		this.positionTop = this.getPositionTop();
	}

	getPositionEnd(): number {
		let [hours, minutes] = this.endTime.split(':');

		let hoursPosition = +hours * this.ITEM_HEIGHT;
		let minutesPosition = +minutes <= 30 ? +minutes === 0 ? 0 : this.ITEM_HEIGHT / 2 : this.ITEM_HEIGHT;

		return hoursPosition + minutesPosition;
	}

	getPositionTop(): number {
		let [hours, minutes] = this.startTime.split(':');

		let hoursPosition = +hours * this.ITEM_HEIGHT;
		let minutesPosition = +minutes < 30 ? 0 : this.ITEM_HEIGHT / 2;

		return hoursPosition + minutesPosition;
	}

	updateHeight(): void {
		let positionTop = this.getPositionTop();
		let positionEnd = this.getPositionEnd();

		this.height = positionEnd - positionTop;
	}

	resetToDefault(): void {
		this.height = 0;
		this.offset = 0;
		this.width = 0;
	}
	
	public setWidthAndOffset(width: number, offset: number): void {
		this.width = width;
		this.offset = offset;
	}
}
