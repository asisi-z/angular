import { Component, OnInit } from '@angular/core';
import { Menu } from '../../componentes/menu/menu';
import { Veiculo } from '../../models/veiculo.model';
import { DadosVeiculo, Vehicle } from '../../services/vehicle';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [Menu, CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {

 veiculos: Veiculo[] = [];
 veiculoSelecionado: Veiculo | null = null;
 totalVendas: number | null = null;
 conectados: number | null = null;
 updateSoftware: number | null = null;
 imagemVeiculo: string | null = null;
 vin = '';
 dadosVin: DadosVeiculo | null = null;
 mensagemVin = '';

 constructor(private vehicle: Vehicle) {}

 ngOnInit(): void {
  this.vehicle.getVeiculos().subscribe({
   next: (resposta) => {
    this.veiculos = resposta.vehicles;
   },
   error: (erro) => {
    console.error('Não foi possível carregar os veículos.', erro);
   }
  });
 }

 buscarVin(): void {
  const codigoVin = this.vin.trim();

  if (!codigoVin) {
   this.dadosVin = null;
   this.mensagemVin = 'Digite um código VIN.';
   return;
  }

  this.vehicle.buscarPorVin(codigoVin).subscribe({
   next: (dados) => {
    this.dadosVin = dados;
    this.mensagemVin = '';
   },
   error: (erro) => {
    this.dadosVin = null;
    this.mensagemVin = erro.error?.message || 'Código VIN não encontrado.';
   }
  });
 }

 veiculoEscolhido(event: Event): void {
  const idSelecionado = (event.target as HTMLSelectElement).value;

  if (idSelecionado) {
    this.veiculoSelecionado = this.veiculos.find(v => String(v.id) === idSelecionado) || null;
    if (this.veiculoSelecionado) {
      this.totalVendas = Number(this.veiculoSelecionado.volumetotal);
      this.conectados = Number(this.veiculoSelecionado.connected);
      this.updateSoftware = Number(this.veiculoSelecionado.softwareUpdates);
      this.imagemVeiculo = this.obterImagem(this.veiculoSelecionado.vehicle);
    }
  }
  else{
    this.veiculoSelecionado = null;
    this.totalVendas = null;
    this.conectados = null;
    this.updateSoftware = null;
    this.imagemVeiculo = null;
  }
}

private obterImagem(nomeVeiculo: string): string {
  const nomeArquivo = nomeVeiculo.trim().toLowerCase().replace(/\s+/g, '');
  if (nomeArquivo === 'broncosport') {
    return '/img/bronco.png';
  }
  return `/img/${nomeArquivo}.png`;
}
}