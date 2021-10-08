import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailManifestPage } from './detailmanifest';


@NgModule({
  declarations: [
	  DetailManifestPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailManifestPage),
  ],
})
export class DetailManifestPageModule {}
