import { SuppliersDAO } from '../daos/suppliersDAO';
import { Supplier } from '../models/entities/suppliers';
import * as console from 'console';
import { log } from 'util';
import { App } from "./../utils/App";
import { DailyOrderSheet } from "./../models/entities/dailyOrderSheets";
import { DailyOrderSheetsDAO } from "./../daos/dailyOrderSheetsDAO";
import {ProductSku} from './../models/entities/productSku';
import {ProductSkuesDAO} from './../daos/productSkuesDAO';

export class DailyOrderSheetsService {
    private dailyOrderSheetsDao: DailyOrderSheetsDAO;
    private productskuesDao : ProductSkuesDAO;
    private suppliersDAO: SuppliersDAO;

    constructor() {
        this.dailyOrderSheetsDao = new DailyOrderSheetsDAO();
        this.productskuesDao = new ProductSkuesDAO();
    }

    async entity(id: string) {
        try {
            let data: any = await this.dailyOrderSheetsDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async search(id: any) {
        try {
            let data: any = await this.dailyOrderSheetsDao.findAll();
            return Promise.resolve(data)
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async save(item: DailyOrderSheet) {
        try {
            if (this.validate(item)) {
              
                 console.log(item.product_skus);
                 
               
                let result = await this.dailyOrderSheetsDao.search1(item.product_skus);

                console.log(result);
                if(result.length>0){
                    let item1 = {
                        id:item.id,
                        manufacturers:item.manufacturers,
                        order_date:item.order_date,
                        quantity:item.quantity,
                        suppliers:item.suppliers,
                        product_skus:result
                    }
                
                    let dailyordersheets_Data: any = await this.dailyOrderSheetsDao.save(item1);
                    let returnData = {
                        id: item.id,
                        message: "Saved Successfully"
                    }
                    return Promise.resolve(returnData);
                }
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
            let data: DailyOrderSheet = (await this.dailyOrderSheetsDao.entity(id))
            let result: any = await this.dailyOrderSheetsDao.delete(data);
            let returnData = {
                id: id,
                message: "Removed Successfully"
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: DailyOrderSheet) {
        return true;
    }
    async findAll(item:DailyOrderSheet){
        try{
            let suppliers = item.suppliers.id;
            let date = item.order_date;
            console.log("Suppliers id is: ",suppliers);
            console.log("Orderdate is :",date);

            let dataofsuppliers = await this.dailyOrderSheetsDao.search({suppliers: item.suppliers.id});
            let dataofdate = await this.dailyOrderSheetsDao.search({order_date: item.order_date});
            console.log("trail1 ",dataofsuppliers);
            console.log("trail2 ",dataofdate);

            if(dataofsuppliers.length>0 && dataofdate.length>0){
                console.log("I am just a tester for suppliers and order date");
                let case1 = await this.dailyOrderSheetsDao.test1(suppliers,date);
                console.log("case1 ",case1);
                return Promise.resolve(case1)
            }else if(dataofsuppliers.length == 0 && dataofdate.length>0){
                console.log("I am stumped for suppliers and orderdate");
                let case2 = await this.dailyOrderSheetsDao.search2(suppliers);
                console.log("case2 ",case2);
                return Promise.resolve(case2)
            }else if(dataofsuppliers.length > 0 && dataofdate.length==0){
                console.log("I am stumped for suppliers and orderdate trail 2");
                let case3 = await this.dailyOrderSheetsDao.search2(suppliers);
                console.log("case3 ",case3);

                return Promise.resolve(case3)
            }else if(suppliers == null && date == null) {
                
                    //return Promise.reject({ message: "user Already Exits" });
                    let findallsuppliers = await this.dailyOrderSheetsDao.findAll();
                    return Promise.resolve(findallsuppliers);
            }
        }
        catch(error){
            return Promise.reject(error);
        }
    }
}
