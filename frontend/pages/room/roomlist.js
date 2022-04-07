import SearchBar from "../../components/rooms/searchBar";
import RoomFilter from "../../components/rooms/filter";
import FilteredRooms from "../../components/rooms/filteredRooms";

const Roomlist = () => {
  return (
    <>
      <div className="root-wrapper">
        <SearchBar />
        <RoomFilter />
        {/* <FilteredRooms /> */}
      </div>
      <style jsx>{`
        .root-wrapper {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
};

export default Roomlist;
