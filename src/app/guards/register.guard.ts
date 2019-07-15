import {Injectable} from '@angular/core';
import {SettingsService} from '../services/settings.service';
import {Router, CanActivate} from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RegisterGuard implements CanActivate {
    constructor(
        private settingsService: SettingsService,
        private router: Router,
    ) {}
    canActivate(): boolean {
        if (this.settingsService.getSettings().allowRegistration) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
