import * as clone from '../cloneMenu';
import * as uber from '../uberMenu';

const addItemsRecursively = (items: clone.Item[], uberItems: uber.Item[]) => {
  if (items.length > 0) {
    for (let i = 0; i < items.length; i++) {
      const cloneItem = items[i];
      const modifierGroupIdList = cloneItem.modifierGroups.map(
        (cloneModifierGroup) => cloneModifierGroup.id,
      );

      const item = {
        id: cloneItem.id,
        price: cloneItem.price,
        title: cloneItem.name,
        modifier_group_ids: modifierGroupIdList,
      };
      uberItems.push(item);
      if (cloneItem.modifierGroups.length > 0) {
        for (let i = 0; i < cloneItem.modifierGroups.length; i++) {
          addItemsRecursively(cloneItem.modifierGroups[i].items, uberItems);
        }
      }
    }
  }
};

const addModifierGroupRecursively = (
  cloneModifierGroups: clone.ModifierGroup[],
  uberModifierGroups: uber.ModifierGroup[],
) => {
  if (cloneModifierGroups.length > 0) {
    for (let i = 0; i < cloneModifierGroups.length; i++) {
      const cloneModifierGroup = cloneModifierGroups[i];
      const uberModifierGroup: uber.ModifierGroup = {
        id: cloneModifierGroup.id,
        title: cloneModifierGroup.name,
        modifier_options: cloneModifierGroup.items.map((cloneItem) => ({
          id: cloneItem.id,
          type: 'ITEM',
        })),
      };
      uberModifierGroups.push(uberModifierGroup);
      if (cloneModifierGroup.items.length > 0) {
        for (let i = 0; i < cloneModifierGroup.items.length; i++) {
          addModifierGroupRecursively(
            cloneModifierGroup.items[i].modifierGroups,
            uberModifierGroups,
          );
        }
      }
    }
  }
};

const buildItems = (cloneMenu: clone.Menu) => {
  const uberItems: uber.Item[] = [];
  for (let i = 0; i < cloneMenu.categories.length; i++) {
    const cloneCategory = cloneMenu.categories[i];
    addItemsRecursively(cloneCategory.items, uberItems);
  }
  return uberItems;
};

const buildCategories = (cloneMenu: clone.Menu) => {
  return cloneMenu.categories.map((cloneCategory): uber.Category => {
    const uberEntities: uber.Entity[] = cloneCategory.items.map(
      (cloneItem) => ({
        id: cloneItem.id,
        type: 'ITEM',
      }),
    );
    return {
      id: cloneCategory.id,
      title: cloneCategory.name,
      entities: uberEntities,
    };
  });
};

const buildModifierGroups = (cloneMenu: clone.Menu) => {
  return cloneMenu.categories.flatMap((cloneCategory: clone.Category) => {
    return cloneCategory.items.flatMap((item: clone.Item) => {
      const uberModifierGroups: uber.ModifierGroup[] = [];
      addModifierGroupRecursively(item.modifierGroups, uberModifierGroups);
      return uberModifierGroups;
    });
  });
};

export function formatMenuExercise3(cloneMenu: clone.Menu): uber.Menu {
  const uberItems = buildItems(cloneMenu);
  const uberModifierGroups = buildModifierGroups(cloneMenu);
  const uberCategories = buildCategories(cloneMenu);
  return {
    id: cloneMenu.id,
    title: cloneMenu.name,
    categories: uberCategories,
    items: uberItems,
    modifier_groups: uberModifierGroups,
  };
}
