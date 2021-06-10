
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
  fatBreakdown?: FatBreakdown;
  carbBreakdown?: CarbBreakdown;
  extraMicros?: ExtraMicros;
}

interface FatBreakdown {
  saturatedFatInGrams?: number;
  transFatInGrams?: number;
}

interface CarbBreakdown {
  fiberInGrams?: number;
  totalSugarInGrams?: number;
  addedSugarInGrams?: number;
}

interface ExtraMicros {
  vitaminD?: string;
  calcium?: string;
  iron?: string;
  potassium?: string;
}


export const PROTEIN_CALORIES_PER_GRAM = 4;
export const CARBS_CALORIES_PER_GRAM = 4;
export const FAT_CALORIES_PER_GRAM = 9;