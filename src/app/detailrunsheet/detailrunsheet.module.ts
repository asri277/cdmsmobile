import { NgModule } from '@angular/core';
import { IonicPageModule } from '@ionic-angular';
import { DetailRunsheetPage } from './detailrunsheet';


@NgModule({
  declarations: [
	  DetailRunsheetPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRunsheetPage),
  ],
})
export class DetailRunsheetPageModule {}
