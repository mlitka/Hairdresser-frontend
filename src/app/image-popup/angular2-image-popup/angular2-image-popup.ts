import { Component, Input, Output, ElementRef, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'ImageModal',
  templateUrl: './angular2-image-popup.html',
  styleUrls: ['./angular2-image-popup.css']
})
export class ImageModal implements OnInit {
  public _element: any;
  public opened: boolean = false;
  public imgSrc: string;
  public currentImageIndex: number;
  public loading: boolean = false;
  public showRepeat: boolean = false;
  @Input('modalImages') public modalImages: any;
  @Input('imagePointer') public imagePointer: number;
  @Output('cancelEvent') cancelEvent = new EventEmitter<any>();
  constructor(public element: ElementRef) {
    this._element = this.element.nativeElement;
  }
  ngOnInit() {
    this.loading = true;
    if (this.imagePointer >= 0) {
      this.showRepeat = false;
      this.openGallery(this.imagePointer);
    } else {
      this.showRepeat = true;
    }
  }
  closeGallery() {
    this.opened = false;
    this.cancelEvent.emit(null);
  }
  prevImage() {
    this.loading = true;
    this.currentImageIndex--;
    if (this.currentImageIndex < 0) {
      this.currentImageIndex = this.modalImages.length - 1;
    }
    this.openGallery(this.currentImageIndex);
  }
  nextImage() {
    this.loading = true;
    this.currentImageIndex++;
    if (this.modalImages.length === this.currentImageIndex) {
      this.currentImageIndex = 0;
    }
    this.openGallery(this.currentImageIndex);

  }
  openGallery(index: any) {
    if (!index) {
      this.currentImageIndex = 1;
    }
    this.currentImageIndex = index;
    this.opened = true;
    for (var i = 0; i < this.modalImages.length; i++) {
      if (i === this.currentImageIndex) {
        this.imgSrc = this.modalImages[i].img;
        this.loading = false;
        break;
      }
    }
  }
}
