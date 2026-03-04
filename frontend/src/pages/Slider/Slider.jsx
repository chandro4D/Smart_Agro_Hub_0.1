import React from "react";
import "swiper/css/bundle";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slider.css";
import { useEffect, useState } from "react";

const Slider = () => {
    const [image, setImage] = useState([]);
    useEffect(() => {
        fetch("/slider.json")  
            .then((res) => res.json())
            .then((data) => setImage(data))
            .then(data => console.log(data))
            .catch((err) => console.error("Failed to load slider.json:", err));
    }, []);




    return (
        <div className="mb-10">
            <div>
                <Swiper
                    className="lg:w-[1300px] rounded-xl sm:w-[500px] lg:h-[560px] sm:h-[200px]"
                    navigation={true}
                    modules={[Navigation, Autoplay, Pagination]}
                    loop={image.length > 1} // ✅ loop only if more than 1 slide
                    autoplay={{
                        delay: 2000,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {image.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="slide">
                                <img
                                    className="w-[1400px] h-[500px] rounded-xl"
                                    src={item.image}
                                    alt="slider"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Slider;
