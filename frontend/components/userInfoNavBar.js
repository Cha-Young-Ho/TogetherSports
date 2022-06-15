import Image from "next/image";

const UserInfoNavBar = (props) => {
  return (
    <>
      <h1>추가 정보 입력</h1>
      <div className="container">
        <div>
          <div>
            <Image
              src={`/personalinfo-${props.personal_atv}.png`}
              alt="인적사항"
              className="personalinfo"
              width={90}
              height={90}
            ></Image>
          </div>
          <p>인적사항</p>
        </div>
        <div>
          <div>
            <Image
              src={`/interests-${props.interest_atv}.png`}
              alt="관심종목"
              className="interests"
              width={90}
              height={90}
            ></Image>
          </div>
          <p>관심종목</p>
        </div>
        <div>
          <div>
            <Image
              src={`/activearea-${props.activearea_atv}.png`}
              alt="활동지역"
              className="activeareas"
              width={90}
              height={90}
            ></Image>
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
          margin: 10px;
        }
      `}</style>
    </>
  );
};

export default UserInfoNavBar;
