import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Storage } from '@ionic/storage-angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { AlertController } from '@ionic/angular';

defineCustomElements(window);

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  standalone: false
})
export class AccountPage implements OnInit {
  user_data: any = {
    name: '',
    last_name: '',
    email: '',
    image: '',
    followees: [],
    followers: []
  };

  constructor(
    private userService: UserService,
    private storage: Storage,
    public alertController: AlertController
  ) {}

  async ngOnInit() {
    let user: any = await this.storage.get('user');
    console.log(user);
    this.userService.getUser(user.id).then(
      (data: any) => {
        console.log(data);
        this.storage.set('user', data);
        this.user_data = data;
      }
    ).catch(error => {
      console.log(error);
    });
  }

  async takePhoto(source: CameraSource) {
    console.log('take photo');
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    console.log(capturedPhoto.dataUrl);
    this.user_data.image = capturedPhoto.dataUrl;
    this.update();
  }

  async update() {
    this.userService.updateUser(this.user_data).then(
      (data) => {
        console.log('Perfil actualizado:', data);
        this.storage.set('user', this.user_data);
      }
    ).catch(error => {
      console.log(error);
    });
  }

  async presentPhotoOptions() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿De dónde desea obtener la imagen?",
      buttons: [
        {
          text: "Cámara",
          handler: () => {
            this.takePhoto(CameraSource.Camera);
          }
        },
        {
          text: "Galería",
          handler: () => {
            this.takePhoto(CameraSource.Photos);
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

  async updateAccount() {
    const alert = await this.alertController.create({
      header: "Seleccione una opción",
      message: "¿Qué deseas cambiar?",
      buttons: [
        {
          text: "Foto de perfil",
          handler: () => {
            this.presentPhotoOptions();
          }
        },
        {
          text: "Cambiar Nombre",
          handler: () => {
            this.updateName();
          }
        },
        {
          text: "Cambiar Apellido",
          handler: () => {
            this.updateLastName();
          }
        },
        {
          text: "Cancelar",
          role: "cancel",
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });
    await alert.present();
  }

  async updateName() {
    const alert = await this.alertController.create({
      header: "Actualizar Nombre",
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Ingrese su nuevo nombre',
          value: this.user_data.name
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Guardar",
          handler: (data) => {
            if (data.name.trim().length > 0) {
              this.user_data.name = data.name;
              this.update();
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async updateLastName() {
    const alert = await this.alertController.create({
      header: "Actualizar Apellido",
      inputs: [
        {
          name: 'last_name',
          type: 'text',
          placeholder: 'Ingrese su nuevo apellido',
          value: this.user_data.last_name
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Guardar",
          handler: (data) => {
            if (data.last_name.trim().length > 0) {
              this.user_data.last_name = data.last_name;
              this.update();
            }
          }
        }
      ]
    });
    await alert.present();
  }
}