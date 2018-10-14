import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withContext } from 'AppContext';
import Modal, { ModalDialog, ModalHeader, ModalBody, ModalFooter } from 'components/Modal';
import DateRange from 'components/DateRange';
import Button from 'components/Button';
import { postEvent, deleteEvent, updateServerEvent } from 'utils/fetchUtils';
import { getErrorMsg } from 'utils/errorUtils';
import CONSTANTS from '../constants';


const { NOTIFICATION } = CONSTANTS;
class CalModal extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUpdate(e) {
    e.preventDefault();
    const {
      event,
      events,
      notify,
      setLoading,
      onToggle,
      updateEvents,
    } = this.props;
    const { _id, title, start_date, end_date } = event;
    if(!_id || !title || !start_date || !end_date) {
      return;
    }

    const putData = {
      title,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
    };
    setLoading();
    updateServerEvent(_id, putData, events)
      .then((newEvents) => {
        setLoading();
        updateEvents(newEvents)
        onToggle();
        notify(({
          type: 'success',
          message: NOTIFICATION.update,
        }));
      }, (error) => {
        setLoading();
        const message = getErrorMsg(error)
        this.notify({ message });
      });
  }


  onDelete(e) {
    e.preventDefault();
    if (!window.confirm('정말 삭제하시겠습니까?')) {
      return;
    }

    const {
      event,
      events,
      notify,
      setLoading,
      updateEvents,
      onToggle,
    } = this.props;
    const { _id } = event;
    if (!_id) {
      return;
    }

    setLoading();
    deleteEvent(_id, events)
      .then((newEvents) => {
        setLoading();
        updateEvents(newEvents);
        onToggle();
        notify({
          type: 'success',
          message: NOTIFICATION.delete,
        });
      }, (error) => {
        setLoading();
        const message = getErrorMsg(error);
        notify({ message });
      });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      event,
      events,
      notify,
      onToggle,
      setLoading,
      updateEvents,
    } = this.props;
    const { title, start_date, end_date } = event;
    const postData = {
      title,
      start_date: start_date.toISOString(),
      end_date: end_date.toISOString(),
    };
    setLoading();
    postEvent(postData, events)
      .then((newEvents) => {
        setLoading();
        updateEvents(newEvents);
        onToggle();
        notify({
          type: 'success',
          message: NOTIFICATION.create,
        });
      }, (error) => {
        setLoading();
        const message = getErrorMsg(error);
        notify({ message });
      });
  }

  render() {
    const {
      isOpen,
      isLoading,
      onToggle,
      onChange,
      onDateChange,
      event,
    } = this.props;
    const { _id } = event;
    const onFormSubmit = _id ? this.onUpdate : this.onSubmit;
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
              <Button onClick={onToggle} className="close-btn" color="primary">취소</Button>
              { event._id ? <Button onClick={this.onDelete} className="delete-btn" color="primary">삭제</Button> : null }
              <Button type="submit" disabled={isLoading} className="submit-btn" color="secondary">저장</Button>
            </ModalFooter>
          </form>
        </ModalDialog>
      </Modal>
    );
  }
}

CalModal.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
  updateEvents: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withContext(CalModal);
export const PureCalModal = CalModal;
