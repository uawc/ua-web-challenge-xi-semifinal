import * as _ from 'underscore';

export class ReminderModel {
	id: number;
	title: string;
	width: number;
	height: number;
	offset: number;
	endDate: string;
	endTime: string;
	startDate: string;
	startTime: string;
	positionTop: number;
	endDateString: string;
	startDateString: string;

	ITEM_HEIGHT = 31;

	constructor(options) {
		_.extend(this, options);

		this.splitDate();
		this.resetToDefault();
		this.updatePosition();
		this.updateHeight();
	}

	/**
	 * Setting model's width and offset
	 */
	public setWidthAndOffset(width: number, offset: number): void {
		this.width = width;
		this.offset = offset;
	}

	/**
	 * Resetting models values to default
	 */
	protected resetToDefault(): void {
		this.height = 0;
		this.offset = 0;
		this.width = 0;
	}

	/**
	 * Splitting dates from date string
	 */
	protected splitDate(): void {
		[this.startDate, this.startTime] = this.startDateString.split('T');
		[this.endDate, this.endTime] = this.endDateString.split('T');
	}

	/**
	 * Updating reminder top position
	 */
	protected updatePosition(): void {
		this.positionTop = this.getPositionTop();
	}

	/**
	 * Calculating reminder bottom position
	 */
	protected getPositionEnd(): number {
		let [hours, minutes] = this.endTime.split(':');

		let hoursPosition = +hours * this.ITEM_HEIGHT;
		let minutesPosition = +minutes <= 30 ? +minutes === 0 ? 0 : this.ITEM_HEIGHT / 2 : this.ITEM_HEIGHT;

		return hoursPosition + minutesPosition;
	}

	/**
	 * Calculating reminder top position
	 */
	protected getPositionTop(): number {
		let [hours, minutes] = this.startTime.split(':');

		let hoursPosition = +hours * this.ITEM_HEIGHT;
		let minutesPosition = +minutes < 30 ? 0 : this.ITEM_HEIGHT / 2;

		return hoursPosition + minutesPosition;
	}

	/**
	 * Updating reminder height
	 */
	protected updateHeight(): void {
		let positionTop = this.getPositionTop();
		let positionEnd = this.getPositionEnd();

		this.height = positionEnd - positionTop;
	}
}
