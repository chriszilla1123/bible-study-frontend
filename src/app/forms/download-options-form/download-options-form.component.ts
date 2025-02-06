import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'download-options-form',
  templateUrl: './download-options-form.component.html',
  styleUrl: './download-options-form.component.css'
})
export class DownloadOptionsFormComponent {
  @Output() formUpdate = new EventEmitter<any>();
  form: FormGroup;
  dryRun = new FormControl('');

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      dryRun: [''],
    })
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      this.formUpdate.emit(value);
    })
  }

}