import React from "react"
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Divider } from 'react-native-elements';
import styled from "styled-components";
import { defaultTheme } from "../../../../defaultTheme"
import { Nutrition, WeightUnit } from "../../../../models/meal/meal"
import { FlexBox, Box } from "../../../atoms/layout/Box"
import { Text } from "../../../atoms/typography/Text"
import { SheetHeader } from "../../../molecules/common/BottomExpandableAccordion"
import { MicroNutrition } from "../../../../models/meal/meal";


const StyledDivider = styled(Divider)<{height: number, mt: number, mb?: number}>`
  backgroundColor: ${defaultTheme.colors.white};
  height: ${({height}) => height};
  borderRadius: 4px;
  marginTop: ${({mt}) => mt};
  marginBottom: ${({mb}) => mb ? mb : 0};
`;
export interface NutritionFactsSheetProps {
  nutrition: Nutrition;
}

export const NutritionFactsSheetContent = (props: NutritionFactsSheetProps) => {

  const { nutrition } = props;

  const { macros: {fatsInGrams, carbsInGrams, proteinInGrams}, micros } = nutrition;

  return(
  <FlexBox flexDirection={'column'} backgroundColor={defaultTheme.colors.blackTwo} height={'100%'}>
      <SheetHeader label={"Nutritional Facts"} backgroundColor={defaultTheme.colors.blackTwo}/>
      <FlexBox flexDirection={'column'} backgroundColor={defaultTheme.colors.blackTwo} pl={wp('5.5%')} pr={wp('5.5%')} mt={'2.5%'}>
        <NutritionHeader label={'Calories'} value={nutrition.calories} unit={''}/>
        <StyledDivider height={3} mt={hp('1.5%')} mb={hp('1.5%')}/>
        <NutritionSection 
          header={{label: "Total Fat", value: fatsInGrams, unit: 'g'}}
          content={
            micros ? getFatFields(micros) : undefined
          }
          withTopDivider={false}
          withBottomDivider={true}
        />
        { micros?.cholesterolInGrams ? 
            <Box mt={hp('1.5%')}>
              <NutritionHeader label={'Cholesterol'} value={micros.cholesterolInGrams} unit={'g'}/>
              <StyledDivider height={1} mt={hp('1.5%')}/>
            </Box>
          : <></>
        }
        { micros?.sodiumInMGrams ? 
            <Box mt={hp('1.5%')}>
              <NutritionHeader label={'Sodium'} value={micros.sodiumInMGrams} unit={'mg'}/>
              <StyledDivider height={1} mt={hp('1.5%')} mb={hp('1.5%')}/>
            </Box>
          : <></>
        }
        <NutritionSection 
          header={{label: "Total Carbohydrate", value: carbsInGrams, unit: 'g'}}
          content={
            micros ? getCarbFields(micros) : undefined
          }
          withTopDivider={false}
          withBottomDivider={true}
        />
        <Box mt={hp('1.5%')}>
          <NutritionHeader label={'Protein'} value={proteinInGrams} unit={'g'}/>
          <StyledDivider height={3} mt={hp('1.5%')} mb={hp('1.5%')}/>
        </Box>
        <NutritionSection 
          content={
            micros ? getExtraNutrientField(micros) : undefined
          }
          withTopDivider={false}
          withBottomDivider={true}
        />
        <Box mt={hp('3%')} witdh={wp('74%')}>
          <Text fontWeight={'400'} fontSize={defaultTheme.fontSize.xsm} color={defaultTheme.colors.white}>
          *The information listed above may not be exact due to variations in food preparation
          </Text>
        </Box>
      </FlexBox>
  </FlexBox>
)}



interface Field {
  label: string;
  value: number;
  unit: WeightUnit;
}

interface NutritionSectionProps {
  header?: Field;
  content?: Field[];
  withTopDivider: boolean;
  withBottomDivider: boolean;
}

const NutritionSection = (props: NutritionSectionProps) => {
  const { header, content, withBottomDivider, withTopDivider} = props;

  return(
    <FlexBox flexDirection={'column'} justifyContent={'space-between'}>
      {withTopDivider ? <StyledDivider height={1} mt={hp('1.5%')}/> : <></>}
      { header ? <Box mt={withTopDivider ? hp('1.5%') : 0}><NutritionHeader {...header}/></Box> : <></>}
      { content ? 
          <FlexBox flexDirection={'column'}>
            {content.map(field => <Box ml={wp('2.4%')} mt={hp('0.24%')}><NutritionField {...field}/></Box>)}
          </FlexBox>
        : <></>
      }
      {withBottomDivider ? <StyledDivider height={1} mt={hp('1.5%')} /> : <></>}
    </FlexBox>
  )
}

const NutritionHeader = (props: Field) => {
  return(
    <FlexBox flexDirection={'row'} justifyContent={'space-between'}>
      <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{props.label}</Text>
      <Text fontWeight={'600'} fontSize={defaultTheme.fontSize.m} color={defaultTheme.colors.white}>{`${props.value}${props.unit}`}</Text>
    </FlexBox>
)}

const NutritionField = (props: Field) => {
  return(
    <FlexBox flexDirection={'row'} justifyContent={'space-between'}>
      <Text fontWeight={'400'} fontSize={'14px'} color={defaultTheme.colors.white}>{props.label}</Text>
      <Text fontWeight={'400'} fontSize={'14px'} color={defaultTheme.colors.white}>{`${props.value}${props.unit}`}</Text>
    </FlexBox>
  )
}

const getFatFields = (micros: MicroNutrition): Field[] => {
  const output: Field[] = [];
  const saturatedFatField: Field | null = micros?.fatBreakdown?.saturatedFatInGrams ? {label: "Saturated Fat", value: micros.fatBreakdown.saturatedFatInGrams, unit: 'g'} : null;
  const transFatField: Field | null = micros?.fatBreakdown?.transFatInGrams ? {label: "Trans Fat", value: micros.fatBreakdown.transFatInGrams, unit: 'g'} : null;
  
  if(saturatedFatField) output.push(saturatedFatField)
  if(transFatField) output.push(transFatField)
  return output;
}

const getCarbFields = (micros: MicroNutrition ): Field[] => {
  const output: Field[] = [];
  const fiberField: Field | null = micros?.carbBreakdown?.fiberInGrams ? {label: "Dietary Fiber", value: micros.carbBreakdown.fiberInGrams, unit: 'g'} : null;
  const totalSugarField: Field | null = micros?.carbBreakdown?.totalSugarInGrams ? {label: "Total Sugars", value: micros.carbBreakdown.totalSugarInGrams, unit: 'g'} : null;
  const addedSugarField: Field | null = micros?.carbBreakdown?.addedSugarInGrams ? {label: "Added Sugars", value: micros.carbBreakdown.addedSugarInGrams, unit: 'g'} : null;
  
  if(fiberField) output.push(fiberField)
  if(totalSugarField) output.push(totalSugarField)
  if(addedSugarField) output.push(addedSugarField)
  return output;
}

const getExtraNutrientField = (micros: MicroNutrition ): Field[] => {
  const output: Field[] = [];
  const vitamanD: Field | null = micros?.extraMicros?.vitaminD ? {label: "Vitamin D", value: micros.extraMicros.vitaminD, unit: 'mcg'} : null;
  const calcium: Field | null = micros?.extraMicros?.calcium ? {label: "Calcium", value: micros.extraMicros.calcium, unit: 'g'} : null;
  const iron: Field | null = micros?.extraMicros?.iron ? {label: "Iron", value: micros.extraMicros.iron, unit: 'g'} : null;
  const potassium: Field | null = micros?.extraMicros?.potassium ? {label: "Potassium", value: micros.extraMicros.potassium, unit: 'g'} : null;


  if(vitamanD) output.push(vitamanD)
  if(calcium) output.push(calcium)
  if(iron) output.push(iron)
  if(potassium) output.push(potassium)
  return output;
}