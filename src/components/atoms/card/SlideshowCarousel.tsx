import React, { useState } from 'react';
import { Image } from 'react-native';
import { Box, FlexBox } from '../../atoms/layout/Box'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { defaultTheme } from "../../../defaultTheme";

/* export interface SlideProps {
    slideImage: any; // TODO Make more specific to image
}

const Slide = (props: SlideProps) => {
    return (
        <Image 
            style={{ flex: 1, height: '100%', width: '100%', borderRadius: 8 }} 
            source={props.slideImage} />
    )
} */

interface SlideshowCarouselProps {
    slides: Array<any>; // TODO Should be array of Slide
}

export const SlideshowCarousel = (props: SlideshowCarouselProps) => {

    const { slides } = props;
    const [activeIndex, setActiveIndex] = useState(0);

    const renderSlide = ({ item, index }) => {
        return (
            <Image 
            style={{ flex: 1, height: '100%', width: '100%', borderRadius: 8 }} 
            source={item} />
        );
    }

    return (
        <Box height={hp('30%')} width={wp('93%')} justifyContent='center'>
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
                    marginHorizontal: 1,
                    backgroundColor: defaultTheme.colors.blue,
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.8}
            />
        </Box>
    );
}

// https://github.com/meliorence/react-native-snap-carousel/blob/master/doc/PAGINATION.md