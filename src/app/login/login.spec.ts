import {
  it,
  inject,
  injectAsync,
  describe,
  beforeEachProviders,
  TestComponentBuilder
} from 'angular2/testing';

import { Component, provide } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers, BaseRequestOptions } from 'angular2/http';
import { contentHeaders } from '../common/headers';
import {MockBackend} from 'angular2/http/testing';
import {RouteConfig, RouterOutlet} from 'angular2/router';
import {MockApplicationRef} from 'angular2/src/mock/mock_application_ref';

// Load the implementations that should be tested
import {Login} from './login.component';


describe('Login', () => {
    
  // provide our implementations or mocks to the dependency injector
  
  beforeEachProviders(() => [
    provide(Router, {useClass: MockApplicationRef})
  ]);





  beforeEachProviders(() => [
    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: function(backend, defaultOptions) {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    Login
  ]);

  it('should have default data', inject([ Login ], (login) => {
    expect(login.localState).toEqual({ value: '' });
  }));

  it('should have a title', inject([ Login ], (login) => {
    expect(!!login.title).toEqual(true);
  }));


});
