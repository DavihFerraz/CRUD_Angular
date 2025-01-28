import { Component, OnInit } from '@angular/core';
import { PessoasService } from './services/pessoas.service';
import { Observable } from 'rxjs';
import { Pessoa } from './models/pessoa';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as uuid from 'uuid';



@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent implements OnInit{
  title = 'webAngular';
  userId = uuid.v4()
// Listar lista de pessoas
  listaPessoas$?: Observable <Pessoa[]>;

// Buscar pessoa pelo nome
  pessoaEncontrada$?: Observable<Pessoa>;
  nomeBusca = '';

// Adicionar Pessoa
  nomeAdicionar = ''




  constructor(private pessoaService: PessoasService){};


  ngOnInit(): void {
    this.carregarListaPessoas();
  }

  // Carrega a lista de pessoas
  carregarListaPessoas(){
    this.listaPessoas$ = this.pessoaService.obterPessoasService();
  }

  // Busca a pessoa pelo nome
  obterPessoaEspecifica(){
    if(!this.nomeBusca) return;
    this.pessoaEncontrada$ = this.pessoaService.obterPessoaEspecificaService(this.nomeBusca);
    this.nomeBusca = '';
  }
  
  // Adiciona uma nova pessoa
  adicionarPessoa(){
    if(!this.nomeAdicionar) return;

    const novaPessoa: Pessoa = {id: this.userId, nome:this.nomeAdicionar}
    this.pessoaService.adicionarPessoaService(novaPessoa).subscribe(() => {
      this.carregarListaPessoas(); // chama a lista atualizada
      this.nomeAdicionar = '';
    })
  }



  }



