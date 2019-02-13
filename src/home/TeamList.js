import React from 'react';
import { Row, Col, Well } from 'react-bootstrap';
import _ from 'lodash';
import cx from 'classnames';
import s from './styles.css';

export default class TeamList extends React.Component {
  render() {
    const { teams } = this.props;

    return (
      <div style={{ marginTop: '10px' }}>
        <Row style={{ marginBottom: '30px' }}>
          <Col xs={6} xsOffset={3}>
            <div className={s.lotteryResultTitle}><strong>KẾT QUẢ BỐC THĂM THỨ TỰ THI ĐẤU</strong></div>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            { teams.length === 8 && _.map(_.range(0, 8, 2), i => (
              <div key={teams[i]._id} className={cx(s.teamBlock, s.redTeam)}>
                { `${i + 1}. ${teams[i].name}` }
              </div>
            ))}
          </Col>

          <Col xs={2}>
            {/* <img src={require('../../assets/images/car_phankhich.png')} alt="footer" className="img-responsive" /> */}
          </Col>
            
          <Col xs={3} xsOffset={2}>
            { teams.length === 8 && _.map(_.range(1, 9, 2), i => (
              <div key={teams[i]._id} className={cx(s.teamBlock, s.greenTeam)}>
                { `${i + 1}. ${teams[i].name}` }
              </div>
            ))}
          </Col>

          
        </Row>
      </div>
    )
  }
}
