import React from 'react';


const CalController = () => (
  <article className="controller">
    <section className="date-control">
      <button type="button" className="btn arrow left" />
      <div className="title">2018년 10월</div>
      <button type="button" className="btn arrow right" />
    </section>
    <section className="type-control">
      <button type="button" className="btn secondary">월</button>
      <button type="button" className="btn secondary">주</button>
    </section>
  </article>
);

export default CalController;
