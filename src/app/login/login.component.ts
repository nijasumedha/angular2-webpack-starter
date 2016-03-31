import { Component } from 'angular2/core';
import { Router, RouterLink } from 'angular2/router';
import { CORE_DIRECTIVES, FORM_DIRECTIVES } from 'angular2/common';
import { Http, Headers } from 'angular2/http';
import { contentHeaders } from '../common/headers';

let styles   = require('./login.css');
let template = require('./login.html');

@Component({
  selector: 'login',
  directives: [RouterLink, CORE_DIRECTIVES, FORM_DIRECTIVES ],
  template: template,
  styles: [ styles ]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    
    var method = 'POST';
    var headers = {"content-type":"text/xml; charset=utf-8"};
    var url = 'http://mock-mobiliser.boldrocket.io/ip/service/rbc/MobileSignIn';
    var body = '<ns2:RBCAuthenticateRequest xmlns:ns2="http://mobile.rbc.com/rbcc/signin/" version="1.0" origin="RBCC_ANDROID"> <mobileDeviceIdentifiers> <uniqueDeviceID>b0c019d3f8fdc53c</uniqueDeviceID> <devicePlatform>Android</devicePlatform> <deviceModel>Android SDK built for x86</deviceModel> <deviceOSVersion>6.0</deviceOSVersion> </mobileDeviceIdentifiers> <identifier type="clientId"><![CDATA['+username+']]></identifier> <password><![CDATA['+password+']]></password> <remember>false</remember> </ns2:RBCAuthenticateRequest>';

    this.http.post(url, body, { headers: contentHeaders })
      .subscribe(
        response => {
          console.log (response);
          this.router.parent.navigateByUrl('/home');
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

/*
  rememberMe(event) {
    event.preventDefault();
    this.router.parent.navigateByUrl('/signup');
  }
  */
}