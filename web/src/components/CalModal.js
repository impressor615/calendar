import React from 'react';
import PropTypes from 'prop-types';

import Modal, { ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import DateRange from 'components/DateRange';


const CalModal = ({
  isOpen,
  isLoading,
  onToggle,
  onChange,
  onDateChange,
  onSubmit,
  event,
}) => (
  <Modal
    isOpen={isOpen}
    className="cal-modal"
  >
    <ModalDialog>
      <ModalHeader onToggle={onToggle}>
        일정 추가 및 변경
      </ModalHeader>
      <ModalBody>
        <input
          id="title"
          type="text"
          placeholder="일정 제목을 입력해주세요!"
          onChange={onChange}
          value={event.title}
        />
        <DateRange
          startDate={event.start_date}
          endDate={event.end_date}
          onChange={onDateChange}
        />
      </ModalBody>
      <ModalFooter>
        <button
          className="btn primary"
          onClick={onToggle}
        >
          취소
        </button>
        <button
          className="btn primary"
          onClick={() => {}}
        >
          삭제
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="submit-btn btn secondary"
          disabled={isLoading}
        >
          저장
        </button>
      </ModalFooter>
    </ModalDialog>
  </Modal>
);

CalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default CalModal;
