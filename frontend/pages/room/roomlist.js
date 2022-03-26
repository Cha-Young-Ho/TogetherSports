import SearchBar from "../../components/rooms/searchBar";
import RoomFilter from "../../components/rooms/filter";
import SelectExercise from "../../components/rooms/selectExercise";
import FilteredRooms from "../../components/rooms/filteredRooms";

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
