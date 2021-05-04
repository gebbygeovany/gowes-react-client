import React, { useState } from 'react';
import { Image, Sticky, Modal } from 'semantic-ui-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';

function ItemImagesCard({ contextRef, images }) {
  const [selectedImage, setSelectedImage] = useState(images[0].downloadUrl)
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Sticky context={contextRef} offset={130}>
        <Image src={selectedImage}
          style={{ marginBottom: 6, width: 250, height: 250 }}
          onClick={() => { setOpen(true) }}
        />
        <Swiper
          spaceBetween={6}
          slidesPerView={4}
          onSlideChange={() => console.log('slide change')}>
          {images.map((image, index) => (
            <SwiperSlide key={index} virtualIndex={index}>
              <Image
                href={`#image/${image.id}`}
                onClick={() => { setSelectedImage(image.downloadUrl) }}
                src={image.downloadUrl}
                style={{ width: 60, height: 60 }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Sticky>
      <Modal
        closeIcon
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
      >
        <Modal.Content>
          <Image
            src={selectedImage}
            rounded
            centered
            size="medium"
          />
        </Modal.Content>
      </Modal>
    </>
  )
}
export default ItemImagesCard