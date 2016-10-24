import { Component } from '@angular/core';

@Component({
    selector: 'image-popup',
    templateUrl: './image-popup.component.html',
    styleUrls: ['./image-popup.component.scss']
})
export class ImagePopupComponent {

    openModalWindow: boolean = false;
    imagePointer: number;
    images = [
        { thumb: "../../../public/images/portfolio/thumbnails/1.jpg", img: "../../../public/images/portfolio/fullsize/1.jpg", description: 'Image 1' },
        { thumb: "../../../public/images/portfolio/thumbnails/2.jpg", img: "../../../public/images/portfolio/fullsize/2.jpg", description: 'Image 1' },
        { thumb: "../../../public/images/portfolio/thumbnails/3.jpg", img: "../../../public/images/portfolio/fullsize/3.jpg", description: 'Image 1' },
        { thumb: "../../../public/images/portfolio/thumbnails/4.jpg", img: "../../../public/images/portfolio/fullsize/4.jpg", description: 'Image 1' },
        { thumb: "../../../public/images/portfolio/thumbnails/5.jpg", img: "../../../public/images/portfolio/fullsize/5.jpg", description: 'Image 1' },
        { thumb: "../../../public/images/portfolio/thumbnails/6.jpg", img: "../../../public/images/portfolio/fullsize/6.jpg", description: 'Image 1' },
    ];

    OpenImageModel(imageSrc: any, images: any) {
        //alert('OpenImages');
        var imageModalPointer: any;
        for (var i = 0; i < images.length; i++) {
            if (imageSrc === images[i].img) {
                imageModalPointer = i;
                break;
            }
        }
        this.openModalWindow = true;
        this.images = images;
        this.imagePointer = imageModalPointer;
    }
    cancelImageModel() {
        this.openModalWindow = false;
    }
}