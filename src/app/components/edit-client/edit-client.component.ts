import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/services/client.service';
import {Client} from 'src/app/models/Client';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {SettingsService} from 'src/app/services/settings.service';
@Component({
    selector: 'app-edit-client',
    templateUrl: './edit-client.component.html',
    styleUrls: ['./edit-client.component.css'],
})
export class EditClientComponent implements OnInit {
    id: string;
    client: Client = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        balance: 0,
    };

    disableBalanceOnEdit: boolean;

    constructor(
        private clientService: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
        private settingsService: SettingsService,
    ) {}

    ngOnInit() {
        // get id from url
        this.id = this.route.snapshot.params.id;

        // get client
        this.clientService.getClient(this.id).subscribe(client => {
            this.client = client;
        });

        // set disableBalanceOnEdit

        this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    }

    onSubmit({value, valid}: {value: Client; valid: boolean}) {
        if (!valid) {
            // show error message
            this.flashMessage.show('Please fill out the form correctly', {
                cssClass: 'alert-danger',
                timeout: 4000,
            });
        } else {
            // add id to the value
            value.id = this.id;
            // update client
            this.clientService.updateClient(value);
            // show message
            this.flashMessage.show('Client update', {
                cssClass: 'alert-success',
                timeout: 4000,
            });
            // redirect to dashboard
            this.router.navigate([`/client/${this.id}`]);
        }
    }
}
