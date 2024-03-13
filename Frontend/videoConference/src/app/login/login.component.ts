import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  pageTitle = 'Justice Video Conference';
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _loginService: LoginService, private _router: Router) 
  {}
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      meetingId: ['',[Validators.required]],
      userId: ['',[Validators.required]]
    })
  }

  login() {
    this._loginService.login(this.loginForm.value).subscribe({
      next: accountId => {
        this.loginForm.reset();
        if (accountId != null) {
          debugger;
          this._router.navigate(["/conference"]);
        }
        else {
          alert("You are not authorized to participate the discussion, pls try again with other credentials.");
        }
      },
      error: err => {
        this.loginForm.reset();
        alert(err)
      }
    })
  }

  requiredGetErrorMessage(): string{
      return 'The field is required.';    
  }
}
