import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { BercutComponent } from './bercut/bercut.component';
import { AttComponent } from './att/att.component';
import { M3mComponent } from './m3m/m3m.component';

const routes: Routes = [
  { path: '', redirectTo: '/testing', pathMatch: 'full' },
  { path: 'testing', component: ContentComponent },
  { path: 'bercut', component: BercutComponent },
  { path: 'att', component: AttComponent },
  { path: 'm3m', component: M3mComponent },
  { path: 'station-ip-settings', component: ContentComponent },
  { path: 'stat-settings', component: ContentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }