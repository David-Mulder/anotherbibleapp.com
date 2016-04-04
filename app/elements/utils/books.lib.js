define(function(){
  var bibleBooks = [
    {
      'name': 'Ge',
      'longName': 'gen',
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
      'longName': 'exo',
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
      'longName': 'lev',
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
      'longName': 'num',
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
      'longName': 'deu',
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
      'longName': 'jos',
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
      'longName': 'jdg',
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
      'longName': 'rth',
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
      'longName': '1sa',
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
      'longName': '2sa',
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
      'longName': '1ki',
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
      'longName': '2ki',
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
      'longName': '1ch',
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
      'longName': '2ch',
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
      'longName': 'ezr',
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
      'longName': 'neh',
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
      'longName': 'est',
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
      'longName': 'job',
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
      'longName': 'psa',
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
      'longName': 'pro',
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
      'longName': 'ecc',
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
      'longName': 'sng',
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
      'longName': 'isa',
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
      'longName': 'jer',
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
      'longName': 'lam',
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
      'longName': 'eze',
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
      'longName': 'dan',
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
      'longName': 'hos',
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
      'longName': 'joe',
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
      'longName': 'amo',
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
      'longName': 'oba',
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
      'longName': 'jon',
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
      'longName': 'mic',
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
      'longName': 'nah',
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
      'longName': 'hab',
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
      'longName': 'zep',
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
      'longName': 'hag',
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
      'longName': 'zec',
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
      'longName': 'mal',
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
      'longName': 'mat',
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
      'longName': 'mar',
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
      'longName': 'luk',
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
      'longName': 'jhn',
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
      'longName': 'act',
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
      'longName': 'rom',
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
      'longName': '1co',
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
      'longName': '2co',
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
      'longName': 'gal',
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
      'longName': 'eph',
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
      'longName': 'phl',
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
      'longName': 'col',
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
      'longName': '1th',
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
      'longName': '2th',
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
      'longName': '1ti',
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
      'longName': '2ti',
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
      'longName': 'tit',
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
      'longName': 'phm',
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
      'longName': 'heb',
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
      'longName': 'jas',
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
      'longName': '1pe',
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
      'longName': '2pe',
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
      'longName': '1jo',
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
      'longName': '2jo',
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
      'longName': '3jo',
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
      'longName': 'jde',
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
      'longName': 'rev',
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

  //window._BB = bibleBooks; //for debugging only

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
