import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Painting } from '../../shared/interfaces/paintings/painting';
import { UserInfo } from '../../shared/interfaces/user/userInfo';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { PaintingsService } from '../../shared/services/paintings.service';

@Component({
  selector: 'app-painting-detail',
  templateUrl: './painting-detail.component.html',
  styleUrls: ['./painting-detail.component.css']
})
export class PaintingDetailComponent implements OnInit {

  painting: Painting | undefined
  painter: UserInfo | undefined
  currentUser: UserInfo | undefined

  constructor(
    private route: ActivatedRoute,
    private paintingService: PaintingsService,
    private userService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const paintingId = routeParams.get('paintingId');

    this.paintingService.getPaintingById(paintingId).subscribe(res => {
      this.painting = res

      this.userService.getUserById(this.painting.painterId).subscribe(res => {
        this.painter = res
      }, err => console.error(err))

    }, err => console.error(err))

    this.userService.getCurrentUser().subscribe(res => {
      this.currentUser = res;
    }, err => console.error(err))

  }

  public isPageLoaded() {
    return this.painter && this.painting && this.currentUser;
  }

  public deleteItem() {
    this.paintingService.deletePainting(this.painting).subscribe(_ => {
      console.log("Item was deleted")
      this.router.navigate(['/listing'])
    }, err => console.error(err))
  }

}
