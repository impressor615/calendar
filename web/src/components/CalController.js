import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Arrow from 'components/Arrow';
import { getCalendarTitle } from 'utils/dateUtils';


const CalController = ({
  type,
  currentDate,
  onArrowClick,
  onTypeChange,
}) => (
  <article className="controller">
    <div className="controller-wrapper">
      <section className="date-control">
        <Arrow name="previous" onClick={onArrowClick} />
        <div className="title">{getCalendarTitle(currentDate, type)}</div>
        <Arrow name="next" direction="next" onClick={onArrowClick} />
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
