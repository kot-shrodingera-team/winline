/* eslint-disable no-underscore-dangle */
import { log } from '@kot-shrodingera-team/germes-utils';
import { JsFailError } from '@kot-shrodingera-team/germes-utils/errors';
import coefficientHelper from './coefficientHelper';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
const createCoupon = (line: any, oddNumber: any): unknown => {
  // if (line.isLive === 0) {
  //   throw new JsFailError('Не лайв ставка');
  // }
  const { idEvent, tipLine } = line;
  const event = apiWlb.getEvents().byId(idEvent);
  if (event === undefined) {
    throw new JsFailError('Событие не найдено!');
  }

  const sport = apiWlb.getSports().byId(event.idSport);
  const country = apiWlb.getCountries().byId(event.idCountry);
  const championship = apiWlb.getChampionships().byId(event.idChampionship);

  const koef = line.koef ? line.koef : '';
  const { freeTextR } = tipLine;
  const bet = {
    oddNumer: oddNumber,
    idLine: line.id,
    idTipMarket: line.idTipMarket,
    koef,
    favorite: line.favorite,
    idTipSample: tipLine.idTipSample,
    isLive: event.isLive,
    state: event.state !== 2 ? 0 : 2,
    isOD: event.isOD,
    isSpecial: event.isSpecial ? event.isSpecial : 0,
    isLiveOutrights: event.isLiveOutrights,
    idEvent: event.id,
    idSport: event.idSport,
    idCountry: event.idCountry,
    idChampionship: event.idChampionship,
    idRadar: event.idRadar,
    numer: event.numer,
    sportName: sport ? sport.name : null,
    countryName: country ? country.name : null,
    championshipName: championship ? championship.name : null,
    members: [] as unknown[],
    date: new Date(),
    Free: freeTextR,
    R: tipLine.R[oddNumber - 1],
    V: null as unknown,
    V_: null as unknown,
    RTitle: null as unknown,
    dif: 0,
    din: 0,
    freebetstate: 0,
    freebet: [] as unknown[],
    freeselect: 0,
    freebetsuma: 0,
    Dif: '',
    index: 0,
    Close: null as unknown,
    Up: null as unknown,
    Down: null as unknown,
    ordinarstate: 0,
    checkstate: !event.isOD,
    bonus: 0,
    suma: 0,
    viplata: ['0', '0'],
    MAX_SUM: 999999999,
    MAX_PAY: 999999999,
    maxSumServer: 999999999,
    maxSumServerDefault: 999999999,
    maxPayServer: 999999999,
    maxViplata: 999999999,
    maxPay: 0,
    maxSum: 0,
    maxSumReal: 0,
    isMaxShown: true,
    showMax: true,
    defaultselect: 0,
    clearAfterBet: !0,
    firstStrName: null as string,
  };
  [bet.members[0], bet.members[1]] = [event.members[0], event.members[1]];
  bet.date.setTime(event.date.getTime());
  bet.firstStrName = '';
  if (bet.isLiveOutrights) {
    [bet.members[0], bet.members[1]] = [line.members[0], line.members[1]];
    switch (event.tableType) {
      case 1:
        bet.firstStrName = line.members.join(' - ');
        bet.Free = event.name;
        bet.R = line.members[oddNumber - 1];
        break;
      case 2:
        bet.firstStrName = championship.name;
        bet.Free = event.name;
        [bet.R] = line.members;
        break;
      case 3:
        bet.firstStrName = championship.name;
        bet.Free = event.name;
        bet.R =
          line.members[0] +
          (oddNumber > 1 ? ` ${line.tipLine.R[oddNumber - 1]}` : '');
        break;
      default:
        log(`Live outrights unknown table type: ${event.tableType}`, 'crimson');
    }
    bet.V_ = line.V[oddNumber - 1];
    bet.V = bet.V_;
  } else if (bet.isSpecial === 1) {
    bet.firstStrName = bet.championshipName;
    bet.R = koef;
    bet.V_ = line.V[oddNumber - 1];
    bet.V = bet.V_;
    [bet.Free] = event.members;
  } else {
    bet.firstStrName = event.members.join(' - ');
    switch (tipLine.R[oddNumber - 1]) {
      case '1':
        [bet.R] = event.members;
        break;
      case '2':
        [, bet.R] = event.members;
        break;
      case 'X':
      case 'x':
        bet.R = 'ничья';
        break;
      default:
    }
    bet.V_ = line.V[oddNumber - 1];
    bet.V = bet.V_;
    if (
      bet.Free.indexOf('[a]') +
        bet.Free.indexOf('[b]') +
        bet.Free.indexOf('[c]') >
      -3
    ) {
      if (bet.Free.indexOf('[a]') > -1 && bet.koef.split('/')[0]) {
        bet.Free = bet.Free.replace('[a]', bet.koef.split('/')[0]);
      }
      if (bet.Free.indexOf('[b]') > -1 && bet.koef.split('/')[1]) {
        if (line.favorite) {
          const h = bet.koef.split('/')[1].replace('-', '');
          bet.Free = bet.Free.replace(
            '[b]',
            coefficientHelper.odds(h, line.favorite === oddNumber ? '-' : '+')
          );
        } else {
          bet.Free = bet.Free.replace('[b]', bet.koef.split('/')[1]);
        }
      }
      if (bet.Free.indexOf('[c]') > -1 && bet.koef.split('/')[2]) {
        bet.Free = bet.Free.replace('[c]', bet.koef.split('/')[2]);
      }
    } else if (line.koef.length && !line.isPlayerLine) {
      if (line.favorite) {
        if (line.favorite === oddNumber) {
          bet.Free += ` ${coefficientHelper.odds(bet.koef, '-')}`;
        } else {
          bet.Free += ` ${coefficientHelper.odds(bet.koef, '+')}`;
        }
      } else {
        bet.Free += ` ${coefficientHelper.totals(bet.koef)}`;
      }
    }
    bet.Free = apiWlb.getService('StringFormatService').formatGameSegments({
      sourceStr: bet.Free,
      sport,
      withAt: true,
    });
    bet.Free = bet.Free.replace('@1', event.members[0]).replace(
      '@2',
      event.members[1]
    );
    bet.R = bet.R.replace('@1', event.members[0]).replace(
      '@2',
      event.members[1]
    );
    if (line.isPlayerLine) {
      bet.R = `${line.playerName} (${event.members[line.playerTeam - 1]})`;
      if (
        line.tipLine.freeTextR.indexOf('[b]') === -1 &&
        line.extraKoef.length
      ) {
        bet.R = `${line.tipLine.R[oddNumber - 1]}, ${bet.R}`;
        bet.Free = `${bet.Free} ${line.extraKoef}`;
      }
    }
  }
  if (koef && koef.indexOf('1@') === -1 && koef.indexOf('2@') === -1) {
    bet.RTitle = `${bet.R} ${koef === bet.R ? '' : koef}`;
  } else {
    bet.RTitle = bet.R;
  }
  if (apiWlb.client.user /* && n.isSmat */) {
    apiWlb.getService('BetService').calculateMaxSite([bet], 0, 0);
  }
  return bet;
};

export default createCoupon;
