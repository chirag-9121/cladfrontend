import NoDataFoundSvg from "../../assets/bird-listening-music.svg";

// Image and message to display when no data is found
const NoDataFound = () => {
  return (
    <div className="h-[90vh] flex justify-center items-center flex-col gap-5">
      <img
        src={NoDataFoundSvg}
        alt="No Data Found"
        className="w-[25vw] h-[25vw]"
      />
      <p className="md:text-lg">
        All quiet here, add a person to see the magic.
      </p>
    </div>
  );
};

export default NoDataFound;
