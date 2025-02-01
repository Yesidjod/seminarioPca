import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { PostService } from '../services/post.service';
import { Storage } from '@ionic/storage-angular';
import { ModalController, AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

defineCustomElements(window);

@Component({
  selector: 'app-add-post-modal',
  templateUrl: './add-post-modal.page.html',
  styleUrls: ['./add-post-modal.page.scss'],
  standalone: false
})
export class AddPostModalPage implements OnInit {
  post_image: any;
  addPostForm: FormGroup;

  constructor(
    private formBuider: FormBuilder,
    private postService: PostService,
    private storage: Storage,
    private modalController: ModalController,
    private navController: NavController,
    private alertController: AlertController
  ) {
    this.addPostForm = this.formBuider.group({
      description: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async imgOptions() {
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

  async takePhoto(source: CameraSource) {
    console.log('Tomando foto desde:', source);
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.DataUrl,
      source: source,
      quality: 100
    });
    this.post_image = capturedPhoto.dataUrl;
    this.addPostForm.patchValue({
      image: this.post_image
    });
  }

  async addPost(post_data: any) {
    console.log('Agregando post:', post_data);
    const user = await this.storage.get('user');
    const post_param = {
      post: {
        description: post_data.description,
        image: post_data.image,
        user_id: user.id
      }
    };
    console.log(post_param, 'post para enviar');
    this.postService.createPost(post_param).then(
      (data: any) => {
        console.log(data, 'post creado');
        data.user = {
          id: user.id,
          name: user.name,
          image: user.image || 'assets/images/default-avatar.jpeg'
        };
        this.postService.postCreated.emit(data);
        this.addPostForm.reset();
        this.post_image = null;
        this.modalController.dismiss();
      },
      (error) => {
        console.log(error, 'error');
      }
    );
  }

  cancel() {
    this.modalController.dismiss();
  }
}

