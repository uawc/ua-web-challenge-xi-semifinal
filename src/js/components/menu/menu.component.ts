import { ITab } from '../../interfaces/tab.interface';
import { NAVIGATION_TABS } from '../../data/navigation.data';
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { EventsStoreService } from '../../services/events.store.service';
import { DateService } from '../../services/date.service';

@Component({
	selector: 'menu',
	templateUrl: './templates/menu/menu.component.html',
	styleUrls: ['./css/menu/menu.component.css']
})

export class MenuComponent {
	protected tabs: ITab[] = NAVIGATION_TABS;

	@Input()  currentTab: string;
	@Output() tabChange = new EventEmitter();
	@Output() toggleEditEventMenu = new EventEmitter();

	constructor(private eventStoreService: EventsStoreService, private dateService: DateService) {}

	/**
	 * Emitting to parent that navigation tab has been changed
	 */
	protected onTabChange(tab: ITab): void {
		this.tabChange.emit(tab);
	}

	protected onAddEventClick(): void {
		this.toggleEditEventMenu.emit();
	}
	
	protected onNextDateClick(): void {
		this.dateService.goToNextDay();
	}

	protected onPrevDateClick(): void {
		this.dateService.goToPrevDay();
	}

	protected onCurrentDateClick(): void {
		this.dateService.goToCurrentDay();
	}
}
