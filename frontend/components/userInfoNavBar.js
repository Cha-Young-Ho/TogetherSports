const UserInfoNavBar = ({ personal_atv, interest_atv, activearea }) => {
  console.log(personal_atv);
  return (
    <>
      <h1>회원가입</h1>
      <div className="title">
        <div>
          <div>
            <img
              src={`/personalinfo-${personal_atv}.png`}
              alt="인적사항"
              className="title-circle-personalinfo"
            ></img>
          </div>
          <p>인적사항</p>
        </div>
        <div>
          <div>
            <img
              src={`/interests-${interest_atv}.png`}
              alt="관심종목"
              className="title-circle-interest"
            ></img>
          </div>
          <p>관심종목</p>
        </div>
        <div>
          <div>
            <img
              src={`/activearea-${activearea}.png`}
              alt="활동지역"
              className="title-circle-activearea"
            ></img>
          </div>
          <p>활동지역</p>
        </div>
      </div>

      <style jsx>{`
        * {
          font-family: "NanumBarunGothic";
          font-weight: bold;
        }

        h1 {
          padding: 35px 0;
          font-family: "NanumBarunGothic";
          font-weight: bold;
          font-size: 2.5rem;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
          align-items: center;
          margin: 5px 0;
        }

        .title {
          width: 500px;
          display: flex;
          justify-content: space-around;
          margin-bottom: 20px;
        }

        .title-circle-personalinfo,
        .title-circle-interest,
        .title-circle-activearea {
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
