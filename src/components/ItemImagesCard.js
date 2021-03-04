import React, { useState } from 'react';
import { Image, Sticky } from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

function ItemImagesCard({ contextRef, images }) {
    const [selectedImage, setSelectedImage] = useState(images[0].downloadUrl)
    return (
      <Sticky context={contextRef} offset={130}>
        <Image src={selectedImage} style={{ marginBottom: 6, width: 250, height: 250 }}/>
        <Swiper
          spaceBetween={6}
          slidesPerView={4}
          onSlideChange={() => console.log('slide change')}>
            {images.map((image, index) => (
              <SwiperSlide key={index} virtualIndex={index}>
                <Image href={`#image/${image.id}`} onClick={() => {setSelectedImage(image.downloadUrl)}} src={ image.downloadUrl } style={{ width: 60, height: 60 }}/>
            </SwiperSlide>
            )) }
        </Swiper>
      </Sticky>
    )
}
export default ItemImagesCard