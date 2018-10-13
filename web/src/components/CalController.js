import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const CalController = ({
  type,
  currentDate,
  onArrowClick,
  onTypeChange,
}) => (
  <article className="controller">
    <div className="controller-wrapper">
      <section className="date-control">
        <button
          name="previous"
          type="button"
          className="btn arrow left"
          onClick={onArrowClick}
        />
        <div className="title">{currentDate.format('YYYY년 MM월')}</div>
        <button
          name="next"
          type="button"
          className="btn arrow right"
          onClick={onArrowClick}
        />
      </section>
      <section className="type-control">
        <button
          name="month"
          type="button"
          onClick={onTypeChange}
          className={classnames('btn primary', { active: type === 'month'})}
        >
          월
        </button>
        <button
          name="week"
          type="button"
          onClick={onTypeChange}
          className={classnames('btn primary', { active: type === 'week'})}
        >
          주
        </button>
      </section>
    </div>
  </article>
);

CalController.propTypes = {
  type: PropTypes.string.isRequired,
  currentDate: PropTypes.object.isRequired,
  onArrowClick: PropTypes.func.isRequired,
  onTypeChange: PropTypes.func.isRequired,
}

export default CalController;
