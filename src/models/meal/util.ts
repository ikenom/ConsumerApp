import { CARBS_CALORIES_PER_GRAM, FAT_CALORIES_PER_GRAM, Meal, Nutrition, PROTEIN_CALORIES_PER_GRAM } from './meal';

export const MOCK_NUTRITION: Nutrition = {
  calories: 803,
  macros: {
    proteinInGrams: 30,
    carbsInGrams: 15,
    fatsInGrams: 17
  }
}

export const MOCK_MEALS: Meal[] = [
  {
    name: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg'),
    description: "Crispy waffles with a hint of hazelnut.Hazelnuts for breakfast! This family-favorite will start anybody’s day off right.",
    nutrition: MOCK_NUTRITION
  },
  {
    name: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg'),
    description: "Chicken glazed with lemon and cooked to perfection",
    nutrition: MOCK_NUTRITION
  },
  {
    name: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg'),
    description: "Delicious pulled pork",
    nutrition: MOCK_NUTRITION
  },
  {
    name: "Hazelnut Belgian Waffles",
    price: "12.99",
    image: require('../../../assets/testImages/waffles.jpeg'),
    description: "Crispy waffles with a hint of hazelnut",
    nutrition: MOCK_NUTRITION
  },
  {
    name: "Lemon Grilled Chicken",
    price: "17.02",
    image: require('../../../assets/testImages/chickenMeal.jpeg'),
    description: "Chicken glazed with lemon and cooked to perfection",
    nutrition: MOCK_NUTRITION
  },
  {
    name: "Spicy Pulled Pork",
    price: "8.53",
    image: require('../../../assets/testImages/pulledPork.jpeg'),
    description: "Delicious pulled pork",
    nutrition: MOCK_NUTRITION
  }
]

export const getProteinInCalories = (proteinInGrams: number) => proteinInGrams * PROTEIN_CALORIES_PER_GRAM
export const getFatsInCalories = (fatsInGrams: number) => fatsInGrams * FAT_CALORIES_PER_GRAM
export const getCarbsInCalories = (carbsInGrams: number) => carbsInGrams * CARBS_CALORIES_PER_GRAM