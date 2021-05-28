
export interface Meal {
  image: any;
  name: string;
  price: string;
  description: string;
  nutrition: Nutrition;
}

export interface Nutrition {
  calories: number;
  macros: MacroNutrition;
  micros?: MicroNutrition;
}

interface MacroNutrition {
  proteinInGrams: number;
  carbsInGrams: number;
  fatsInGrams: number;
}

interface MicroNutrition {
  saturatedFatInGrams: number;
  transFatInGrams: number;
  cholesterolInGrams: number;
  sodiumInGrams: number;
}

export const PROTEIN_CALORIES_PER_GRAM = 4;
export const CARBS_CALORIES_PER_GRAM = 4;
export const FAT_CALORIES_PER_GRAM = 9;