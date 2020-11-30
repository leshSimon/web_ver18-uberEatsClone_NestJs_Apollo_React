import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/globalLib/common/dtos/output.dto";
import { dish } from "../entities/dish.entity";

@InputType()
export class CreateDishInput extends PickType(dish, [
  "name",
  "price",
  "description",
  "options",
]) {
  @Field(() => Number)
  restaurantId: number;
}

@ObjectType()
export class CreateDishOutput extends CoreOutput {}