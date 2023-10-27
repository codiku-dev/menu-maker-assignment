export type Menu = {
    id: string;
    name: string;
    categories: Category[];
}

export type Category = {
    id: string;
    name: string;
    items: Item[];
}

export type Item = {
    id: string;
    name: string;
    price: number;
    modifierGroups: ModifierGroup[];
}

export type ModifierGroup = {
    id: string;
    name: string;
    modifiers: Item[];
}
