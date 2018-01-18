import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoaSharedModule } from '../../shared';
import {
    AbsencesService,
    AbsencesPopupService,
    AbsencesComponent,
    AbsencesDetailComponent,
    AbsencesDialogComponent,
    AbsencesPopupComponent,
    AbsencesDeletePopupComponent,
    AbsencesDeleteDialogComponent,
    absencesRoute,
    absencesPopupRoute,
} from './';

const ENTITY_STATES = [
    ...absencesRoute,
    ...absencesPopupRoute,
];

@NgModule({
    imports: [
        SoaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AbsencesComponent,
        AbsencesDetailComponent,
        AbsencesDialogComponent,
        AbsencesDeleteDialogComponent,
        AbsencesPopupComponent,
        AbsencesDeletePopupComponent,
    ],
    entryComponents: [
        AbsencesComponent,
        AbsencesDialogComponent,
        AbsencesPopupComponent,
        AbsencesDeleteDialogComponent,
        AbsencesDeletePopupComponent,
    ],
    providers: [
        AbsencesService,
        AbsencesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaAbsencesModule {}
