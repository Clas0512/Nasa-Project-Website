/* eslint-disable */
import * as moment from 'moment';

export const calendars = [
    {
        id     : '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title  : 'Ödevler',
        color  : '#14B8A6',
        visible: true
    },
    {
        id     : '5dab5f7b-757a-4467-ace1-305fe07b11fe',
        title  : 'Etkinlikler',
        color  : '#6366F1',
        visible: true
    },
    {
        id     : '09887870-f85a-40eb-8171-1b13d7a7f529',
        title  : 'Tatiller',
        color  : '#EC4899',
        visible: true
    }
    /*
EC4899 pembe
6366F1 mavi
14B8A6 teal
    */
];
export const events = [
    // Personal
    {
        id         : '3be50686-e3a1-4f4b-aa4d-5cb8517ba4e4',
        calendarId : '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title      : 'Gölgelerin Gücü Adına',
        description: '',
        start      : moment().hour(9).minute(0).second(0).millisecond(0).toISOString(), // Today 09:00
        end        : moment().add(1, 'day').hour(14).minute(0).second(0).millisecond(0).toISOString(), // Tomorrow 14:00
        duration   : null,
        allDay     : false,
        recurrence : null
    },
    {
        id         : '660f0dcd-48f8-4266-a89a-8ee0789c074a',
        calendarId : '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title      : '500 Puan Topla',
        description: '',
        start      : moment().date(10).hour(18).minute(0).second(0).millisecond(0).toISOString(), // 10th of the current month at 18:00
        end        : moment().date(10).hour(20).minute(0).second(0).millisecond(0).toISOString(), // 10th of the current month at 20:00
        duration   : null,
        allDay     : false,
        recurrence : null
    },
    {
        id         : '7471b840-5efb-45da-9092-a0f04ee5617b',
        calendarId : '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title      : 'İşitsel Tarzda 250 Puan Topla',
        description: '',
        start      : moment().date(21).hour(12).minute(0).second(0).millisecond(0).toISOString(), // 21st of the current month at noon
        end        : moment().date(21).hour(14).minute(0).second(0).millisecond(0).toISOString(), // 21st of the current month at 14:00
        duration   : null,
        allDay     : false,
        recurrence : null
    },
    {
        id         : 'c3e6c110-9b67-4e6b-a2ab-3046abf1b074',
        calendarId : '1a470c8e-40ed-4c2d-b590-a4f1f6ead6cc',
        title      : 'Aritmatiğini Geliştir',
        description: '',
        start      : moment().date(8).startOf('day').toISOString(), // 8th of the current month at start of the day
        end        : moment().year(9999).endOf('year').toISOString(), // End of the times
        duration   : 0,
        allDay     : true,
        recurrence : 'FREQ=YEARLY;INTERVAL=1'
    },
    // Appointments
    {
        id         : 'd2220429-9214-4c4b-9da6-f8da2fbfd507',
        calendarId : '09887870-f85a-40eb-8171-1b13d7a7f529',
        title      : 'Öğretmenler Günü',
        description: 'Öğretmenler günü olduğu için bugun tatil !',
        start      : moment().date(1).hour(10).minute(0).second(0).millisecond(0).add((9 - moment().date(1).day()) % 7, 'day').toISOString(), // First Tuesday of the current month at 10:00
        end        : moment().year(9999).endOf('year').toISOString(), // End of the times
        duration   : 90, // Minutes
        allDay     : false,
        recurrence : 'FREQ=MONTHLY;INTERVAL=2;BYDAY=1TU'
    },
    {
        id         : '4d88418c-cbdf-4f03-89e1-e3dca14a9e92',
        calendarId : '09887870-f85a-40eb-8171-1b13d7a7f529',
        title      : 'Hafta Sonu',
        description: 'İyi haftasonları',
        start      : moment().date(1).hour(13).minute(0).second(0).millisecond(0).add((6 - moment().date(1).day()) % 7, 'day').add(1, 'week').toISOString(), // Second Saturday of the current month at 13:00
        end        : moment().year(9999).endOf('year').toISOString(), // End of the times
        duration   : 120, // Minutes
        allDay     : false,
        recurrence : 'FREQ=WEEKLY;INTERVAL=2;BYDAY=SA'
    },
    // Work
    {
        id         : '0e848e4a-0333-42e3-b223-0209c4b58a3b',
        calendarId : '5dab5f7b-757a-4467-ace1-305fe07b11fe',
        title      : 'Spor Etkinliği',
        description: 'Katılım ücreti 50 Türk Lirasıdır',
        start      : moment().date(19).hour(15).minute(0).second(0).millisecond(0).toISOString(), // 19th of the current month at 15:00
        end        : moment().date(19).hour(17).minute(30).second(0).millisecond(0).toISOString(), // 19th of the current month at 17:30
        duration   : null,
        allDay     : true,
        recurrence : null
    },
    {
        id         : 'f619eb76-c21b-4bb0-aeff-41e765cae290',
        calendarId : '5dab5f7b-757a-4467-ace1-305fe07b11fe',
        title      : 'Edebiyat Dinletisi',
        description: 'Francis Bacon \' nin denemeler isimli eserini dinliyoruz ',
        start      : moment().date(8).hour(11).minute(30).second(0).millisecond(0).toISOString(), // 8th of the current month at 11:30
        end        : moment().date(8).hour(12).minute(45).second(0).millisecond(0).toISOString(), // 8th of the current month at 12:45
        duration   : null,
        allDay     : false,
        recurrence : null
    },
    {
        id         : 'd97ea3ca-0e5a-4b86-a4fa-5b80a261081e',
        calendarId : '5dab5f7b-757a-4467-ace1-305fe07b11fe',
        title      : 'Öğretmenler Toplantısı',
        description: '',
        start      : moment().date(1).hour(9).minute(0).second(0).millisecond(0).add((5 - moment().date(1).day()) % 7, 'day').add(1, 'week').toISOString(), // Second Friday of the current month at 09:00
        end        : moment().year(9999).endOf('year').toISOString(), // End of the times
        duration   : 150, // Minutes
        allDay     : false,
        recurrence : 'FREQ=WEEKLY;INTERVAL=2;BYDAY=FR'
    }
];
export const exceptions = [];
export const settings = {
    dateFormat : 'll', // Aug 20, 2019
    timeFormat : '24', // 24-hour format
    startWeekOn: 1 // Monday
};
export const weekdays = [
    {
        abbr : 'M',
        label: 'Monday',
        value: 'MO'
    },
    {
        abbr : 'T',
        label: 'Tuesday',
        value: 'TU'
    },
    {
        abbr : 'W',
        label: 'Wednesday',
        value: 'WE'
    },
    {
        abbr : 'T',
        label: 'Thursday',
        value: 'TH'
    },
    {
        abbr : 'F',
        label: 'Friday',
        value: 'FR'
    },
    {
        abbr : 'S',
        label: 'Saturday',
        value: 'SA'
    },
    {
        abbr : 'S',
        label: 'Sunday',
        value: 'SU'
    }
];
