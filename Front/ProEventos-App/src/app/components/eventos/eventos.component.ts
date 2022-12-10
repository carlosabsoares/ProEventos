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
      tema: ['', [Validators.required]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      qtPessoas: ['', [Validators.required,
                       Validators.min(1)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required,
                   Validators.email]],
      imgEvento: ['', Validators.required],
    });
  }
}
