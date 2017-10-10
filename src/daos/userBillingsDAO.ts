import { UserDwelling } from '../models/entities/userDwellings';
import { getEntityManager, Repository } from "typeorm";
import {UserBilling} from "./../models/entities/userBillings";


export class UserBillingsDAO {

    public dao: Repository<UserBilling>;
    public dao2: Repository<UserDwelling>

    constructor() {
        this.dao = getEntityManager().getRepository(UserBilling);
        this.dao2 = getEntityManager().getRepository(UserDwelling);
    }

    search(data: any) {
        return this.dao.find(data)
    }

    save(data: UserBilling) {
        return this.dao.persist(data);
    }
    case1(id){
        return this.dao2.findOneById(id,{
            alias : "userdwelling",
            leftJoinAndSelect:{
                "user_billings":"userdwelling.user_billings",
                "suppliers":"user_billings.suppliers",
                "product_skus":"user_billings.product_skus",

            }
        })
    }

    findAll(){
        return this.dao2.find({},{
            alias : "userdwelling",
            leftJoinAndSelect:{
                "user_billings":"userdwelling.user_billings",
                "suppliers":"user_billings.suppliers",
                "product_skus":"user_billings.product_skus",

            }
        });
    }

    search2(id: number) {
        return this.dao2.findOneById(id)
    }

    entity(id: string) {
        return this.dao.findOneById(id)
    }

    delete(data: UserBilling) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data)
    }

}

Object.seal(UserBillingsDAO);