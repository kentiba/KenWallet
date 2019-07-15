import {Component, OnInit} from '@angular/core';
import {ClientService} from 'src/app/services/client.service';
import {Client} from 'src/app/models/Client';
import {Router, ActivatedRoute} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-client-details',
    templateUrl: './client-details.component.html',
    styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {
    id: string;
    client: Client;
    hasBalance = false;
    showBalanceUpdateInput = false;
    constructor(
        private clientService: ClientService,
        private router: Router,
        private route: ActivatedRoute,
        private flashMessage: FlashMessagesService,
    ) {}

    ngOnInit() {
        // get id from url
        this.id = this.route.snapshot.params.id;

        // get client
        this.clientService.getClient(this.id).subscribe(client => {
            if (client !== null) {
                if (client.balance > 0) {
                    this.hasBalance = true;
                }
            }
            this.client = client;
        });
    }

    updateBalance() {
        this.clientService.updateClient(this.client);
        this.flashMessage.show('Balance update', {
            cssClass: 'alert-success',
            timeout: 4000,
        });
    }

    onDelete(id: string) {
        if (confirm('are you sure ?')) {
            this.clientService.deleteClient(id);
            this.flashMessage.show('Client removed', {
                cssClass: 'alert-success',
                timeout: 4000,
            });
            this.router.navigate(['/']);
        }
    }
}
