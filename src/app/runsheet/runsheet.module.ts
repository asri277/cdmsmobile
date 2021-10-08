import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic-angular';
import { RunsheetPage } from './runsheet';


@NgModule({
  declarations: [
	  RunsheetPage,
  ],
  imports: [
    IonicPageModule.forChild(RunsheetPage),
  ],
})
export class RunsheetPageModule {}
