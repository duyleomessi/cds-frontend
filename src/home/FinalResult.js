import React from 'react';
import { Row, Col, Well, Table } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import cx from 'classnames';
import s from './styles.css';
import gameUtils from '../../lib/gameUtils';

export default class FinalResult extends React.Component {
  render() {
    const { leaderboard, title } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <Row style={{ marginBottom: '5px' }}>
          <Col xs={6} xsOffset={3}>
            <Well className={s.lotteryResultTitle}><strong>{title}</strong></Well>
          </Col>
          <Col xs={2}>
            <img style={{ marginTop: -27, marginLeft: -24 }} src={require('../../assets/images/car_wow.png')} alt="footer" className={cx("img-responsive", s.centerImg)} />
          </Col>
        </Row>
        <Row>
          
        </Row>
      </div>
    )
  }
}
