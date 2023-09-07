import { InjectionToken, NgModule } from '@angular/core';
import { ActivatedRouteSnapshot, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DocumentXmlComponent } from './pages/document-xml/document-xml.component';
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
            path: 'xml/:id/:nombre/:puerto',
            component: DocumentXmlComponent
          },
        ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
 providers: [
    {
        provide: externalUrlProvider,
        useValue: (route: ActivatedRouteSnapshot) => {
            const externalUrl:any = route.paramMap.get('externalUrl');
            window.open(externalUrl, '_self');
        },
    },
]
})
export class AppRoutingModule { }
