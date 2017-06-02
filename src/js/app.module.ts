import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { EventsStoreService } from './services/events.store.service';
import { EventsAlignmentService } from './services/events.alignment.service';
import { DateService } from './services/date.service';
import { AppComponent }  from './components/app.component';

@NgModule({
	imports: [[BrowserModule, FormsModule]],
	declarations: [[AppComponent]],
	bootstrap: [[AppComponent]],
	providers: [[HTTP_PROVIDERS], [EventsStoreService], [EventsAlignmentService], [DateService]]
})

export class AppModule {}
