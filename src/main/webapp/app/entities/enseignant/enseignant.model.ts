import { BaseEntity } from './../../shared';

export class Enseignant implements BaseEntity {
    constructor(
        public id?: number,
        public cin?: number,
        public name?: string,
        public lastname?: string,
        public email?: string,
        public dn?: any,
        public sexe?: string,
        public enseigners?: BaseEntity[],
    ) {
    }
}
