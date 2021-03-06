define(function(){
  var bibleBooks = [
    {
      'name': 'Ge',
      'short_title': 'Gen.',
      'title': 'Genesis',
      'timeline': {
        'start': -4000,
        'end': -1806
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Pentateuch (Torah)'
      },
      'traditionalPosition': 1,
      'chapters': 50
    },
    {
      'name': 'Ex',
      'short_title': 'Exo.',
      'title': 'Exodus',
      'timeline': {
        'start': -1800,
        'end': -1445
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Pentateuch (Torah)'
      },
      'traditionalPosition': 2,
      'chapters': 40
    },
    {
      'name': 'Le',
      'short_title': 'Levi.',
      'title': 'Leviticus',
      'timeline': {
        'start': -1445,
        'end': -1445
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Pentateuch (Torah)'
      },
      'traditionalPosition': 3,
      'chapters': 27
    },
    {
      'name': 'Nu',
      'short_title': 'Numb.',
      'title': 'Numbers',
      'timeline': {
        'start': -1445,
        'end': -1407
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Pentateuch (Torah)'
      },
      'traditionalPosition': 4,
      'chapters': 36
    },
    {
      'name': 'Dt',
      'short_title': 'Deut.',
      'title': 'Deuteronomy',
      'timeline': {
        'start': -1407,
        'end': -1406
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Pentateuch (Torah)'
      },
      'traditionalPosition': 5,
      'chapters': 34
    },
    {
      'name': 'Jos',
      'short_title': 'Josh.',
      'title': 'Joshua',
      'timeline': {
        'start': -1406,
        'end': -1375
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 6,
      'chapters': 24
    },
    {
      'name': 'Jdg',
      'short_title': 'Judg.',
      'title': 'Judges',
      'timeline': {
        'start': -1375,
        'end': -1075
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 7,
      'chapters': 21
    },
    {
      'name': 'Ru',
      'short_title': 'Ruth',
      'title': 'Ruth',
      'timeline': {
        'start': -1140,
        'end': -1140
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 8,
      'chapters': 4
    },
    {
      'name': '1 Sa',
      'short_title': '1 Sam',
      'title': '1 Samuel',
      'long_title': {prefix: 'First book of', title: 'Samuel'},
      'icon': '',
      'timeline': {
        'start': -1070,
        'end': -1010
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 9,
      'chapters': 31
    },
    {
      'name': '2 Sa',
      'short_title': '2 Sam',
      'title': '2 Samuel',
      'long_title': {prefix: 'Second book of', title: 'Samuel'},
      'icon': '',
      'timeline': {
        'start': -1010,
        'end': -970
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 10,
      'chapters': 24
    },
    {
      'name': '1 Ki',
      'short_title': '1 King',
      'title': '1 Kings',
      'long_title': {prefix: 'First book of', title: 'Kings'},
      'icon': '',
      'timeline': {
        'start': -970,
        'end': -853
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 11,
      'chapters': 22
    },
    {
      'name': '2 Ki',
      'short_title': '2 King',
      'title': '2 Kings',
      'long_title': {prefix: 'Second book of', title: 'Kings'},
      'timeline': {
        'start': -852,
        'end': -742
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 12,
      'chapters': 25
    },
    {
      'name': '1 Ch',
      'short_title': '1 Chr.',
      'title': '1 Chronicles',
      'long_title': {prefix: 'First book of', title: 'Chronicles'},
      'timeline': {
        'start': -1003,
        'end': -970
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 13,
      'chapters': 29
    },
    {
      'name': '2 Ch',
      'short_title': '2 Chr.',
      'title': '2 Chronicles',
      'long_title': {prefix: 'Second book of', title: 'Chronicles'},
      'timeline': {
        'start': -967,
        'end': -852
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 14,
      'chapters': 36
    },
    {
      'name': 'Ezr',
      'short_title': 'Ezra',
      'title': 'Ezra',
      'timeline': {
        'start': -537,
        'end': -456
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 15,
      'chapters': 10
    },
    {
      'name': 'Ne',
      'short_title': 'Neh.',
      'title': 'Nehemiah',
      'timeline': {
        'start': -445,
        'end': -432
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 16,
      'chapters': 13
    },
    {
      'name': 'Es',
      'short_title': 'Est.',
      'title': 'Esther',
      'timeline': {
        'start': -483,
        'end': -472
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Historical books (Nevi\'im)'
      },
      'traditionalPosition': 17,
      'chapters': 10
    },
    {
      'name': 'Job',
      'short_title': 'Job',
      'title': 'Job',
      'timeline': {
        'start': -2100,
        'end': -2100
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Wisdom books (Ketuvim)'
      },
      'traditionalPosition': 18,
      'chapters': 42
    },
    {
      'name': 'Ps',
      'short_title': 'Psa.',
      'title': 'Psalms',
      'long_title': {prefix: '', title: 'Psalms'},
      'timeline': {
        'start': -979,
        'end': -979
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Wisdom books (Ketuvim)'
      },
      'traditionalPosition': 19,
      'chapters': 150
    },
    {
      'name': 'Pr',
      'short_title': 'Pro.',
      'title': 'Proverbs',
      'timeline': {
        'start': -950,
        'end': -950
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Wisdom books (Ketuvim)'
      },
      'traditionalPosition': 20,
      'chapters': 31
    },
    {
      'name': 'Ec',
      'short_title': 'Ecc.',
      'title': 'Ecclesiastes',
      'long_title': {prefix: '', title: 'Ecclesiastes'},
      'icon': '',
      'timeline': {
        'start': -937,
        'end': -937
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Wisdom books (Ketuvim)'
      },
      'traditionalPosition': 21,
      'chapters': 12
    },
    {
      'name': 'So',
      'short_title': 'Songs',
      'title': 'Songs',
      'long_title': {prefix: '', title: 'Songs', suffix: 'of Solomon'},
      'icon': '',
      'timeline': {
        'start': -950,
        'end': -950
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Wisdom books (Ketuvim)'
      },
      'traditionalPosition': 22,
      'chapters': 8
    },
    {
      'name': 'Is',
      'short_title': 'Isa.',
      'title': 'Isaiah',
      'timeline': {
        'start': -739,
        'end': -701
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Major prophets (Nevi\'im)'
      },
      'traditionalPosition': 23,
      'chapters': 66
    },
    {
      'name': 'Je',
      'short_title': 'Jer.',
      'title': 'Jeremiah',
      'timeline': {
        'start': -627,
        'end': -586
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Major prophets (Nevi\'im)'
      },
      'traditionalPosition': 24,
      'chapters': 52
    },
    {
      'name': 'La',
      'short_title': 'Lam.',
      'title': 'Lamentations',
      'timeline': {
        'start': -586,
        'end': -586
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Major prophets (Nevi\'im)'
      },
      'traditionalPosition': 25,
      'chapters': 5
    },
    {
      'name': 'Eze',
      'short_title': 'Eze.',
      'title': 'Ezekiel',
      'timeline': {
        'start': -593,
        'end': -573
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Major prophets (Nevi\'im)'
      },
      'traditionalPosition': 26,
      'chapters': 48
    },
    {
      'name': 'Da',
      'short_title': 'Dan.',
      'title': 'Daniel',
      'timeline': {
        'start': -605,
        'end': -539
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Major prophets (Nevi\'im)'
      },
      'traditionalPosition': 27,
      'chapters': 12
    },
    {
      'name': 'Ho',
      'short_title': 'Hos.',
      'title': 'Hosea',
      'timeline': {
        'start': -753,
        'end': -753
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 28,
      'chapters': 14
    },
    {
      'name': 'Joe',
      'short_title': 'Joel',
      'title': 'Joel',
      'timeline': {
        'start': -835,
        'end': -835
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 29,
      'chapters': 3
    },
    {
      'name': 'Am',
      'short_title': 'Amos',
      'title': 'Amos',
      'timeline': {
        'start': -766,
        'end': -766
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 30,
      'chapters': 9
    },
    {
      'name': 'Ob',
      'short_title': 'Oba.',
      'title': 'Obadiah',
      'timeline': {
        'start': -853,
        'end': -853
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 31,
      'chapters': 1
    },
    {
      'name': 'Jon',
      'short_title': 'Jon.',
      'title': 'Jonah',
      'timeline': {
        'start': -760,
        'end': -760
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 32,
      'chapters': 4
    },
    {
      'name': 'Mic',
      'short_title': 'Mic.',
      'title': 'Micah',
      'timeline': {
        'start': -735,
        'end': -735
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 33,
      'chapters': 7
    },
    {
      'name': 'Na',
      'short_title': 'Nah.',
      'title': 'Nahum',
      'timeline': {
        'start': -697,
        'end': -697
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 34,
      'chapters': 3
    },
    {
      'name': 'Hab',
      'short_title': 'Hab.',
      'title': 'Habakkuk',
      'timeline': {
        'start': -625,
        'end': -625
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 35,
      'chapters': 3
    },
    {
      'name': 'Zep',
      'short_title': 'Zep.',
      'title': 'Zephaniah',
      'timeline': {
        'start': -638,
        'end': -638
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 36,
      'chapters': 3
    },
    {
      'name': 'Hag',
      'short_title': 'Hag.',
      'title': 'Haggai',
      'timeline': {
        'start': -520,
        'end': -520
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 37,
      'chapters': 2
    },
    {
      'name': 'Zec',
      'short_title': 'Zec.',
      'title': 'Zechariah',
      'timeline': {
        'start': -520,
        'end': -520
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 38,
      'chapters': 14
    },
    {
      'name': 'Mal',
      'short_title': 'Mal.',
      'title': 'Malachi',
      'timeline': {
        'start': -430,
        'end': -430
      },
      'collection': {
        'testament': 'Old',
        'subset': 'Twelve Minor Prophets'
      },
      'traditionalPosition': 39,
      'chapters': 4
    },
    {
      'name': 'Mt',
      'short_title': 'Mat.',
      'title': 'Matthew',
      'long_title': {prefix: 'Gospel of', title: 'Matthew'},
      'timeline': {
        'start': 5,
        'end': 30
      },
      'collection': {
        'testament': 'New',
        'subset': 'Canonical gospels'
      },
      'traditionalPosition': 1,
      'chapters': 28
    },
    {
      'name': 'Mk',
      'short_title': 'Mark',
      'title': 'Mark',
      'long_title': {prefix: 'Gospel of', title: 'Mark'},
      'icon': '',
      'timeline': {
        'start': 5,
        'end': 30
      },
      'collection': {
        'testament': 'New',
        'subset': 'Canonical gospels'
      },
      'traditionalPosition': 2,
      'chapters': 16
    },
    {
      'name': 'Lk',
      'short_title': 'Luke',
      'title': 'Luke',
      'long_title': {prefix: 'Gospel of', title: 'Luke'},
      'icon': '',
      'timeline': {
        'start': 6,
        'end': 30
      },
      'collection': {
        'testament': 'New',
        'subset': 'Canonical gospels'
      },
      'traditionalPosition': 3,
      'chapters': 24
    },
    {
      'name': 'Jn',
      'short_title': 'John',
      'title': 'John',
      'long_title': {prefix: 'Gospel of', title: 'John'},
      'icon': '',
      'timeline': {
        'start': 6,
        'end': 30
      },
      'collection': {
        'testament': 'New',
        'subset': 'Canonical gospels'
      },
      'traditionalPosition': 4,
      'chapters': 21
    },
    {
      'name': 'Ac',
      'short_title': 'Acts',
      'title': 'Acts',
      'long_title': {prefix: 'Acts of the', title: 'Apostles'},
      'icon': '',
      'timeline': {
        'start': 30,
        'end': 62
      },
      'collection': {
        'testament': 'New',
        'subset': 'Apostolic History'
      },
      'traditionalPosition': 5,
      'chapters': 28
    },
    {
      'name': 'Ro',
      'short_title': 'Rom.',
      'title': 'Romans',
      'long_title': {prefix: 'Epistle to the', title: 'Romans'},
      'icon': 'letters',
      'timeline': {
        'start': 57,
        'end': 57
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 6,
      'chapters': 16
    },
    {
      'name': '1 Co',
      'short_title': '1 Co.',
      'title': '1 Corinthians',
      'long_title': {prefix: 'First Epistle to the', title: 'Corinthians'},
      'icon': 'letters',
      'timeline': {
        'start': 54,
        'end': 54
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 7,
      'chapters': 16
    },
    {
      'name': '2 Co',
      'short_title': '2 Co.',
      'title': '2 Corinthians',
      'long_title': {prefix: 'Second Epistle to the', title: 'Corinthians'},
      'icon': 'letters',
      'timeline': {
        'start': 57,
        'end': 57
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 8,
      'chapters': 13
    },
    {
      'name': 'Ga',
      'short_title': 'Gal.',
      'title': 'Galatians',
      'long_title': {prefix: 'Epistle to the', title: 'Galatians'},
      'icon': 'letters',
      'timeline': {
        'start': 54,
        'end': 54
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 9,
      'chapters': 6
    },
    {
      'name': 'Eph',
      'short_title': 'Eph.',
      'title': 'Ephesians',
      'long_title': {prefix: 'Epistle to the', title: 'Ephesians'},
      'icon': 'letters',
      'timeline': {
        'start': 62,
        'end': 62
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 10,
      'chapters': 6
    },
    {
      'name': 'Php',
      'short_title': 'Php.',
      'title': 'Philippians',
      'long_title': {prefix: 'Epistle to the', title: 'Philippians'},
      'icon': 'letters',
      'timeline': {
        'start': 62,
        'end': 62
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 11,
      'chapters': 4
    },
    {
      'name': 'Col',
      'short_title': 'Col.',
      'title': 'Colossians',
      'long_title': {prefix: 'Epistle to the', title: 'Colossians'},
      'icon': 'letters',
      'timeline': {
        'start': 62,
        'end': 62
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 12,
      'chapters': 4
    },
    {
      'name': '1 Th',
      'short_title': '1 Th.',
      'title': '1 Thessalonians',
      'long_title': {prefix: 'First Epistle to the', title: 'Thessalonians'},
      'icon': 'letters',
      'timeline': {
        'start': 51,
        'end': 51
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 13,
      'chapters': 5
    },
    {
      'name': '2 Th',
      'short_title': '2 Th.',
      'title': '2 Thessalonians',
      'long_title': {prefix: 'Second Epistle to the', title: 'Thessalonians'},
      'icon': 'letters',
      'timeline': {
        'start': 52,
        'end': 52
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 14,
      'chapters': 3
    },
    {
      'name': '1 Ti',
      'short_title': '1 Ti.',
      'title': '1 Timothy',
      'long_title': {prefix: 'First Epistle to', title: 'Timothy'},
      'icon': 'letters',
      'timeline': {
        'start': 63,
        'end': 63
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 15,
      'chapters': 6
    },
    {
      'name': '2 Ti',
      'short_title': '2 Ti.',
      'title': '2 Timothy',
      'long_title': {prefix: 'Second Epistle to', title: 'Timothy'},
      'icon': 'letters',
      'timeline': {
        'start': 67,
        'end': 67
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 16,
      'chapters': 4
    },
    {
      'name': 'Titus',
      'short_title': 'Tit.',
      'title': 'Titus',
      'long_title': {prefix: 'Epistle to', title: 'Titus'},
      'icon': 'letters',
      'timeline': {
        'start': 66,
        'end': 66
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 17,
      'chapters': 3
    },
    {
      'name': 'Phm',
      'short_title': 'Phm.',
      'title': 'Philemon',
      'long_title': {prefix: 'Epistle to', title: 'Philemon'},
      'icon': 'letters',
      'timeline': {
        'start': 62,
        'end': 62
      },
      'collection': {
        'testament': 'New',
        'subset': 'Pauline epistles'
      },
      'traditionalPosition': 18,
      'chapters': 1
    },
    {
      'name': 'Heb',
      'short_title': 'Heb.',
      'title': 'Hebrews',
      'long_title': {prefix: 'Epistle to the', title: 'Hebrews'},
      'icon': 'letters',
      'timeline': {
        'start': 68,
        'end': 68
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 19,
      'chapters': 13
    },
    {
      'name': 'Jas',
      'short_title': 'Jam.',
      'title': 'James',
      'long_title': {prefix: 'Epistle of', title: 'James'},
      'icon': 'letters',
      'timeline': {
        'start': 45,
        'end': 45
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 20,
      'chapters': 5
    },
    {
      'name': '1 Pe',
      'short_title': '1 Pe.',
      'title': '1 Peter',
      'long_title': {prefix: 'First Epistle of', title: 'Peter'},
      'icon': 'letters',
      'timeline': {
        'start': 64,
        'end': 64
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 21,
      'chapters': 5
    },
    {
      'name': '2 Pe',
      'short_title': '2 Pe.',
      'title': '2 Peter',
      'long_title': {prefix: 'Second Epistle of', title: 'Peter'},
      'icon': 'letters',
      'timeline': {
        'start': 67,
        'end': 67
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 22,
      'chapters': 3
    },
    {
      'name': '1 Jn',
      'short_title': '1 Jn.',
      'title': '1 John',
      'long_title': {prefix: 'First Epistle of', title: 'John'},
      'icon': 'letters',
      'timeline': {
        'start': 90,
        'end': 90
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 23,
      'chapters': 5
    },
    {
      'name': '2 Jn',
      'short_title': '2 Jn.',
      'title': '2 John',
      'long_title': {prefix: 'Second Epistle of', title: 'John'},
      'icon': 'letters',
      'timeline': {
        'start': 92,
        'end': 92
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 24,
      'chapters': 1
    },
    {
      'name': '3 Jn',
      'short_title': '3 Jn.',
      'title': '3 John',
      'long_title': {prefix: 'Third Epistle of', title: 'John'},
      'icon': 'letters',
      'timeline': {
        'start': 94,
        'end': 94
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 25,
      'chapters': 1
    },
    {
      'name': 'Jud',
      'short_title': 'Jude',
      'title': 'Jude',
      'long_title': {prefix: 'Epistle of', title: 'Jude'},
      'icon': 'letters',
      'timeline': {
        'start': 68,
        'end': 68
      },
      'collection': {
        'testament': 'New',
        'subset': 'General epistles'
      },
      'traditionalPosition': 26,
      'chapters': 1
    },
    {
      'name': 'Re',
      'short_title': 'Rev.',
      'title': 'Revelation',
      'long_title': {prefix: '', title: 'Revelation'},
      'icon': '',
      'timeline': {
        'start': 95,
        'end': 95
      },
      'collection': {
        'testament': 'New',
        'subset': 'Apocalypse'
      },
      'traditionalPosition': 27,
      'chapters': 22
    }
  ];

  bibleBooks.forEach(function(bibleBook){
    bibleBook.long_title = bibleBook.long_title || {prefix: 'Book of', title: bibleBook.title};
    bibleBook.icon = bibleBook.icon || 'book';
    bibleBook.plainLongTitle = (bibleBook.long_title.prefix || '') + ' ' + bibleBook.long_title.title + ' ' + (bibleBook.long_title.suffix || '');

  });

  Object.defineProperty(bibleBooks, 'findBook', {
    value: function(bookname){
      var book;
      var quality = 0;
      bibleBooks.every(function(booki){
        if(booki.title.toLowerCase() === bookname.toLowerCase()){
          book = booki;
          quality = 100;
          return false;
        }
        return true;
      });
      if(!book){
        bibleBooks.every(function(booki){
          if(booki.name.toLowerCase() === bookname.toLowerCase()){
            book = booki;
            quality = 90;
            return false;
          }
          return true;
        });
      }
      if(!book){
        var bestBook = {
          book:undefined,
          quality:0
        };
        bibleBooks.forEach(function(book,bookIndex){
          for(var i=3;i<7;i++){
            var quality = 0;
            var currentPortion = bookname.toLowerCase().substr(0,i);
            if(book.title.toLowerCase().substr(0,i) === currentPortion){
              quality = 30;
              if(bookname.length === i){ quality += 50 }
            }else if(book.title.replace(/ /g, '').toLowerCase().substr(0,i) === currentPortion){
              quality = 20;
            }else if(book.name.replace(/ /g, '').toLowerCase().substr(0,i) === currentPortion){
              quality = 15;
            }

            if(quality > bestBook.quality){
              bestBook.quality = quality;
              bestBook.book = book;
            }
          }
        });
        if(bestBook.book){
          book = bestBook.book;
          quality = bestBook.quality;
        }
      }
      if(book){ book.matchQuality = quality }
      return book;
    }
  });

  return bibleBooks;
});
