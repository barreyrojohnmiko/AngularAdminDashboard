import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private eventService: EventService) {}

  onSubmit() {
    if (this.loginForm.value.email !== '' && this.loginForm.value.password !== '') {
      localStorage.setItem('appToken', '1');
      // this.eventService.alertEvents.emit({ status: true });
      this.router.navigate(['/dashboard']);
    }
  }
}
