import { Supplier } from '../models/entities/suppliers';
import { getEntityManager, Repository } from "typeorm";
import {DailyOrderSheet} from "./../models/entities/dailyOrderSheets";
import {ProductSku} from './../models/entities/productSku';

export class DailyOrderSheetsDAO {

    public dao: Repository<DailyOrderSheet>;
    public dao1: Repository<ProductSku>;
    public dao2: Repository<Supplier>;
   // public data: Repository<DailyOrderSheet>;

    constructor() {
        this.dao = getEntityManager().getRepository(DailyOrderSheet);
        this.dao1 = getEntityManager().getRepository(ProductSku);
        this.dao2 = getEntityManager().getRepository(Supplier);
    }

    search(data: any) {
        return this.dao.find(data)
    }

    search1(data: any) {
        return this.dao1.find(data)
    }

    search2(id: number) {
        return this.dao.findOneById(id)
    }
     search3(data:any){
         return this.dao.createQueryBuilder("dailyordersheets")
                           .where("dailyordersheets.suppliers =:id",{id:data})
                              .getMany();
    }

    save(data: DailyOrderSheet) {
        return this.dao.persist(data);
    }

    findAll(){
        return this.dao2.find({},{
            alias:"suppliers",
            leftJoinAndSelect:{
                "dailyordersheets":"suppliers.dailyordersheets",
                "manufacturers" : "dailyordersheets.manufacturers",
                "product_skus" : "dailyordersheets.product_skus"

                // "sub_communities" : "dwellings.subCommunity",
                // "community" : "sub_communities.community"
            }
        });
    }

    case1(id){
        return this.dao2.findOneById(id,{
            alias:"suppliers",
            leftJoinAndSelect:{
                "dailyordersheets":"suppliers.dailyordersheets",
                "manufacturers" : "dailyordersheets.manufacturers",
                "product_skus" : "dailyordersheets.product_skus"

                // "sub_communities" : "dwellings.subCommunity",
                // "community" : "sub_communities.community"
            }
        })
    }
    //test method
    test1(sup_id,date){
        return this.dao.createQueryBuilder("dailyordersheets")

           .where("dailyordersheets.supplier =:id",{id:sup_id})
           .andWhere("dailyordersheets.order_date =:date",{date:date})
           .innerJoinAndSelect("dailyordersheets.suppliers", "suppliers")
           .innerJoinAndSelect("dailyordersheets.manufacturers", "manufacturers")
           .getMany();
            
    }


    entity(id: string) {
        return this.dao.findOneById(id)
    }

    delete(data: DailyOrderSheet) {
        return this.dao.remove([data]);
    }

    findOne(data: any) {
        return this.dao2.findOne(data,{
                alias:"suppliers",
                leftJoinAndSelect:{
                    "dailyordersheets":"suppliers.dailyordersheets",
                    "manufacturers" : "dailyordersheets.manufacturers",
                    "product_skus" : "dailyordersheets.product_skus"
    
                    // "sub_communities" : "dwellings.subCommunity",
                    // "community" : "sub_communities.community"
                }
        })
    }

}

Object.seal(DailyOrderSheet)