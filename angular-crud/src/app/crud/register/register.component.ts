import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonServiceService } from 'src/app/common-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false
  data: any

  constructor( private api:CommonServiceService) { }

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.maxLength(8)]),
    // phone: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    position: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    salutation: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true
    if (this.registerForm.invalid) {
      console.log("form values", this.registerForm.value)
      return
    }
    let userDetails = {
      'name': this.registerForm.get('name')?.value,
      'email': this.registerForm.get('email')?.value,
      'password': this.registerForm.get('password')?.value,
      // 'phone': this.registerForm.get('phone')?.valueChanges,
      'position': this.registerForm.get('phone')?.valueChanges,
      'gender': this.registerForm.get('gender')?.valueChanges,
      'salutation': this.registerForm.get('salutation')?.valueChanges
    }

    let userDetailsJson = JSON.stringify(userDetails);
    let userDetailsJsonObject = JSON.parse(userDetailsJson);
    
    this.api.post('create', userDetailsJsonObject).subscribe(res => {
      this.data = res.status;
      console.log("data", this.data);
    });
  }

  validateNumber(event: { keyCode: any; preventDefault: () => void; }) {
    const keyCode = event.keyCode;
    const excludedKeys = [8, 37, 39, 46];
    if (!((keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      (excludedKeys.includes(keyCode)))) {
      event.preventDefault();
    }
  }


}
