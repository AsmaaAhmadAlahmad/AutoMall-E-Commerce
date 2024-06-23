import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";









@Component({
  selector:'amzn-star',
  templateUrl:'./star.component.html',
  styleUrls:['./star.component.css'],
  standalone:true

})



export class StarComponent implements OnChanges, OnInit
{
  ngOnInit(): void {
    // this.cropWidth = this.rating * 75 / 5;

  }

  @Input() rating: number = 0;

  @Output() ratingClicked : EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges): void {
       console.log("input changes",changes);
       this.cropWidth = this.rating * 75 / 5;
}

cropWidth: number = 75;

onClick()
{
this.ratingClicked.emit("the rating of current product is : " + this.rating);
}
}
