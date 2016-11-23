import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TestService {
	protected someEvent = new Subject<any>();
	
	public someEvent$ = this.someEvent.asObservable();
	
	public someCoolMethod(): void {
		this.someEvent.next('ooops!');
	}
}
