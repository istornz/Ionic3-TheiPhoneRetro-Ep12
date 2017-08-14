import { Component, ChangeDetectorRef } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

// Native components
import { SpeechRecognition } from '@ionic-native/speech-recognition';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isSpeechAvailable = false;
  isListening = false;
  matches: Array<string> = [];

  constructor(public navCtrl: NavController,
    private platform: Platform,
    private speechRecognition: SpeechRecognition,
    private changeDetectorRef: ChangeDetectorRef) {
    platform.ready().then(() => {

      // Check if SpeechRecognition available or not :/
      this.speechRecognition.isRecognitionAvailable()
      .then((available: boolean) => this.isSpeechAvailable = available)
    });
  }

  public startListening(): void {
    this.isListening = true;
    this.matches = [];
    
    let options = {
      language: 'fr-FR',
      matches: 5,
      prompt: 'Je vous écoute ! :)',  // Android only
      showPopup: true,                // Android only
      showPartial: false              // iOS only
    }
    this.speechRecognition.startListening(options)
    .subscribe(
      (matches: Array<string>) => {
        this.isListening = false;
        this.matches = matches;
        this.changeDetectorRef.detectChanges();
      },
      (onerror) => {
        this.isListening = false;
        this.changeDetectorRef.detectChanges();
        console.log(onerror);
      }
    )
  }

  public stopListening(): void {
    this.speechRecognition.stopListening();
  }

}
