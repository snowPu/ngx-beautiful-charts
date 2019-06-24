import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class GlobalParametersService {
    componentCounter = 0;

    constructor() {
        this.componentCounter = 0;
    }

    addNewComponent(): number {
        return ++this.componentCounter;
    }

    getCurrentComponentCounter(): number {
        return this.componentCounter;
    }
}
