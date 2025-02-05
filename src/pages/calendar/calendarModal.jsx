import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

class MyCalendar extends Component {
  constructor(props) {
    super(props);

    // 🔹 초기 state 설정
    this.state = {
      events: [], // 기존 이벤트 목록
      newEvent: {
        content_title: "",
        description: "",
        location: "",
        start: "",
        end: "",
      },
      showModal: false, // 모달 여부 (옵션)
    };
  }

  // 🔹 일정 추가 함수
  handleSave = () => {
    const { newEvent } = this.state; // 🔹 newEvent 가져오기

    if (!newEvent.content_title || !newEvent.start) {
      alert("제목과 시작 날짜를 입력하세요.");
      return;
    }

    // 새 이벤트 객체 생성
    const event = {
      title: `${newEvent.content_title} - ${newEvent.description}`,
      start: newEvent.start,
      end: newEvent.end,
      location: newEvent.location,
    };

    // 🔹 기존 이벤트 목록에 추가
    this.setState((prevState) => ({
      events: [...prevState.events, event],
      newEvent: {
        content_title: "",
        description: "",
        location: "",
        start: "",
        end: "",
      },
      showModal: false,
    }));
  };

  render() {
    const { isModal, setOpenCalendar } = this.props;
    const { events } = this.state;

    return (
      <div className="overlay">
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={[
              ...events, // 🔹 동적으로 추가된 이벤트 포함
              { title: "2개의 예약", date: "2025-02-05" },
              { title: "1개의 예약", date: "2025-02-10" },
            ]}
          />
          {isModal ? (
            <>
              <button
                className="closeBtn"
                onClick={() => setOpenCalendar(false)}
              >
                닫기
              </button>
              <button
                className="newReservation"
                onClick={this.handleSave} // 🔹 this.handleSave로 바인딩
              >
                일정 추가
              </button>
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

export default MyCalendar;
