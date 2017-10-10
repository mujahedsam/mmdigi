import { getEntityManager, Repository } from "typeorm";
import {Supplier} from "./../models/entities/suppliers";
import{BaseDAO} from "../config/baseDAO";


export class SuppliersDAO extends BaseDAO<Supplier>{
    
public rep: Repository<Supplier>;

    constructor() {
    super(Supplier);
        this.rep = getEntityManager().getRepository(Supplier);
    }

    entity1(id){
        return this.rep.findOneById(id,{
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

    findAll1(){
        return this.rep.find({},{
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
    

}

    
    
    
    
    

Object.seal(SuppliersDAO);