import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

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
      { type: 'minlength', message: 'La contraseña debe tener al menos 6 caracteres' },
      { type: 'pattern', message: 'La contraseña debe incluir al menos una letra, un número y un carácter especial' }
    ],
    password_confirmation: [
      { type: 'required', message: 'La confirmación de la contraseña es obligatoria' },
      { type: 'minlength', message: 'La confirmación debe tener al menos 6 caracteres' },
      { type: 'passwordMismatch', message: 'Las contraseñas no coinciden' }
    ],
    name: [
      { type: 'required', message: 'El nombre es obligatorio' },
      { type: 'minlength', message: 'El nombre debe tener al menos 2 caracteres' },
      { type: 'pattern', message: 'El nombre solo debe contener letras' }
    ],
    last_name: [
      { type: 'required', message: 'El apellido es obligatorio' },
      { type: 'minlength', message: 'El apellido debe tener al menos 2 caracteres' },
      { type: 'pattern', message: 'El apellido solo debe contener letras' }
    ],
    username: [
      { type: 'required', message: 'El usuario es obligatorio' },
      { type: 'minlength', message: 'El usuario debe tener al menos 4 caracteres' },
      { type: 'pattern', message: 'El usuario solo debe contener letras y números' }
    ],
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private navCrtl: NavController
  ) {
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$') 
      ])),

      last_name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$') 
      ])),

      username: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.pattern('^[a-zA-Z0-9]+$') 
      ])),

      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),

      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$') 
      ])),

      password_confirmation: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])),
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {}

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('password_confirmation')?.value;

    return password === passwordConfirmation ? null : { passwordMismatch: true };
  }

  registerUser(registerData: any) {
    if (this.registerForm.valid) {
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
  cancelarRegistro(){
    this.navCrtl.navigateRoot('/login');
  }
}
