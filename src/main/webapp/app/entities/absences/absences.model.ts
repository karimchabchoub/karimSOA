import { BaseEntity } from './../../shared';

export class Absences implements BaseEntity {
    constructor(
        public id?: number,
        public nbAbsences?: number,
        public possede?: BaseEntity,
        public associer?: BaseEntity,
    ) {
    }
}
