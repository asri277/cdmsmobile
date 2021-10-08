import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignaturePage } from './signature';
import { CanvasDraw } from '../../components/canvas-draw/canvas-draw';



@NgModule({
  declarations: [
	  SignaturePage,
	  CanvasDraw
  ],
  imports: [
    IonicPageModule.forChild(SignaturePage),
  ],
})
export class SignaturePageModule {}
