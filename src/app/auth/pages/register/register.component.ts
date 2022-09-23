import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['Leiner Barrios', [Validators.required]],
      email: ['test1@test.com', [Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    console.log(this.registerForm.value);
  }
}
