import { 
  Component, OnInit, Input, Output, OnChanges, EventEmitter, 
  trigger, state, style, animate, transition } from '@angular/core';


@Component({
  selector: 'app-grid-srch-filter',
  templateUrl: './grid-srch-filter.component.html',
  styleUrls: ['./grid-srch-filter.component.css']
  /*animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]*/
})

export class GridSrchFilterComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() { }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
