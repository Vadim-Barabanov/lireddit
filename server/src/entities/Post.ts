import { Field, Int, ObjectType } from 'type-graphql'
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Updoot } from './Updoot'
import { User } from './User'

@ObjectType()
@Entity()
export class Post extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column()
    title!: string

    @Field()
    @Column()
    text!: string

    @Field()
    @Column({ type: 'int', default: 0 })
    points!: number

    @Field(() => Int, { nullable: true })
    voteStatus: number | null // 1 | -1 | null

    @Field()
    @Column()
    creatorId: number

    @OneToMany(() => Updoot, (updoot) => updoot.post)
    updoots: Updoot[]

    @Field()
    @ManyToOne(() => User, (user) => user.posts)
    creator: User

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date
}
