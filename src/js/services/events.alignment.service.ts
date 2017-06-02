import * as _ from 'underscore';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event.model'
import { IPosition } from '../interfaces/position.interface'

@Injectable()
export class EventsAlignmentService {
	
	public calculateEventsAlignment(models: EventModel[]): EventModel[] {
		let sortedModels = _.sortBy(models, 'startTime');

		sortedModels.forEach(this.calculateEventAlignment.bind(this));
		
		return sortedModels;
	}

	protected calculateEventAlignment(element: EventModel, index: number, sortedModels: EventModel[]): void {
		if (element.width) {
			return;
		}

		let crossDatedModels = this.findEventsCrossedByDate(sortedModels, index);

		if (!crossDatedModels.length) {
			element.setWidthAndOffset(100, 0);

			return;
		}

		let modelsWithWidth = _.filter(crossDatedModels, (model) => !!model.width);

		if (!modelsWithWidth.length) {
			this.calculateEqualAlignment(crossDatedModels, element);
		} else {
			this.calculateDifferentAlignment(crossDatedModels, modelsWithWidth, element);
		}
	}

	protected findEventsCrossedByDate(models: EventModel[], modelId: number): EventModel[] {
		let crossedByDateModels = [];

		models.forEach((el: EventModel, i: number) => {
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

	protected calculateEqualAlignment(models: EventModel[], currentModel:  EventModel): void {
		let offset = 0;
		let knownWidth = 100 / (models.length + 1);

		currentModel.setWidthAndOffset(knownWidth, offset);
		offset += knownWidth;

		models.map((model: EventModel) => {
			model.setWidthAndOffset(knownWidth, offset);
			offset += knownWidth;

			return model;
		});
	}

	protected calculateDifferentAlignment(models: EventModel[], modelsWithWidth: EventModel[], currentModel:  EventModel): void {
		let availablePosition = this.getBiggerAvailablePosition(modelsWithWidth);
		let offset = availablePosition.startPosition;
		let knownWidth = availablePosition.width / (models.length - modelsWithWidth.length + 1);

		currentModel.setWidthAndOffset(knownWidth, offset);
		offset += knownWidth;

		models.map((model: EventModel) => {
			if (!model.width) {
				model.setWidthAndOffset(knownWidth, offset);
				offset += knownWidth;
			}

			return model;
		});
	}

	protected getBiggerAvailablePosition(models: EventModel[]): IPosition {
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

	protected getOccupiedPositions(models: EventModel[]): IPosition[] {
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
