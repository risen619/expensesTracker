import { NgModule } from '@angular/core';
import { DropdownInputComponent } from './dropdown-input/dropdown-input';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [
        DropdownInputComponent
    ],
	imports: [
        IonicModule
    ],
    entryComponents: [
        DropdownInputComponent
    ],
	exports: [
        DropdownInputComponent
    ]
})
export class ComponentsModule {}
