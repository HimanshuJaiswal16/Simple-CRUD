import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../service/service.service';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Education {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.css'
})
export class AddEditEmployeeComponent implements OnInit {

  empForm: FormGroup;

  educations: Education[] = [
    { value: 'matric-0', viewValue: 'Matric' },
    { value: 'diploma-1', viewValue: 'Diploma' },
    { value: 'intermediate-2', viewValue: 'Intermediate' },
    { value: 'graduate-2', viewValue: 'Graduate' },
    { value: 'post_graduate-2', viewValue: 'Post Graduate' },
  ];

  constructor(private fb: FormBuilder, private service: ServiceService,
    private dialogref: MatDialogRef<AddEditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: ''
    })
  }
  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.service.updateEmployee(this.data.id, this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee updated Successfully !!!");
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        })

      } else {
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Added Successfully !!!");
            this.dialogref.close(true);
          },
          error: (err: any) => {
            alert(err);
          }
        })

      }

    }

  }

}
