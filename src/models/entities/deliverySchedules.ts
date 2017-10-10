import { Community } from './communities';
import { Supplier } from './suppliers';
import { UserBilling } from './userBillings';
import { ProductSku } from './productSku';
import { UserDwelling } from './userDwellings';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import {SubCommunity} from './subCommunities';


@Entity("delivery_schedules")
export class DeliverySchedule{
    @PrimaryGeneratedColumn({name:"id"})
    id:number;

    @JoinColumn({name:"sub_community"})
    @ManyToOne(type=>SubCommunity)
    sub_communities:SubCommunity;

    @JoinColumn({name:"user_dwelling"})
    @ManyToOne(type=>UserDwelling)
    user_dwellings:UserDwelling;

    @ManyToMany(type=>ProductSku,product_sku=>product_sku.delivery_schedules)
    @JoinTable({name:"delivery_schedules_product_skus_product_skus_id"})
    product_skus:ProductSku[];

    @Column({name:"quantity"})
    quantity:number;

    @JoinColumn({name:"user_billing"})
    @ManyToOne(type=>UserBilling)
    user_billing:UserBilling;

    @JoinColumn({name:"suppliers"})
    @ManyToOne(type=>Supplier)
    suppliers:Supplier;

    @Column({name:"delivery_date"})
    delivery_date:Date;

    @JoinColumn({name:"communities"})
    @ManyToOne(type=>Community)
    communities:Community;

}