import * as _ from 'underscore';
import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
	selector: 'app',
	templateUrl: './templates/app.component.html',
	styleUrls: ['./css/app.component.css']
})

export class AppComponent implements OnInit {
	constructor(private testService: TestService) {}

	ngOnInit() {
		this.testService.someEvent$.subscribe(_.noop);
	}
}
