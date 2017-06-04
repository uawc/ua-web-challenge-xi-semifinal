import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { ITab } from '../interfaces/tab.interface'

@Injectable()
export class NavigationService {
	protected navigationUpdated = new Subject<any>();

	public navigationUpdated$ = this.navigationUpdated.asObservable();

	public navigateToTab(tab: ITab): void {
		this.navigationUpdated.next(tab);
	}
}
