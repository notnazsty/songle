import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, BoxProps, Text } from "@chakra-ui/react";
import {  Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { Song } from "../../models";
import Card from "./Card";

interface CardSlideProps extends BoxProps {
  song: Song;
  guesses: Song[];
}

const CardSlide = ({
  song,
  guesses,
  ...props
}: CardSlideProps): JSX.Element => {
  return (
    <Box maxW="100%" color="white" display='flex' justifyContent='center' alignItems='center' >
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
        <SwiperSlide>
          <Card song={song} guesses={guesses} />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default CardSlide;
