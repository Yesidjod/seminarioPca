import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { register } from 'swiper/element';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  errorMesage: any;
  formErrors = {
    email: [
      { type: 'required', message: 'El correo es obligatorio' },
      { type: 'email', message: 'El correo no es válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es obligatoria' },
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
    ],
    lastname: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
    ],
    username: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 6 caracteres' }
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCrtl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      name: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])),
      lastname: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      username: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    })
  }

  ngOnInit() {
  }

  registerUser(registerData: any) {
    this.authService.register(registerData).then(res => {
      console.log(res);
      this.errorMesage = '';
      this.navCrtl.navigateForward('/login');
    }).catch(err => {
      console.log(err);
      this.errorMesage = err;
    });
  }
}
