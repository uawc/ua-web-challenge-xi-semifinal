import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
	protected navigationUpdated = new Subject<any>();

	public navigationUpdated$ = this.navigationUpdated.asObservable();

	public navigateToTab(tab: string): void {
		this.navigationUpdated.next(tab);
	}
}
