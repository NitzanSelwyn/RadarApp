import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ApiService } from "../../api.service";
import { postModel } from "../../Model/post.model";
import { Time } from '@angular/common';



import { MapsAPILoader } from '@agm/core';
import { } from "@types/googlemaps";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  // form = new FormGroup({
  //   eventDate: new FormControl('',
  //     Validators.required),

  //   eventDescription: new FormControl('',
  //     Validators.required),

  //   eventTitle: new FormControl('',
  //     Validators.required),

  //   eventTime: new FormControl('',
  //     Validators.required),

  //   address: new FormControl('',
  //     Validators.required),
  // });
  public model: postModel;

  addressControl = new FormControl('', [Validators.required])
  constructor(private apiService: ApiService, private mapsAPI: MapsAPILoader, private ngZone: NgZone) {
    this.eventAuthor = this.apiService.toekn;
  }

  // getErrorMessage() {
  //   return this.addressControl.hasError('required') ? 'You must enter a value' : '';
  // }

  @ViewChild('search') public searchElemnt: ElementRef;

  ngOnInit() {
    this.mapsAPI.load().then(() => {
      let autoComplete = new google.maps.places.Autocomplete(this.searchElemnt.nativeElement, { types: ["address"] });
      autoComplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autoComplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          else {
            var newLat = place.geometry.location.lat();
            var newLng = place.geometry.location.lng();
            this.lat = newLat;
            this.lng = newLng;
            this.address = place.formatted_address;
          }
        });
      });
    });

    // this.form = this.formBuilder.group({
    //   eventTitle: [null, Validators.required],
    //   eventDate: [null, Validators.required],
    //   address: [null, Validators.required],
    //   lat: [null, Validators.required],
    //   lng: [null, Validators.required],
    // });
  }

  address: string

  lat: Number;
  lng: Number;

  eventTitle = '';
  eventDescription = '';
  eventDate: Date;
  eventTime: Time;
  eventAuthor: String;
  minDate = new Date(Date.now());


  addEvent(event: MatDatepickerInputEvent<Date>) {
    this.eventDate = event.value;
  }

  disabled: boolean = true;
  changedEvent(event) {
    if (event.target.checked) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }


  createEvent() {

    this.apiService.createEvents({
      title: this.eventTitle, description: this.eventDescription,
      time: this.eventTime, date: this.eventDate,
      location: { lat: this.lat, lng: this.lng },
      address: this.address,
      author: this.eventAuthor,

    });
    // let isValid = this.apiService.createEvents(this.form.value);
    // if (!isValid) {
    //   this.form.setErrors({
    //     invalidSubmit: true;
    //   })
    // }
  }

  // validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     console.log(field);
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsTouched({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }

  // isFieldValid(field: string) {
  //   return !this.form.get(field).valid && this.form.get(field).touched;
  // }

  // displayFieldCss(field: string) {
  //   return {
  //     'has-error': this.isFieldValid(field),
  //     'has-feedback': this.isFieldValid(field)
  //   };
  // }

}



