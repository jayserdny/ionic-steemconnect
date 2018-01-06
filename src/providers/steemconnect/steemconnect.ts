import * as steemconnect from 'sc2-sdk';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class SteemconnectProvider {

  public loginUrl: string;
  public steemit;
  private access_token: string;

  constructor(public storage: Storage) {

    // Initialize a instance of steemconnect in the whole provider to avoid
    // rewriting the instance each time we need to call the api.
    this.initializeSteem();
    
  }

  private initializeSteem() {

    // Check if the token is saved in local storage
    this.storage.get('access_token').then((token) => {
      
      if (token !== undefined && token !== null) {
        this.access_token = token;
      }
     
    }).then(() => {
      // Initialize an instance of steemconnect
      this.steemit = steemconnect.Initialize({
        app: 'name of the app', // replace this with the name of your app
        // THIS SHOULD BE CHANGED IN PRODUCTION MODE
        callbackURL: 'http://localhost:8100', // Url just for testing
        scope: ['login', 'vote', 'comment', 'comment_delete', 
                'comment_options', 'custom_json'],
        accessToken: this.access_token
      });

      // save a reference to the login url for later used.
      // This variable is public to scope in any component.
      this.loginUrl = this.steemit.getLoginURL();
    })
    
  }

  public setToken(token: string): void {
    this.steemit.setAccessToken(token);
    this.storage.set('access_token', token);
  }

}
