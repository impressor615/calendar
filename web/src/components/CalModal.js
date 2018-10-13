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
  onDelete,
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
          onClick={onToggle}
          className="close-btn btn primary"
        >
          취소
        </button>
        {
          event._id
            ? (
              <button
                onClick={onDelete}
                className="delete-btn btn primary"
              >
                삭제
              </button>
            ) : null
        }
        <button
          type="submit"
          disabled={isLoading}
          onClick={onSubmit}
          className="submit-btn btn secondary"
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
  onDelete: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default CalModal;
