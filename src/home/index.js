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
import { connect } from 'react-redux';
import Intro from './Intro';
import TeamList from './TeamList';
import RealTimeResult from './RealTimeResult';
import Leaderboard from './Leaderboard';
import FinalResult from './FinalResult';
import Layout from '../../components/Layout';
import s from './styles.css';

class HomePage extends React.Component {

  static propTypes = {

  };

  componentDidMount() {
    document.title = "Cuoc dua so - Main Screen";
  }

  render() {
    const { currentScreen, teams, currentRoundInfo, currentRoundTimeLeft, leaderboard, redTimeLeftInMillis, greenTimeLeftInMillis } = this.props;
    let content;

    switch (currentScreen) {
      case 'INTRO':
        content = <Intro />
        break;
      case 'TEAM_LIST':
        content = <TeamList teams={teams} />
        break;
        
      case 'REAL_TIME_RESULT':
        content = <RealTimeResult title="ROUND 1" currentRoundInfo={currentRoundInfo} currentRoundTimeLeft={currentRoundTimeLeft} redTimeLeftInMillis={redTimeLeftInMillis} greenTimeLeftInMillis={greenTimeLeftInMillis}  />
        break;

      // semi final and final round both have same rule and screen
      case 'REAL_TIME_RESULT_SEMI_FINAL':
        content = <RealTimeResult title="ROUND 2" currentRoundInfo={currentRoundInfo} currentRoundTimeLeft={currentRoundTimeLeft} isFinalRound={true} />
        break;

      case 'REAL_TIME_RESULT_FINAL':
        content = <RealTimeResult title="ROUND 3" currentRoundInfo={currentRoundInfo} currentRoundTimeLeft={currentRoundTimeLeft} isFinalRound={true} />
        break;

      case 'LEADERBOARD':
        content = <Leaderboard title="KẾT QUẢ THI ĐẤU VÒNG 1" leaderboard={leaderboard} />
        break;

      case 'FINAL_RESULT':
        content = <FinalResult title="KẾT QUẢ CHUNG CUỘC" />
        break;
    }

    return (
      <Layout className={s.content} fadedFooter={currentScreen !== 'INTRO'}>
        { content }
      </Layout>
    );
  }

}

const mapStateToProps = state => state.main;

export default connect(mapStateToProps)(HomePage);
