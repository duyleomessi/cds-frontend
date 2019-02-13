/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import s from './Layout.css';
import { Grid, Row, Col } from 'react-bootstrap';

import Background from '../../assets/images/theme.png';

var backgroundStyle = {
  width: null,
  height: null,
  backgroundImage: "url(" + Background + ")"
}

class Layout extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    fadedFooter: PropTypes.bool,
  };

  render() {
    const { fadedFooter, ...rest } = this.props;
    let header;

    if (fadedFooter) {
      header = <header>
        <Grid>
          <Row>
            <Col xs={12}>
              <img style={{ padding: '15px 0 0 0' }} src={require('../../assets/images/header.png')} alt="footer" className="img-responsive" />
            </Col>
          </Row>
        </Grid>
      </header>
    }

    return (
      <div style={backgroundStyle} className={s.fullScreen}>
        {header}

        <section className="content">
          <Grid>
            <div {...rest} className={cx(s.content, this.props.className)} />
          </Grid>
        </section>

      </div>
    );
  }
}

export default Layout;
