import {trigger, style, animate, transition, state, query, stagger} from "@angular/animations";

export const showUp = trigger('showUpElement', [

  //state significa el estado sobre el cual efecturara los estilos // in => ya se cargo al dom
  state('in', style({opacity: 1, transform: 'scaleY(1)'})),
  transition(':enter', [   //:enter  esta entrando al dom
    style({opacity: 0, transform: 'scaleY(0)'}),
    animate(250)
  ])
]);


//Animacion escalonada
export const showUpStaggered = trigger('showUpCollection', [
  transition('* => *', [
    query(':enter',[
      style({opacity: 0, transform: 'scaleY(0)'}),
      stagger(200, [
        animate(250, style({opacity: 1, transform: 'scaleY(1)'}))
      ])
    ], {optional: true})
  ])
]);
