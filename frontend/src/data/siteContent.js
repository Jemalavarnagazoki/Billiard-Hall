export const LOCALE_STORAGE_KEY = 'billiardHallLocale';

export const localeOptions = [
  {
    value: 'ka',
    label: 'ქართული',
    flag: '🇬🇪'
  },
  {
    value: 'en',
    label: 'English',
    flag: '🇺🇸'
  }
];

const sharedContent = {
  venueName: 'Billiard Hall',
  phones: ['577949425', '599396120'],
  pricingRules: {
    billiard: 15,
    playstation: 10
  }
};

export const siteContentByLocale = {
  ka: {
    ...sharedContent,
    cityLabel: 'თბილისი',
    hours: '14:00 - 02:00',
    address: 'თბილისი, ვარკეთილის III მასივი, ლევან მაჭავარიანის 5',
    hero: {
      eyebrow: 'პრემიუმ ბილიარდ კლუბი',
      title: 'დაჯავშნე შენი მაგიდა',
      description: 'ცამეტი იდეალურად მოვლილი მაგიდა დახვეწილ სივრცეში. ღიაა 02:00-მდე.'
    },
    quickInfo: [
      { label: 'საათი', value: '14:00 - 02:00' },
      { label: 'მაგიდები', value: '13 პრემიუმი' },
      { label: 'ლოკაცია', value: 'ვარკეთილი' }
    ],
    reserveServices: [
      { value: 'billiard', label: 'ბილიარდი' },
      { value: 'playstation', label: 'PlayStation' }
    ],
    pricing: [
      { title: 'ბილიარდი', note: '1 საათი', price: '15 ₾', featured: true },
      { title: 'PlayStation', note: '1 საათი', price: '10 ₾', featured: false }
    ],
    menuCategories: [
      {
        id: 'coffee',
        title: 'ყავა',
        label: 'ყავა / ჩაი',
        items: [
          { name: 'Americano', price: 5 },
          { name: 'Megaone Americano', price: 5 },
          { name: 'ესპრესო დოპიო', price: 4 },
          { name: 'კაპუჩინო', price: 6 },
          { name: 'ცხელი შოკოლადი', price: 8 },
          { name: 'ჩაი', price: 5 },
          { name: 'ჩაი ლიმონით', price: 5 }
        ]
      },
      {
        id: 'soft-drinks',
        title: 'ცივი სასმელები',
        label: 'უალკოჰოლო',
        items: [
          { name: 'წყალი', price: 2 },
          { name: 'ბორჯომი', price: 3 },
          { name: 'ლიმონათი', price: 4 },
          { name: 'Coca-Cola Classic', price: 3 },
          { name: 'Coca-Cola Zero', price: 3 },
          { name: 'Fanta', price: 3 },
          { name: 'Sprite', price: 3 },
          { name: 'ფორთოხლის წვენი', price: 4 },
          { name: 'ვაშლის წვენი', price: 4 }
        ]
      },
      {
        id: 'food',
        title: 'საჭმელი',
        label: 'სნექი და კერძები',
        items: [
          { name: 'Hot-dog', price: 7 },
          { name: 'Combo menu', price: 15 },
          { name: 'ფრი', price: 5 },
          { name: 'Combo fries', price: 10 }
        ]
      },
      {
        id: 'snacks',
        title: 'სნექი',
        label: 'მცირე წასახემსებელი',
        items: [
          { name: 'მიწისთხილი', price: 5 },
          { name: 'ჩიფსი', price: 5 },
          { name: 'Pringles', price: 5 },
          { name: 'T/Bayo', price: 7 },
          { name: 'მზესუმზირა', price: 4 }
        ]
      },
      {
        id: 'beer',
        title: 'ლუდი',
        label: 'ბოთლი / ქილა',
        items: [
          { name: 'Heineken', price: 9 },
          { name: 'Lowenbrau', price: 8 },
          { name: 'Efes Pilsen', price: 9 },
          { name: 'Krombacher', price: 8 },
          { name: 'Amstel', price: 8 },
          { name: 'Estrella', price: 8 },
          { name: 'Zlatopramen', price: 8 },
          { name: 'Corona', price: 7 },
          { name: 'Sol', price: 6 },
          { name: 'ნატახტარი', price: 6 },
          { name: 'ნატახტარი კაიზერი', price: 5 }
        ]
      },
      {
        id: 'energy',
        title: 'ენერგეტიკული',
        label: 'ცივი სასმელები',
        items: [
          { name: 'XL', price: 5 },
          { name: 'Burn', price: 4 },
          { name: '16TH', price: 3 }
        ]
      },
      {
        id: 'cocktails',
        title: 'კოქტეილი',
        label: 'ბარი',
        items: [
          { name: 'Sex on the Beach', price: 15 },
          { name: 'Blue Lagoon', price: 8 },
          { name: 'Mojito', price: 14 },
          { name: 'Pina Colada', price: 8 },
          { name: 'Vodka-Energy', price: 12 }
        ]
      },
      {
        id: 'vodka',
        title: 'არაყი',
        label: '40 მლ',
        items: [
          { name: 'Finlandia', price: 7 },
          { name: 'Absolut', price: 7 },
          { name: 'Stolichnaya', price: 7 },
          { name: 'Sobieski', price: 6 },
          { name: 'El Capite', price: 6 },
          { name: 'Martini', price: 6 }
        ]
      },
      {
        id: 'liqueur',
        title: 'ლიქიორი',
        label: 'ბარი',
        items: [
          { name: 'Jagermeister', price: 8 },
          { name: 'Gintevi', price: 15 }
        ]
      },
      {
        id: 'whisky',
        title: 'ვისკი',
        label: '40 მლ',
        items: [
          { name: 'Chivas Regal', price: 15 },
          { name: 'Jameson', price: 12 },
          { name: "Jack Daniel's", price: 12 },
          { name: "Ballantine's", price: 8 }
        ]
      },
      {
        id: 'tequila',
        title: 'ტეკილა',
        label: '40 მლ',
        items: [
          { name: 'Olmeca', price: 10 },
          { name: 'Sierra', price: 8 },
          { name: 'San Jose', price: 8 }
        ]
      },
      {
        id: 'gin',
        title: 'ჯინი',
        label: 'ბარი',
        items: [
          { name: 'Beefeater', price: 8 },
          { name: 'Tonic', price: 5 },
          { name: 'Gin Tonic', price: 10 }
        ]
      }
    ],
    highlights: [
      {
        eyebrow: 'მყისიერი ჯავშანი',
        title: 'მაგიდა წამებში',
        text: 'დაჯავშნე ონლაინ და მოდი თამაშისთვის უკვე მზად.'
      },
      {
        eyebrow: 'მარტივი მისასვლელი',
        title: 'ვარკეთის ცენტრში',
        text: 'მოსახერხებელი ლოკაცია და მარტივი პარკინგი.'
      },
      {
        eyebrow: 'გვიანი საათები',
        title: 'ღამის საუკეთესო ადგილი',
        text: 'ღია ვართ 02:00-მდე. იდეალურია მეგობრებთან ერთად საღამოსთვის.'
      }
    ],
    vibePoints: [
      'დახვეწილი ინტერიერი და რბილი განათება',
      'პროფესიონალური მაგიდები, სრულად მოვლილი',
      'წყნარი გარემო როგორც სერიოზული თამაშისთვის, ისე დასასვენებლად'
    ],
    signupPlans: [
      { value: 'billiard', label: 'ბილიარდი' },
      { value: 'playstation', label: 'PlayStation' },
      { value: 'events', label: 'ივენთები' }
    ],
    ui: {
      localeSwitcherLabel: 'ენის შეცვლა',
      topbar: {
        openDaily: 'ყოველდღე'
      },
      navItems: [
        { to: '/', label: 'მთავარი' },
        { to: '/prices', label: 'ფასები' },
        { to: '/menu', label: 'მენიუ' },
        { to: '/reserve', label: 'ჯავშანი' },
        { to: '/contact', label: 'კონტაქტი' },
        { to: '/signin', label: 'შესვლა' }
      ],
      loading: {
        label: 'იტვირთება',
        message: 'გვერდი იტვირთება...'
      },
      footer: {
        brandEyebrow: 'ბილიარდ ჰოლი',
        quickLinks: 'სწრაფი ბმულები',
        reservationsTitle: 'ჯავშანი',
        reservationsCopy: 'დაჯავშნე მაგიდა ონლაინ და მოდი თამაშისთვის მზად.',
        reserveLink: 'დაჯავშნე ახლა'
      },
      home: {
        primaryAction: 'დაჯავშნე ახლა',
        secondaryAction: 'ნახე მენიუ',
        availableToday: 'თავისუფალი დღეს',
        totalTables: 'სულ მაგიდები',
        callLabel: 'დარეკე',
        whyVisitEyebrow: 'რატომ ჩვენთან',
        whyVisitTitle: 'საღამოს საუკეთესო ადგილი',
        atmosphereEyebrow: 'ატმოსფერო',
        atmosphereTitle: 'შექმნილი ბილიარდისთვის',
        readyEyebrow: 'მზად ხარ?',
        readyTitle: 'დაჯავშნე მაგიდა',
        readyCopy: 'დაიკავე შენი ადგილი რამდენიმე წუთში. დანარჩენი ჩვენზეა.'
      },
      prices: {
        eyebrow: 'საათობრივი ტარიფები',
        title: 'ფასები',
        description: 'მარტივი ტარიფები ბილიარდისა და PlayStation-ისთვის. ყველაფერი საათობრივია.',
        featuredLabel: 'ყველაზე მოთხოვნადი',
        secondaryLabel: 'სწრაფი არჩევანი',
        sidebarEyebrow: 'საჭმელი და სასმელი',
        sidebarTitle: 'ყოველდღე ღიაა',
        sidebarCopy: 'სრული სასმელებისა და სნექების მენიუ ადგილზეა. დეტალები იხილე მენიუში.',
        menuAction: 'ნახე მენიუ',
        reserveAction: 'დაჯავშნე ახლა'
      },
      menu: {
        eyebrow: 'საჭმელი და სასმელი',
        title: 'სრული მენიუ',
        description: 'ყველაფერი, რასაც ადგილზე გთავაზობთ, კატეგორიებად დალაგებული.',
        asideEyebrow: 'ჯავშანი',
        asideCopy: 'დაჯავშნე მაგიდა წინასწარ და თამაშის წინ ყველაფერი მზად დაგხვდება.',
        reserveAction: 'დაჯავშნე ახლა'
      },
      reserve: {
        eyebrow: 'ჯავშანი',
        title: 'დაჯავშნე მაგიდა',
        description: 'მეტი დრო გჭირდება? შეცვალე საათები და ჯამი ავტომატურად განახლდება.',
        hourlyRate: 'საათობრივი ფასი',
        visitEyebrow: 'მდებარეობა',
        totalEyebrow: 'ჯამი',
        totalLine: 'საათი × ტარიფი',
        formTitle: 'აირჩიე დრო და ხანგრძლივობა',
        fullName: 'სრული სახელი',
        fullNamePlaceholder: 'შენი სახელი',
        email: 'ელფოსტა',
        phone: 'ტელეფონი',
        phonePlaceholder: '+995 5XX XXXXXX',
        date: 'თარიღი',
        service: 'სერვისი',
        table: 'მაგიდა',
        tablePlaceholder: 'აირჩიე მაგიდა',
        playstationValue: 'PlayStation',
        duration: 'ხანგრძლივობა',
        durationHint: 'სწრაფი არჩევანი ან საკუთარი საათები',
        customHours: 'საკუთარი საათები',
        time: 'დრო',
        loadingTimes: 'იტვირთება...',
        bookedHint: 'დაკავებული საათები გამორთულია',
        notes: 'დამატებითი შენიშვნა',
        notesPlaceholder: 'არასავალდებულო',
        submit: 'დაჯავშნე მაგიდა',
        submitting: 'იგზავნება...',
        durationUnit: 'სთ',
        tableLabel: 'მაგიდა'
      },
      contact: {
        eyebrow: 'კონტაქტი',
        title: 'დაგვიკავშირდი',
        mapTitle: 'Billiard Hall მისამართი',
        address: 'მისამართი',
        phone: 'ტელეფონი',
        hours: 'საათი'
      },
      signIn: {
        eyebrow: 'შესვლა',
        title: 'შესვლა',
        email: 'ელფოსტა',
        password: 'პაროლი',
        passwordPlaceholder: 'შეიყვანე პაროლი',
        submit: 'შესვლა',
        submitting: 'იტვირთება...',
        noAccount: 'ჯერ არ გაქვს ანგარიში?',
        createAccount: 'რეგისტრაცია',
        accountEyebrow: 'ანგარიში',
        accountTitle: 'ჩემი ჯავშნები',
        logout: 'გამოსვლა',
        statsName: 'სახელი',
        statsTotal: 'სულ ჯავშანი',
        statsPhone: 'ტელეფონი',
        loadingReservations: 'ჯავშნები იტვირთება...',
        duration: 'ხანგრძლივობა',
        total: 'ჯამი',
        status: 'სტატუსი',
        createdAt: 'დაჯავშნდა',
        notePrefix: 'შენიშვნა:',
        noteEmpty: 'არ არის',
        paymentConfirmed: 'დადასტურებულია',
        payOnSite: 'ადგილზე გადასახდელია',
        noReservationsTitle: 'ჯავშნები ჯერ არ არის',
        noReservationsCopy: 'როდესაც დაჯავშნი, აქ გამოჩნდება.',
        goReserve: 'ჯავშანზე გადასვლა'
      },
      signUp: {
        eyebrow: 'რეგისტრაცია',
        title: 'რეგისტრაცია',
        fullName: 'სახელი და გვარი',
        fullNamePlaceholder: 'შეიყვანე სახელი და გვარი',
        email: 'ელფოსტა',
        phone: 'ტელეფონის ნომერი',
        phonePlaceholder: '577949425',
        password: 'პაროლი',
        passwordPlaceholder: 'მინიმუმ 6 სიმბოლო',
        service: 'სერვისი',
        servicePlaceholder: 'აირჩიე სერვისი',
        submit: 'რეგისტრაციის გაგზავნა',
        submitting: 'იგზავნება...',
        hasAccount: 'უკვე გაქვს ანგარიში?',
        signIn: 'შესვლა',
        successMessage: 'ანგარიში შეიქმნა. ახლა შეგიძლია შეხვიდე.'
      },
      admin: {
        eyebrow: 'ადმინი',
        title: 'ადმინის შესვლა',
        panelEyebrow: 'ადმინ პანელი',
        panelTitle: 'ჯავშნების მართვა',
        email: 'ელფოსტა',
        password: 'პაროლი',
        passwordPlaceholder: 'შეიყვანე ადმინის პაროლი',
        submit: 'შესვლა',
        submitting: 'იტვირთება...',
        logout: 'გამოსვლა',
        totalReservations: 'სულ ჯავშანი',
        paid: 'გადახდილი',
        unpaid: 'გადასახდელი',
        loadingReservations: 'ჯავშნები იტვირთება...',
        missingName: 'სახელი მითითებული არ არის',
        date: 'თარიღი',
        time: 'დრო',
        duration: 'ხანგრძლივობა',
        total: 'ჯამი',
        notePrefix: 'შენიშვნა:',
        noteEmpty: 'არ არის',
        createdAtPrefix: 'დაჯავშნდა:',
        updating: 'ინახება...',
        markUnpaid: 'მონიშნე როგორც გადასახდელი',
        markPaid: 'მონიშნე როგორც გადახდილი'
      },
      common: {
        currency: '₾',
        mostPopular: 'ყველაზე მოთხოვნადი',
        quickOption: 'სწრაფი არჩევანი'
      }
    }
  },
  en: {
    ...sharedContent,
    cityLabel: 'Tbilisi',
    hours: '14:00 - 02:00',
    address: '5 Levan Machavariani St, Varketili, Tbilisi',
    hero: {
      eyebrow: 'Premium Billiards Club',
      title: 'Book Your Table',
      description: 'Thirteen impeccably maintained tables in a refined atmosphere. Open until 2 AM.'
    },
    quickInfo: [
      { label: 'Hours', value: '14:00 - 02:00' },
      { label: 'Tables', value: '13 Premium' },
      { label: 'Location', value: 'Varketili' }
    ],
    reserveServices: [
      { value: 'billiard', label: 'Billiards' },
      { value: 'playstation', label: 'PlayStation' }
    ],
    pricing: [
      { title: 'Billiards', note: '1 hour', price: '15 ₾', featured: true },
      { title: 'PlayStation', note: '1 hour', price: '10 ₾', featured: false }
    ],
    menuCategories: [
      {
        id: 'coffee',
        title: 'Coffee',
        label: 'Coffee / Tea',
        items: [
          { name: 'Americano', price: 5 },
          { name: 'Megaone Americano', price: 5 },
          { name: 'Double Espresso', price: 4 },
          { name: 'Cappuccino', price: 6 },
          { name: 'Hot Chocolate', price: 8 },
          { name: 'Tea', price: 5 },
          { name: 'Tea with Lemon', price: 5 }
        ]
      },
      {
        id: 'soft-drinks',
        title: 'Soft Drinks',
        label: 'Cold drinks',
        items: [
          { name: 'Water', price: 2 },
          { name: 'Borjomi', price: 3 },
          { name: 'Lemonade', price: 4 },
          { name: 'Coca-Cola Classic', price: 3 },
          { name: 'Coca-Cola Zero', price: 3 },
          { name: 'Fanta', price: 3 },
          { name: 'Sprite', price: 3 },
          { name: 'Orange Juice', price: 4 },
          { name: 'Apple Juice', price: 4 }
        ]
      },
      {
        id: 'food',
        title: 'Food',
        label: 'Snacks & bites',
        items: [
          { name: 'Hot-dog', price: 7 },
          { name: 'Combo menu', price: 15 },
          { name: 'Fries', price: 5 },
          { name: 'Combo fries', price: 10 }
        ]
      },
      {
        id: 'snacks',
        title: 'Snacks',
        label: 'Light bites',
        items: [
          { name: 'Peanuts', price: 5 },
          { name: 'Chips', price: 5 },
          { name: 'Pringles', price: 5 },
          { name: 'T/Bayo', price: 7 },
          { name: 'Sunflower Seeds', price: 4 }
        ]
      },
      {
        id: 'beer',
        title: 'Beer',
        label: 'Bottle / can',
        items: [
          { name: 'Heineken', price: 9 },
          { name: 'Lowenbrau', price: 8 },
          { name: 'Efes Pilsen', price: 9 },
          { name: 'Krombacher', price: 8 },
          { name: 'Amstel', price: 8 },
          { name: 'Estrella', price: 8 },
          { name: 'Zlatopramen', price: 8 },
          { name: 'Corona', price: 7 },
          { name: 'Sol', price: 6 },
          { name: 'Natakhtari', price: 6 },
          { name: 'Natakhtari Kaiser', price: 5 }
        ]
      },
      {
        id: 'energy',
        title: 'Energy',
        label: 'Cold drinks',
        items: [
          { name: 'XL', price: 5 },
          { name: 'Burn', price: 4 },
          { name: '16TH', price: 3 }
        ]
      },
      {
        id: 'cocktails',
        title: 'Cocktails',
        label: 'Bar',
        items: [
          { name: 'Sex on the Beach', price: 15 },
          { name: 'Blue Lagoon', price: 8 },
          { name: 'Mojito', price: 14 },
          { name: 'Pina Colada', price: 8 },
          { name: 'Vodka-Energy', price: 12 }
        ]
      },
      {
        id: 'vodka',
        title: 'Vodka',
        label: '40 ml',
        items: [
          { name: 'Finlandia', price: 7 },
          { name: 'Absolut', price: 7 },
          { name: 'Stolichnaya', price: 7 },
          { name: 'Sobieski', price: 6 },
          { name: 'El Capite', price: 6 },
          { name: 'Martini', price: 6 }
        ]
      },
      {
        id: 'liqueur',
        title: 'Liqueur',
        label: 'Bar',
        items: [
          { name: 'Jagermeister', price: 8 },
          { name: 'Gintevi', price: 15 }
        ]
      },
      {
        id: 'whisky',
        title: 'Whisky',
        label: '40 ml',
        items: [
          { name: 'Chivas Regal', price: 15 },
          { name: 'Jameson', price: 12 },
          { name: "Jack Daniel's", price: 12 },
          { name: "Ballantine's", price: 8 }
        ]
      },
      {
        id: 'tequila',
        title: 'Tequila',
        label: '40 ml',
        items: [
          { name: 'Olmeca', price: 10 },
          { name: 'Sierra', price: 8 },
          { name: 'San Jose', price: 8 }
        ]
      },
      {
        id: 'gin',
        title: 'Gin',
        label: 'Bar',
        items: [
          { name: 'Beefeater', price: 8 },
          { name: 'Tonic', price: 5 },
          { name: 'Gin Tonic', price: 10 }
        ]
      }
    ],
    highlights: [
      {
        eyebrow: 'Instant Booking',
        title: 'Reserve in Seconds',
        text: 'Book online in moments and arrive ready to play.'
      },
      {
        eyebrow: 'Prime Location',
        title: 'Easy to Reach',
        text: 'Conveniently located in Varketili with easy parking nearby.'
      },
      {
        eyebrow: 'Late Hours',
        title: 'Best at Night',
        text: 'Open until 2 AM, ideal for relaxed evenings with friends.'
      }
    ],
    vibePoints: [
      'Refined interior with warm, focused lighting',
      'Professional-grade tables, fully maintained',
      'A calm atmosphere for serious games and casual nights alike'
    ],
    signupPlans: [
      { value: 'billiard', label: 'Billiards' },
      { value: 'playstation', label: 'PlayStation' },
      { value: 'events', label: 'Events' }
    ],
    ui: {
      localeSwitcherLabel: 'Change language',
      topbar: {
        openDaily: 'Open Daily'
      },
      navItems: [
        { to: '/', label: 'Home' },
        { to: '/prices', label: 'Prices' },
        { to: '/menu', label: 'Menu' },
        { to: '/reserve', label: 'Reserve' },
        { to: '/contact', label: 'Contact' },
        { to: '/signin', label: 'Sign In' }
      ],
      loading: {
        label: 'Loading',
        message: 'Preparing the next page...'
      },
      footer: {
        brandEyebrow: 'Billiard Hall',
        quickLinks: 'Quick Links',
        reservationsTitle: 'Reservations',
        reservationsCopy: 'Book your table online and arrive ready to play.',
        reserveLink: 'Reserve Now'
      },
      home: {
        primaryAction: 'Reserve Now',
        secondaryAction: 'See Menu',
        availableToday: 'Available Today',
        totalTables: 'Total Tables',
        callLabel: 'Call',
        whyVisitEyebrow: 'Why Visit',
        whyVisitTitle: 'The Perfect Evening Awaits',
        atmosphereEyebrow: 'The Atmosphere',
        atmosphereTitle: 'Built for Billiards',
        readyEyebrow: 'Ready?',
        readyTitle: 'Book a Table',
        readyCopy: 'Secure your spot in minutes. Everything else is handled.'
      },
      prices: {
        eyebrow: 'Hourly Rates',
        title: 'Pricing',
        description: 'Simple pricing for billiards and PlayStation. Everything is hourly.',
        featuredLabel: 'Most popular',
        secondaryLabel: 'Quick option',
        sidebarEyebrow: 'Food & Drink',
        sidebarTitle: 'Open Daily',
        sidebarCopy: 'A full menu of drinks and snacks is available. Visit the menu page for details.',
        menuAction: 'View Menu',
        reserveAction: 'Book Now'
      },
      menu: {
        eyebrow: 'Food & Drink',
        title: 'Full Menu',
        description: 'Everything we serve, organized by category.',
        asideEyebrow: 'Reservations',
        asideCopy: 'Reserve your table in advance and arrive to a ready setup.',
        reserveAction: 'Book Now'
      },
      reserve: {
        eyebrow: 'Reservation',
        title: 'Book a Table',
        description: 'Need more time? Adjust the hours and the total updates automatically.',
        hourlyRate: 'Hourly Rate',
        visitEyebrow: 'Location',
        totalEyebrow: 'Total',
        totalLine: 'hours × rate',
        formTitle: 'Pick Your Time & Duration',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Your name',
        email: 'Email',
        phone: 'Phone',
        phonePlaceholder: '+995 5XX XXXXXX',
        date: 'Date',
        service: 'Service',
        table: 'Table',
        tablePlaceholder: 'Select a table',
        playstationValue: 'PlayStation',
        duration: 'Duration',
        durationHint: 'Quick pick or set custom hours',
        customHours: 'Custom Hours',
        time: 'Time',
        loadingTimes: 'Loading...',
        bookedHint: 'Booked slots are disabled',
        notes: 'Additional Notes',
        notesPlaceholder: 'Optional',
        submit: 'Book Table',
        submitting: 'Submitting...',
        durationUnit: 'hr',
        tableLabel: 'Table'
      },
      contact: {
        eyebrow: 'Contact',
        title: 'Get in Touch',
        mapTitle: 'Billiard Hall location',
        address: 'Address',
        phone: 'Phone',
        hours: 'Hours'
      },
      signIn: {
        eyebrow: 'Sign In',
        title: 'Sign In',
        email: 'Email',
        password: 'Password',
        passwordPlaceholder: 'Enter your password',
        submit: 'Sign In',
        submitting: 'Loading...',
        noAccount: "Don't have an account yet?",
        createAccount: 'Sign Up',
        accountEyebrow: 'Account',
        accountTitle: 'My Reservations',
        logout: 'Log Out',
        statsName: 'Name',
        statsTotal: 'Reservations',
        statsPhone: 'Phone',
        loadingReservations: 'Loading reservations...',
        duration: 'Duration',
        total: 'Total',
        status: 'Status',
        createdAt: 'Created',
        notePrefix: 'Note:',
        noteEmpty: 'None',
        paymentConfirmed: 'Confirmed',
        payOnSite: 'Pay on site',
        noReservationsTitle: 'No reservations yet',
        noReservationsCopy: 'Your bookings will appear here once you create one.',
        goReserve: 'Go to Reservation'
      },
      signUp: {
        eyebrow: 'Sign Up',
        title: 'Create Account',
        fullName: 'Full Name',
        fullNamePlaceholder: 'Enter your full name',
        email: 'Email',
        phone: 'Phone Number',
        phonePlaceholder: '577949425',
        password: 'Password',
        passwordPlaceholder: 'Minimum 6 characters',
        service: 'Service',
        servicePlaceholder: 'Choose a service',
        submit: 'Create Account',
        submitting: 'Submitting...',
        hasAccount: 'Already have an account?',
        signIn: 'Sign In',
        successMessage: 'Account created. You can sign in now.'
      },
      admin: {
        eyebrow: 'Admin',
        title: 'Admin Sign In',
        panelEyebrow: 'Admin Panel',
        panelTitle: 'Reservation Management',
        email: 'Email',
        password: 'Password',
        passwordPlaceholder: 'Enter the admin password',
        submit: 'Sign In',
        submitting: 'Loading...',
        logout: 'Log Out',
        totalReservations: 'Reservations',
        paid: 'Paid',
        unpaid: 'Unpaid',
        loadingReservations: 'Loading reservations...',
        missingName: 'No name provided',
        date: 'Date',
        time: 'Time',
        duration: 'Duration',
        total: 'Total',
        notePrefix: 'Note:',
        noteEmpty: 'None',
        createdAtPrefix: 'Created:',
        updating: 'Saving...',
        markUnpaid: 'Mark as unpaid',
        markPaid: 'Mark as paid'
      },
      common: {
        currency: '₾',
        mostPopular: 'Most popular',
        quickOption: 'Quick option'
      }
    }
  }
};

export function getSiteContent(locale) {
  return siteContentByLocale[locale] || siteContentByLocale.ka;
}
