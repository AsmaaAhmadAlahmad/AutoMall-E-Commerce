import {  EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Component} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {JsonPipe} from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [  MatPaginatorModule ,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnInit {


      @Input() TotalItemCount=0;
      @Input() PageSize=0;
      @Output() pageChanged: EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}


    newPage(event:any){
      this.pageChanged.emit(event)
      console.log(event)
    }

   }

