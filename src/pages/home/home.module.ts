import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../components/components.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
        HomePage
    ],
	imports: [
        IonicModule,
        ReactiveFormsModule,
        ComponentsModule
    ],
    entryComponents: [
        HomePage
    ],
	exports: [
        HomePage
    ]
})
export class HomePageModule {}
