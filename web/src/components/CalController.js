import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


const CalController = ({
  type,
  title,
  onArrowClick,
  onTypeClick,
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
        <div className="title">{title}</div>
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
          onClick={onTypeClick}
          className={classnames('btn secondary', { active: type === 'month'})}
        >
          월
        </button>
        <button
          name="week"
          type="button"
          onClick={onTypeClick}
          className={classnames('btn secondary', { active: type === 'week'})}
        >
          주
        </button>
      </section>
    </div>
  </article>
);

CalController.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  onArrowClick: PropTypes.func.isRequired,
  onTypeClick: PropTypes.func.isRequired,
}

export default CalController;
