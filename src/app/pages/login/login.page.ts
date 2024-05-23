import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  signupForm: FormGroup;
  isTypePassword: boolean = true;

  constructor(private apiService:ApiService,private router:Router) {
    this.initForm();
  }

  ngOnInit() {
  }

  initForm() {
    this.signupForm = new FormGroup({
     email: new FormControl('', 
        {validators: [Validators.required, Validators.email]}
      ),
      password: new FormControl('', 
        {validators: [Validators.required]}
      ),
    });
  }

  onChange() {
    this.isTypePassword = !this.isTypePassword;
  }

  onSubmit() {

    if(!this.signupForm.valid) return;
    console.log(this.signupForm.value);
    this.apiService.login(this.signupForm.value).then(res=>{
    console.log('res===>',res)
    localStorage.setItem("user_data", JSON.stringify(res));
     console.log('res===>',res.user)
    this.router.navigate(['/apptabs/tabs/home'])
    }).catch(err=>{
        console.log('hello abhi your error')
    })
  }
}