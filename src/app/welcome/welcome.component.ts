



import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
 @Input() mydata:any;


image:any="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJI42EURKpMnIUrahX-tVHbgZGYaBbN1W7eQ&usqp=CAU";  
  constructor() { }

  ngOnInit(): void {
  
  }

}
