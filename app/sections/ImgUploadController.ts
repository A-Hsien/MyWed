declare const $: any;
declare const ScrollMagic: any;
declare const TweenMax: any;
declare const Linear: any;
declare const firebase: any;
import * as Utilities from '../Utilities';
import { SectionState } from '../SectionState.enum';


export class ImgUploadController {

    private sectionName = '#img-upload-container';
    private sectionState: SectionState = SectionState.Outside;
    private imageToUpload: ImageToUpload = new ImageToUpload();
    private imageInfos: ImageInfo[] = [];
    private $photo: any;

    constructor(
        scrollMagicController: any,
        windowHeight: number,
        windowWidth: number
    ) {
        this.backgroundScrolling(scrollMagicController, windowHeight);
        const $section = $(this.sectionName);
        $section.on('click', '.file-selector', this.openFileSelector.bind(this));
        $section.on('change', '.img-input', this.handleFile.bind(this));
        $section.on('click', '.js-submit', this.submit.bind(this));
        this.$photo = $section.find('.img-upload-slides');

    };

    private backgroundScrolling(scrollMagicController: any, windowHeight: number) {
        const sectionH = $(this.sectionName).height();
        const duration = windowHeight + sectionH;

        new ScrollMagic.Scene({
            triggerElement: this.sectionName,
            triggerHook: 1,
            duration: duration,
        }).setTween(`${this.sectionName} .parallax-scrolling-background`, {
            css: { transform: 'translateY(0)' },
            ease: Linear.easeNone
        }).addTo(scrollMagicController)
            .on("enter leave", e => {
                if (e.type === "enter") {
                    this.sectionState = SectionState.Inside;
                    this.loadImageInfos();
                } else {
                    this.sectionState = SectionState.Outside;
                }
            });
    };

    private openFileSelector() {
        $(this.sectionName).find('.img-input').click();
    };

    private handleFile() {
        const $section = $(this.sectionName);
        const input = $section.find('.img-input')[0];
        var url = input.value;
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext === "gif" || ext === "png" || ext === "jpeg" || ext === "jpg")) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const $edotor = $section.find('.img-editor');
                $section.find('.return-message').hide();
                $section.find('.js-submit').show();
                $edotor.fadeIn();
                const data = e.target.result;
                $edotor.find('.img-to-upload').attr('src', data);
                this.imageToUpload.file = file;
                this.imageToUpload.data = data;
                this.imageToUpload.fileName = file.name;

                Utilities.scrollTo('.img-to-upload');
            };
            reader.readAsDataURL(file);
        }
    };

    private submit() {
        const $section = $(this.sectionName);
        const imageToUpload = this.imageToUpload;
        imageToUpload.author = $section.find('.js-name').val();
        imageToUpload.message = $section.find('.js-message').val();
        const $alert = $section.find('.return-message');

        if (!this.imageToUpload.isValid) {
            $alert.html(this.imageToUpload.errorMessage);
            $alert.fadeIn();
            return;
        }

        const db = firebase.database();
        const table = db.ref('/image');
        table.push(this.imageToUpload.getInfo());

        const storage = firebase.storage().ref();
        storage.child(`image/${this.imageToUpload.fileName}`).put(this.imageToUpload.file);

        $alert.html('<strong>已寄出!</strong>感謝您的分享');
        $alert.fadeIn();
        $section.find('.js-submit').hide();

        setTimeout(() => {
            $section.find('.img-editor').fadeOut();
            Utilities.scrollTo(this.sectionName);
        }, 2000);
    };

    private loadImageInfos() {
        firebase.database().ref('/image').once('value').then((snapshot) => {
            const value = snapshot.val();
            this.imageInfos.forEach(e => {
                delete value[e['id']];
            });

            const newInfos = Object.keys(value).map(key => {
                const imageInfo = value[key];
                imageInfo.id = key;
                return value[key];
            });
            this.imageInfos = this.imageInfos.concat(newInfos);

            this.loadImage();
        })
    };

    private loadImage() {
        if (this.sectionState === SectionState.Outside) return;

        const storage = firebase.storage().ref();
        const imageInfo = this.imageInfos[0];
        const $section = $(this.sectionName);
        $section.find('.js-image-info').text(`${imageInfo.author}: ${imageInfo.message}`);

        storage.child(`image/${imageInfo.fileName}`).getDownloadURL().then(url => {
            const img = new Image();
            img.src = url;

            img.onload = () => this.setImage(img.src);
            img.onerror = () => this.resetImage();
        });
    };

    private setImage(src: string) {
        this.$photo.css('background-image', `url(${src})`);
        TweenMax.to(
            this.$photo,
            3,
            { opacity: 1 }
        );
        setTimeout(this.resetImage.bind(this), 12000);
    };

    private resetImage() {
        this.imageInfos.push(this.imageInfos.shift());
        TweenMax.to(
            this.$photo,
            1,
            {
                opacity: 0,
                onComplete: this.loadImage.bind(this)
            }
        );
    };
};





interface ImageInfo {
    fileName: string;
    author: string;
    message: string;
};

class ImageToUpload {
    fileName: string = '';
    author: string = '';
    message: string = '';
    data: string = '';
    file: File = null;

    get errorMessage(): string {
        if (!this.author)
            return '該怎麼稱呼您呢?';
        if (!this.message)
            return '寫點留言吧~';
        return '';
    };

    get isValid(): boolean {
        const someIsEmpty = ['fileName', 'author', 'message', 'file'].some(e => !this[e]);
        return !someIsEmpty;
    };

    getInfo(): ImageInfo {
        return {
            fileName: this.fileName,
            author: this.author,
            message: this.message
        };
    };
};