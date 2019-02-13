import moment from 'moment';
import _ from 'lodash';

const POINT_TO_DISTANCE_FROM_START = {
  START: 0,
  1: 6.8,
  2: 13.9,
  3: 27.5,
  4: 35.6,
  5: 42.4,
}

const POINT_TO_DISTANCE_FROM_START_FINAL = {
  START: 0,
  1: 10.0,
  2: 20.0,
  3: 30.0,
  4: 40.0,
  5: 50.0,
  6: 60.0,
  7: 70.0,
  8: 80.0,
  9: 90.0,
  10: 100.0,
  11: 110.0,
  12: 120.0,
  13: 130.0,
  14: 140.0,
}

function zeroFill( number, width ) {
  width -= number.toString().length;
  if ( width > 0 ) {
    return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
  }
  return number + ""; // always return a string
}

function getFormattedTime(timeInSeconds) {
  const duration = moment.duration(timeInSeconds * 1000);
  return `00:${zeroFill(duration.minutes(), 2)}:${zeroFill(duration.seconds(), 2)}`;
}

export default {
  calculateRoundResult: (round) => {
    const [greenLastPoint, greenLastTime] = round.greenResults[round.greenResults.length - 1].split(':');
    const [redLastPoint, redLastTime] = round.redResults[round.redResults.length - 1].split(':');
    // console.log("round.greenResults: ", round.greenResults);
    
    let result = {
      green: {
        s: POINT_TO_DISTANCE_FROM_START[greenLastPoint],
        v: ((POINT_TO_DISTANCE_FROM_START[greenLastPoint]/parseFloat(greenLastTime)) * 3.6).toFixed(2) || 0,
        t: ' ',
      },
      red: {
        s: POINT_TO_DISTANCE_FROM_START[redLastPoint],
        v: ((POINT_TO_DISTANCE_FROM_START[redLastPoint]/parseFloat(redLastTime)) * 3.6).toFixed(2) || 0,
        t: ' ',
      }
    }

    if (greenLastPoint === 'START') {
      result.green.v = 0;
    }

    if (redLastPoint === 'START') {
      result.red.v = 0;
    }

    // Find best time
    const greenFinishResults = round.greenResults.filter(r => ~r.indexOf('5:')).map(r => parseFloat(r.split(':')[1]));
    const redFinishResults = round.redResults.filter(r => ~r.indexOf('5:')).map(r => parseFloat(r.split(':')[1]));
    
    if (greenFinishResults.length > 0) {
      const greenBestResult = _.min(greenFinishResults);
      result.green.t = getFormattedTime(greenBestResult);
    }

    if (redFinishResults.length > 0) {
      const redBestResult = _.min(redFinishResults);
      result.red.t = getFormattedTime(redBestResult)
    }

    return result;
  },
  
  getDistanceAndTimeFromResult: (result) => {
    if (!result) return {
      distance: '',
      time: '',
    }

    const [point, time] = result.split(':');
    return {
      distance: POINT_TO_DISTANCE_FROM_START[point] + ' m',
      time: time === 'START' ? '00:00:00' : getFormattedTime(parseFloat(time)),
    }
  },

  calculateFinalRoundResult: (round) => {
    const [greenLastPoint, greenLastTime] = round.greenResults[round.greenResults.length - 1].split(':');
    const [redLastPoint, redLastTime] = round.redResults[round.redResults.length - 1].split(':');
    // console.log("round.greenResults: ", round.greenResults);
    
    let result = {
      green: {
        s: POINT_TO_DISTANCE_FROM_START_FINAL[greenLastPoint],
        v: ((POINT_TO_DISTANCE_FROM_START_FINAL[greenLastPoint]/parseFloat(greenLastTime)) * 3.6).toFixed(2) || 0,
        t: ' ',
      },
      red: {
        s: POINT_TO_DISTANCE_FROM_START_FINAL[redLastPoint],
        v: ((POINT_TO_DISTANCE_FROM_START_FINAL[redLastPoint]/parseFloat(redLastTime)) * 3.6).toFixed(2) || 0,
        t: ' ',
      }
    }

    if (greenLastPoint === 'START') {
      result.green.v = 0;
    }

    if (redLastPoint === 'START') {
      result.red.v = 0;
    }

    // Find best time
    const greenFinishResults = round.greenResults.filter(r => ~r.indexOf('14:')).map(r => parseFloat(r.split(':')[1]));
    const redFinishResults = round.redResults.filter(r => ~r.indexOf('14:')).map(r => parseFloat(r.split(':')[1]));
    
    if (greenFinishResults.length > 0) {
      const greenBestResult = _.min(greenFinishResults);
      result.green.t = getFormattedTime(greenBestResult);
    }

    if (redFinishResults.length > 0) {
      const redBestResult = _.min(redFinishResults);
      result.red.t = getFormattedTime(redBestResult)
    }

    return result;
  },
  
  getDistanceAndTimeFromResultFinal: (result) => {
    if (!result) return {
      distance: '',
      time: '',
    }

    const [point, time] = result.split(':');
    return {
      distance: POINT_TO_DISTANCE_FROM_START_FINAL[point] + ' m',
      time: time === 'START' ? '00:00:00' : getFormattedTime(parseFloat(time)),
    }
  }
}
