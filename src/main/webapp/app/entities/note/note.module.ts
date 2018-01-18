import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SoaSharedModule } from '../../shared';
import {
    NoteService,
    NotePopupService,
    NoteComponent,
    NoteDetailComponent,
    NoteDialogComponent,
    NotePopupComponent,
    NoteDeletePopupComponent,
    NoteDeleteDialogComponent,
    noteRoute,
    notePopupRoute,
} from './';

const ENTITY_STATES = [
    ...noteRoute,
    ...notePopupRoute,
];

@NgModule({
    imports: [
        SoaSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NoteComponent,
        NoteDetailComponent,
        NoteDialogComponent,
        NoteDeleteDialogComponent,
        NotePopupComponent,
        NoteDeletePopupComponent,
    ],
    entryComponents: [
        NoteComponent,
        NoteDialogComponent,
        NotePopupComponent,
        NoteDeleteDialogComponent,
        NoteDeletePopupComponent,
    ],
    providers: [
        NoteService,
        NotePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SoaNoteModule {}
