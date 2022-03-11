const UserInfoModal = ({ open, close }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        {open ? (
          <section>
            <header>
              {`마이프로필`}
              <button className="exit-button" onClick={close}>
                &times;
              </button>
            </header>
            <div className="profile-body">
              <div className="pf-image"></div>
              <div className="pf-nickName">임시 닉네임</div>
              <div className="pf-mannerPoint">10점</div>
              <div className="pf-interest">임시 종목들</div>
              <button className="next-button">회원 정보 수정하기</button>
            </div>
          </section>
        ) : null}
      </div>
      <style jsx>{`
        .modal {
          display: none;
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.6);
        }

        button {
          outline: none;
          cursor: pointer;
          border: 0;
        }

        section {
          width: 400px;
          height: 540px;
          width: 90%;
          max-width: 450px;
          margin: 0 auto;
          border-radius: 22px;
          background-color: #fff;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-show 0.3s;
          overflow: hidden;
        }

        header {
          width: 100%;
          height: 45px;
          position: relative;
          padding: 16px 16px 16px 16px;
          background-color: #f1f1f1;
          font-weight: bold;
        }

        .exit-button {
          position: absolute;
          top: 15px;
          right: 15px;
          width: 30px;
          font-size: 21px;
          font-weight: 700;
          text-align: center;
          color: #999;
          background-color: transparent;
        }

        .profile-body {
          width: 100%;
          height: 495px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          border-top: 1px solid #dee2e6;
        }

        .pf-image {
          width: 280px;
          height: 300px;
          border: 1px solid black;
          margin-bottom: 20px;
          border-radius: 22px;
        }

        .pf-nickName {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .pf-mannerPoint {
          font-size: 1.5rem;
          margin-bottom: 5px;
        }

        .pf-interest {
          margin-bottom: 10px;
        }

        .next-button {
          width: 300px;
          height: 40px;
          border-radius: 20px;
          background-color: #00555f;
          color: white;
          font-weight: 200px;
          font-size: 1.5rem;
        }

        .modal.openModal {
          display: flex;
          align-items: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        @keyframes modal-show {
          from {
            opacity: 0;
            margin-top: -50px;
          }
          to {
            opacity: 1;
            margin-top: 0;
          }
        }

        @keyframes modal-bg-show {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default UserInfoModal;
