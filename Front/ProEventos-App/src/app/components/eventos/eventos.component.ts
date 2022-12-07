import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {


  form!: FormGroup;

  get f(): any{
    return this.form.controls;
  }

  ngOnInit(): void {
    this.validation();
  }

  constructor(private fb:FormBuilder) { }

  public validation(): void{
    this.form = this.fb.group({
      primeiroNome: ['', [Validators.required,
                          Validators.minLength(4),
                          Validators.maxLength(50)]],
      ultimoNome: ['', [Validators.required,
                        Validators.minLength(4),
                        Validators.maxLength(50)]],

                        confirmeSenha: ['', Validators.required],
      userName: ['', [Validators.required,
                       Validators.min(1),
                       Validators.max(120000)]],
      senha: ['', Validators.required],
      email: ['', [Validators.required,
                   Validators.email]],
      imgEvento: ['', Validators.required],
    });
  }

}
