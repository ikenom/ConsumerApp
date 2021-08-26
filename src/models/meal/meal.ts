
export interface Meal {
  id: string;
  image: string; // Ought to rename to imageUri but this breaks backend-frontend data send
  name: string;
  price: string;
  restaurantId: string;
  description: string;
  nutrition: Nutrition;
  distance: string;
}

export interface EnrichedMeal extends Meal {
  restaurantName?: string;
  isFlaggedIngredient?: boolean;
  containsExcludedIngredients?: boolean;
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

export interface MicroNutrition {
  cholesterolInGrams?: number;
  sodiumInMGrams?: number;
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
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
}

export type WeightUnit = 'g' | 'mg' | 'mcg' | '' | 'mg';


export const PROTEIN_CALORIES_PER_GRAM = 4;
export const CARBS_CALORIES_PER_GRAM = 4;
export const FAT_CALORIES_PER_GRAM = 9;