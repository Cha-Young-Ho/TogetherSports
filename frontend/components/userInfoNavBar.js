const UserInfoNavBar = ({ personal_atv, interest_atv, activearea }) => {
  return (
    <>
      <h1>추가 정보 입력</h1>
      <div className="container">
        <div>
          <div>
            <img
              src={`/personalinfo-${personal_atv}.png`}
              alt="인적사항"
              className="personalinfo"
            ></img>
          </div>
          <p>인적사항</p>
        </div>
        <div>
          <div>
            <img
              src={`/interests-${interest_atv}.png`}
              alt="관심종목"
              className="interests"
            ></img>
          </div>
          <p>관심종목</p>
        </div>
        <div>
          <div>
            <img
              src={`/activearea-${activearea}.png`}
              alt="활동지역"
              className="activeareas"
            ></img>
          </div>
          <p>활동지역</p>
        </div>
      </div>

      <style jsx>{`
        * {
          font-weight: bold;
        }

        h1 {
          padding: 35px 0;
          font-size: 2.5rem;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          align-items: center;
          margin: 5px 0;
        }

        .container {
          width: 500px;
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .personalinfo,
        .interests,
        .activeareas {
          border-radius: 50px;
          width: 90px;
          height: 90px;
          margin: 10px;
        }
      `}</style>
    </>
  );
};

export default UserInfoNavBar;
