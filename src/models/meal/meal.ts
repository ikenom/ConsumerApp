
export interface Meal {
  image: string;
  name: string;
  price: string;
  description: string;
  nutrition?: Nutrition;
}

interface Nutrition {
  calories: string;
  macros: MacroNutrition;
  micros: MicroNutrition;
}

interface MacroNutrition {
  proteinInGrams: string;
  carbsInGrams: string;
  fatsInGrams: string;
}

interface MicroNutrition {
  saturatedFatInGrams: number;
  transFatInGrams: number;
  cholesterolInGrams: number;
  sodiumInGrams: number;
}