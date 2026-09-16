import { Component } from '@angular/core';
import { Auth } from '../../services/auth';
import { Menu } from '../../componentes/menu/menu';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [Menu],
})
export class Home {

}
