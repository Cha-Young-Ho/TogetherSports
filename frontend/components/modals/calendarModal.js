import Calendar from "../calendar/calendar";

const CalendarModal = ({ open, close }) => {
  return (
    <>
      <div className={open ? "openModal modal" : "modal"}>
        <div className="calendarModal">
          {open ? <Calendar /> : null}
          <button className="exit-button" onClick={close}>
            &times;
          </button>
        </div>
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

        .modal.openModal {
          display: flex;
          align-items: center;
          justify-content: center;
          /* 팝업이 열릴때 스르륵 열리는 효과 */
          animation: modal-bg-show 0.3s;
        }

        .calendarModal {
          width: 400px;
          border-radius: 12px;
          box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.16);
          margin-bottom: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .exit-button {
          width: 400px;
          height: 50px;
          border: none;
          cursor: pointer;
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

export default CalendarModal;
