import {Component, OnInit} from '@angular/core';
import {SettingsService} from 'src/app/services/settings.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Settings} from '../../models/Settings';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
    settings: Settings;
    constructor(
        private settingsService: SettingsService,
        private flashMessage: FlashMessagesService,
    ) {}

    ngOnInit() {
        this.settings = this.settingsService.getSettings();
    }

    onSubmit() {
        this.settingsService.changeSettings(this.settings);
        this.flashMessage.show('Settings saved', {
            cssClass: 'alert-success',
            timeout: 4000,
        });
    }
}
