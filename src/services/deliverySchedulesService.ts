import { App } from "./../utils/App";
import { DeliverySchedule } from "./../models/entities/deliverySchedules";
import { DeliverySchedulesDAO } from "./../daos/deliverySchedulesDAO";
import { RegularConsumptionsDAO } from "./../daos/regularConsumptionsDAO";
import { DailyOrderSheetsDAO } from "./../daos/dailyOrderSheetsDAO";

export class DeliverySchedulesService {
    private delivery_SchedulesDao: DeliverySchedulesDAO;
      private daily_OrderSheetsDao: DailyOrderSheetsDAO;
         private regular_ConsumptionsDao: RegularConsumptionsDAO;


    constructor() {
        this.delivery_SchedulesDao = new DeliverySchedulesDAO();
          this.regular_ConsumptionsDao = new RegularConsumptionsDAO();
           this.daily_OrderSheetsDao = new DailyOrderSheetsDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.delivery_SchedulesDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(reqData: any) {
        try {
            let data: any = await this.delivery_SchedulesDao.search(reqData);
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }



    async save(item:DeliverySchedule){
        console.log(item);
        let regconsumpdata = await this.regular_ConsumptionsDao.search4(item.suppliers.id);
        let dailyordersheetdata= await this.daily_OrderSheetsDao.search3(item.suppliers.id);
        console.log(regconsumpdata);
    }

    // async save(item: DeliverySchedule) {
    //     try {
    //         if (this.validate(item)) {
    //             let itemid = item.product_skus;
    //             console.log("itemid is",itemid);
    //             let res = await this.delivery_SchedulesDao.search1(item.product_skus);
    //             console.log(res);
    //             if(res.length>0){
    //             let item2={
    //                 id:item.id,
    //                 communities:item.communities,
    //                 delivery_date:item.delivery_date,
    //                 quantity:item.quantity,
    //                 sub_communities:item.sub_communities,
    //                 suppliers:item.suppliers,
    //                 user_billing:item.user_billing,
    //                 user_dwellings:item.user_dwellings,
    //                 product_skus:res
    //             }
    //             let delivery_SchedulesData: any = await this.delivery_SchedulesDao.save(item2);
    //             let returnData = {
    //                 id: item.id,
    //                 message: "Saved Successfully"
    //             }
            
    //             return Promise.resolve(returnData);
    //         }else {
    //             let returnData = {
    //                 message: "Please enter proper values."
    //             }
    //             return Promise.reject(returnData);
    //         } 
    //         }

    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async delete(id: any) {
        try {
            let data: DeliverySchedule = (await this.delivery_SchedulesDao.entity(id))
            let result: any = await this.delivery_SchedulesDao.delete(data);
            let returnData = {
                id: id,
                message: "Removed Successfully"
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async findSome(item:DeliverySchedule){
        try{
            let suppliers=item.suppliers.id;
            let community = item.communities.id;
            let date = item.delivery_date;
    
            console.log("Suppliers is :",suppliers);
            console.log("Community is :",community);
            console.log("Delivery date is :",date);
    
            let supdata = await this.delivery_SchedulesDao.search({suppliers: item.suppliers.id});
            let commdata = await this.delivery_SchedulesDao.search({communities: item.communities.id});
            let datedata = await this.delivery_SchedulesDao.search({delivery_date: item.delivery_date});
    
            console.log("Suppliers data is :",supdata);
            console.log("Community data is :",commdata);
            console.log("Delivery date data is :",datedata);

            if(supdata.length>0 && commdata.length>0 && datedata.length>0){
                let findonedeliveryschedule = await this.delivery_SchedulesDao.test1({suppliers:item.suppliers.id,communities:item.communities.id,delivery_date:item.delivery_date});
                console.log(findonedeliveryschedule)
                return Promise.resolve(findonedeliveryschedule)
            }
            else{
                let nothing = await this.delivery_SchedulesDao.findAll1();
                console.log(nothing);
                return Promise.resolve(nothing);
            }
        }catch (error) {
            return Promise.reject(error);
        
    }
}
    async validate(item: DeliverySchedule) {
        return true;
    }
}