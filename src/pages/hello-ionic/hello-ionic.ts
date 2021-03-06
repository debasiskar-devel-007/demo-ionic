import { Component } from '@angular/core';
import {ImagePicker, CaptureImageOptions, MediaFile, CaptureError, CaptureVideoOptions} from 'ionic-native';
//import * as $ from "jquery";
import { Transfer } from 'ionic-native';
import { MediaCapture } from 'ionic-native';
import {File} from 'ionic-native';
import { SocialSharing } from 'ionic-native';
import {InAppBrowser} from 'ionic-native';
import {StreamingMedia, StreamingVideoOptions} from 'ionic-native';
import { Camera } from 'ionic-native';
import {Crop} from 'ionic-native';



@Component({
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
    imagepath:any;
    imagecapturepath:any;
    videocapturepath:any;


  constructor() {
    this.imagepath=false;
    this.imagecapturepath=false;
    this.videocapturepath=false;

  }


  openphotobowse(){

    //$('.status-input').removeClass('hide');
    //$('.browsephoto').removeClass('hide');

    let options = {
      // max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 80,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 1024,
      height: 0,

      // quality of resized image, defaults to 100
      quality: 90
    };
    //noinspection TypeScriptUnresolvedFunction
    ImagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
        alert('Image URI: ' + results[i]);
        //$('.photopreview').attr('src',results[i]);
        this.imagepath=results[i];
        //alert('Image URI: ' + this.imagepath);
      }
    }, (err) => { });
  }


    upload(){
        const fileTransfer = new Transfer();
        var options: any;

        options = {
            fileKey: 'file',
            //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
            fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
            headers: {}

    }
        //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
        fileTransfer.upload(this.imagepath, "http://166.62.34.31:2/uploads", options)
            .then((data) => {
                // success

                alert(data);
                var i:any;
                for(i in data){
                    alert(i+'=='+data[i]);
                }
            }, (err) => {
                // error

                alert('error');
                alert(err);
                var i:any;
                for(i in err){
                    alert(i+'=='+err[i]);
                }
                // error

            })
    }

    opencamera(){

        let options: CaptureImageOptions = { limit: 1 };
        MediaCapture.captureImage(options)
            .then(
                (data: MediaFile[]) => {
                    this.imagecapturepath=data[0]['fullPath'];
                    alert(data[0]['fullPath']);
                    alert(data[0]);

                    var x:any;
                    for(x in data[0]){
                    alert(x+'=='+data[0][x]);
                    }

                },
                (err: CaptureError) => {
                    alert(err)

                    var x:any;
                    for(x in err){
                        alert(x+'=='+err[x]);
                    }

                }
            );
    }

    opencrop(){
        alert(9);

        Crop.crop(this.imagepath, {quality: 75})
            .then(

                newImage => {
                    this.imagepath=newImage;
                    alert(newImage);
                    console.log("new image path is: " + newImage),
                        error => {
                            alert(error);
                            console.error("Error cropping image", error)
                        }
                }
            );
    }

    opencameraforvideo(){

        let options: CaptureVideoOptions = { limit: 1 };
        MediaCapture.captureVideo(options)
            .then(
                (data: MediaFile[]) => {
                    this.videocapturepath=data[0]['fullPath'];
                    alert(data[0]['fullPath'])

                    var x:any;
                    for(x in data[0]){
                        alert(x+'=='+data[0][x]);
                    }

                },
                (err: CaptureError) => {
                    alert(err)

                    var x:any;
                    for(x in err){
                        alert(x+'=='+err[x]);
                    }

                }
            );
    }

    cameraupload(){
        const fileTransfer = new Transfer();
        var options: any;

        options = {
            fileKey: 'file',
            //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
            fileName: this.imagecapturepath.toString(),
            headers: {}

        }
        //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
        fileTransfer.upload(this.imagecapturepath, "http://166.62.34.31:2/uploads", options)
            .then((data) => {
                // success

                alert(data);
                var i:any;
                for(i in data){
                    alert(i+'=='+data[i]);
                }
            }, (err) => {
                // error

                alert('error');
                alert(err);
                var i:any;
                for(i in err){
                    alert(i+'=='+err[i]);
                }
                // error

            })
    }

    camerauploadvideo(){
        const fileTransfer = new Transfer();
        var options: any;

        options = {
            fileKey: 'file',
            //fileName: this.imagepath.toString().replace('file:///data/data/com.ionicframework.demo866280/cache/',''),
            fileName: this.videocapturepath.toString(),
            headers: {}

        }
        //fileTransfer.upload(this.imagepath, "http://torqkd.com/user/ajs2/testfileupload", options)
        fileTransfer.upload(this.videocapturepath, "http://166.62.34.31:2/uploads", options)
            .then((data) => {
                // success

                alert(data);
                var i:any;
                for(i in data){
                    alert(i+'=='+data[i]);
                }
            }, (err) => {
                // error

                alert('error');
                alert(err);
                var i:any;
                for(i in err){
                    alert(i+'=='+err[i]);
                }
                // error

            })
    }

    filechooser(){
        var cordova: any;
        const fs:string = cordova.file.dataDirectory;
        File.checkDir(fs, 'files').then(_ => console.log('yay')).catch(err => console.log('boooh'));
    }

    sharebyfacebook(){

        let browser = new InAppBrowser('https://www.facebook.com/', '_system');
        //browser.executeScript(...);
        //browser.insertCSS(...);
        //InAppBrowser.open('http://apache.org', '_blank', 'location=yes');

    }
    playyoutube(){

        let options: StreamingVideoOptions = {
            successCallback: () => { alert('Video played') },
            errorCallback: (e) => { alert('Error streaming') },
            orientation: 'landscape'
        };

        //noinspection TypeScriptValidateTypes
        StreamingMedia.playVideo("http://torqkd.com/uploads/video/converted/1475231341_1336827052.mp4", options);
        //StreamingMedia.playVideo("https://youtu.be/imIIk8pRVgI", options);
    }


    listvideo(){

        var options = {
            quality: 90,
            destinationType: 2,
            sourceType: 0,
            mediaType:1
        };

        Camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image:any = 'data:image/jpeg;base64,' + imageData;
            alert(imageData);

            (<any>window).plugins.navigator.createThumbnail(imageData, function(err, imageData1) {
                if (err){
                    alert(err);
                    throw err;

                }


                console.log(imageData1); // Will log the base64 encoded string in console.
                alert(imageData1); // Will log the base64 encoded string in console.
            });
        }, (err) => {
            // Handle error
        });

    }

    shareViaTwitter(){



// Check if sharing via email is supported
        SocialSharing.shareViaTwitter( 'message', 'image', this.imagepath).then(() => {
            // Sharing via email is possible
            alert("success");

        }).catch(() => {
            // Sharing via email is not possible
            alert('error');
        });

    }

}
