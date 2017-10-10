import { UserDwelling } from '../models/entities/userDwellings';
import { App } from "./../utils/App";
import { UserBilling } from "./../models/entities/userBillings";
import { UserBillingsDAO } from "./../daos/userBillingsDAO";

export class UserBillingsService {
    private user_BillingsDao: UserBillingsDAO;


    constructor() {
        this.user_BillingsDao = new UserBillingsDAO();

    }

    async entity(id: string) {
        try {
            let data: any = await this.user_BillingsDao.entity(id);
            return Promise.resolve(data);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // async search(reqData: any) {
    //     try {
    //         let data: any = await this.user_BillingsDao.search(reqData);
    //         return Promise.resolve(data)
    //     } catch (error) {
    //         return Promise.reject(error);
    //     }
    // }

    async findAll(item:UserBilling){
        try{
            let user_dwellings = item.user_dwellings.id;
            let date = item.billed_date;
            console.log("Suppliers id is: ",user_dwellings);
            console.log("Orderdate is :",date);

            let dataofuserdwellings = await this.user_BillingsDao.search({user_dwellings: item.user_dwellings.id});
            let dataofdate = await this.user_BillingsDao.search({billed_date: item.billed_date});
            console.log("trail1 ",dataofuserdwellings);
            console.log("trail2 ",dataofdate);

            if(dataofuserdwellings.length>0 && dataofdate.length>0){
                console.log("I am just a tester for user_dwellings and billed date");
                let case1 = await this.user_BillingsDao.case1(user_dwellings);
                console.log("case1 ",case1)
                return Promise.resolve(case1)
            }else if(dataofuserdwellings.length > 0 && dataofdate.length==0){
                console.log("I am stumped for suppliers and orderdate trail 2");
                let case3 = await this.user_BillingsDao.search2(user_dwellings);
                console.log("case3 ",case3);
                return Promise.resolve(case3)
            }else if(user_dwellings == null && date == null) {
                
                    //return Promise.reject({ message: "user Already Exits" });
                    let findallsuppliers = await this.user_BillingsDao.findAll();
                    return Promise.resolve(findallsuppliers);
            }
        }
        catch(error){
            return Promise.reject(error);
        }
    }
    async save(item: UserBilling) {
        try {
            if (this.validate(item)) {
                let user_billingsData: any = await this.user_BillingsDao.save(item);
                let returnData = {
                    id: item.id,
                    message: "Saved Successfully"
                }
                return Promise.resolve(returnData);
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
            let data: UserBilling = (await this.user_BillingsDao.entity(id))
            let result: any = await this.user_BillingsDao.delete(data);
            let returnData = {
                id: id,
                message: "Removed Successfully"
            }
            return Promise.resolve(returnData);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    async validate(item: UserBilling) {
        return true;
    }
}