import * as clone from "./cloneMenu"
import * as uber from "./uberMenu"
import * as json1 from "../data/input/01.json"
import * as json2 from "../data/input/02.json"
import * as json3 from "../data/input/03.json"
import { formatMenuExercise1 } from './exercises/1';
import { formatMenuExercise2 } from './exercises/2';
import { formatMenuExercise3 } from './exercises/3';
import { promises as fsPromises } from 'fs';


export function formatMenu(menu: clone.Menu): uber.Menu {

console.log('*** EXERCISE 1 ***');
  const responseExercise1 = formatMenuExercise1(json1);
  // print the response in console
  // console.dir(responseExercise1, { depth: null });
  // Write response in responses folder
  writeResponseToFile(
    responseExercise1,
    './src/exercises/01_exercise_ouput.json',
  );

  console.log('*** EXERCISE 2 ***');
  const responseExercise2 = formatMenuExercise2(json2);
  // console.dir(responseExercise2, { depth: null });
  writeResponseToFile(
    responseExercise2,
    './src/exercises/02_exercise_ouput.json',
  );

  console.log('*** EXERCISE 3 ***');
  const responseExercise3 = formatMenuExercise3(json3 as clone.Menu);
  // console.dir(responseExercise3, { depth: null });
  writeResponseToFile(
    responseExercise3,
    './src/exercises/03_exercise_ouput.json',
  );

  return responseExercise3 
}

async function writeResponseToFile(response: any, filename: string) {
    try {
      await fsPromises.writeFile(filename, JSON.stringify(response, null, 2));
      console.log(`Response written to ${filename}`);
    } catch (error) {
      console.error('Error writing response to file:', error);
    }
  }
  



  /*


  OLD 

    console.log("INPUT", menu)

    const formattedCatgories = menu.categories.map((categoryClone ) : uber.Category=> {
        return {
            id : categoryClone.id,
            title : categoryClone.name,
            entities : categoryClone.items.map(itemClone =>{
                return {
                    id : itemClone.id,
                    type: "ITEM"
                }
            })
        }
    }) 

    const formattedItems =  menu.categories.map((categoryClone): uber.Item[] => {
        return categoryClone.items.map((item) =>{
            return {
                id: item.id,
                title: item.name,
                price: item.price,
                modifier_group_ids: item.modifierGroups.map(modifierGroup =>{
                    return modifierGroup.id
                })
            }
        })
    })

    const modifierGroups =  menu.categories.flatMap((categoryClone): uber.ModifierGroup[] => {
        return categoryClone.items.flatMap((item) =>{
           return item.modifierGroups.flatMap((modifierGroup): uber.ModifierGroup =>{
                const currentModifierUberItems = modifierGroup.items.map((item): uber.Item => {
                    return {
                        id: item.id,
                        title: item.name,
                        price: item.price,
                        modifier_group_ids: item.modifierGroups.map(modifierGroup => {
                            return modifierGroup.id
                        })
                    }
                })
                formattedItems.push(currentModifierUberItems)
               return {
                    id : modifierGroup.id,
                    title : modifierGroup.name,
                    modifier_options : modifierGroup.items.map(item =>({
                        id: item.id,
                        type : "ITEM"
                    }))
                }
            })
          

        })
       
    })
const output = {
    id: menu.id,
    title: menu.name,
    categories: formattedCatgories,
    items: formattedItems.flatMap((items) => items),
    modifier_groups: modifierGroups,
}

    console.log("OUTPUT",output)
   
    return output
    */

    