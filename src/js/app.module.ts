import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { RemindersStoreService } from './services/reminder.store.service';
import { RemindersAlignmentService } from './services/reminder.alignment.service';
import { ReminderEditService } from './services/reminder.edit.service';
import { NotificationService } from './services/notification.service';
import { NavigationService } from './services/navigation.service';
import { DateService } from './services/date.service';
import { AppComponent }  from './components/app.component';

@NgModule({
	imports: [[BrowserModule, FormsModule]],
	declarations: [[AppComponent]],
	bootstrap: [[AppComponent]],
	providers: [[HTTP_PROVIDERS], [RemindersStoreService], [RemindersAlignmentService], [DateService], [ReminderEditService], [NotificationService], [NavigationService]]
})

export class AppModule {}
