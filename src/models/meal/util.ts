import { CARBS_CALORIES_PER_GRAM, EnrichedMeal, FAT_CALORIES_PER_GRAM, Meal, Nutrition, PROTEIN_CALORIES_PER_GRAM } from './meal';
import { Image } from 'react-native';
import wafflesImage from '../../../assets/testImages/waffles.jpeg';
import chickenMealImage from '../../../assets/testImages/chickenMeal.jpeg';
import pulledPorkImage from '../../../assets/testImages/pulledPork.jpeg';

const wafflesUri = Image.resolveAssetSource(wafflesImage).uri;
const chickenUri = Image.resolveAssetSource(chickenMealImage).uri;
const pulledPorkUri = Image.resolveAssetSource(pulledPorkImage).uri;

export const MOCK_NUTRITION: Nutrition = {
  calories: 803,
  macros: {
    proteinInGrams: 30,
    carbsInGrams: 15,
    fatsInGrams: 17
  },
  micros: {
    cholesterolInGrams: 3,
    sodiumInMGrams: 15,
    fatBreakdown: {
      saturatedFatInGrams: 10,
      transFatInGrams: 7
    },
    carbBreakdown: {
      fiberInGrams: 4,
      totalSugarInGrams: 11,
      addedSugarInGrams: 1
    },
    extraMicros: {
      vitaminD: 10,
      calcium: 13,
      iron: 10,
      potassium: 5
    }
  }
}

export const MOCK_MEALS: Meal[] = [
  {
    id: "1",
    name: "Hazelnut Belgian Waffles",
    restaurantId: "10",
    price: "12.99",
    image: wafflesUri,
    description: "Crispy waffles with a hint of hazelnut.Hazelnuts for breakfast! This family-favorite will start anybody’s day off right.",
    nutrition: MOCK_NUTRITION
  },
  {
    id: "2",
    name: "Lemon Grilled Chicken",
    restaurantId: "20",
    price: "17.02",
    image: chickenUri,
    description: "Chicken glazed with lemon and cooked to perfection",
    nutrition: MOCK_NUTRITION
  },
  {
    id: "3",
    name: "Spiciest of All Spicy Spicy Pulled Pork",
    restaurantId: "30",
    price: "8.53",
    image: pulledPorkUri,
    description: "Delicious pulled pork that is marinated in ghost pepper sauce and the tears of your enemies",
    nutrition: MOCK_NUTRITION
  },
  {
    id: "4",
    name: "Hazelnut Belgian Waffles",
    restaurantId: "40",
    price: "12.99",
    image: wafflesUri,
    description: "Crispy waffles with a hint of hazelnut.Hazelnuts for breakfast! This family-favorite will start anybody’s day off right.",
    nutrition: MOCK_NUTRITION
  },
  {
    id: "5",
    name: "Lemon Grilled Chicken",
    restaurantId: "50",
    price: "17.02",
    image: chickenUri,
    description: "Chicken glazed with lemon and cooked to perfection",
    nutrition: MOCK_NUTRITION
  },
  {
    id: "6",
    name: "Spicy Pulled Pork",
    restaurantId: "60",
    price: "8.53",
    image: pulledPorkUri,
    description: "Delicious pulled pork",
    nutrition: MOCK_NUTRITION
  }
]

export const MOCK_MEALS_ENRICHED: EnrichedMeal[] = [
  {
    ...MOCK_MEALS[0],
    restaurantName: "Awful Waffle",
    isFlaggedIngredient: false,
    containsExcludedIngredients: false
  },
  {
    ...MOCK_MEALS[1],
    restaurantName: "Wild Chix",
    isFlaggedIngredient: false,
    containsExcludedIngredients: false
  },
  {
    ...MOCK_MEALS[2],
    restaurantName: "Curly Tail Bar Upon Avon on the Bluffs Creekside",
    isFlaggedIngredient: true,
    containsExcludedIngredients: true
  }
]

export const getProteinInCalories = (proteinInGrams: number) => proteinInGrams * PROTEIN_CALORIES_PER_GRAM
export const getFatsInCalories = (fatsInGrams: number) => fatsInGrams * FAT_CALORIES_PER_GRAM
export const getCarbsInCalories = (carbsInGrams: number) => carbsInGrams * CARBS_CALORIES_PER_GRAM