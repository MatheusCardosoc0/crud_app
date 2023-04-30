import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss'],
})
export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;

  education: string[] = [
    'Fundamental',
    'Ensino médio',
    'Ensino superior',
    'Pós graduação',
  ];

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      genrer: '',
      education: '',
      experience: '',
      dob: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .attEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Pessoa atualizada')
              window.location.reload();
              this._dialogRef.close(true);
            },
            error: (err) => {
              console.error(err);
            },
          });
      } else {
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Pessoa adicionada com sucesso');
            window.location.reload();
            this._dialogRef.close(true);
          },
          error: (err) => {
            console.error(err);
          },
        });
      }
    }
  }
}
