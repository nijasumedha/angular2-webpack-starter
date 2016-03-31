import {Directive, Attribute, ElementRef, DynamicComponentLoader} from 'angular2/core';
import {Router, RouterOutlet, ComponentInstruction} from 'angular2/router';
import {Login} from '../login';

@Directive({
  selector: 'auth-router-outlet'
})
export class AuthRouterOutlet extends RouterOutlet {
  publicRoutes: any;
  private parentRouter: Router;

  constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader,
              _parentRouter: Router, @Attribute('name') nameAttr: string) {
    super(_elementRef, _loader, _parentRouter, nameAttr);

    this.parentRouter = _parentRouter;
    // The Boolean following each route below denotes whether the route requires authentication to view
    this.publicRoutes = {
      'login': true
    };
  }

  activate(instruction: ComponentInstruction) {
      console.log('in Authroute...' + localStorage.getItem('jwt'));
    let url = instruction.urlPath;
    //if (!this.publicRoutes[url] && !localStorage.getItem('jwt')) {
    if (!localStorage.getItem('jwt')) {    
      console.log(this.publicRoutes[url]+'  redirecting to login...')  
      // todo: redirect to Login, may be there a better way?
      this.parentRouter.navigateByUrl('/login');
    }
    return super.activate(instruction);
  }
}