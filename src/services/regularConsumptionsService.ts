import { log } from 'util';
import * as console from 'console';
import { App } from "./../utils/App";
import { RegularConsumption } from "./../models/entities/regularConsumptions";
import { RegularConsumptionsDAO } from "./../daos/regularConsumptionsDAO";
import {ProductSku} from './../models/entities/productSku';
import {ProductSkuesDAO} from './../daos/productSkuesDAO';
 

export class RegularConsumptionsService {
    private regular_ConsumptionsDao: RegularConsumptionsDAO;
    //pri regular_ConsumptionsService = new RegularConsumptionsService();

    constructor() {
        this.regular_ConsumptionsDao = new RegularConsumptionsDAO();

    }

    async entity(id: any) {
        try {
            let data: any = await this.regular_ConsumptionsDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            let data: any = await this.regular_ConsumptionsDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search1(item: ProductSku) {
        try {
            let name = item.name;
            let data: any = await this.regular_ConsumptionsDao.search1(name);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }
  //mujahed api
    async search2(id:any){
        try {
            let data: any = await this.regular_ConsumptionsDao.search2(id);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }
    //test query builder for GroupBy
      async searchx(id:any){
        try {
            let newdata=[]
            let data: any = await this.regular_ConsumptionsDao.searchx(id);
            newdata.push(data);
            return Promise.resolve(newdata)
        } catch (error) {
            return Promise.reject(error);
        }
    }



     //to findoneandall methd
     async findOneAndAll(item:RegularConsumption) {
            try {
                
                let id = item.supplier_id;
                console.log("sup id is: ",id);
                let data = await this.regular_ConsumptionsDao.search3({id});
                console.log(data);

                if(id != null){
                    console.log("I am just a tester");
                    let findoneregcon = await this.regular_ConsumptionsDao.check2({supplier_id:item.supplier_id,user_dwelling_id:item.user_dwelling_id});
                    console.log(findoneregcon)
                    return Promise.resolve(findoneregcon)                
                    }else if(id == null) {                    
                        //return Promise.reject({ message: "user Already Exits" });
                        let findallregcon= await this.regular_ConsumptionsDao.findAll1();
                        return Promise.resolve(findallregcon);
                }
            }
             catch (error) {
                return Promise.reject(error);
            }
        }
    async save(item: RegularConsumption) {
        try {
            if (this.validate(item)) {
               // console.log(item);
                let temp:any = JSON.parse(JSON.stringify(item));
                let {id:id, user_dwelling_id:{id:udi}, supplier_id:{id:si}, quantity:q} = temp;
               let [pid] = temp.product_skus;
                let obj : any = {id:id,user_dwelling_id:{id:udi}, supplier_id:{id:si}, quantity:q, product_skus:{id:pid.id} };
                
                
                // let pro = item.product_skus;
                //  let pro1 = new ProductSku();
                //  pro1.id = item.product_skus;
                // console.log(item.product_skus);
                 
                // console.log(pro1.id);
                let result = await this.regular_ConsumptionsDao.search1(obj.product_skus);

               console.log(result);
                if(result.length>0){
                    let item1 = {
                        id:obj.id,
                        user_dwelling_id:obj.user_dwelling_id,
                        supplier_id:obj.supplier_id,
                        quantity:obj.quantity,
                        product_skus:result
                    }
                    let regular_ConsumptionsData: any = await this.regular_ConsumptionsDao.save(item1);
                    let returnData = {
                        id: item.id,
                        message: "Saved Successfully"
                    }
                    return Promise.resolve(returnData);
                }
                // pro1.name = "High fat Milk";
                // pro1.active = true;
                // pro1.price = 25;
                
            } else {
                let returnData = {
                    message: "Please enter proper values."
                }
                return Promise.reject(returnData);
            }
            
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async delete(id: any) {
        try {
            let data: RegularConsumption = (await this.regular_ConsumptionsDao.entity(id))
            let result: any = await this.regular_ConsumptionsDao.delete(data);
            let returnData = {
                id: id,
                message: "Removed Successfully"
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: RegularConsumption) {
        return true;
    }
}