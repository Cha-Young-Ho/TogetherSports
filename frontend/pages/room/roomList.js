import SearchBar from "../../components/rooms.js/searchBar";
import RoomFilter from "../../components/rooms.js/filter";
import SelectExercise from "../../components/rooms.js/selectExercise";
import FilteredRooms from "../../components/rooms.js/filteredRooms";

const Roomlist = () => {
  return (
    <>
      <div className="root-wrapper">
        <SearchBar />
        <RoomFilter />
        <SelectExercise />
        <FilteredRooms />
      </div>
      <style jsx>{`
        .root-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default Roomlist;
