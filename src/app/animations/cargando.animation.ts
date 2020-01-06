import {trigger, style, animate, query, stagger, transition} from "@angular/animations";

export const loadingAnimation = function () {

  return trigger('cargandoAnimation',
    //Transisiones de la animacion
    //'* => *'  de lo que sea a lo qie sea
    [
      transition('* => *', [

        query(':leave',  //tipo salida
          [
            stagger(100, [   //retrazo de 100 milisegundos
              animate('350ms', style({opacity: 0}))  // animacion que dura 350 milisegundos y lo lleva a opacidad 0
            ])
          ],
          {optional: true}),

        query(':enter',  //tipo entrada
          [
            style({opacity: 0}),  //empieza la opacidad en 0
            stagger(100, [   //retrazo de 100 milisegundos
              animate('350ms', style({opacity: 1}))  // animacion que dura 350 milisegundos y lo lleva a opacidad 1
            ])
          ],
          {optional: true})
      ])
    ]);
  }
