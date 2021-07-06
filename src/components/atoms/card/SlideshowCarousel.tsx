import React, { useState } from 'react';
import { Image } from 'react-native';
import { Box, FlexBox } from '../../atoms/layout/Box'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { defaultTheme } from "../../../defaultTheme";
import { Text } from "../../atoms/typography/Text";

export interface SlideProps {
    slideImage: any; // TODO Make more specific to image
}

const Slide = (props: SlideProps) => {
    return (
        <Box
            position={'absolute'}
            overflow={'hidden'}
            right={0}
            left={0}
            bottom={0}
            top={0}
            borderRadius={'8px'}>
            <Image
                style={{
                    flex: 1,
                    height: '100%',
                    width: '100%',
                }}
                source={props.slideImage} />
            <Box position={'absolute'} left={0} bottom={0} ml={wp('2%')} mb={wp('2.5%')}>
                <Text
                    font={defaultTheme.fontFamily.dual_lg}
                    fontSize={defaultTheme.fontSize.lg}
                    fontWeight={'500'}
                    color={defaultTheme.colors.white}>
                    Where to eat in NYC
                    </Text>
                <Text
                    font={defaultTheme.fontFamily.hnt_medium}
                    fontSize={defaultTheme.fontSize.m}
                    fontWeight={'500'}
                    color={defaultTheme.colors.white}>
                    We put together the best locales.
                    </Text>
            </Box>
        </Box>
    )
}

interface SlideshowCarouselProps {
    slides: Array<any>; // TODO Should be array of Slide
}

export const SlideshowCarousel = (props: SlideshowCarouselProps) => {

    const { slides } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const renderSlide = ({ item, index }) => <Slide slideImage={item} />

    return (
        <Box height={hp('25%')} width={wp('93%')} justifyContent='center'>
            <Carousel
                data={slides}
                renderItem={renderSlide}
                onSnapToItem={(index) => setActiveIndex(index)}
                layout={'stack'}
                firstItem={0}
                vertical={false}
                sliderWidth={wp('93%')}
                itemWidth={wp('93%')}
                enableMomentum={true}
                activeSlideOffset={0}
                windowSize={10}
            />
            <Pagination
                dotsLength={slides.length}
                activeDotIndex={activeIndex}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: defaultTheme.colors.blue,
                }}
                containerStyle={{
                    paddingTop: wp('2.5%'),
                    paddingBottom: wp('2%'),
                    width: '100%',
                }}
                inactiveDotStyle={{
                    borderColor: defaultTheme.colors.greyNine,
                    borderWidth: 2,
                    backgroundColor: 'rgba(255,255,255,0)',
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={0.8}
            />
        </Box>
    );
}

// https://github.com/meliorence/react-native-snap-carousel/blob/master/doc/PAGINATION.md