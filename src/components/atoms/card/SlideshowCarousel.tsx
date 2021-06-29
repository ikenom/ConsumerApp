import React, { useState } from 'react';
import { Image } from 'react-native';
import { FlexBox } from '../../atoms/layout/Box'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Carousel, { Pagination } from 'react-native-snap-carousel';

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
    const [activeIndex, setActiveIndex] = useState(1);

    const renderSlide = ({ item, index }) => {
        return (
            <Image 
            style={{ flex: 1, height: '100%', width: '100%', borderRadius: 8 }} 
            source={item} />
        );
    }

    return (
        <FlexBox>
             <Carousel
                data={slides}
                renderItem={renderSlide}
                onSnapToItem={(index) => setActiveIndex(index)} 
                layout={'stack'} 
                firstItem={1} 
                vertical={false} 
                sliderWidth={wp('93%')} 
                itemWidth={wp('93%')} 
                enableMomentum={true} 
                activeSlideOffset={0} 
                windowSize={10}
            />
{/*             <Pagination
                dotsLength={slides.length}
                activeDotIndex={activeIndex}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            /> */}
        </FlexBox>
    );
}

// https://github.com/meliorence/react-native-snap-carousel/blob/master/doc/PAGINATION.md