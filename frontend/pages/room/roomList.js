import SearchBar from "../../components/rooms.js/searchBar";
import RoomFilter from "../../components/rooms.js/roomFilter";
import SelectExercise from "../../components/rooms.js/selectExercise";

const RoomList = () => {
  return (
    <>
      <div className="root-wrapper">
        <SearchBar />
        <RoomFilter />
        <SelectExercise />
      </div>
      <style jsx>{`
        .root-wrapper {
          width: 100%;
          height: 1500px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default RoomList;
