import React from 'react';
import { Row, Col, Well, Table } from 'react-bootstrap';
import _ from 'lodash';
import moment from 'moment';
import cx from 'classnames';
import NumberEasing from './NumberEasing';
import s from './styles.css';
import gameUtils from '../../lib/gameUtils';

export default class RealTimeResult extends React.Component {
  zeroFill = ( number, width ) => {
    width -= number.toString().length;
    if ( width > 0 ) {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
  }

  render() {
    const { currentRoundInfo, title, currentRoundTimeLeft, isFinalRound, redTimeLeftInMillis, greenTimeLeftInMillis } = this.props;
    // time of the round
    const duration = moment.duration(currentRoundTimeLeft);
    const timer = `00:${this.zeroFill(duration.minutes(), 2)}:${this.zeroFill(duration.seconds(), 2)}`;
    // time stop of red team
    let showRedTimeLeft;
    // console.log('redTimeLeft: ', redTimeLeftInMillis);
    if (redTimeLeftInMillis <= 0) {
      showRedTimeLeft = false;
    } else {
      showRedTimeLeft = true;
    }
    const redTimeLeftDuration = moment.duration(redTimeLeftInMillis);
    const redTimeLeft = `${this.zeroFill(redTimeLeftDuration.seconds(), 2)}`;
    // time stop of green team
    let showGreenTimeLeft;
    if (greenTimeLeftInMillis <= 0) {
      showGreenTimeLeft = false;
    } else {
      showGreenTimeLeft = true;
    }
    const greenTimeLeftDuration = moment.duration(greenTimeLeftInMillis);
    const greenTimeLeft = `${this.zeroFill(greenTimeLeftDuration.seconds(), 2)}`;

    const roundResult = isFinalRound ? gameUtils.calculateFinalRoundResult(currentRoundInfo) : gameUtils.calculateRoundResult(currentRoundInfo);
    const { winner } = currentRoundInfo;
    let winnerDiv, isWon = false;

    if (_.isString(winner) && winner.length > 2) {
      isWon = true;
      winnerDiv = <Row style={{ textAlign: 'center', marginTop: 10 }}>
        <div className={cx(s.winnerName, s[`${winner}TeamText`])}>{currentRoundInfo[`${winner}Name`]}</div>
        <div className={s.winText}>ĐÃ CHIẾN THẮNG</div>
        {/* <Col xs={4} xsOffset={4}>
          <img src={require('../../assets/images/car_wow.png')} alt="footer" className={cx("img-responsive", s.centerImg)} />
        </Col> */}
      </Row>
    }

    return (
      <div style={{ marginTop: '10px' }}>
        <Row style={{ marginBottom: '5px' }}>
          <Col xs={3}>
            { !isFinalRound && showRedTimeLeft && <div className={cx(s.redTimer, s.timer)}>
              <strong>
                {redTimeLeft}
              </strong>
            </div> }
          </Col>

          {/* <Col xs={3}>
            <div className={s.lotteryResultTitle}><strong>{title}</strong></div>
          </Col>
           */}

          <Col xs={3}>
            { !isFinalRound && showGreenTimeLeft && <div className={cx(s.greenTimer, s.timer)}>
              <strong>
                {greenTimeLeft}
              </strong>
            </div> }
          </Col>

          { !isWon && <Col xs={3}>
            <Well className={cx("pull-right", s.timer)}>
              <strong>
                {timer}
              </strong>
            </Well>
          </Col> }
        </Row>
        {
          isWon ? winnerDiv : <Row>
            <Col xs={10}>
              <Table className={s.realtimeResultTable}>
                <thead>
                  <tr>
                    <th></th>
                    <th className={cx(s.teamName, s.redTeamText)}> { currentRoundInfo.redName } </th>
                    <th className={cx(s.teamName, s.greenTeamText)}> { currentRoundInfo.greenName } </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={s.resultTitle}>QUÃNG ĐƯỜNG</td>                    
                    <td><div className={s.resultValue}><NumberEasing value={roundResult.red.s} speed={300} /> m</div></td>
                    <td><div className={s.resultValue}><NumberEasing value={roundResult.green.s} speed={300} /> m</div></td>
                  </tr>
                  <tr>
                    <td className={s.resultTitle}>VẬN TỐC</td>
                    <td><div className={s.resultValue}><NumberEasing value={roundResult.red.v} speed={300} /> km/h</div></td>
                    <td><div className={s.resultValue}><NumberEasing value={roundResult.green.v} speed={300} /> km/h</div></td>
                  </tr>
                  <tr>
                    <td className={s.resultTitle}>THỜI GIAN</td>
                    <td><div className={s.resultValue}> {roundResult.red.t} </div></td>
                    <td><div className={s.resultValue}> {roundResult.green.t} </div></td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        }
      </div>
    )
  }
}
