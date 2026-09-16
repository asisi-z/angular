import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VeiculosAPI } from '../models/veiculo.model';

export interface DadosVeiculo {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}

@Injectable({
  providedIn: 'root',
})
export class Vehicle {
  private apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) {}

  getVeiculos(): Observable<VeiculosAPI> {
    return this.http.get<VeiculosAPI>(`${this.apiUrl}/vehicles`);
  }

  buscarPorVin(vin: string): Observable<DadosVeiculo> {
    return this.http.post<DadosVeiculo>(`${this.apiUrl}/vehicleData`, { vin });
  }
}
