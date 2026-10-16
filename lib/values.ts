// Valorile Bisericii Momentum — folosite pe prima pagină (acordeon) și pe pagina Cine suntem,
// în română și engleză.
export type Value = {
  title: string  // numele valorii
  text: string   // textul complet
}

export const VALUES: Record<'ro' | 'en', Value[]> = {
  ro: [
    {
      title: 'Îl iubim pe Dumnezeu',
      text: 'Prima noastră valoare pornește din cea mai mare poruncă: să-L iubim pe Domnul Dumnezeul nostru. El ne-a iubit întâi, iar noi Îi răspundem cu dragoste, cu toată inima noastră. Tot ceea ce facem la Momentum vrem să pornească din relația noastră cu Dumnezeu.',
    },
    {
      title: 'Iubim oamenii',
      text: 'Îi iubim pe oameni pentru că asta face Dumnezeu. Credem că fiecare persoană are valoare și merită să fie primită, văzută și iubită. La Momentum vrem să construim o comunitate în care oamenii să simtă dragostea lui Dumnezeu prin felul în care ne purtăm unii cu alții.',
    },
    {
      title: 'Căutăm Împărăția lui Dumnezeu',
      text: 'Credem principiul biblic: „Căutați mai întâi Împărăția lui Dumnezeu”. Alegem să-L punem pe Dumnezeu și Împărăția Lui înaintea tuturor lucrurilor, având încredere că El se va îngriji de ceea ce avem nevoie și ne va da toate celelalte lucruri pe deasupra.',
    },
    {
      title: 'Căutăm transformarea',
      text: 'Ne dorim ca oamenii care ajung la Momentum să experimenteze o transformare reală în viața lor. Credem că dragostea lui Dumnezeu și dragostea sinceră dintre oameni au puterea de a ne schimba înspre bine și de a ne apropia tot mai mult de ceea ce Dumnezeu ne-a creat să fim.',
    },
    {
      title: 'Isus să fie cunoscut',
      text: 'Nu vrem ca atenția să fie asupra noastră sau asupra celor care sunt în față. Cel mai important este Isus Hristos, Domnul. Tot ceea ce facem la Momentum vrem să Îl arate pe El, iar dorința noastră este ca Isus să fie cunoscut, urmat și pus în centrul vieților noastre.',
    },
  ],
  en: [
    {
      title: 'Love God',
      text: 'Our first value comes from the greatest commandment: to love the Lord our God. He loved us first, and we respond with love, with all our heart. Everything we do at Momentum flows from our relationship with God.',
    },
    {
      title: 'Love People',
      text: 'We love people because that is what God does. We believe every person has worth and deserves to be welcomed, seen, and loved. At Momentum, we want to build a community where people experience God’s love through the way we treat one another.',
    },
    {
      title: 'Seek the Kingdom',
      text: 'We hold to the biblical principle: “Seek first the Kingdom of God.” We choose to put God and His Kingdom before everything else, trusting that He will provide what we need and add all these things to us as well.',
    },
    {
      title: 'See Transformation',
      text: 'We want everyone who comes to Momentum to experience real transformation in their lives. We believe that God’s love and genuine love between people have the power to change us for the better and draw us ever closer to who God created us to be.',
    },
    {
      title: 'Make Jesus Famous',
      text: 'We don’t want the attention to be on us or on those up front. What matters most is Jesus Christ, the Lord. We want everything we do at Momentum to point to Him, and our desire is for Jesus to be known, followed, and placed at the center of our lives.',
    },
  ],
}
