import {Component, OnInit} from '@angular/core';

import {AuthService} from 'src/app/services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    email: string;
    password: string;
    confirmPassword: string;
    constructor(
        private authService: AuthService,
        private flashMessage: FlashMessagesService,
        private router: Router,
    ) {}

    ngOnInit() {}

    onSubmit() {
        if (this.password === this.confirmPassword) {
            this.authService
                .register(this.email, this.password)
                .then(res => {
                    this.flashMessage.show(
                        'you are now registered and logged in',
                        {
                            cssClass: 'alert-success',
                            timeout: 4000,
                        },
                    );
                    this.router.navigate(['/']);
                })
                .catch(err => {
                    this.flashMessage.show(err.message, {
                        cssClass: 'alert-danger',
                        timeout: 4000,
                    });
                });
        } else {
            this.flashMessage.show('password field should match', {
                cssClass: 'alert-danger',
                timeout: 4000,
            });
        }
    }
}