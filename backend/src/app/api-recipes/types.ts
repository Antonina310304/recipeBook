export interface IngredientsInterface {
    productUuid: string;
    count: number;
}
export interface RecipeListInterface {
    title: string;
    description: string;
    kitchenUuid: string;
    products: IngredientsInterface[];
    uuid: string;
    authorNickname: string;
    authorUuid: string;
}