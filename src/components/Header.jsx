import Slider from "react-slick";

function AutoPlayMethods() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <div
      className="slider-container"
      style={{ position: "relative", width: "100%", height: "500px" }}
    >
      <Slider {...settings}>
        <div>
          <img
            src="https://via.placeholder.com/1200x500?text=Slide+1"
            alt="Slide 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500?text=Slide+2"
            alt="Slide 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500?text=Slide+3"
            alt="Slide 3"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500?text=Slide+4"
            alt="Slide 4"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <div>
          <img
            src="https://via.placeholder.com/1200x500?text=Slide+5"
            alt="Slide 5"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </Slider>
    </div>
  );
}

export default AutoPlayMethods;
