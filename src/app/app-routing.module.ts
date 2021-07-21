






import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { SearchComponent } from './search/search.component';
import { NotificationComponent } from './notification/notification.component';
import { ShowoffComponent } from './showoff/showoff.component';
import { FollowerComponent } from './profile/follower/follower.component';
import { FollowingComponent } from './profile/following/following.component';
import { SettingComponent } from './setting/setting.component';

import { AuthGuard } from './auth-guard.service';

const routes: Routes = [{
  path:'',
  component:LoginComponent,
  canActivate:[AuthGuard]
  },
  {
    path:'signup',
    component:SignupComponent,
    canActivate:[AuthGuard]
  },
  {
  path:'post',
  component:PostComponent,
  data:{animation:'Home'},
  canActivate:[AuthGuard]
},
{
  path:'comment/:id',
  component:CommentComponent,
  canActivate:[AuthGuard]
},
{
  path:'profile/:id',
  component:ProfileComponent,
  canActivate:[AuthGuard]
},
{
  path:'upload',
  component:UploadComponent,
  canActivate:[AuthGuard]
},
{
  path:'search',
  component:SearchComponent,
  canActivate:[AuthGuard]
},
{
  path:'notification',
  component:NotificationComponent,
  canActivate:[AuthGuard]
},
{
  path:'showoff/:post_id',
  component:ShowoffComponent,
  canActivate:[AuthGuard],
  data:{animation:'Home'}
},
{
  path:'follower/:id',
  component:FollowerComponent,
  canActivate:[AuthGuard],
  data:{animation:'Home'}
},
{
  path:'following/:id',
  component:FollowingComponent,
  canActivate:[AuthGuard],
  data:{animation:'Home'}
},
{
  path:'settings',
  component:SettingComponent,
  canActivate:[AuthGuard],
  data:{animation:'Home'}
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
