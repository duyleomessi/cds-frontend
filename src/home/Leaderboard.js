import React from 'react';
import { Row, Col, Well, Table } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import cx from 'classnames';
import s from './styles.css';
import gameUtils from '../../lib/gameUtils';

export default class Leaderboard extends React.Component {
  render() {
    const { leaderboard, title } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <Row style={{ marginBottom: '5px' }}>
          <Col xs={6} xsOffset={3}>
            <div className={s.lotteryResultTitle}><strong>{title}</strong></div>
          </Col>
        </Row>
        <Row>
          <Col xs={2} style={{ marginTop: 140 }}>
            {/* <img src={require('../../assets/images/car_cangthang.png')} alt="footer" className={cx("img-responsive", s.centerImg)} /> */}
          </Col>
          <Col xs={10}>
            <Table className={s.resultTable}>
              <thead>
                <tr>
                  <th>Đội thi <br/>(theo thứ tự)</th>
                  <th>Quãng đường</th>
                  <th>Thời gian</th>
                </tr>
              </thead>
              <tbody>
                {_.map(_.range(1, 11), i => {
                  const teamName = _.get(leaderboard, `${i-1}.teamName`);
                  const {distance, time} = gameUtils.getDistanceAndTimeFromResult(_.get(leaderboard, `${i-1}.finalResult`));

                  return <tr key={i}>
                    <td>{teamName ? `${i}. ${teamName}` : ''}</td>
                    <td>{distance}</td>
                    <td>{time}</td>
                  </tr>
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    )
  }
}
