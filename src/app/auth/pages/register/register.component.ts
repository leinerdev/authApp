import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['Leiner Barrios', [Validators.required]],
      email: ['leiner@gmail.com', [Validators.email]],
      password: ['123456', [Validators.required, Validators.minLength(6)]],
    });
  }

  register() {
    const { name, email, password } = this.registerForm.value;
    this.authService.register(name, email, password).subscribe((ok) => {
      if (ok === true) {
        Swal.fire({
          title: 'Genial!',
          text: 'Usuario creado exitosamente, ya puedes ingresar.',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.router.navigateByUrl('/auth');
      } else {
        Swal.fire({
          title: 'Error!',
          text: ok,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }
}
