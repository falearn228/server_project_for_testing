import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ContentComponent } from './content/content.component';
import { deviceStatusComponent } from './deviceStatus/deviceStatus.component';
import { HttpClientModule } from '@angular/common/http';
import { BercutComponent } from './bercut/bercut.component';

@NgModule({
  declarations: [
    BercutComponent,
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ContentComponent,
    deviceStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }