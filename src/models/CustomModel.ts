import {  CreateOptions, InferAttributes} from 'sequelize';
import { Model} from 'sequelize-typescript';
import { BadRequestError } from 'types/errors';
import {Log as log} from 'utils/utils'

export class CustomModel extends Model {
    constructor() {
        super();
    } 
    static override async create(values?: Partial<InferAttributes<CustomModel>>, options?: CreateOptions): Promise<any> {
        let r: Model<{}, {}>;
        try {
            r = await super.create(values, options);
            return r;
        } catch (e:any) {
            if (e?.original.code === 'ER_BAD_NULL_ERROR') {
                console.dir(e.original.code);
                throw new BadRequestError(e.original.sqlMessage, { code: e.original.code });
            }
        }
    }
}