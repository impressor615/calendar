import React from 'react';
import PropTypes from 'prop-types';

import { withContext } from 'AppContext';
import Arrow from 'components/Arrow';
import Button from 'components/Button';
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
        <Button name="month" onClick={onTypeChange} color="primary" active={type === 'month'}>월</Button>
        <Button name="week" onClick={onTypeChange} color="primary" active={type === 'week'}>주</Button>
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

export default withContext(CalController);
export const PureCalController = CalController;
