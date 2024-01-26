import * as clone from '../cloneMenu';
import * as uber from '../uberMenu';

export function formatMenuExercise1(cloneMenu: clone.Menu): uber.Menu {
  const uberItems = cloneMenu.categories.flatMap(
    (cloneCategory: clone.Category) => {
      return cloneCategory.items.map((item: clone.Item): uber.Item => {
        return {
          id: item.id,
          modifier_group_ids: [],
          price: item.price,
          title: item.name,
        };
      });
    },
  );

  const uberCategories = cloneMenu.categories.map(
    (cloneCategory): uber.Category => {
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
    },
  );

  return {
    id: cloneMenu.id,
    title: cloneMenu.name,
    categories: uberCategories,
    items: uberItems,
    modifier_groups: [],
  };
}
