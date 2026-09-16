import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})

export class Menu {

  constructor(private auth: Auth) { }

  logout(): void {
    this.auth.logout();
  }


}

