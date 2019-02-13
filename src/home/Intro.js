import React from 'react';
import { Row, Col } from 'react-bootstrap';

export default function Intro() {
  return (
    <div style={{ marginTop: '20%' }}>
      <Row>
        <Col xs={6}>
          <img src={require('../../assets/images/fpt-logo.png')} alt="footer" className="img-responsive block-center" />
        </Col>
        <Col xs={6}>
          <img src={require('../../assets/images/cds-logo.png')} alt="footer" className="img-responsive block-center" />
        </Col>
      </Row>
    </div>
  );
}
