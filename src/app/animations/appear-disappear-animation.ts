import {animate, style, transition, trigger} from "@angular/animations";

export const appearDisappearAnimation = [
  trigger('appearDisappearTrigger', [
    transition(':enter', [
      style({opacity: 0}),
      animate('3s', style({opacity: 1})),
    ]),
    transition(':leave', [
      animate('3s', style({opacity: 0}))
    ])
  ]),
]
