




import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';

 const material=[
       MatButtonModule,
       MatTabsModule,
       MatProgressBarModule,
       MatSelectModule,
       MatCardModule,
       MatDividerModule,
       MatMenuModule,
       MatRippleModule,
       MatDialogModule
     ]


@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
