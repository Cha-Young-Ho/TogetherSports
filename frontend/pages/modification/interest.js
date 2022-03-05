import UserInfoNavBar from "../../components/userInfoNavBar";

const Interest = () => {
  return (
    <>
      <div className="bg-container">
        <UserInfoNavBar
          personal_atv={"deactivation"}
          interest_atv={"activation"}
          activearea={"deactivation"}
        />
      </div>

      <style jsx>{`
        .bg-container {
          margin-top: 10px;
          border-top: 1px solid #e4e8eb;
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

export default Interest;
