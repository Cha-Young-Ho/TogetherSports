import SearchBar from "../../components/rooms/searchBar";
import RoomFilter from "../../components/rooms/filter";
import FilteredRooms from "../../components/rooms/filteredRooms";
import FixedRoomAlarm from "../../components/fixedRoomAlarm";
import Head from "next/head";

const Roomlist = () => {
  return (
    <>
      <Head>
        <title>운동 방 둘러보기</title>
      </Head>
      <div className="root-wrapper">
        <SearchBar />
        <RoomFilter />
        <FilteredRooms />
      </div>
      <FixedRoomAlarm />
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
