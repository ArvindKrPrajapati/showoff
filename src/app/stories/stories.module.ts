import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatButtonModule} from '@angular/material/button';
import { StoriesService } from './stories.service';
import { HttpClientModule } from '@angular/common/http';

import { StoriesRoutingModule } from './stories-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';


@NgModule({
  declarations: [
    AddComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    StoriesRoutingModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers:[StoriesService]
})
export class StoriesModule { }
