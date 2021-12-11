import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Painting } from '../../shared/interfaces/paintings/painting';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PaintingsService } from '../../shared/services/paintings.service';

@Component({
  selector: 'app-painting-create',
  templateUrl: './painting-create.component.html',
  styleUrls: ['./painting-create.component.css']
})
export class PaintingCreateComponent implements OnInit {

  public newPaintingForm: FormGroup;
  public currentUser: UserInfo;

  constructor(
    private authService: AuthenticationService,
    private paintingService: PaintingsService,
    private router: Router
  ) { }

  ngOnInit() {

    this.authService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    }, err => console.error(err))

    this.newPaintingForm = new FormGroup({
      paintingName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      link: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required])
    });
  }

  public validateControl = (controlName: string) => {
    return this.newPaintingForm.controls[controlName].invalid && this.newPaintingForm.controls[controlName].touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.newPaintingForm.controls[controlName].hasError(errorName)
  }

  public createPainting = (formValues) => {

    const painting: Painting = {
      id: '',
      painterId: this.currentUser.id,
      name: formValues.paintingName,
      description: formValues.description,
      imageLink: formValues.link,
      price: formValues.price,
      creationDate: new Date()
    };

    this.paintingService.createNewPainting(painting)
      .subscribe(res => {
        console.log("Successful registration");
        this.router.navigate(['/listing'])
      },
        error => {
          console.log(error.error.errors);
        })
  }

}
