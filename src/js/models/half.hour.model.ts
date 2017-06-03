export class HalfHourModel {
	hours: number;
	minutes: number;
	formattedDate: string;

	constructor(id: number) {
		this.hours = Math.floor(id / 2);
		this.minutes = id % 2 === 0 ? 0 : 30;

		let date = new Date(0, 0, 0, this.hours, this.minutes);
		
		this.formattedDate = date.toTimeString().slice(0,5);
	}
}
