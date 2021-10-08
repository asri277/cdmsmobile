import { Component, ViewChild, Renderer,Input } from '@angular/core';
import { Platform,App,AlertController } from '@ionic-angular';

@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDraw {

    @ViewChild('myCanvas') canvas: any;
    @ViewChild('myCanvasResize') canvasResize: any;
    @Input() cnObject: any;

    canvasElement: any;
    canvasElementResize: any;
    lastX: number;
    lastY: number;
    isDraw:any;

    currentColour: string = '#000000';
    brushSize: number = 10;

    constructor(public platform: Platform, public renderer: Renderer,
    		private app: App,
    		public alertCtrl: AlertController) {
        console.log('Hello CanvasDraw Component');
        this.isDraw =false;
    }

    ngAfterViewInit(){

        this.canvasElement = this.canvas.nativeElement;
        this.canvasElementResize = this.canvasResize.nativeElement;

        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');

    }

    handleStart(ev){

        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }

    handleMove(ev){

        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;

        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();

        this.lastX = currentX;
        this.lastY = currentY;

        this.isDraw =true;

    }

    public clearCanvas(){
        let ctx = this.canvasElement.getContext('2d');
        ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        this.isDraw =false;
    }

    public cancel(){
    	//alert(this.cnObject.selectStatus);
    	this.app.getRootNav().push('TabsPage',{cnObject:this.cnObject,tabIndex:1});
    }

    public save(){
    	if(this.isDraw){
        this.renderer.setElementAttribute(this.canvasElementResize, 'width', '300');
        this.renderer.setElementAttribute(this.canvasElementResize, 'height', '200');
    	let ctx = this.canvasElementResize.getContext('2d');
    	ctx.drawImage(this.canvasElement, 0, 0, 300, 200);

    	this.cnObject.photo = this.canvasElementResize.toDataURL('image/png');
    	this.app.getRootNav().push('TabsPage',{cnObject:this.cnObject,tabIndex:1});
    	}else{

    		let alert = this.alertCtrl.create({
    		    title: "Attention",
    		    subTitle: "Please put your signature",
    		    buttons: ['OK']
    		  });
    		  alert.present();
    	}
    }
}
