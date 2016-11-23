import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { TestService } from './services/test.service';
import { AppComponent }  from './components/app.component';

@NgModule({
	imports: [[BrowserModule, FormsModule]],
	declarations: [[AppComponent]],
	bootstrap: [[AppComponent]],
	providers: [[HTTP_PROVIDERS], [TestService]]
})

export class AppModule {}
