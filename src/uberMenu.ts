// This is inspired from the following docs: https://developer.uber.com/docs/eats/references/api/v2/put-eats-stores-storeid-menu

export type Menu = {
    id: string,
    title: string,
    categories: Category[];
    items: Item[];
    modifier_groups: ModifierGroup[];
}

export type Category = {
    id: string;
    title: string;
    entities: { id: string, type: "ITEM" }[];
}

export type Item = {
    id: string;
    title: string;
    price: number;
    modifier_group_ids: string[];
}

export type ModifierGroup = {
    id: string;
    title: string;
    modifier_options: { id: string, type: "ITEM" }[];
}
