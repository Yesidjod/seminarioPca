import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: false,
})
export class IntroPage implements OnInit {

  constructor(
    private router: Router,
    private storage: Storage

  ) { }

  ngOnInit() {
  }

  finish(){

    console.log('finish');
    this.storage.set('vi la intro', true);
    this.router.navigateByUrl('/home');
  }
}


