import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/globalLib/common/dtos/output.dto";

@InputType()
export class DeleteRestaurantInput {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class DeleteRestaurantOutput extends CoreOutput {}
