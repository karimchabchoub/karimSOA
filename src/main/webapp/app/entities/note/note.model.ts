import { BaseEntity } from './../../shared';

export class Note implements BaseEntity {
    constructor(
        public id?: number,
        public note?: number,
        public etudiant?: BaseEntity,
        public matiere?: BaseEntity,
    ) {
    }
}
