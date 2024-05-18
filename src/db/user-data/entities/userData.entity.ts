import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('UserData')
export class UserData {

    @PrimaryGeneratedColumn({ type: 'bigint', name: 'ID', unsigned: true })
    id: number;

    
    @Column({ name: 'First_Name', type: 'varchar', length:255 })
    firstName: string;

    @Column({ name: 'Last_Name', type: 'varchar', length:255 })
    lastName: string;

    @Column({ name: 'EMail', type: 'varchar', length:255, unique: true })
    eMail: string;


    @Column({ name: 'Code', type: 'varchar', length:6, nullable: true })
    code: string;

    @Column({ name: 'Code_Expired_DT', type: 'datetime', nullable: true })
    codeExpiredDT: Date;

}
 