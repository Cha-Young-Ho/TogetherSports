const PersonalInfo = () => {
  return (
    <>
      <div className="bg-container">
        <h1>회원가입</h1>
        <div className="title">
          <div>
            <div className="title-circle-personalinfo"></div>
            <p>인적사항</p>
          </div>
          <div>
            <div className="title-circle-interest"></div>
            <p>관심종목</p>
          </div>
          <div>
            <div className="title-circle-activearea"></div>
            <p>활동지역</p>
          </div>
        </div>
        <div className="content-showbox">
          <div className="nickname">
            <div className="text-nickname">닉네임</div>
            <input type="text" id="input-nickname" />
            <button className="button-dup-check">중복확인</button>
          </div>
          <div className="birth">
            <div className="text-birth">생년월일</div>
            <div className="year">
              <select className="dropdown-year">
                <option>1998</option>
                <option>1997</option>
                <option>1996</option>
                <option>1995</option>
                <option>1994</option>
                <option>1993</option>
                <option>1992</option>
                <option>1991</option>
                <option>1990</option>
              </select>
              <span className="text-year">년</span>
            </div>
            <div className="month">
              <select className="dropdown-month">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
              </select>
              <span className="text-month">월</span>
            </div>
            <div className="day">
              <select className="dropdown-day">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
                <option>7</option>
                <option>8</option>
                <option>9</option>
                <option>10</option>
                <option>11</option>
                <option>12</option>
                <option>13</option>
                <option>14</option>
                <option>15</option>
                <option>16</option>
                <option>17</option>
                <option>18</option>
                <option>19</option>
                <option>20</option>
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
                <option>26</option>
                <option>27</option>
                <option>28</option>
                <option>29</option>
                <option>30</option>
                <option>31</option>
              </select>
              <span className="text-day">일</span>
            </div>
          </div>
          <div className="gender">
            <div className="text-gender">성별</div>
            <div>
              <input type="radio" id="male" />
              <label>남</label>
            </div>
            <div>
              <input type="radio" id="female" />
              <label>여</label>
            </div>
          </div>
        </div>
        <button className="button-next">다음</button>
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

        h1 {
          padding: 35px 0;
          font-family: "NanumBarunGothic";
          font-weight: bold;
          font-size: 2.5rem;
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
          border: 1px solid #e4e8eb;
          background-color: #e4e8eb;
          width: 90px;
          height: 90px;
          margin: 10px;
        }

        .title-circle-personalinfo {
          background-color: #468f5b;
        }

        p {
          display: flex;
          justify-content: center;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
          align-items: center;
          margin: 5px 0;
        }

        .content-showbox {
          width: 600px;
          border-top: 1px solid #e4e8eb;
          border-bottom: 1px solid #e4e8eb;
        }

        .nickname {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          border-radius: 10px;
          border: solid 1px #e8e8e8;
          background-color: #fff;
          display: flex;
          justify-content: space-between;
        }

        .text-nickname {
          width: 45px;
          height: 30px;
          font-weight: bold;
          font-size: 1.5em;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #input-nickname {
          width: 430px;
          height: 30px;
          border-style: none;
          font-size: 1.5em;
          padding: 5px;
        }

        .button-dup-check {
          width: 70px;
          background-color: #08555f;
          color: white;
          font-family: "NanumBarunGothic";
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 5px;
        }

        .birth {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
        }

        .text-birth {
          font-weight: bold;
          font-size: 1.5em;
        }

        .gender {
          width: 583px;
          height: 40px;
          margin: 44.5px 5.5px 27px;
          padding: 5px 10px 5px 14px;
          display: flex;
          justify-content: space-between;
        }

        .text-gender {
          font-weight: bold;
          font-size: 1.5em;
        }

        .button-next {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 120px;
          height: 40px;
          background-color: #08555f;
          color: white;
          font-size: 1.5rem;
          font-family: "NanumBarunGothic";
          margin-top: 25px;
          border: 0;
          outline: 0;
          cursor: pointer;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

export default PersonalInfo;
