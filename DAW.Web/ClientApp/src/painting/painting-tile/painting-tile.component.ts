import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Painting } from '../../shared/interfaces/paintings/painting';

@Component({
  selector: 'app-painting-tile',
  templateUrl: './painting-tile.component.html',
  styleUrls: ['./painting-tile.component.css']
})
export class PaintingTileComponent implements OnInit {

  @Input() painting: Painting;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToDetailsPage(painting: Painting) {
    this.router.navigate(['/painting-detail/' + painting.id])
  }

}
