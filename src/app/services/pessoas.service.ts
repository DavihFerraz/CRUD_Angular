import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from '../models/pessoa';

@Injectable({
  providedIn: 'root' // Torna o servico disponivel para toda a aplicacao
})


export class PessoasService {
  private urlApi = " http://localhost:5227/pessoas";
 

  constructor(private http: HttpClient) {};

  obterPessoasService(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.urlApi);
  };

  obterPessoaEspecificaService(nome: string): Observable<Pessoa>{
    return this.http.get<Pessoa>(`${this.urlApi}/${nome}`);
  };

  adicionarPessoaService(pessoa:Pessoa): Observable<void>{
    return this.http.post<void>(this.urlApi,pessoa);
  };

  atualizarPessoaService(pessoa: Pessoa): Observable<Pessoa>{
    return this.http.put<Pessoa>(`${this.urlApi}/${pessoa.id}`, pessoa);
  };

  excluirPessoaService(id: string): Observable<void>{
    return this.http.delete<void>(`${this.urlApi}/${id}`)
  }


};
