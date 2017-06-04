import * as _ from 'underscore';
import { Injectable } from '@angular/core';
import { ReminderModel } from '../models/reminder.model'
import { IPosition } from '../interfaces/position.interface'

@Injectable()
export class RemindersAlignmentService {

	public calculateRemindersAlignment(reminders: ReminderModel[]): ReminderModel[] {
		let sortedModels = _.sortBy(reminders, 'startTime');

		sortedModels.forEach(this.calculateReminderAlignment.bind(this));

		return sortedModels;
	}

	protected calculateReminderAlignment(reminder: ReminderModel, index: number, sortedModels: ReminderModel[]): void {
		if (reminder.width) {
			return;
		}

		let crossDatedModels = this.findRemindersCrossedByDate(sortedModels, index);

		if (!crossDatedModels.length) {
			reminder.setWidthAndOffset(100, 0);

			return;
		}

		let modelsWithWidth = _.filter(crossDatedModels, (model) => !!model.width);

		if (!modelsWithWidth.length) {
			let childReminders = this.findRemindersCrossedByDate(sortedModels, index + 1);

			this.calculateEqualAlignment(reminder, childReminders);
		} else {
			this.calculateDifferentAlignment(crossDatedModels, modelsWithWidth, reminder);
		}
	}

	protected findRemindersCrossedByDate(models: ReminderModel[], modelId: number): ReminderModel[] {
		let crossedByDateModels = [];

		models.forEach((el: ReminderModel, i: number) => {
			if (modelId === i) {
				return;
			}

			if ((el.positionTop >= models[modelId].positionTop && el.positionTop < (models[modelId].positionTop + models[modelId].height)) ||
				(el.positionTop <= models[modelId].positionTop && (el.positionTop + el.height) > models[modelId].positionTop)) {
				crossedByDateModels.push(el);
			}
		});

		return crossedByDateModels;
	}

	protected calculateEqualAlignment(currentModel:  ReminderModel, childReminders: ReminderModel[]): void {
		let offset = 0;
		let knownWidth = 100 / (childReminders.length + 1);

		currentModel.setWidthAndOffset(knownWidth, offset);
		offset += knownWidth;

		childReminders.map((model: ReminderModel) => {
			model.setWidthAndOffset(knownWidth, offset);
			offset += knownWidth;

			return model;
		});
	}

	protected calculateDifferentAlignment(models: ReminderModel[], modelsWithWidth: ReminderModel[], currentModel:  ReminderModel): void {
		let availablePosition = this.getBiggerAvailablePosition(modelsWithWidth);
		let offset = availablePosition.startPosition;
		let knownWidth = availablePosition.width / (models.length - modelsWithWidth.length + 1);

		currentModel.setWidthAndOffset(knownWidth, offset);
		offset += knownWidth;

		models.map((model: ReminderModel) => {
			if (!model.width) {
				model.setWidthAndOffset(knownWidth, offset);
				offset += knownWidth;
			}

			return model;
		});
	}

	protected getBiggerAvailablePosition(models: ReminderModel[]): IPosition {
		let occupiedPositions = this.getOccupiedPositions(models);
		let availablePositions = this.getAvailablePositions(occupiedPositions);

		return _.max(availablePositions, function(position){ return position.width; });

	}

	protected getAvailablePositions(positions: IPosition[]): IPosition[] {
		let availablePosition = [];
		let currentPosition = 0;

		positions.forEach((el, id, arr) => {
			if (el.startPosition === 0) {
				currentPosition = el.endPosition;

				return;
			}

			availablePosition.push({
				startPosition: currentPosition,
				endPosition: el.startPosition,
				width: el.startPosition - currentPosition
			});

			currentPosition = el.endPosition;

			if (arr.length - 1 === id && el.endPosition !== 100) {
				availablePosition.push({
					startPosition: el.endPosition,
					endPosition: 100,
					width: 100 - el.endPosition
				});
			}
		});

		return availablePosition;
	}

	protected getOccupiedPositions(models: ReminderModel[]): IPosition[] {
		let sortedModels = _.sortBy(models, 'offset');

		let occupiedPosition = [];

		sortedModels.forEach((el) => {
			let position = {
				startPosition: el.offset,
				endPosition: el.offset + el.width
			};

			if (!occupiedPosition.length) {
				occupiedPosition.push(position);

				return;
			}

			let lastElement = occupiedPosition[occupiedPosition.length - 1];

			if (position.startPosition === lastElement.endPosition) {
				lastElement.endPosition += el.width;

				return;
			}

			occupiedPosition.push(position);
		});

		return occupiedPosition;
	}
}
