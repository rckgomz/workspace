import { BaseEntity } from '@tenet/database';
import { Column, Entity, Index, OneToMany } from 'typeorm';
import { Address } from './address.entity';
import { Email } from './email.entity';
import { PhoneNumber } from './phone.entity';

@Entity()
export class Person extends BaseEntity {
  @Column('text')
  firstName: string;

  @Column('text')
  lastName: string;

  @Column('varchar', { length: 9, nullable: true })
  @Index({ unique: true })
  ssn: string;

  @Column('date', { nullable: true })
  dateOfBirth: Date;

  @OneToMany(() => Address, (address) => address.person)
  address: Address[];

  @OneToMany(() => PhoneNumber, (phoneNumber) => phoneNumber.person)
  phoneNumbers: PhoneNumber[];

  @OneToMany(() => Email, (email) => email.person)
  emails: Email[];

  get primaryEmail() {
    return this.emails?.find((e) => e.type === 'primary')?.email;
  }

  get primaryPhoneNumber() {
    return this.phoneNumbers?.find((p) => p.type === 'primary')?.number;
  }

  get primaryAddress() {
    return this.address?.find((a) => a.type === 'primary');
  }

  get mailingAddress() {
    return this.address?.find((a) => a.type === 'mailing');
  }
}
