import * as clone from "./cloneMenu"
import * as uber from "./uberMenu"

export function formatMenu(menu: clone.Menu): uber.Menu {
    return {
        categories: [],
        items: [],
        modifier_groups: [],
    }
}
