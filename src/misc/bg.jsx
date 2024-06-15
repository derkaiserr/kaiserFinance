import bg from "../assets/bg-home.png";
import ellipses from "../assets/ellipses.png";

const Bg = () => {
  return (
    <>
      <img
        src={ellipses}
        className="absolute top-0 z-50 w-[50%] max-h-[5cm] cover"
        alt="ellipses"
      />
      <img src={bg} className="relative cover z-20 w-full h-[5.7cm]" alt="background" />
    </>
  );
};

export default Bg;
