import { getEntityManager, Repository } from "typeorm";
import {DeliverySchedule} from "./../models/entities/deliverySchedules";
import {ProductSku} from './../models/entities/productSku';
import {UserDwelling} from './../models/entities/userDwellings';

export class DeliverySchedulesDAO {

    public dao: Repository<DeliverySchedule>;
    public dao1: Repository<ProductSku>;
     public dao2: Repository<UserDwelling>;

    constructor() {
        this.dao = getEntityManager().getRepository(DeliverySchedule);
        this.dao1 = getEntityManager().getRepository(ProductSku);
         this.dao2 = getEntityManager().getRepository(UserDwelling);
    }

    search(data: any) {
        return this.dao.find(data)
    }

    search1(data: any) {
        console.log("I am from this find functionality")
        return this.dao1.find(data)
    }
    
    save(data: DeliverySchedule) {
        return this.dao.persist(data);
    }
    search2(id:any){
        console.log(id);
        console.log("its id from DAo")
        return this.dao.find({suppliers:id.suppliers.id,communities:id.communities.id,delivery_date:id.delivery_date},{
            alias : "delivery_schedules",
            leftJoinAndSelect:{
                "sub_communities":"delivery_schedules.sub_communities",
                "user_dwellings" : "delivery_schedules.user_dwellings",
                "product_skus":"delivery_schedules.product_skus",
                "user_billing":"delivery_schedules.user_billing",
                "suppliers":"delivery_schedules.suppliers",
                "communities":"delivery_schedules.communities"

            }
        });
    }

    search3(data:any){
         return this.dao.createQueryBuilder("delivery_schedules")
                           .where("delivery_schedules.suppliers =:id",{id:data})
                              .getMany();
    }

    test1(id:any){
         return this.dao.createQueryBuilder("delivery_schedules")
                        .where("delivery_schedules.suppliers =:id",{id:id.suppliers})
                        .andWhere("delivery_schedules.communities =:id2",{id2:id.communities})
                        .andWhere("delivery_schedules.delivery_date =:id3",{id3:id.delivery_date})
                        .innerJoinAndSelect("delivery_schedules.suppliers", "suppliers")
                          .innerJoinAndSelect("delivery_schedules.communities", "communities")
                            .innerJoinAndSelect("delivery_schedules.sub_communities", "sub_communities")
                             .innerJoinAndSelect("delivery_schedules.user_dwellings", "user_dwellings")
                              .innerJoinAndSelect("delivery_schedules.user_billing", "user_billing")
                        .getMany();
    }

    findAll1(){
        return [];
    }

    entity(id: string) {
        return this.dao.findOneById(id)
    }

    delete(data: DeliverySchedule) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao.findOne(data)
    }

}

Object.seal(DeliverySchedulesDAO);