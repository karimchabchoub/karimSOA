import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoaSharedModule } from '../../shared';
import {
    EtudiantService,
    EtudiantPopupService,
    EtudiantComponent,
    EtudiantDetailComponent,
    EtudiantDialogComponent,
    EtudiantPopupComponent,
    EtudiantDeletePopupComponent,
    EtudiantDeleteDialogComponent,
    etudiantRoute,
    etudiantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...etudiantRoute,
    ...etudiantPopupRoute,
];

@NgModule({
    imports: [
        SoaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EtudiantComponent,
        EtudiantDetailComponent,
        EtudiantDialogComponent,
        EtudiantDeleteDialogComponent,
        EtudiantPopupComponent,
        EtudiantDeletePopupComponent,
    ],
    entryComponents: [
        EtudiantComponent,
        EtudiantDialogComponent,
        EtudiantPopupComponent,
        EtudiantDeleteDialogComponent,
        EtudiantDeletePopupComponent,
    ],
    providers: [
        EtudiantService,
        EtudiantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaEtudiantModule {}
