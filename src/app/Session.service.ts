import { registerLocaleData } from '@angular/common';
import { Injectable } from '@angular/core';
import localeTr from '@angular/common/locales/tr';
import localeEn from '@angular/common/locales/en';

@Injectable({ providedIn: 'root' })
export class SessionService {

    private _locale: string;

    set locale(value: string) {
        this._locale = value;
    }
    get locale(): string {
        return this._locale || 'tr-TR';
    }

   async registerCulture(culture: string) {
        if (!culture) {
            return;
        }
        this.locale = culture + '-' + culture.toUpperCase();


        // Register locale data since only the en-US locale data comes with Angular
        switch (culture) {
            case 'en': {
                registerLocaleData(localeEn);
                break;
            }
            case 'tr': {
                registerLocaleData(localeTr);
                break;
            }
        }
    }
}


