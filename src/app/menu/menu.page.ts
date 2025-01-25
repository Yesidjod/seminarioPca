import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false
})
export class MenuPage implements OnInit {

  constructor(
    private menu: MenuController,
    private navCrtl: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
  }

  closeMenu(){
    this.menu.close();
  }

  home(){
    this.navCrtl.navigateRoot("/menu/home");
    this.closeMenu();
  }

  account(){
    this.navCrtl.navigateRoot("/menu/account");
    this.closeMenu();
  }

  log_out(){
    this.storage.remove("isUserLoggedIn");
    this.navCrtl.navigateRoot("/login");
  }

}
