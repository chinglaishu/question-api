import moment from "moment-timezone";

const UserList = [
  {username: "bearhand", password: "bearhand"},
  {username: "chEsses23", password: "password0"},
  {username: "Bill_Billy", password: "password1"},
  {username: "Taka@@@", password: "password2"},
  {username: "ThattttttsMe", password: "password3"},
  {username: "Okkkkkkay", password: "password4"},
  {username: "guest", password: "guest1234"},
];

const QuestionList = [
  {
    "user_id": 1,
    "title": "Typical Mark Six",
    "description": "{\"blocks\":[{\"key\":\"4m58m\",\"text\":\"Choose some number and win.. simple😉\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "choose",
    "ratio_type": "auto",
    "answer_0": [
      11,
      20,
      25,
      32,
      30,
      39
    ],
    "answer_0_type": "not_follow_order",
    "answer_0_ratio_type": "time_all",
    "answer_0_parameter": 5,
    "min_choose_number": 6,
    "max_choose_number": 12,
    "category": "regular",
    "minimum_fee": 5,
    "maximum_fee": 10,
    "initial_pool": 5,
    "add_pool_percentage": 50,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "null",
    "visible_date": "2020-09-12T16:00:00.167Z",
    "open_date": "2020-09-12T16:00:00.815Z",
    "close_date": "2020-09-14T16:00:00.221Z",
    "end_date": "2020-09-14T16:00:00.215Z",
    "answer_1": [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      18
    ],
    "answer_1_type": "not_follow_order",
    "answer_1_ratio_type": "add_all_time_num",
    "answer_1_parameter": 20,
    "end_requirement_value": 0,
    "correct_answer_number": 2,
    "username": "bearhand",
    "option_list": {
      "0": {
        "content": 1
      },
      "1": {
        "content": 2
      },
      "2": {
        "content": 3
      },
      "3": {
        "content": 4
      },
      "4": {
        "content": 5
      },
      "5": {
        "content": 6
      },
      "6": {
        "content": 7
      },
      "7": {
        "content": 8
      },
      "8": {
        "content": 9
      },
      "9": {
        "content": 10
      },
      "10": {
        "content": 11
      },
      "11": {
        "content": 12
      },
      "12": {
        "content": 13
      },
      "13": {
        "content": 14
      },
      "14": {
        "content": 15
      },
      "15": {
        "content": 16
      },
      "16": {
        "content": 17
      },
      "17": {
        "content": 18
      },
      "18": {
        "content": 19
      },
      "19": {
        "content": 20
      },
      "20": {
        "content": 21
      },
      "21": {
        "content": 22
      },
      "22": {
        "content": 23
      },
      "23": {
        "content": 24
      },
      "24": {
        "content": 25
      },
      "25": {
        "content": 26
      },
      "26": {
        "content": 27
      },
      "27": {
        "content": 28
      },
      "28": {
        "content": 29
      },
      "29": {
        "content": 30
      },
      "30": {
        "content": 31
      },
      "31": {
        "content": 32
      },
      "32": {
        "content": 33
      },
      "33": {
        "content": 34
      },
      "34": {
        "content": 35
      },
      "35": {
        "content": 36
      },
      "36": {
        "content": 37
      },
      "37": {
        "content": 38
      },
      "38": {
        "content": 39
      },
      "39": {
        "content": 40
      },
      "40": {
        "content": 41
      },
      "41": {
        "content": 42
      },
      "42": {
        "content": 43
      },
      "43": {
        "content": 44
      },
      "44": {
        "content": 45
      }
    }
  },
  {
    "user_id": 2,
    "username": "chEsses23",
    "title": "Typical Horse Race",
    "description": "{\"blocks\":[{\"key\":\"3jfkh\",\"text\":\"Choose some number and winnnnn\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9gub\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"826q7\",\"text\":\"Win\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"524ju\",\"text\":\"Get the winner\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"90s5a\",\"text\":\"prices: winner's odds\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"41r9q\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9nudf\",\"text\":\"Quinella\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9sjln\",\"text\":\"Get the winner and second place unorderly\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"9th6s\",\"text\":\"prices: winner's odds mutiply second place's odds\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{\"nodeAttributes\":{}}},{\"key\":\"cjps0\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "decidedByOwnerWithOption",
    "ratio_type": "auto",
    "min_choose_number": 1,
    "max_choose_number": 6,
    "category": "regular",
    "minimum_fee": 5,
    "maximum_fee": 50,
    "initial_pool": 200,
    "add_pool_percentage": 100,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "attempt_number",
    "end_requirement_value": 20,
    "visible_date": "2020-09-13T16:00:00.415Z",
    "open_date": "2020-09-13T16:00:00.429Z",
    "close_date": "2020-09-15T16:00:00.073Z",
    "end_date": "2020-09-15T16:00:00.672Z",
    "correct_answer": {},
    "correct_answer_number": 2,
    "option_list": {
      "0": {
        "content": 1
      },
      "1": {
        "content": 2
      },
      "2": {
        "content": 3
      },
      "3": {
        "content": 4
      },
      "4": {
        "content": 5
      },
      "5": {
        "content": 6
      },
      "6": {
        "content": 7
      },
      "7": {
        "content": 8
      },
      "8": {
        "content": 9
      },
      "9": {
        "content": 10
      },
      "10": {
        "content": 11
      },
      "11": {
        "content": 12
      }
    }
  },
  {
    "user_id": 3,
    "username": "Bill_Billy",
    "title": "How to be happy?🙃",
    "description": "{\"blocks\":[{\"key\":\"eeqvf\",\"text\":\"Teach me how to be happy😉\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "decidedByOwnerWithoutOption",
    "min_choose_number": 1,
    "max_choose_number": 1,
    "category": "other",
    "minimum_fee": 1,
    "maximum_fee": 100,
    "initial_pool": 200,
    "add_pool_percentage": 90,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "winner_number",
    "end_requirement_value": 1,
    "visible_date": "2020-09-12T16:00:00.301Z",
    "open_date": "2020-09-12T16:00:00.024Z",
    "close_date": "2020-09-13T16:00:00.494Z",
    "end_date": "2020-09-13T16:00:00.501Z",
    "correct_answer": {},
    "ratio_type": "auto",
    "correct_answer_number": 1,
    "option_list": {}
  },
  {
    "user_id": 4,
    "username": "Taka@@@",
    "title": "Today covid-19 cases in HK",
    "description": "{\"blocks\":[{\"key\":\"ff21l\",\"text\":\"Guess a number..\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "decidedByOwnerWithOption",
    "category": "news",
    "minimum_fee": 5,
    "maximum_fee": 100,
    "initial_pool": 100,
    "add_pool_percentage": 95,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "attempt_number",
    "end_requirement_value": 50,
    "visible_date": "2020-09-12T16:00:00.125Z",
    "open_date": "2020-09-12T16:00:00.940Z",
    "close_date": "2020-09-13T16:00:00.494Z",
    "end_date": "2020-09-13T16:00:00.501Z",
    "ratio_type": "have_initial_value",
    "min_choose_number": 1,
    "max_choose_number": 1,
    "correct_answer": {},
    "correct_answer_number": 1,
    "option_list": {
      "0": {
        "content": "0 - 10",
        "ratio": 2
      },
      "1": {
        "content": "11 - 20",
        "ratio": 3
      },
      "2": {
        "content": "more than 20",
        "ratio": 5
      }
    }
  },
  {
    "user_id": 5,
    "username": "ThattttttsMe",
    "title": "How to find a investor",
    "description": "{\"blocks\":[{\"key\":\"ff21l\",\"text\":\"Poor... need a investor\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "decidedByOwnerWithoutOption",
    "category": "other",
    "minimum_fee": 5,
    "maximum_fee": 100,
    "initial_pool": 100,
    "add_pool_percentage": 95,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "attempt_number",
    "end_requirement_value": 50,
    "visible_date": "2020-09-12T16:00:00.125Z",
    "open_date": "2020-09-12T16:00:00.940Z",
    "close_date": "2020-09-13T16:00:00.587Z",
    "end_date": "2020-09-13T16:00:00.799Z",
    "correct_answer": {},
    "ratio_type": "auto",
    "correct_answer_number": 1,
    "option_list": {}
  },
  {
    "user_id": 6,
    "username": "Okkkkkkay",
    "title": "Which one is the best fast food?",
    "description": "{\"blocks\":[{\"key\":\"966f6\",\"text\":\"Fast Foodddddddddddddddd\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"4e5d\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"7ub5o\",\"text\":\"Get the winner\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dt9t6\",\"text\":\"price: wineer's odds\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"fei99\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ca169\",\"text\":\"Get the full order(1, 2, 3)\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"1207g\",\"text\":\"price: All odds mutiplied\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"f6o25\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}",
    "question_type": "vote",
    "ratio_type": "auto",
    "answer_0": [
      0
    ],
    "answer_0_type": "not_follow_order",
    "answer_0_ratio_type": "add_all",
    "answer_0_parameter": 1,
    "min_choose_number": 1,
    "max_choose_number": 3,
    "category": "other",
    "minimum_fee": 5,
    "maximum_fee": 50,
    "initial_pool": 50,
    "add_pool_percentage": 90,
    "is_show_attempt_number": false,
    "is_show_winner_number": false,
    "end_requirement": "winner_number",
    "end_requirement_value": 5,
    "visible_date": "2020-09-12T16:00:00.918Z",
    "open_date": "2020-09-12T16:00:00.747Z",
    "close_date": "2020-09-13T16:00:00.040Z",
    "end_date": "2020-09-13T16:00:00.644Z",
    "answer_1": [
      0,
      1,
      2
    ],
    "answer_1_type": "follow_order",
    "answer_1_ratio_type": "time_all",
    "answer_1_parameter": 1,
    "correct_answer": {},
    "correct_answer_number": 2,
    "option_list": {
      "0": {
        "content": "Macdonalds"
      },
      "1": {
        "content": "Burger King"
      },
      "2": {
        "content": "KFC"
      }
    }
  },
];

const SubmitQuestionList = [
  {
    "answer": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    "value": 5,
    "username": "guest",
    "title": "Typical Mark Six",
    "question_id": 1,
  },
  {
    "answer": [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    "value": 10,
    "username": "guest",
    "title": "Typical Horse Race",
    "question_id": 2,
  },
  {
    "answer": "just be happpyyy",
    "value": 20,
    "username": "guest",
    "title": "How to be happy?🙃",
    "question_id": 3,
  },
  {
    "answer": [
      "0"
    ],
    "value": 10,
    "username": "guest",
    "title": "Today covid-19 cases in HK",
    "question_id": 4,
  },
  {
    "answer": "just find it",
    "value": 5,
    "username": "guest",
    "title": "How to find a investor",
    "question_id": 5,
  },
  {
    "answer": [
      "2",
      "0",
      "1"
    ],
    "value": 5,
    "username": "guest",
    "title": "Which one is the best fast food?",
    "question_id": 6,
  },
];

export default {UserList, QuestionList, SubmitQuestionList};
