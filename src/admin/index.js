import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, ButtonToolbar, Form, FormControl, Row, Col, FormGroup, ControlLabel } from 'react-bootstrap';
import AdminLayout from '../../components/AdminLayout';
import socket from '../socket';

class AdminPage extends React.Component {
  state = {
    team1: '',
    team2: '',
    team3: '',
    team4: '',
    team5: '',
    team6: '',
    team7: '',
    team8: '',
  }

  componentDidMount() {
    setTimeout(() => {
      if (_.isArray(this.props.teams) && this.props.teams.length === 8) {
        const state = {};
        _.each(_.range(1, 9), i => state[`team${i}`] = this.props.teams[i-1].name);
        this.setState(state);
      }
    }, 1000);
  }

  //  team list
  handleTeamChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  handleUpdateTeamList = (e) => {
    socket.emit('admin/updateTeamList', {
      teams: _.pick(this.state, _.map(_.range(1,9), i => `team${i}`))
    });
  }

  // round 1
  handleCreateRounds = (e) => {
    let confirm = window.confirm("Tất cả các kết quả thi đấu sẽ bị xoá và không thể khôi phục. Bạn có chắc chắn muốn tạo lại cặp thì đấu không?");
    if (confirm) socket.emit('admin/createRounds', {});
  }

  handleRoundChange = (e) => {
    this.props.dispatch({
      type: 'ADMIN_CHANGE_SELECTED_ROUND',
      data: e.target.value,
    });

    socket.emit('admin/changeRound', { id: e.target.value });
  }

  handleChangeScreen = (e) => {
    socket.emit('broadcast', {emitName: 'remote_dispatch', payload: {
      type: 'CHANGE_SCREEN',
      data: e.target.id,
    }});
  }

  handleResetRound = () => {
    let confirm = window.confirm("Kết quả thi đấu của hai đội sẽ bị xoá vĩnh viễn! Bạn có chắc chứ?");
    if (confirm) socket.emit('admin/resetRound', {});
  }

  handleStartRace = () => {
    socket.emit('broadcast', {emitName: 'remote_dispatch', payload: {
      type: 'CHANGE_SCREEN',
      data: 'REAL_TIME_RESULT',
    }});
    window.alert("Trận đấu sẽ được bắt đầu sau khi bạn bấm phím OK!");
    socket.emit('admin/startRace', {});
  }

  // Semi Final Round
  handleCreateSemiFinalRound = (e) => {
    let confirm = window.confirm("Tất cả các kết quả thi đấu sẽ bị xoá và không thể khôi phục. Bạn có chắc chắn muốn tạo lại cặp thì đấu không?");
    if (confirm) socket.emit('admin/createSemiFinalRounds', {});
  }

  handleSemiFinalRoundChange = (e) => {
    this.props.dispatch({
      type: 'ADMIN_CHANGE_SELECTED_SEMI_FINAL_ROUND',
      data: e.target.value,
    });

    socket.emit('admin/changeSemiFinalRound', { id: e.target.value });
  }

  handleStartSemiFinalRace = () => {
    socket.emit('broadcast', {emitName: 'remote_dispatch', payload: {
      type: 'CHANGE_SCREEN',
      data: 'REAL_TIME_RESULT_SEMI_FINAL',
    }});
    window.alert("Trận đấu sẽ được bắt đầu sau khi bạn bấm phím OK!");
    socket.emit('admin/startSemiFinalRace', {});
  }

  handleResetSemiFinalRound = () => {
    let confirm = window.confirm("Kết quả thi đấu của hai đội sẽ bị xoá vĩnh viễn! Bạn có chắc chứ?");
    if (confirm) socket.emit('admin/resetSemiFinalRound', {});
  }


  // Final Round
  handleCreateFinalRound = (e) => {
    let confirm = window.confirm("Tất cả các kết quả thi đấu sẽ bị xoá và không thể khôi phục. Bạn có chắc chắn muốn tạo lại cặp thì đấu không?");
    if (confirm) socket.emit('admin/createFinalRounds', {});
  }

  handleFinalRoundChange = (e) => {
    this.props.dispatch({
      type: 'ADMIN_CHANGE_SELECTED_FINAL_ROUND',
      data: e.target.value,
    });

    socket.emit('admin/changeFinalRound', { id: e.target.value });
  }

  handleStartFinalRace = () => {
    socket.emit('broadcast', {emitName: 'remote_dispatch', payload: {
      type: 'CHANGE_SCREEN',
      data: 'REAL_TIME_RESULT_FINAL',
    }});
    window.alert("Trận đấu sẽ được bắt đầu sau khi bạn bấm phím OK!");
    socket.emit('admin/startFinalRace', {});
  }

  handleResetFinalRound = () => {
    let confirm = window.confirm("Kết quả thi đấu của hai đội sẽ bị xoá vĩnh viễn! Bạn có chắc chứ?");
    if (confirm) socket.emit('admin/resetFinalRound', {});
  }


  render() {
    return (
      <AdminLayout>
        <div style={{ marginBottom: 15 }}>
          <span style={{ marginRight: 10 }}><strong>Chuyển màn hình:</strong></span>
          <ButtonToolbar style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Button bsSize="small" id="INTRO" onClick={this.handleChangeScreen}>Giới thiệu</Button>
            <Button bsSize="small" id="LEADERBOARD" onClick={this.handleChangeScreen}>Bảng xếp hạng vòng 1</Button>
            <Button bsSize="small" id="LEADERBOARD_2" onClick={this.handleChangeScreen}>Bảng xếp hạng vòng 2</Button>
            {/* <Button bsSize="small" id="FINAL_RESULT" onClick={this.handleChangeScreen}>Kết quả chung cuộc</Button> */}
          </ButtonToolbar>
        </div>
        <div>
          <span><strong>1. Nhập danh sách 8 đội:</strong></span>
          <Form style={{ marginTop: 5 }}>
            <Row>
              <Col xs={6}>
                { _.map(_.range(1, 5), i => (<FormControl
                  style={{ marginBottom: 5 }}
                  key={i}
                  id={`team${i}`}
                  type="text"
                  value={this.state[`team${i}`]}
                  placeholder={`Team ${i}`}
                  onChange={this.handleTeamChange}
                />)) }
              </Col>
              <Col xs={6}>
                { _.map(_.range(5, 9), i => (<FormControl
                  style={{ marginBottom: 5 }}
                  key={i}
                  id={`team${i}`}
                  type="text"
                  value={this.state[`team${i}`]}
                  placeholder={`Team ${i}`}
                  onChange={this.handleTeamChange}
                />)) }
              </Col>
            </Row>
            <Row>
              <Col xs={12} style={{ marginTop: 10 }}>
                <Button bsStyle="primary" onClick={this.handleUpdateTeamList}>A. Cập nhật danh sách đội</Button>
                <Button bsStyle="primary" id="TEAM_LIST" style={{ marginLeft: 10 }} onClick={this.handleChangeScreen}>B. Chuyển sang màn hình danh sách đội</Button>                                  
              </Col>
            </Row>
            <Row style={{ marginBottom: 30, marginTop: 10 }}>
              <Col xs={12}>
                <Button bsStyle="success" onClick={this.handleCreateRounds}>C. Tạo cặp thi đấu vòng 1</Button>      
              </Col>  
            </Row>
          </Form>
        </div>

        {/* bat dau thi dau vong 1 */}
        <div>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>2. Thi đấu vòng 1:</ControlLabel>
              <div style={{ marginBottom: 10 }}><Button id="REAL_TIME_RESULT" onClick={this.handleChangeScreen}>A. Chuyển sang màn hình thi đấu vòng 1</Button></div>
              <FormControl value={this.props.selectedRound} onChange={this.handleRoundChange} componentClass="select" placeholder="Chọn cặp thi đấu">
                {_.map(this.props.rounds, r => (
                  <option key={r._id} value={r._id}>{`${r.redName} - ${r.greenName}`}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Form>
        </div>
        <div>
          <ButtonToolbar style={{ display: 'inline-block', verticalAlign: 'middle' }}>
            <Button bsStyle="primary" onClick={this.handleStartRace}>B. Bắt đầu thi đấu</Button>            
            <Button bsStyle="danger" onClick={this.handleResetRound}>Reset kết quả cặp đang chọn</Button>            
          </ButtonToolbar>
        </div>
        <div style={{ marginBottom: 30, marginTop: 10 }}>
            <Button bsStyle="success" onClick={this.handleCreateSemiFinalRound}>C. Tạo cặp thi đấu vòng bán kết</Button>          
        </div>
        {/* <div style={{ marginTop: 10 }}>
          <Button id="SEMI_FINAL_BOARD" onClick={this.handleChangeScreen}>D. Chuyển sang màn hình ghép cặp bán kết</Button>
        </div> */}
        {/* ket thu thi dau vong 1 */}

        {/* bat dau thi dau vong 2 */}
        <div>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>3. Thi đấu vòng bán kết:</ControlLabel>
              <div style={{ marginBottom: 10 }}><Button id="REAL_TIME_RESULT_SEMI_FINAL" onClick={this.handleChangeScreen}>A. Chuyển sang màn hình thi đấu vòng 2</Button></div>
              <FormControl value={this.props.selectedSemiFinalRound} onChange={this.handleSemiFinalRoundChange} componentClass="select" placeholder="Chọn cặp thi đấu">
                {_.map(this.props.semiFinalRounds, r => (
                  // <option key={r._id} value={r._id}>{`${r.redName} - ${r.greenName}`}</option>
                  <option key={r._id} value={r._id}>{`${r.isChampionRound ? '** CHUNG KẾT ** ' : ''}${r.greenName} - ${r.redName}${r.isChampionRound ? ' ** CHUNG KẾT **' : ''}`}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Form>
        </div>
        <div>
          <ButtonToolbar style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: 30 }}>
            <Button bsStyle="primary" onClick={this.handleStartSemiFinalRace}>B. Bắt đầu thi đấu</Button>            
            <Button bsStyle="danger" onClick={this.handleResetSemiFinalRound}>Reset kết quả cặp đang chọn</Button>            
          </ButtonToolbar>
        </div>
        <div style={{ marginBottom: 30, marginTop: 10 }}>
            <Button bsStyle="success" onClick={this.handleCreateFinalRound}>C. Tạo cặp thi đấu vòng chung kết</Button>          
        </div>

        {/* bat dau thi dau vong 3 */}
        {/* <div>
          <Form>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>3. Thi đấu vòng chung kết:</ControlLabel>
              <div style={{ marginBottom: 10 }}><Button id="REAL_TIME_RESULT_FINAL" onClick={this.handleChangeScreen}>A. Chuyển sang màn hình thi đấu vòng 2</Button></div>
              <FormControl value={this.props.selectedFinalRound} onChange={this.handleFinalRoundChange} componentClass="select" placeholder="Chọn cặp thi đấu">
                {_.map(this.props.finalRounds, r => (
                  <option key={r._id} value={r._id}>{`${r.redName} - ${r.greenName}`}</option>
                ))}
              </FormControl>
            </FormGroup>
          </Form>
        </div>
        <div>
          <ButtonToolbar style={{ display: 'inline-block', verticalAlign: 'middle', marginBottom: 30 }}>
            <Button bsStyle="primary" onClick={this.handleStartFinalRace}>B. Bắt đầu thi đấu</Button>            
            <Button bsStyle="danger" onClick={this.handleResetFinalRound}>Reset kết quả cặp đang chọn</Button>            
          </ButtonToolbar>
        </div> */}
        
      </AdminLayout>
    )
  }
}

const mapStateToProps = state => state.admin;

export default connect(mapStateToProps)(AdminPage);
