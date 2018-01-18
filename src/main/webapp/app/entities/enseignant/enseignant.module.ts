import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoaSharedModule } from '../../shared';
import {
    EnseignantService,
    EnseignantPopupService,
    EnseignantComponent,
    EnseignantDetailComponent,
    EnseignantDialogComponent,
    EnseignantPopupComponent,
    EnseignantDeletePopupComponent,
    EnseignantDeleteDialogComponent,
    enseignantRoute,
    enseignantPopupRoute,
} from './';

const ENTITY_STATES = [
    ...enseignantRoute,
    ...enseignantPopupRoute,
];

@NgModule({
    imports: [
        SoaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        EnseignantComponent,
        EnseignantDetailComponent,
        EnseignantDialogComponent,
        EnseignantDeleteDialogComponent,
        EnseignantPopupComponent,
        EnseignantDeletePopupComponent,
    ],
    entryComponents: [
        EnseignantComponent,
        EnseignantDialogComponent,
        EnseignantPopupComponent,
        EnseignantDeleteDialogComponent,
        EnseignantDeletePopupComponent,
    ],
    providers: [
        EnseignantService,
        EnseignantPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaEnseignantModule {}
