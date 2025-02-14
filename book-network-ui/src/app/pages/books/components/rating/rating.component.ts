import {Component, Input} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'rating',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './rating.component.html'
})
export class RatingComponent {
  @Input() maxRating: number = 5;
  @Input() rating: number  = 0.0;
  @Input() classes?: string = "";

  get fullStars(): number{
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean{
    return this.rating%1 !== 0;
  }

  get emptyStars(): number{
    return Math.floor(this.maxRating-this.rating);
  }

}
