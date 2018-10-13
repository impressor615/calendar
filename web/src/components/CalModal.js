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
  onUpdate,
  onDelete,
  onSubmit,
  event,
}) => {
  const { _id } = event;
  const onFormSubmit = _id ? onUpdate : onSubmit;
  return (
    <Modal
      isOpen={isOpen}
      onToggle={onToggle}
      className="cal-modal"
    >
      <ModalDialog>
        <ModalHeader onToggle={onToggle}>
          일정 추가 및 변경
        </ModalHeader>
        <form onSubmit={onFormSubmit}>
          <ModalBody>
            <input
              id="title"
              type="text"
              placeholder="일정 제목을 입력해주세요!"
              onChange={onChange}
              value={event.title}
              required
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
              event._id ? (
                <button onClick={onDelete} className="delete-btn btn primary">
                  삭제
                </button>
              ) : null
            }
            <button
              type="submit"
              disabled={isLoading}
              className="submit-btn btn secondary"
            >
              저장
            </button>
          </ModalFooter>
        </form>
      </ModalDialog>
    </Modal>
  );
};

CalModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default CalModal;
