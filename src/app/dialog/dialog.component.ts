import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogref: MatDialogRef<DialogComponent>
  ) {}
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];
  productForm!: FormGroup;
  actionbtn:string ='Save'
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
      Comment: ['', Validators.required],
    });
   if(this.editData){
    this.actionbtn='Update'
    this.productForm.controls['productName'].setValue(this.editData.productName)
    this.productForm.controls['category'].setValue(this.editData.category)
    this.productForm.controls['freshness'].setValue(this.editData.freshness)
    this.productForm.controls['price'].setValue(this.editData.price)
    this.productForm.controls['date'].setValue(this.editData.date)
    this.productForm.controls['Comment'].setValue(this.editData.Comment)
   }
  }
  addProduct() {
    if(!this.editData){
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('product added sucessfully');
            this.productForm.reset();
            this.dialogref.close('save');
          },
          error: () => {
            alert('error');
          },
        });
      }
    }
 this.editProductForm()
  }
  editProductForm(){
    this.api.putProduct(this.productForm.value,this.editData.id).subscribe({
      next:(res)=>{
          alert('product updated sucessfully');
          this.productForm.reset();
          this.dialogref.close('update')
      }
    })
  }
}
