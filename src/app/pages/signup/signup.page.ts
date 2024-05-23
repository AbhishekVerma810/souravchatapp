import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  isTypePassword: boolean = true;

  constructor(private apiService:ApiService,private router:Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm = new FormGroup({
       name: new FormControl('', 
        {validators: [Validators.required]}
      ),
      email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required,]}
      ),
      contact_number: new FormControl('', 
      {validators: [Validators.required, Validators.minLength(10)]}
    ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {
    console.log(this.signupForm.value)
    if(!this.signupForm.valid) return;
    this.apiService.signup(this.signupForm.value).then(res=>{
      localStorage.setItem("token", JSON.stringify(res.token));

      this.router.navigate(['/apptabs/tabs/home'])
      }).catch(err=>{
          console.log('hello abhi your error')
      })
  }
}