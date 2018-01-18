import { BaseEntity } from './../../shared';

export class Matiere implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public coeff?: number,
        public enseignant?: BaseEntity,
        public section?: BaseEntity,
        public associers?: BaseEntity[],
    ) {
    }
}
