import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const settings = {
    dots: true, //캐러셀 아래에 있는 현재 위치를 나타내는 점들 (false: 표시안함)
    infinite: true, //마지막 이미지 이후에는 첫번째 이미지로 순서 순환 (true: 사용함)
    autoplay: true, //자동 슬라이딩 기능 (true: 사용함)
    autoplaySpeed: 2000, //자동 슬라이딩 시 이동 속도
    slidesToShow: 3, //한번에 출력할 이미지 갯수 (3개)
    slidesToScroll: 1 //스크롤시 한번에 넘길 이미지 갯수(1개)
  };
  return (
    <div className="max-w-[100vw]">
      <Slider {...settings}>
        <div>
          <img src="../assets/food1.jpg" alt="음식사진" />
        </div>
        <div>
          <img src="../assets/food2.jpg" alt="음식사진" />
        </div>
        <div>
          <img src="../assets/food3.jpg" alt="음식사진" />
        </div>
        <div>
          <img src="../assets/food4.jpg" alt="음식사진" />
        </div>
        <div>
          <img src="../assets/food5.jpg" alt="음식사진" />
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
