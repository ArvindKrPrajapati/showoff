import {
   transition,
   trigger,
   query,
   style,
   animate,
   group,
   animateChild
} from '@angular/animations';
export const slideInAnimation =
   trigger('routeAnimations', [
        transition('* <=> *', [
             query(':enter, :leave', 
                  style({ position: 'absolute',  width: '100%' ,height: '100%' }), 
                  { optional: true }),
             group([
                  query(':enter', [
                      style({ transform: 'translateX(100%)' }), 
                      animate('0.3s ease-in-out', 
                      style({ transform: 'translateX(0%)' }))
                  ], { optional: true }),
                  query(':leave', [
                      style({ transform: 'translateX(0%)' }),
                      animate('0.3s ease-in-out', 
                      style({ transform: 'translateX(-100%)' }))
                      ], { optional: true }),
              ])
        ]),
]);