export default {
  MOMENTS: {
    month: 'months',
    week: 'weeks',
  },
  DAY: ['일', '월', '화', '수', '목', '금', '토'],
  HOURS: [
    {
      text: '',
      code: '00',
    },
    {
      text: '오전 1시',
      code: '01',
    },
    {
      text: '오전 2시',
      code: '02',
    },
    {
      text: '오전 3시',
      code: '03',
    },
    {
      text: '오전 4시',
      code: '04',
    },
    {
      text: '오전 5시',
      code: '05',
    },
    {
      text: '오전 6시',
      code: '06',
    },
    {
      text: '오전 7시',
      code: '07',
    },
    {
      text: '오전 8시',
      code: '08',
    },
    {
      text: '오전 9시',
      code: '09',
    },
    {
      text: '오전 10시',
      code: '10',
    },
    {
      text: '오전 11시',
      code: '11',
    },
    {
      text: '오후 12시',
      code: '12',
    },
    {
      text: '오후 1시',
      code: '13',
    },
    {
      text: '오후 2시',
      code: '14',
    },
    {
      text: '오후 3시',
      code: '15',
    },
    {
      text: '오후 4시',
      code: '16',
    },
    {
      text: '오후 5시',
      code: '17',
    },
    {
      text: '오후 6시',
      code: '18',
    },
    {
      text: '오후 7시',
      code: '19',
    },
    {
      text: '오후 8시',
      code: '20',
    },
    {
      text: '오후 9시',
      code: '21',
    },
    {
      text: '오후 10시',
      code: '22',
    },
    {
      text: '오후 11시',
      code: '23',
    },
  ],
  ERRORS: {
    '401': {
      ko: '유효하지 않은 요청 데이터입니다.',
      en: 'invalid route data',
    },
    '402': {
      ko: '중복된 일정이 존재합니다.',
      en: 'duplicate calendar event exsists',
    }
  },
  NOTIFICATION: {
    'update': '일정 업데이트가 완료되었습니다.',
    'delete': '일정 삭제가 완료되었습니다.',
    'create': '일정 생성이 완료되었습니다.',
  },
};
