export const siteContent = {
  venueName: 'Billiard Hall',
  cityLabel: 'თბილისი',
  hours: '14:00 - 02:00',
  address: 'თბილისი, ვარკეთილის მესამე პლატო, ლევან მაჭავარიანის 5',
  phones: ['577949425', '599396120'],
  hero: {
    eyebrow: 'თბილისი • 14:00 - 02:00',
    title: 'დაჯავშნე მაგიდა ახლავე',
    description: '13 მაგიდა, სწრაფი ჯავშანი და პრემიუმ ბილიარდის სივრცე ვარკეთილში.'
  },
  quickInfo: [
    { label: 'სამუშაო საათები', value: '14:00 - 02:00' },
    { label: 'მაგიდები', value: '13 მაგიდა' },
    { label: 'მისამართი', value: 'ვარკეთილი' }
  ],
  reserveServices: [
    { value: 'billiard', label: 'მაგიდა' },
    { value: 'playstation', label: 'PlayStation' }
  ],
  pricingRules: {
    billiard: 15,
    playstation: 10
  },
  pricing: [
    { title: 'ბილიარდი', note: '1 საათი', price: '15 ლარი', featured: true },
    { title: 'PlayStation', note: '1 საათი', price: '10 ლარი', featured: false }
  ],
  menuCategories: [
    {
      id: 'coffee',
      title: 'ყავა',
      label: 'Coffee / Tea',
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
      label: 'Soft Drinks',
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
      label: 'Food',
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
      label: 'Snack',
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
      label: 'Beer',
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
      label: 'Energy',
      items: [
        { name: 'XL', price: 5 },
        { name: 'Burn', price: 4 },
        { name: '16TH', price: 3 }
      ]
    },
    {
      id: 'cocktails',
      title: 'კოქტეილი',
      label: 'Cocktail',
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
      label: 'Vodka',
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
      label: 'Liquor',
      items: [
        { name: 'Jagermeister', price: 8 },
        { name: 'Gintevi', price: 15 }
      ]
    },
    {
      id: 'whisky',
      title: 'ვისკი',
      label: 'Whisky',
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
      label: 'Tequila',
      items: [
        { name: 'Olmeca', price: 10 },
        { name: 'Sierra', price: 8 },
        { name: 'San Jose', price: 8 }
      ]
    },
    {
      id: 'gin',
      title: 'ჯინი',
      label: 'Gin',
      items: [
        { name: 'Beefeater', price: 8 },
        { name: 'Tonic', price: 5 },
        { name: 'Gin Tonic', price: 10 }
      ]
    }
  ],
  highlights: [
    { eyebrow: 'სწრაფი ჯავშანი', title: 'ერთი მთავარი მოქმედება', text: 'დაჯავშნე რამდენიმე წამში.' },
    { eyebrow: 'ვარკეთილი', title: 'მოსახერხებელი მისვლა', text: 'ლევან მაჭავარიანის 5.' },
    { eyebrow: 'ღია გვიანობამდე', title: 'საღამოს იდეალური სივრცე', text: 'დაგხვდება 02:00-მდე.' }
  ],
  vibePoints: [
    'მუქი, მშვიდი და სუფთა ინტერიერი',
    'დიდი ჯგუფისთვისაც კომფორტული სივრცე',
    'ზარი და ჯავშანი ორივე სწრაფად'
  ],
  signupPlans: [
    { value: 'billiard', label: 'ბილიარდი' },
    { value: 'playstation', label: 'PlayStation' },
    { value: 'events', label: 'ივენთები' }
  ]
};
