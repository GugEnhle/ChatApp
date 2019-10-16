import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'profile', loadChildren: './page/profile/profile.module#ProfilePageModule' },
  { path: 'chat', loadChildren: './page/chat/chat.module#ChatPageModule' },
  { path: 'register', loadChildren: './page/register/register.module#RegisterPageModule' },
  { path: 'tabs', loadChildren: './page/tabs/tabs.module#TabsPageModule' },
  { path: 'user', loadChildren: './page/user/user.module#UserPageModule' },
  { path: 'update', loadChildren: './page/update/update.module#UpdatePageModule' },
  { path: 'one', loadChildren: './page/one/one.module#OnePageModule' },
  { path: 'group', loadChildren: './page/group/group.module#GroupPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
